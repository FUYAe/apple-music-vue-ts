
interface DBBG {
  id: number,
  name?: string,
  size?: number,
  data: string,
  isSelected?: boolean
}
interface Msg {
  msg: string,
  objStore?: IDBObjectStore
}
interface Ar {
  id: number;
  name: string;
  alia: string[];
}
interface Al {
  id: number;
  name: string;
  picUrl: string;
  pic_str: string;
  pic: number;
  alia: string[];
};
interface Song {
  rtUrls: {}[];
  ar: {
    id: number;
    name: string;
    alia: string[];
  }[];
  al: {
    id: number;
    name: string;
    picUrl: string;
    pic_str: string;
    pic: number;
    alia: string[];
  };
  st: number;
  noCopyrightRcmd: any;
  songJumpInfo: any;
  rurl: any;
  pst: number;
  rtype: number;
  alia: string[];
  pop: number;
  rt: string;
  mst: number;
  cp: number;
  crbt: any;
  cf: string;
  dt: number;
  rtUrl: any;
  ftype: number;
  no: number;
  fee: number;
  djId: number;
  mv: number;
  t: number;
  v: number;
  h: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  sq: any;
  hr: any;
  cd: string;
  a: any;
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  name: string;
  id: number;
  privilege: Privilege
}
interface Album {
  songs: Song[];
  paid: boolean;
  onSale: boolean;
  mark: number;
  awardTags: any;
  blurPicUrl: string;
  companyId: number;
  alias: string[];
  artists: Artist[];
  copyrightId: number;
  picId: number;
  artist: Artist;
  pic: number;
  publishTime: number;
  company: string;
  briefDesc: any;
  picUrl: string;
  commentThreadId: string;
  description: string;
  tags: string;
  status: number;
  subType: string;
  name: string;
  id: number;
  type: string;
  size: number;
  picId_str: string;
  info: {
    commentThread: {
      id: string;
      resourceInfo: {
        id: number;
        userId: number;
        name: string;
        imgUrl: string;
        creator: any;
        encodedId: any;
        subTitle: any;
        webUrl: any;
      };
      resourceType: number;
      commentCount: number;
      likedCount: number;
      shareCount: number;
      hotCount: number;
      latestLikedUsers: any;
      resourceTitle: string;
      resourceOwnerId: number;
      resourceId: number;
    };
    latestLikedUsers: any;
    liked: boolean;
    comments: any;
    resourceType: number;
    resourceId: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    threadId: string;
  };
};