
import { defineStore } from "pinia"


const usePersistStore = defineStore("persist", {
  persist: true,
  state: () => {

    return {
      bgImg: "",
      bgImgArray: [] as any[]
    }

  }
  ,
  getters: {

  },
  actions: {

  }
})

export { usePersistStore }