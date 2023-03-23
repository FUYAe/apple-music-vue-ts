import { time } from "console"
import { App, ComponentInternalInstance, createVNode, render } from "vue"
import FollowMenu from "./FollowMenu.vue"
function isInner(node: Element, e: MouseEvent, outerMostLayer: Element = document.body): boolean {
  if (node == e.target) {
    return true
  }
  for (let n: any = e.target; n != outerMostLayer; n = n.parentElement) {
    if (n == node) {
      return true
    }
  }
  return false
}
export function showFollowMenu(
  target: Element,
  userProps: {
    menus: {
      title: string
      onClick: (event: MouseEvent) => void
    }[]
  }
) {
  let oldEle = document.querySelector(".follow-menu")
  if (oldEle) {
    if (oldEle.parentElement!.parentElement == target) {
      return
    } else {
      oldEle.parentElement?.parentElement?.removeChild(oldEle.parentElement)
    }
  }
  const container = document.createElement("div")
  container.style.cssText = "  height: 0px;width:0px; position: relative; "

  const vnode = createVNode(FollowMenu)
  const instance = vnode.component

  // const { props } = instance as ComponentInternalInstance;
  vnode.props = userProps
  render(vnode, container)
  target.appendChild(container)


  function control(event: MouseEvent) {
    let delay = 0
    if (isInner(container, event)) {
      delay = 200

    }
    setTimeout(() => {
      removeEventListener("click", control)
      container.parentElement == target && target.removeChild(container);
    }, delay)
  }

  addEventListener("click", control)
}



