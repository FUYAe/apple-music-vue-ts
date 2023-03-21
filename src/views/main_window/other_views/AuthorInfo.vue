<template>
  <div class="au-contaner">
    <Back />
    <div class="au-info">
      <Image :src="artist.info.al.picUrl" class="img" />
      <div class="info">
        <h1>{{ artist.info.ar.name }}</h1>
        <p>{{ artist.info.desc }}</p>
      </div>
    </div>

    <div class="au-album">
      <h3>热门专辑</h3>
      <div class="albums">

        <AlbumItem v-for="album in artist.albums" :ablumid="album.id" :img-url="album.picUrl" :name="album.name"
          :pubtime="String(new Date(album.publishTime).getFullYear())" @play="onPlayAtAl(album.id)"></AlbumItem>
      </div>
    </div>
    <div class="au-songs">
      <h3>热门歌曲</h3>
      <div class="songs">

        <MusicItemBrief :song="song" @play="playMusic(index)" v-for="song, index in artist.songs" :index="index + 1"
          :name="song.name" :long="song.dt">
        </MusicItemBrief>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get, getArtistAlbum, getArtistDesc, getArtistSongsById } from "@/axios/request";
import Back from "@/components/common/Back.vue";
import MusicItemBrief from "@/components/common/MusicItemBrief.vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useMusicStore } from "@/store";
import { artist_album } from "@/types/interface";
import AlbumItem from "@/components/common/AlbumItem.vue";

const route = useRoute()
const musicStore = useMusicStore()
const artist = reactive({
  info: {
    al: {} as Al,
    ar: {} as Ar,
    desc: ""
  },
  songs: [] as Song[],
  albums: [] as Album[]
})
const linitSongs = ref([] as Song[])
onMounted(async () => {
  const arInfo = (await getArtistDesc(Number(route.query.id))).data
  const data = (await getArtistSongsById(Number(route.query.id))).data
  const albumData = (await getArtistAlbum(Number(route.query.id))).data
  artist.songs = data.songs
  artist.info.al = artist.songs[0].al
  artist.info.ar = artist.songs[0].ar[0]
  artist.info.desc = arInfo.briefDesc
  artist.albums = albumData.hotAlbums
  // linitSongs
})
const playMusic = (index: number) => {
  musicStore.playQueue = artist.songs
  musicStore.playMusicByClick(index)

}
const onPlayAtAl = (id: number) => {
  get("/album?id=" + id).then((res) => {
    musicStore.playQueue = res.data.songs;
    musicStore.playMusicByClick(0)

  });
}
</script>

<style lang="scss" scoped>
.au-contaner {
  >div {
    margin-top: 40px;
  }

  h3 {
    text-align: left;
    margin: 20px 0 20px 8px;
  }

  .au-info {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 20px 0 30px 0;

    .img {
      width: 200px;
      height: 200px;
    }

    .info {
      h1 {
        text-align: left;
      }

      p {
        text-indent: 2em;
        font-size: 14px;
        text-align: left;
        color: rgb(74, 74, 74);
        margin: 10px 0;
        height: 146px;
        overflow: scroll;
        line-height: 28px;
        word-spacing: 10px;
        letter-spacing: 1.4px;
      }

      ::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }
    }
  }

  .au-album {
    .albums {

      display: grid;
      grid-template-columns: repeat(5, 1fr)
    }
  }

  .au-songs {}
}
</style>