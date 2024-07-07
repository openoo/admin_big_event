import Vue from "vue"
import VueRouter from "vue-router"
import Reg from "@/views/Reg"
import Login from "@/views/Login"

Vue.use(VueRouter)

const routes = [
	{
		name: "Reg",
		path: "/reg",
		component: Reg,
		// 路由懒加载
		// component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
	{
		name: "Login",
		path: "/login",
		component: Login,
	},
]

const router = new VueRouter({
	routes,
	mode: "history",
})

export default router
