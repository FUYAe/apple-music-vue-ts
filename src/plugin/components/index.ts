
import Image from "./Image.vue"
import Window from "./Window.vue"
import { App } from 'vue'
import AuName from "./AuthorName.vue"
const components = [Image, Window, AuName]
export default {
  install: (app: App, options: any) => {
    components.forEach((item) => {
      app.component(item.name, item)

    })
  }
}