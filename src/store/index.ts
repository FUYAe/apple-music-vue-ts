import { getSongUrlById, getLyric } from "@/axios/request";
import { defineStore, createPinia } from "pinia"
import { formatIndex, parseRawLrc } from "@/utils"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export { usePersistStore } from "@/store/persist"
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const useStore = defineStore("main", {
    state: () => {
        return {
            db: {} as any,
            isShowControl: false,
            data: [] as Song[],
            control: {
                switchModel: 0 as 0 | 1 | 2,
                isSync: false
                // 0 默认 1 循环播放 2 随机播放
            },
            isShowLyric: false,
            lyric: "" as any,
            isPlaying: false,
            playList: [] as any[],
            playing: {
                id: 0,
                isPlaying: false,
                musicSrc: "",
                name: "Apple Music",
                au: "",
                imgUrl: "",
                index: 0,
                currentTime: 0
            },
            audioRef: {} as HTMLAudioElement,
            searchR: [] as any[],
            bigCard: [] as any[],
            currentZIndex: 1000

        }

    }
    ,
    getters: {
        formatIndex() {
            return 0
        }
    },
    actions: {
        async playMusic(id: number) {
            this.playing.isPlaying = true
            const song = await getSongUrlById(+id)
            this.playing.musicSrc = song.data.data[0]?.url
            if (this.isShowLyric) {
                this.setLyric()
            }

        },
        async playMusicByClick(index: number) {
            const target = this.playList[index]
            // console.log('target', target)
            this.playing.id = target.id
            this.playing.imgUrl = target.al.picUrl
            this.playing.name = target.name
            this.playing.index = index
            this.playing.au = target.ar[0].name


            this.playMusic(target.id)

        },
        async playMusicInList(index: number) {
            const length = this.playList.length
            index = formatIndex(this.control.switchModel, index, length, this.control.isSync)
            this.playMusicByClick(index)

        },
        async setLyric() {
            if (this.playing.id == 0) return
            const res = await getLyric(this.playing.id)
            this.lyric = parseRawLrc(res.data.lrc.lyric)


        },
        setPlayalist(data: any[]) {
            this.playList = data
        },


    }
})
export { pinia, useStore }