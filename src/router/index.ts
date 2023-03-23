
import { createRouter, createWebHashHistory, RouteLocationNormalized, createWebHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: "root",
    component: () => import("../views/main_window/sider_views/NowListening.vue"),
    meta: { isCache: true }

}, {
    path: "/browse",
    name: "browse",
    component: () => import("../views/main_window/sider_views/Browse.vue"),
    meta: { isCache: false }

}, {
    path: "/search",
    name: "search",
    component: () => import("../views/main_window/other_views/SearchR.vue"),
    props: (route: { query: { kw: any } }) => ({ query: route.query.kw }),
    meta: { isCache: false }

},
{
    path: "/playqueue",
    name: "playqueue",
    component: () => import("../views/main_window/sider_views/PlayQueue.vue"),
    meta: { isCache: true }


}, {
    path: "/ablum",
    name: "ablum",
    component: () => import("../views/main_window/other_views/Ablum.vue"),
    meta: { isCache: false },
}, {
    path: "/collection",
    name: "collection",
    component: () => import("../views/main_window/other_views/Collection.vue"),
    meta: { isCache: false },
}, {
    path: "/artist",
    name: "artist",
    component: () => import("../views/main_window/other_views/AuthorInfo.vue"),
    meta: { isCache: true }
}]

const router = createRouter({
    history: createWebHistory(),
    routes,

})
function handleCache(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    if (to.path === "/") {
        from.meta.isCache = false
    }
    if (from.path === "/") {
        to.meta.isCache = false
    }
}
router.beforeEach((to, from) => {
    // console.log('to', to)
    // console.log('from', from)
    handleCache(to, from)
})
export default router