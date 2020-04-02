<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import ShowBlock from '@/components/elements/ShowBlock.vue'
	import Card from '@/components/layout/Card.vue'
	import Loading from '@/components/layout/Loading.vue'
	import ErrorBlock from '@/components/layout/ErrorBlock.vue'
	import Star from '@/components/layout/Star.vue'
	import { Ishow } from '@/models/tvmaze'
	import tvmaze from '@/services/tvmaze'
	import { AppState } from '@/models/AppState'

	@Component({
		components: { Container, ShowBlock, Card, Star, Loading, ErrorBlock }
	})
	export default class Favourites extends Vue {

		public loading: boolean = false
		public shows: Ishow[] = []
		public error: string = null

		public get favourites() {
			return (this.$store.state as AppState).favourites
		}

		public async created() {
			try {
				this.loading = true
				this.shows = await Promise.all(this.favourites.map((id) => tvmaze.show(id)))
			} catch (err) {
				this.error = 'There was an error fetching details of your shows from TV Maze'
			} finally {
				this.loading = false
			}
		}

		public get noFavourites() {
			return !this.loading && this.favourites.length === 0
		}

	}
</script>

<template>
	<Container class="page">
		<h2>Your Favourites</h2>
		<ShowBlock v-for="show in shows" :key="show.id" :show="show" />
		<ErrorBlock v-if="error">{{ error }}</ErrorBlock>
		<Loading v-if="loading" />
		<Card v-if="noFavourites" class="no-results">
			You don't have any favourites. Hit the star icon <Star :value="true" /> on any show to add it to your favourites.
		</Card>
	</Container>
</template>
