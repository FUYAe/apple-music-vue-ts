/*
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-29 14:44:27
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:12:45
 * @FilePath: \applemusic-vue3-ts\src\test.js
 * @Description: 测试一些功能，单独运行
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
 */

function obj2type(orignObj, tabNum = 1) {
  if(typeof orignObj!="object"){
    return typeof orignObj
  }
  let keys = Object.keys(orignObj);
  let resObj = {};
  let tabStr = '\t'.repeat(tabNum);

  keys.forEach((key) => {
    let obj = orignObj[key];
    let typeStr = typeof obj;

    if (typeStr !== 'object') {
      if (typeStr === "undefined") {
        typeStr = 'any'
      }
     
      resObj[key] = typeStr;
    } else {
      console.log(typeStr,"  ",obj)
      if (obj == null) {
        typeStr = 'any'
        resObj[key]=typeStr
      }else if (obj instanceof Array) {
        let res=obj2type(obj.at(0) || {}, tabNum + 1)
        resObj[key] = res+"[]";
      } else {
        resObj[key] = obj2type(obj, tabNum + 1);
      }
    }
  })

  let resArr = Object.keys(resObj).map(key => {
    return {
      key,
      val: resObj[key]
    }
  })

  let resArrLen = resArr.length;

  let str = "{\n";
  resArr.forEach((item, index) => {
    str += `${tabStr}${item.key}: ${resObj[item.key]};${tabStr}\n`;
  })

  if (tabNum > 1) {
    str += "\t".repeat(tabNum - 1) + '}';
  } else {
    str += "};";
  }
  return str;
}
