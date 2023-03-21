import { time } from "console"
import { App, ComponentInternalInstance, createVNode, render } from "vue"
import HoverMenu from "./HoverMenu.vue"
function isInner(node: Element, e: MouseEvent): boolean {
  if (node == e.target) {
    return true
  }
  let n: any = node
  for (let n: any = e.target; n != document.body; n = n.parentElement) {
    if (n == node) {
      return true
    }
  }
  return false
}
export function showHoverMenu(
  userProps: {
    location: {
      x: number
      y: number
    },
    menus: {
      title: string
      onClick: (event: MouseEvent) => void
    }[]
  }
) {
  if (document.querySelector(".hover-menu")) return
  const container = document.createElement("div")
  const vnode = createVNode(HoverMenu)
  const instance = vnode.component

  // const { props } = instance as ComponentInternalInstance;
  vnode.props = userProps
  render(vnode, container)
  const target = container.children[0]
  document.body.appendChild(target)


  function control(event: MouseEvent) {
    let delay = 0
    if (isInner(target, event)) {
      delay = 200

    }
    setTimeout(() => {
      document.body.removeChild(target);
      container.remove()
      removeEventListener("click", control)
    }, delay)
  }

  addEventListener("click", control)
}



