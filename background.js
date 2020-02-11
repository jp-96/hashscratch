// #S - Hash Scratch
// Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
// https://ultimate.pictures/

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  const urlScratch = "https://scratch.mit.edu/projects/";
  const urlChampierre = "https://champierre.github.io/scratch3/";
  if ((tab.url.slice(0,urlScratch.length) == urlScratch) || (tab.url.slice(0,urlChampierre.length) == urlChampierre)){
    chrome.tabs.sendMessage(tab.id, {command: "onClicked"}, function(response) {
      console.log(response);
    });
  } else {
    console.log('Not supported: ' + tab.url);
  }
})
