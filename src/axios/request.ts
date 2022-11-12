
import request from ".";

export function getSongUrlById(id: number) {
    return request.get(
        `song/url?id=${id}`
    )
}
export function getArtistSongsById(id: number) {
    return request.get(
        `artist/top/song?id=${id}`
    )
}
export function getArtistDesc(id: number) {
    return request.get(
        `artist/desc?id=${id}`
    )
}
export function getArtistAlbum(id: number, limit = 10) {
    return request.get(
        `artist/album?id=${id}&limit=${limit}`
    )
}

export function getSongsByArId(id: number) {
    return request.get(
        "artist/top/song?id=" + id
    )
}
export function getTopLists() {
    return request.get(
        "toplist"
    )
}
export function getSearchR(kw: string) {
    return request.get("cloudsearch?keywords=" + kw)

}
export function getSearchSuggestions(kw: string) {
    return request.get("search/suggest?keywords=" + kw)

}
export function getTop(type: "artists", offset = 0, limit = 30) {
    return request.get(`top/${type}?offset=${offset}&limit=${limit}`)

}
export function getPlayList(id: number, offset = 0, limit = 10) {
    return request.get(`playlist/track/all?id=${id}&offset=${offset}&limit=${limit}`)

}
export function getLyric(id: number) {
    return request.get("lyric?id=" + id)
}
export function get(path: string) {
    return request.get(path)
}