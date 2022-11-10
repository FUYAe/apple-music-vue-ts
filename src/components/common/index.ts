
import PlayCard from "./PlayCard.vue"
import BigCard from "./BigCard.vue"
import ProgressBar from "./ProgressBar.vue"
import MusicItemBrief from "./MusicItemBrief.vue"
import Back from "./Back.vue"
import Image from "./Image.vue"
import { App } from 'vue'
const components = [Back, BigCard, PlayCard, ProgressBar, MusicItemBrief, Image]
export default {
    install: (app: App, options: any) => {
        components.forEach((item) => {
            console.log("===============")
            app.component(item.name, item)

        })
    }
}