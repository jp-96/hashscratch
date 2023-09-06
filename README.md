# #S - Hash Scratch

This Chrome extension, #S - Hash Scratch is for the Scratch Teacher and the Book Creator, downloading Scratch 3.0 Blocks to SVG file.
If you want to print out the blocks nicely, you should use the SVG format.
The #S - Hash Scratch is running as Chrome extention, so downloading just one clicked !
I usually use the Inkscape to create educational materials, and then copy/past to MS-Word, etc.

Supports MakeCode for micro:bit.

# Install

Go to Chrome Web Store.
https://chrome.google.com/webstore/detail/s-hash-scratch/jpefpbkmogghljlfgmpbaokfbdjhadbg

# References

## Scratchblocks2svg Chrome Extension
https://github.com/summerscar/scratchblocks2svg

export scratch3.0 blocks to svg file

## (Japanese) ブラウザで非同期処理を同期的に処理する fetch(Promise) + async/await
https://qiita.com/msquare33/items/a8b51d6f4d6be770e7d6

```fetch.js
getConfig = async() => {
    var conf1 = await (await fetch("/conf/conf1.yml?_="+(new Date()).getDate())).text();
    console.log(conf1);
    var conf2 = await (await fetch("/conf/conf2.yml?_="+(new Date()).getDate())).text();
    console.log(conf2);
}

window.onload = function(){
    getConfig();
}
```

## (Japanese) JavaScriptでスタイルがcssに定義されているsvgにスタイルを適用しながらいい感じにpngに変換した
https://qiita.com/Nikkely/items/aa485ebdbec51e49ecbc

``` getComputedStyle.js
const queue = []
queue.push(svgElement)
while (queue.length != 0) {
    const element = queue.pop()

    const computedStyle = window.getComputedStyle(element, '')
    for (let property of computedStyle) {
        element.style[property] = computedStyle.getPropertyValue(property)
    }

    const children = element.children

    for (let child of children) {
        queue.push(child)
    }
}
```

## image data:image/svg+xml, -> data:image/svg+xml;base64,

**tag: svg**
svg viewBox='0 0 24.01 24.02' witdh='24.01' height='24.02'

1. unescape, data:image/svg+xml
1. add svg's width and height
1. btoa and data:image/svg+xml;base64

```
const b = unescape("%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 24 24' version='1.1' viewBox='0 0 24 24' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23CF8B17;%7D .st1%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Ctitle%3Erepeat%3C/title%3E%3Ccircle cx='12' cy='12' r='10.503' fill='none' stroke='%23fff' stroke-linecap='square' stroke-linejoin='round' stroke-width='2'/%3E%3Cg transform='matrix(.0086269 0 0 -.0086269 4.8224 17.354)'%3E%3Cpath d='m1611 367.42q0 53-37 90l-651 651q-38 38-91 38-54 0-90-38l-651-651q-38-36-38-90 0-53 38-91l74-75q39-37 91-37 53 0 90 37l486 486 486-486q37-37 90-37 52 0 91 37l75 75q37 39 37 91z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E%0A")
console.log(b)
console.log(escape("width='24.00' height='24.00'"))
console.log(unescape("width='24.00' height='24.00'"))

const x = atob("PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=")
console.log(x)

const y = btoa("<svg enable-background='new 0 0 24 24' version='1.1' viewBox='0 0 24 24' xml:space='preserve' width='24.00' height='24.00' xmlns='http://www.w3.org/2000/svg'><style type='text/css'> .st0{fill:#CF8B17;} .st1{fill:#FFFFFF;}</style><title>repeat</title><circle cx='12' cy='12' r='10.503' fill='none' stroke='#fff' stroke-linecap='square' stroke-linejoin='round' stroke-width='2'/><g transform='matrix(.0086269 0 0 -.0086269 4.8224 17.354)'><path d='m1611 367.42q0 53-37 90l-651 651q-38 38-91 38-54 0-90-38l-651-651q-38-36-38-90 0-53 38-91l74-75q39-37 91-37 53 0 90 37l486 486 486-486q37-37 90-37 52 0 91 37l75 75q37 39 37 91z' fill='#fff'/></g></svg>")
console.log(y)

console.log(btoa(unescape("%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 24 24' version='1.1' viewBox='0 0 24 24' width='24.00' height='24.00' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23CF8B17;%7D .st1%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Ctitle%3Erepeat%3C/title%3E%3Ccircle cx='12' cy='12' r='10.503' fill='none' stroke='%23fff' stroke-linecap='square' stroke-linejoin='round' stroke-width='2'/%3E%3Cg transform='matrix(.0086269 0 0 -.0086269 4.8224 17.354)'%3E%3Cpath d='m1611 367.42q0 53-37 90l-651 651q-38 38-91 38-54 0-90-38l-651-651q-38-36-38-90 0-53 38-91l74-75q39-37 91-37 53 0 90 37l486 486 486-486q37-37 90-37 52 0 91 37l75 75q37 39 37 91z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E")))

```

## Migrate to Manifest V3

https://developer.chrome.com/docs/extensions/migrating/api-calls/

https://developer.chrome.com/docs/extensions/migrating/api-calls/#replace-browser-page-actions

https://developer.chrome.com/docs/extensions/migrating/api-calls/#replace-the-browseraction-and-pageaction-apis-with-the-action-api

https://developer.chrome.com/docs/extensions/migrating/api-calls/#replace-unsupported-apis

# Giving to ULTIMATE PICTURES
Donate by purchasing the book at the following URL, if you like.
https://leanpub.com/hash-scratch

# License
MIT License
#S - Hash Scratch
Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
https://ultimate.pictures/