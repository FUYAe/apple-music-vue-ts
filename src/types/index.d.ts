export * from "./interface"
export interface DBBG {
  id: number,
  name?: string,
  size?: number,
  data: string,
  isSelected?: boolean
}
export interface Msg {
  msg: string,
  objStore?: IDBObjectStore
}
