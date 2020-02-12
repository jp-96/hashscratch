# #S - Hash Scratch

Downloading Scratch 3.0 Blocks to SVG file for the Scratch Teacher and the Book Creator.
If you want to print out the blocks nicely, you should use the SVG file format.
The #S, Hash Scratch is running as Chrome extention, so downloading just one clicked !
I usually use the Inkscape to create educational materials, and then copy/past to MS-Word, etc.

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

# License
MIT License
#S - Hash Scratch
Copyright (c) 2020 ULTIMATE PICTURES. All rights reserved.
https://ultimate.pictures/