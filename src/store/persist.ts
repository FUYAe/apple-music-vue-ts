
import { defineStore } from "pinia"


const usePersistStore = defineStore("persist", {
  persist: true,
  state: () => {

    return {
      bgImg: "",
      volumeValue: 100,
      bgImgArray: [] as any[],
      lrcStyle: {
        fontSize: "14px",
        color: "rgba(204, 204, 204, 0.897)",
      },
      recents: [] as Song[]
    }


  }
  ,
  getters: {

  },
  actions: {

  }
})

export { usePersistStore }