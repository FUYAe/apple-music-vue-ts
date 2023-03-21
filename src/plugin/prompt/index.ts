import { time } from "console"
import { App, ComponentInternalInstance, createVNode, render } from "vue"
import HoverMenu from "./Prompt.vue"
export function showPrompt(
  props: {
    msg: string,
    type?: string
  }
) {
  const container = document.createElement("div")
  const vnode = createVNode(HoverMenu)
  const instance = vnode.component

  // const { props } = instance as ComponentInternalInstance;
  vnode.props = props
  render(vnode, container)
  const target = container.children[0]
  document.body.appendChild(target)



  setTimeout(() => {
    document.body.removeChild(target);
    container.remove()
  }, 1500)

}


