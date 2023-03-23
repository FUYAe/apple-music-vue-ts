import { getSongUrlById, getLyric } from "@/axios/request";
import { defineStore } from "pinia"
import { formatIndex, parseRawLrc } from "@/utils"
import { usePersistStore } from "@/store/persist"

import { pinia } from ".";


const useMusicStore = defineStore("music", {
  state: () => {
    return {
      currentLrcIndex: 0,
      lyricInfo: {
        currentHeight: 0,
        times: [] as number[],
        currentIndex: 0,
        currentLrcid: 0,
        lyric: [] as any[]
      },
      lyricControl: {
        isShowLyric: false,
        isShowBodyLyric: false
      },




      playControl: {
        isPlaying: false,
        switchModel: 0 as 0 | 1 | 2,
        isSync: false
        // 0 默认 1 循环播放 2 随机播放
      },
      playQueue: [] as any[],
      searchResults: [] as any[],
      playingId: 0,
      playing: {
        id: 0,
        isPlaying: false,
        musicSrc: "",
        name: "Apple Music",
        au: "Apple Music",
        auId: 0,
        imgUrl: "",
        index: 0,
        currentTime: 0
      },

    }

  }
  ,
  getters: {
    formatIndex() {
      return 0
    }, getLyric(state) {
      return state.lyricInfo.lyric
    },
    getLyricTimes(state) {
      return state.lyricInfo.times
    }
  },
  actions: {
    addToRecent(song: Song) {
      const persist = usePersistStore(pinia)
      persist.addRecent(song)
    },
    async playMusic(id: number) {
      this.playing.isPlaying = true
      const song = await getSongUrlById(+id)
      this.playing.musicSrc = song.data.data[0]?.url
      document.title = this.playing.name + "-" + this.playing.au
      if (this.lyricControl.isShowLyric || this.lyricControl.isShowBodyLyric) {
        this.lyricInfo.currentIndex = 0
        this.setLyric()
        this.lyricInfo = {
          currentHeight: 0,
          times: [] as number[],
          currentIndex: 0,
          currentLrcid: 0,
          lyric: [] as any[]
        }
      }

    },
    async playMusicByClick(index: number) {
      const target = this.playQueue[index]
      // console.log('target', target)
      this.playing.id = target.id
      this.playingId = target.id
      this.playing.imgUrl = target.al.picUrl
      this.playing.name = target.name
      this.playing.index = index
      this.playing.au = target.ar[0].name
      this.playing.auId = target.ar[0].id


      this.playMusic(target.id)
      this.addToRecent(JSON.parse(JSON.stringify(target)))

    },
    async playMusicInList(index: number) {
      const length = this.playQueue.length
      index = formatIndex(this.playControl.switchModel, index, length, this.playControl.isSync)
      if (this.playQueue.length <= index) {

        index = 0
      }
      this.playMusicByClick(index)

    },
    async setLyric() {
      if (this.playing.id == 0 || this.lyricInfo.currentLrcid === this.playing.id) return
      const res = await getLyric(this.playing.id)
      this.lyricInfo.lyric = parseRawLrc(res.data.lrc.lyric)
      this.lyricInfo.lyric.forEach((item: any) => this.lyricInfo.times.push(item[0]));
      // console.log('this.lyricInfo.times', this.lyricInfo.times)
      this.lyricInfo.currentLrcid = this.playing.id


    },
    setPlayQueue(data: any[]) {
      this.playQueue = data
    },


  }
})
export { useMusicStore }