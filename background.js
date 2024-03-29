﻿// #S - Hash Scratch
// Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
// https://ultimate.pictures/

// Called when the user clicks on the browser action.
var isBussy = false;
chrome.action.onClicked.addListener(function (tab) {
  const urlScratch = "https://scratch.mit.edu/projects/";
  const urlChampierre = "https://champierre.github.io/scratch3/";
  const urlML4kids = "https://machinelearningforkids.co.uk/";
  const urlmBlock = "https://ide.mblock.cc/";
  const urlMicrobit = "https://makecode.microbit.org/"
  if (('url' in tab) && ((tab.url.slice(0, urlScratch.length) == urlScratch) || (tab.url.slice(0, urlChampierre.length) == urlChampierre) || (tab.url.slice(0, urlML4kids.length) == urlML4kids) || (tab.url.slice(0, urlmBlock.length) == urlmBlock) || (tab.url.slice(0, urlMicrobit.length) == urlMicrobit))) {
    if (isBussy) { return; }
    isBussy = true;
    chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 100] });
    chrome.action.setBadgeText({ text: '#' });
    chrome.tabs.sendMessage(tab.id, { command: "onClicked" })
      .then((response) => {
        console.log('response:', response);
      })
      .catch((reason) => {
        console.log('error:' + tab.url);
        console.log('reason:', reason);
      })
      .finally(() => {
        isBussy = false;
        chrome.action.setBadgeText({ text: '' });
      });
  } else {
    console.log('Not supported: ' + tab.url);
  }
})
