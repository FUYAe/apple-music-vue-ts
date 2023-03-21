

import { defineStore } from "pinia"


const usePersistStore = defineStore("persist", {
  persist: true,
  state: () => {

    return {
      recents: [] as Song[],
      collections: [] as Song[]
    }


  }
  ,
  getters: {

  },
  actions: {
    async addCollection(song: Song) {
      return new Promise<{ result: boolean, msg: string }>((resolve, reject) => {
        let exist = false
        this.collections.forEach(item => {
          if (item.id === song.id) {
            exist = true
          }
        });
        if (!exist) {
          this.collections.push(song)
          resolve({
            result: true,
            msg: "添加收藏成功"
          })

        } else {
          reject({
            result: false,
            msg: "歌曲已经存在"
          })

        }
      })


    },
    async deleteCollection(song: Song) {
      return new Promise<{ result: boolean, msg: string }>((resolve, reject) => {
        let exist = false
        this.collections.forEach(item => {
          if (item.id === song.id) {
            exist = true
          }
        });
        if (!exist) {
          this.collections.splice(this.collections.indexOf(song))
          resolve({
            result: true,
            msg: "删除成功"
          })

        } else {
          reject({
            result: false,
            msg: "歌曲不存在"
          })

        }
      })


    },
    addRecent(song: Song) {
      if (this.recents.length >= 10) {
        this.recents.pop()
      }
      for (let s in this.recents) {
        if (this.recents[s].id === song.id) {
          this.recents.splice(Number(s), 1)
          break
        }
      }
      this.recents.unshift(song)
    }
  }
})

export { usePersistStore }