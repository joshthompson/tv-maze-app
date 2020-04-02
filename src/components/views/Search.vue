<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import ShowSearchBar from '@/components/elements/ShowSearchBar.vue'
	import ShowPanel from '@/components/elements/ShowPanel.vue'
	import Card from '@/components/layout/Card.vue'
	import Loading from '@/components/layout/Loading.vue'
	import ErrorBlock from '@/components/layout/ErrorBlock.vue'
	import { Ishow } from '@/models/tvmaze'
	import tvmaze from '@/services/tvmaze'

	@Component({
		components: { Container, ShowSearchBar, ShowPanel, Card, Loading, ErrorBlock }
	})
	export default class Search extends Vue {

		public loading: boolean = false
		public shows: Ishow[] = []
		public error: string = null

		public created() {
			this.search()
		}

		public get term() {
			return this.$route.params.term || ''
		}

		@Watch('$route.params.term')
		public async search() {
			try {
				this.loading = true
				this.$store.commit('setLastSearch', this.term)
				const results = await tvmaze.search(this.term)
				this.shows = results.map((result) => result.show)
			} catch (err) {
				this.shows = []
				this.error = `There was an error when searching TV Maze for '${this.term}'`
			} finally {
				this.loading = false
			}
		}

		public get noResults() {
			return !this.loading
				&& this.term.trim().length > 0
				&& this.shows.length === 0
				&& !this.error
		}

	}
</script>

<template>
	<Container class="page">
		<h2>Search Results: {{ term }}</h2>
		<ShowSearchBar :term="term" :preview="true" :loading="loading" />
		<Loading v-if="loading" />
		<ErrorBlock v-if="error">{{ error }}</ErrorBlock>
		<ShowPanel v-for="show in shows" :key="show.id" :show="show" />
		<Card v-if="noResults" class="no-results">
			No shows matching '{{ term }}'
		</Card>
	</Container>
</template>
