import { pinia, useStore } from "../store";
const store = useStore(pinia)
import { compressImgItem } from "@/utils"
import { Msg } from "@/types";
const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {

    let openRequest = indexedDB.open(import.meta.env.VITE_DB_NAME, import.meta.env.VITE_DB_VERSION);

    openRequest.onupgradeneeded = function () {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('backgroundImgs')) {
        db.createObjectStore('backgroundImgs', { keyPath: 'id' });
      }
    };

    openRequest.onerror = function () {
      console.error("Error", openRequest.error);
      reject(openRequest.error)
    };

    openRequest.onsuccess = function () {
      let db = openRequest.result;
      resolve(db)
    };
  })

}
function updateDBStore(DBstore: any) {
  getAllData("bgm").then(({ res }) => {
    DBstore.bgImgArray = []
    for (let img of res.result) {
      compressImgItem(img).then((res) => {
        DBstore.bgImgArray.push(res)
      })
    }
  })

}
function openTable(table: string) {
  return new Promise<IDBObjectStore>((resolve, reject) => {
    let transaction = store.db.transaction(table, "readwrite")
    let idbObjectStore = transaction.objectStore(table)
    if (idbObjectStore) {
      resolve(idbObjectStore)
    } else {
      reject("链接失败")
    }
  })
}

function getDataById(table: string, id: number) {
  return new Promise<{ res: IDBRequest<any>, objStore: IDBObjectStore }>((resolve, reject) => {
    openTable(table).then((res) => {
      const req = res.get(id)
      req.onsuccess = function () {
        resolve({ res: req, objStore: res })
      }
      req.onerror = function () {
        reject(req)
      }
    })
  })
}
function getAllData(table: string) {
  return new Promise<{ res: IDBRequest<any[]>, objStore: IDBObjectStore }>((resolve, reject) => {
    openTable(table).then((res) => {
      const req = res.getAll()
      req.onsuccess = function () {
        resolve({ res: req, objStore: res })
      }
      req.onerror = function () {
        reject(req)
      }
    })
  })
}
function updateData(table: string, id: number, newData: {}) {
  return new Promise<Msg>((resolve, reject) => {
    getAllData(table).then(({ res, objStore }) => {
      let isError = false
      for (let k in newData) {
        if (!(k in res.result)) {
          isError = true
        }
      }
      if (isError) {
        console.error("字段不符合要求")
        reject({ msg: "更新失败" })
      }
      objStore.put(Object.assign(res.result, newData)).onsuccess = function () {
        resolve({ msg: "更新成功", objStore })
      }

    })

  })
}
function deleteData(table: string, id: number) {
  return new Promise<Msg>((resolve, reject) => {
    openTable(table).then((res) => {
      const req = res.delete(id)
      req.onsuccess = function () {
        resolve({ msg: "删除成功" })
      }
      req.onerror = function () {
        reject({ msg: "删除失败" })
      }
    })
  })
}
export { initDB, openTable, updateDBStore, getAllData, getDataById, updateData, deleteData }