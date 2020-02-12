// #S - Hash Scratch
// Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
// https://ultimate.pictures/

// Called when the user clicks on the browser action.
var isBussy=false;
chrome.browserAction.onClicked.addListener(function(tab) {
  const urlScratch = "https://scratch.mit.edu/projects/";
  const urlChampierre = "https://champierre.github.io/scratch3/";
  if (('url' in tab) && ((tab.url.slice(0,urlScratch.length) == urlScratch) || (tab.url.slice(0,urlChampierre.length) == urlChampierre))){
    if (isBussy){return;}
    isBussy = true;
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 100] });
    chrome.browserAction.setBadgeText({ text: '#' });
    chrome.tabs.sendMessage(tab.id, {command: "onClicked"}, function(response) {
      chrome.browserAction.setBadgeText({ text: '' });
      console.log(response);
      isBussy = false;
    });
  } else {
    console.log('Not supported: ' + tab.url);
  }
})
