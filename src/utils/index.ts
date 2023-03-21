/*
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-26 20:41:48
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:37:49
 * @FilePath: \applemusic-vue3-ts\src\utils\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
 */

import { customRef } from 'vue'
/**
 * @description: return a vueRef that only changed once
 * @param {any} value
 * @return {*} a vueRef that only changed once
 */
export function useOnlyChangedOnceRef(value: any) {
    let isChanged = false
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                if (!isChanged) {
                    value = newValue
                    isChanged = true
                }
            }
        }
    })
}
/**
 * @description: format index in playlist
 * @param {0} switchModel playmodel:0 default 1 circle 2 async
 * @param {number} index index of playing song in playlist
 * @param {number} length lenght of playlist
 * @param {boolean} isAsync playmodel is async or not
 * @return {number}  a new index for playing next
 */
export function formatIndex(switchModel: 0 | 1 | 2, index: number, length: number, isAsync: boolean): number {
    if (switchModel == 1) {
        if (index + 1 > length) {

            return 0
        }
        if (index < 0) {

            return length - 1
        }
    } else if (switchModel == 0) {
        if (index + 1 > length) {
            return length
        }
        if (index < 0) {

            return 0
        }
    } else if (switchModel == 2) {
        return Math.floor(Math.random() * length)
    }


    return index
}
/**
 * @description: parse lyric of string into Array [millisecond,lyric][]
 * @param {string} str raw lyric of string
 * @return {*} [millisecond,lyric][]
 */
export function parseRawLrc(str: string): [number, string][] {
    const arr: [number, string][] = []
    str.split("\n").forEach(item => {
        let tmpArr = item.split("]")
        let time = tmpArr[0].split("[")[1]
        if (!time) return
        let min = parseInt(time.split(":")[0])
        let s = parseInt(time.split(":")[1].split(".")[0])
        let ms = parseInt(time.split(":")[1].split(".")[1])

        arr.push([1000 * (min * 60 + s) + ms, tmpArr[1]])
    })
    return arr
}

/**
 * @description: covert seconds to 'minite:seconds' format
 * @param {any} s seconds
 * @return {string}
 */
export function s_to_hs(s: any): string {

    let h: any;
    h = Math.floor(s / 60);
    s = s % 60;
    s = parseInt(s);
    h += "";
    s += "";
    h = h.length == 1 ? "0" + h : h;
    s = s.length == 1 ? "0" + s : s;
    return h + ":" + s;
}

export async function compressImg(base64String: string, w: number, quality: number) {
    var getMimeType = function (urlData: any) {
        var arr = urlData.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        return mime;
    };
    var newImage = new Image();
    var imgWidth, imgHeight;

    var promise = new Promise(resolve => (newImage.onload = resolve));
    newImage.src = base64String;
    await promise;
    imgWidth = newImage.width;
    imgHeight = newImage.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = (w * imgHeight) / imgWidth;
        } else {
            canvas.height = w;
            canvas.width = (w * imgWidth) / imgHeight;
        }
    } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
    }
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    if (getMimeType(base64String) == "image/png") {
        quality = quality + 0.15
    }
    var base64 = canvas.toDataURL(
        "image/jpeg",
        quality
    );
    return base64;
}

export function getNow() {
    let time = new Date()
    let y = time.getFullYear()
    let M = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s
}


export function updateDBStore(db: any, DBstore: any) {
    let transaction = db.transaction("bgm", "readwrite")
    let bgdata = transaction.objectStore("bgm")
    const req = bgdata.getAll()
    DBstore.bgImgArray = []
    req.onsuccess = function () {
        for (let img of req.result) {
            let btSize = Number(String(img.size).slice(0, 4))
            let n = Number(String(img.size).slice(0, 1))
            compressImg(img.data, btSize, (10 - n) / 50).then((base64) => {
                DBstore.bgImgArray.push(img)
            })
        }
    }
    req.onerror = function () {
        alert("chuchuo")
    }

}

export function compressImgItem(img: DBBG) {
    return new Promise<DBBG>((resolve, reject) => {
        let btSize = Math.ceil(img.size as any / 1000)
        let quality = 300 / btSize
        compressImg(img.data, btSize, quality).then((base64) => {
            // console.log(btSize, quality, Object.assign(img, { data: base64 }))
            resolve(Object.assign(img, { data: base64 }))
        })
    })
}
export function getBase64ImageUrl(img: HTMLImageElement, callBack: any, imgType: string) {
    if (!imgType) {
        imgType = "image/png";
    }

    // img.crossOrigin = "anonymous";
    console.log(img)
    img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx && ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(imgType);
        callBack(dataURL);
    }

}
export function formatBetween(value: number, a: number, b: number) {
    return Math.max(a, Math.min(value, b))
}