interface Fn {
  (e: KeyboardEvent): void
}
let ismoreclick = false
let moreclick = [] as string[]
let keyStack = [] as { key: string | string[], fns: Fn[] }[]
function clearMoreClick() {
  moreclick = []
}
function handleKeypress(keyboardevent: KeyboardEvent) {
  keyStack.forEach(keyEventRaw => {
    if (keyEventRaw.key === "*") {
      keyEventRaw.fns.forEach(fn => fn(keyboardevent))
    } else if (Array.isArray(keyEventRaw.key)) {
      if (keyEventRaw.key[0].toLowerCase() === keyboardevent.code.toLowerCase()) {
        ismoreclick = true
        moreclick.push(keyEventRaw.key[0])
        addEventListener("keyup", clearMoreClick)
      }
      if (ismoreclick) {
        moreclick.push(keyboardevent.key)
      }
      if (JSON.stringify(moreclick) === JSON.stringify(keyEventRaw.key)) {
        keyEventRaw.fns.forEach(fn => fn(keyboardevent))
      }
    } else if (typeof keyEventRaw.key === "string") {
      if (keyboardevent.code.toLowerCase() == keyEventRaw.key.toLowerCase()) {
        keyEventRaw.fns.forEach(fn => fn(keyboardevent))
      }
    }
  })
}
function initKeyPress(fn: any) {
  document.addEventListener("keydown", fn)
}
export function addKeyEvent(key: string | string[], fn: Fn) {
  let finalkey: string | string[];

  if (typeof key === "string") {
    finalkey = key.toLowerCase()
  } else if (Array.isArray(key)) {
    finalkey = []
    key.forEach(i => {
      (finalkey as string[]).push(i.toLowerCase())
    })
  } else {
    return
  }
  for (let item of keyStack) {
    if (JSON.stringify(item.key) === JSON.stringify(finalkey)) {
      item.fns.push(fn)
      return
    }
  }
  keyStack.push({
    key: key,
    fns: [fn]
  })
}

initKeyPress(handleKeypress);





