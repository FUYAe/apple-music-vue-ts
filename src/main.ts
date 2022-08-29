/*
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-23 08:21:22
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:10:32
 * @FilePath: \applemusic-vue3-ts\src\main.ts
 * @Description: Apple-music
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
 */

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import common from './components/common'
import router from "@/router"
import { pinia } from "@/store"

const app = createApp(App)
app.use(pinia)
app.use(common)
app.use(router)
app.mount('#app')