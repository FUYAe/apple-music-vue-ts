import { formatBetween } from "@/utils"
import { defineStore } from "pinia"


const useConfigStore = defineStore("config", {
  persist: true,
  state: () => {

    return {
      bgImage: "",
      bgImgThumbnails: [] as any[],

      volume: 100,
      lrcStyle: {
        fontSize: "14px",
        color: "rgba(204, 204, 204, 0.897)",
      },
    }
  }
  ,
  getters: {
    getVolume(state) {
      return state.volume
    },
    getBgImage(state) {
      return state.bgImage
    },
    getLrcStyle(state) {
      return state.lrcStyle
    }
  },
  actions: {
    decreaseVolume() {
      this.setVolume(this.volume - 5)
    },
    increaseVolume() {
      this.setVolume(this.volume + 5)
    },
    setVolume(volume: number) {
      this.volume = formatBetween(volume, 0, 100)
    },
    setBgImage(data: string) {
      this.bgImage = data
    }
    ,
    setLrcStyle(fontSize: string, color: string) {
      this.lrcStyle = {
        fontSize,
        color
      }
    }
  }
})
export { useConfigStore }