﻿// #S - Hash Scratch
// Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
// https://ultimate.pictures/

// Requested from backgroud.
chrome.runtime.onMessage.addListener(
  function (request, sender, sendMessage) {
    downloadBlockCodeAsSVG(sendMessage);
    return true;
  }
)

async function downloadBlockCodeAsSVG(sendMessage) {
  var svgText = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Hashed with HashScratch v.3.1.906.2023 -->\n`;
  // util - unwrap
  function unwrap(target) {
    while (target.firstChild) {
      target.parentNode.insertBefore(target.firstChild, target);
    }
    target.remove();
  };
  // util - copy attrs
  function copyAttributes(source, target) {
    const attrs = source.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      target.setAttribute(attrs[i].name, attrs[i].value);
    }
  }
  // Block Code SVG
  const ws = document.querySelector('svg.blocklySvg g.blocklyWorkspace')
  if (!ws) {
    sendMessage({ success: false, reason: 'none' });
    return;
  }
  const svg = ws.parentNode.cloneNode(true);
  // transform
  let svgchild = svg.querySelector('g.blocklyBlockCanvas');
  let xArr = [];
  let yArr = [];
  svgchild.childNodes.forEach(g => {
    try {
      let xy = g.getAttribute('transform').match(/translate\((.*?),(.*?)\)/);
      let x = xy[1] || 0;
      let y = xy[2] || 0;
      xArr.push(x);
      yArr.push(y);
    } catch (error) {
      console.log(error);
    }
  });
  if (xArr.length != 0) {
    svgchild.setAttribute('transform', `translate(${-Math.min(...xArr) + 72},${-Math.min(...yArr) + 72}) scale(0.675)`);
  }
  // svg size
  svg.setAttribute('width', '3840px');
  svg.setAttribute('height', '2160px');
  // delete - defs
  const defs = Array.from(svg.getElementsByTagName('defs'));
  if (defs.length === 1) {
    defs[0].parentNode.removeChild(defs[0]);
  }
  // delete - rect
  const rect = Array.from(svg.getElementsByTagName('rect'));
  for (var i = 0; i < rect.length; i++) {
    if (rect[i].parentNode.className.animVal === 'blocklyWorkspace') {
      rect[i].parentNode.removeChild(rect[i]);
    }
  }
  // unwrap - blocklyWorkspace
  unwrap(svg.getElementsByClassName('blocklyWorkspace')[0]);
  // delete - blocklyBubbleCanvas, blocklyScrollbarBackground, blocklyZoom
  const removeClassnames = ['blocklyBubbleCanvas', 'blocklyScrollbarBackground', 'blocklyZoom']
  removeClassnames.forEach(function (className) {
    var removes = Array.from(svg.getElementsByClassName(className));
    for (var i = 0; i < removes.length; i++) {
      removes[i].parentNode.removeChild(removes[i]);
    }
  });
  // image
  const textIcons = []
  const images = Array.from(svg.getElementsByTagName('image'));
  for (var i = 0; i < images.length; i++) {
    href = images[i].getAttribute('xlink:href');
    if (href.startsWith('data')) {
      continue;
    }
    var textIcon;
    if (textIcons[href]) {
      textIcon = textIcons[href];
    }
    else {
      const tagIcon = document.createElement('g');
      tagIcon.innerHTML = await (await fetch(href)).text(); // async/await
      const tagSVG = tagIcon.firstElementChild;
      copyAttributes(tagSVG, tagIcon)
      unwrap(tagSVG);
      const defs = Array.from(tagSVG.getElementsByTagName('defs'));
      for (var j = 0; j < defs.length; j++) {
        unwrap(defs[j]);
      }
      textIcon = tagIcon.outerHTML;
      textIcons[href] = textIcon;
    }
    images[i].innerHTML = '<g></g>';
    const gTag = images[i].firstElementChild;
    gTag.setAttribute('transform', images[i].getAttribute('transform') || 'translate(0, 0) ');
    gTag.setAttribute('height', images[i].getAttribute('height'));
    gTag.setAttribute('width', images[i].getAttribute('width'));
    gTag.innerHTML = textIcon;
    const childTag = gTag.firstElementChild;
    const newID = childTag.getAttribute('id') + '_' + i;  // New id
    childTag.setAttribute('id', newID);
    const styles = Array.from(gTag.getElementsByTagName('style'));
    for (var j = 0; j < styles.length; j++) {
      const items = styles[j].innerHTML.split('.');
      styles[j].innerHTML = items.join(' #' + newID + ' .'); // #id .className
    }
    unwrap(images[i]);
  }
  // compute style
  const divSVG = document.createElement('div');
  document.body.appendChild(divSVG);
  try {
    divSVG.appendChild(svg);
    const computedSvg = divSVG.firstChild.cloneNode(false);
    const queue = [];
    queue.push([svg, computedSvg]);
    while (queue.length != 0) {
      const pair = queue.pop();
      const rEle = pair[0];
      const vEle = pair[1];
      const computedStyle = window.getComputedStyle(rEle, '');
      for (let property of computedStyle) {
        vEle.style[property] = computedStyle.getPropertyValue(property);
      }
      const rChildren = rEle.children;
      if (rChildren.length !== 0) {
        for (let rChild of rChildren) {
          const vChild = rChild.cloneNode(false);
          vEle.appendChild(vChild);
          queue.push([rChild, vChild]);
        }
      } else {
        vEle.innerHTML = rEle.innerHTML;
      }
    }
    // Text
    svgText = svgText + computedSvg.outerHTML;
    // replace - SPACE (&nbsp;)
    const nbsp = String.fromCodePoint(0xa0);
    svgText = svgText.replace(/&nbsp;/g, nbsp);
    // replace - font (Arial)
    const font = '&quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;';
    svgText = svgText.replace(/&quot;Helvetica Neue&quot;, Helvetica, sans-serif;/g, font);
    // replace - fill: rgba(0, 0, 0, 0);
    svgText = svgText.replace(/rgba\(0, 0, 0, 0\);/g, 'none;');
  } catch (error) {
    sendMessage({ success: false, reason: error });
    return;
  } finally {
    document.body.removeChild(divSVG);
  }
  // execute download
  const saveLink = document.createElement('a');
  document.body.appendChild(saveLink);
  try {
    const data = new Blob([svgText], { type: 'text' });
    const url = window.URL.createObjectURL(data);
    try {
      saveLink.href = url;
      saveLink.download = 'HashScratch.svg';
      saveLink.click();
    } catch (error) {
      sendMessage({ success: false, reason: error });
      return;
    } finally {
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    sendMessage({ success: false, reason: error });
    return;
  } finally {
    document.body.removeChild(saveLink);
  }
  // completed
  sendMessage({ success: true, reason: 'Hashed Scratch!' })
}
