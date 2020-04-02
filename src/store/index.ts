import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { AppState } from '@/models/AppState'

Vue.use(Vuex)

const initialState: AppState = {
	favourites: [],
	lastSearch: ''
}

const mutations: MutationTree<AppState> = {
	addFavourite: (state, showId) => {
		if (!state.favourites.includes(showId)) {
			state.favourites.push(showId)
		}
	},
	removeFavourite: (state, showId) => {
		state.favourites = state.favourites.filter((id) => id !== showId)
	},
	setLastSearch: (state, lastSearch) => {
		state.lastSearch = lastSearch
	}
}

const vuexLocal = new VuexPersistence({
	key: 'tv-tracker',
	storage: window.localStorage
})

export default new Vuex.Store({
	strict: true,
	state: initialState,
	mutations,
	plugins: [ vuexLocal.plugin ]
})
