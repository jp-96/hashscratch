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

# Giving to ULTIMATE PICTURES
Donate by purchasing the book at the following URL, if you like.
https://leanpub.com/hash-scratch

# License
MIT License
#S - Hash Scratch
Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
https://ultimate.pictures/