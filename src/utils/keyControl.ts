
interface Fn {
  (e: KeyboardEvent): void
}
type KeyRaw = {
  [k in KeyboardEvent["code"]]: {
    fns: Fn[],
    type: "single" | "combination"
  }
}
type CombinationKeyRaw = {
  [k in KeyboardEvent["code"]]: {
    fns: Fn[],
    type: "single" | "combination",
    keydowns: boolean[],
    awaitKeys: string[],
    finalKey: string
  }
}




const singleKeyStack = {} as KeyRaw;
const combinationKeyStack = {} as CombinationKeyRaw;
const currentActiveKey = {} as any
let historyKey = ""
const clearWhenKeyUp = (e: KeyboardEvent) => {
  historyKey = ""
  let upKeyCode = e.code.toLowerCase()
  if (upKeyCode in currentActiveKey) {
    let cbmk = combinationKeyStack[currentActiveKey[upKeyCode]]
    cbmk.keydowns[cbmk.awaitKeys.indexOf(upKeyCode)] = false
    delete currentActiveKey[upKeyCode]
  }
}
const isExectiveCombinationKey = (exkeys: any[]) => {
  let flag = true
  for (let i of exkeys) {
    if (i === false) {
      flag = false
    }
  }
  return flag
}

function handleSingleKey(keyboardevent: KeyboardEvent) {
  for (let key in singleKeyStack) {
    let keyEventRaw = singleKeyStack[key]
    if (key === "*") {
      keyEventRaw.fns.forEach(fn => fn(keyboardevent))
    }
    if (key.toLowerCase() === keyboardevent.code.toLowerCase()) {
      if (keyEventRaw.type === "single") {
        keyEventRaw.fns.forEach(fn => fn(keyboardevent))
      }
    }
  }
}
function handleCombinationKey(keyboardevent: KeyboardEvent) {
  if (historyKey === keyboardevent.code) return
  historyKey = keyboardevent.code
  for (let key in combinationKeyStack) {
    let keyEventRaw = combinationKeyStack[key]
    let awaitKeys = keyEventRaw.awaitKeys
    let finalKey = keyEventRaw.finalKey
    for (let k in awaitKeys) {
      let keyCode = awaitKeys[k].toLowerCase()
      if (keyCode === keyboardevent.code.toLowerCase()) {
        if (k == "0" || keyEventRaw.keydowns[Number(k) - 1] !== false) {
          keyEventRaw.keydowns[k] = true
          currentActiveKey[keyCode] = key
        }
      }
    }
    if (isExectiveCombinationKey(keyEventRaw.keydowns) && finalKey.toLowerCase() === keyboardevent.code.toLowerCase()) {
      keyEventRaw.fns.forEach(fn => fn(keyboardevent))
      historyKey = ""
    }
  }
}

const keydownFns = [handleSingleKey, handleCombinationKey] as any[]
const keyupFns = [clearWhenKeyUp] as any[]


function handleKeydown(e: KeyboardEvent) {
  keydownFns.forEach(fn => fn(e))
}

function handleKeyup(e: KeyboardEvent) {
  keyupFns.forEach(fn => fn(e))
}
function initKeyEvent() {
  document.addEventListener("keydown", handleKeydown)
  document.addEventListener("keyup", handleKeyup)
}

function hasExist(key: string) {
  if (key in combinationKeyStack) {
    return true
  }
  return false
}
function pushSingleKeyStack(key: string, fn: Fn) {
  if (hasExist(key)) {
    singleKeyStack[key].fns.push(fn)
  } else {
    singleKeyStack[key] = {
      fns: [fn],
      type: "single"
    }
  }
}
function pushCombinationKeyStack(key: string, fn: Fn) {
  if (hasExist(key)) {
    combinationKeyStack[key].fns.push(fn)
  } else {
    let awaitKeys = key.split(".")
    awaitKeys.pop()
    combinationKeyStack[key] = {
      fns: [fn],
      type: "combination",
      keydowns: new Array(key.split(".").length - 1).fill(false),
      finalKey: key.split(".")[key.split(".").length - 1],
      awaitKeys
    }
  }
}
export function addKeyEvent(key: string | string[], fn: Fn) {
  if (typeof key === "string") {
    pushSingleKeyStack(key, fn)
  } else if (Array.isArray(key)) {
    pushCombinationKeyStack(key.map(k => k.toLowerCase()).join("."), fn)
  }

}

initKeyEvent()
