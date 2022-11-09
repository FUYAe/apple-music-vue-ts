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
