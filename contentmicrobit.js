// #S - Hash Scratch
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
  var svgText = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Hashed with HashScratch for micro:bit v.3.1.905.2023 -->\n`;
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
  // delete - rect
  const rect = Array.from(svg.getElementsByTagName('rect'));
  for (var i = 0; i < rect.length; i++) {
    if (rect[i].parentNode.className.animVal === 'blocklyWorkspace') {
      rect[i].parentNode.removeChild(rect[i]);
    }
  }
  // delete - blocklyConnectionIndicator
  const blocklyConnectionIndicator = Array.from(svg.getElementsByClassName('blocklyConnectionIndicator'));
  for (var i = 0; i < blocklyConnectionIndicator.length; i++) {
    blocklyConnectionIndicator[i].parentNode.removeChild(blocklyConnectionIndicator[i]);
  }
  // delete - blocklyCursor
  const blocklyCursor = Array.from(svg.getElementsByClassName('blocklyCursor'));
  for (var i = 0; i < blocklyCursor.length; i++) {
    blocklyCursor[i].parentNode.removeChild(blocklyCursor[i]);
  }
  // unwrap - blocklyWorkspace
  unwrap(svg.getElementsByClassName('blocklyWorkspace')[0]);
  // delete - blocklyBubbleCanvas, blocklyScrollbarBackground, blocklyZoom
  const removeClassnames = ['blocklyBubbleCanvas', 'blocklyScrollbarBackground']
  removeClassnames.forEach(function (className) {
    var removes = Array.from(svg.getElementsByClassName(className));
    for (var i = 0; i < removes.length; i++) {
      removes[i].parentNode.removeChild(removes[i]);
    }
  });
  // use(image)
  const textIcons = []
  const uses = Array.from(svg.getElementsByTagName('use'));
  for (var i = 0; i < uses.length; i++) {
    href = uses[i].getAttribute('xlink:href');
    var textIcon;
    if (textIcons[href]) {
      textIcon = textIcons[href];
    } else {
      const imageTag = svg.querySelector(href);
      textIcon = imageTag.outerHTML;
      textIcons[href] = textIcon;
    }
    uses[i].innerHTML = '<g></g>';
    const gTag = uses[i].firstElementChild;
    gTag.setAttribute('transform', uses[i].getAttribute('transform') || 'translate(0, 0) ');
    gTag.setAttribute('height', uses[i].getAttribute('height'));
    gTag.setAttribute('width', uses[i].getAttribute('width'));
    gTag.innerHTML = textIcon;
    const childTag = gTag.firstElementChild;
    const newID = childTag.getAttribute('id') + '_' + i;  // New id
    childTag.setAttribute('id', newID);
    unwrap(uses[i]);
  }
  // delete - defs
  const defs = Array.from(svg.getElementsByTagName('defs'));
  for (var i = 0; i < defs.length; i++) {
    defs[i].parentNode.removeChild(defs[i]);
  }
  // image (data:image/svg+xml;base64,)
  const images = Array.from(svg.getElementsByTagName('image'));
  for (let i = 0; i < images.length; i++) {
    const href = images[i].getAttribute('xlink:href');
    if (href) {
      const [contentType, contentValue] = href.split(',', 2);
      if ('data:image/svg+xml' == contentType) {
        const base64ContentValue = btoa(decodeURIComponent(contentValue).replace(
          "viewBox='0 0 24 24'",
          "viewBox='0 0 24 24' width='24' height='24'"
        ));
        images[i].setAttribute('xlink:href', "data:image/svg+xml;base64," + base64ContentValue);
      }
    }
  }
  // compute style
  const divSVG = document.createElement('div');
  document.body.appendChild(divSVG);
  try {
    divSVG.appendChild(svg);
    const computedSvg = divSVG.firstChild.cloneNode(false);
    const queue = [];
    queue.push([svg, computedSvg, undefined]);
    while (queue.length != 0) {
      const [rEle, vEle, parentStyle] = queue.pop();
      const computedStyle = window.getComputedStyle(rEle, '');
      for (let property of computedStyle) {
        const parentPropertyValue = parentStyle?.getPropertyValue(property);
        const propertyValue = computedStyle.getPropertyValue(property);
        if (parentPropertyValue != propertyValue) {
          if (('font-family' == property) && ('text' == vEle.tagName)) {
            // font-family: Consolas
            vEle.style[property] = '"Consolas", ' + propertyValue;
          } else if ('rgba(0, 0, 0, 0)' == propertyValue) {
            // rgba(0, 0, 0, 0) => none
            vEle.style[property] = 'none';
          } else {
            vEle.style[property] = propertyValue;
          }
        }
      }
      const rChildren = rEle.children;
      if (rChildren.length !== 0) {
        for (let rChild of rChildren) {
          const vChild = rChild.cloneNode(false);
          vEle.appendChild(vChild);
          queue.push([rChild, vChild, computedStyle]);
        }
      } else {
        vEle.innerHTML = rEle.innerHTML;
      }
    }
    // blocklyEditableText - fill: white
    for (let v of computedSvg.getElementsByClassName('blocklyEditableText')) {
      const propertyName = 'fill';
      if (!v.style[propertyName]) {
        v.style[propertyName] = 'white';
      }
    }
    // Text
    svgText = svgText + computedSvg.outerHTML;
    // replace - SPACE (&nbsp;)
    const nbsp = String.fromCodePoint(0xa0);
    svgText = svgText.replace(/&nbsp;/g, nbsp);
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
      saveLink.download = 'HashMicroBit.svg';
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
  sendMessage({ success: true, reason: 'Hashed micro:bit!' })
}
