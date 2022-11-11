<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useStore, usePersistStore } from '@/store';
import { compressImgItem } from "@/utils"
import { storeToRefs } from "pinia"
import { deleteData, getAllData, updateData, getDataById, openTable } from "@/indexedDB"
import { DBBG } from '@/types';
const store = useStore()
const persistStore = usePersistStore()



const imgFileSave = (e: any) => {
    const reader = new FileReader()
    for (let file of e.target.files) {
        if (file.size > 4194304) {
            alert("文件不能大于4mb!!")
            return
        }
        reader.readAsDataURL(file)
        let isBreak = false
        reader.onload = function () {
            persistStore.bgImg = this.result as string
            const that = this
            getAllData("backgroundImgs").then(({ res, objStore }) => {
                let items = []
                for (let item of res.result) {
                    if (item.name == file.name) {
                        alert("不能重复上传")
                        isBreak = true
                        break

                    }
                    if (item.isSelected) {
                        item.isSelected = false
                        items.push(item)
                        objStore.put(item)
                    }
                }
                if (!isBreak) {
                    const id = Math.floor(Math.random() * 100000)
                    const img = { id: id, size: file.size, name: file.name, data: that.result, isSelected: true }
                    objStore.add(img).onsuccess = function () {
                        console.log("图片存成功")
                        document.body.style.backgroundImage = "url(" + that.result + ")"
                        compressImgItem(img as any).then((img) => {
                            persistStore.bgImgArray.forEach(item => {
                                if (item.isSelected) {
                                    item.isSelected = false
                                }
                            })
                            persistStore.bgImgArray.push(img)
                        })

                    }


                }
            })
        }
    }





}

const changeBgImg = (bgImg: any) => {
    openTable("backgroundImgs").then(res => {
        const req = res.get(bgImg.id)
        let currentId = null
        persistStore.bgImgArray.forEach(item => {
            if (item.isSelected) {
                currentId = item.id
                item.isSelected = false
            }
        })

        let index = persistStore.bgImgArray.indexOf(bgImg)
        persistStore.bgImgArray[index].isSelected = true
        req.onsuccess = function (event) {
            persistStore.bgImg = req.result.data
            document.body.style.backgroundImage = "url(" + req.result.data + ")"
            res.put(Object.assign(req.result, { isSelected: true }))
        }
        const req2 = res.get(currentId || 0)
        req2.onsuccess = function () {
            const img = req2.result
            if (!img) return
            img.isSelected = false
            res.put(img)
        }
    })


}
const deleteImg = (bgImg: DBBG) => {
    deleteData("backgroundImgs", bgImg.id).then(() => {
        let index = persistStore.bgImgArray.indexOf(bgImg)
        persistStore.bgImgArray.splice(index, 1)
    })
}

</script>
    
<template>
    <div class="container">
        <h1>背景图片</h1>
        <input type="file" accept=" .png,.jpg, .jpeg" @change="imgFileSave" name="123" id="">
        <div class="bgm-all" ref="bgAllRef">
            <div v-for="bgImgMeta in persistStore.bgImgArray" :class="{ 'selected': bgImgMeta.isSelected }"
                :index="bgImgMeta.id">
                <img :src="bgImgMeta.data" @click="changeBgImg(bgImgMeta)" alt="" draggable="false">
                <button @click="deleteImg(bgImgMeta)">删除</button>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
.container {
    background-color: aliceblue;
    border-radius: 10px;
    padding: 10px 0;
    min-height: 455px;
    user-select: none;
    color: #333;



    .bgm-all {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;


        .selected {
            // border: 3px solid blue;
            outline: 2px solid #3498db;
            border-radius: 5px;
            overflow: hidden;

            img {
                width: 101%;
                height: 101%;
            }
        }

        >div {
            height: 100px;
            width: 100px;
            position: relative;
            margin: 5px;
            justify-self: center;
            align-self: center;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
            }

            button {
                position: absolute;
                font-size: 12px;
                color: #fff;
                padding: 1px;
                top: 5px;
                right: 5px;
                background-color: #C12C1F;
                border: none;
                border-radius: 2px;
                display: none;
            }

            button:active {
                color: #eee;
                background-color: #C12C1Faa;
            }
        }

        >div:hover {

            button {
                display: block;
            }
        }

    }

    input {
        width: 80%;
    }

    .min-input {
        width: 40px;
    }


}
</style>
    