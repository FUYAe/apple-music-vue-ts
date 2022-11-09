
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/',
    component: () => import("../views/siderViews/NowListening.vue"),

}, {
    path: "/browse",
    component: () => import("../views/Browse.vue")

}, {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchR.vue"),
    props: (route: { query: { kw: any } }) => ({ query: route.query.kw })



},
{
    path: "/playlist",
    name: "playlist",
    component: () => import("../views/siderViews/PlayList.vue"),


}, {
    path: "/ablum",
    name: "ablum",
    component: () => import("../views/Ablum.vue")
}]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})