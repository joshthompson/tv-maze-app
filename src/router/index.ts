import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/Home.vue'
import Search from '@/components/views/Search.vue'
import Error404 from '@/components/views/Error404.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/search',
		name: 'Search',
		component: Search
	},
	{
		path: '/search/:term',
		name: 'Search Results',
		component: Search
	},
	{
		path: '/show/:id/:name',
		name: 'Show',
		component: () => import(/* webpackChunkName: "show" */ '@/components/views/Show.vue')
	},
	{
		path: '/favourites',
		name: 'Your Favourites',
		component: () => import(/* webpackChunkName: "favourites" */ '@/components/views/Favourites.vue')
	},
	{
		path: '/schedule',
		name: 'Your Schedule',
		component: () => import(/* webpackChunkName: "schedule" */ '@/components/views/Schedule.vue')
	},
	{
		path: '/*',
		name: 'Page Not Found',
		component: Error404
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
