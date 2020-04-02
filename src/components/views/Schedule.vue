<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import SchedulePanel from '@/components/elements/SchedulePanel.vue'
	import Card from '@/components/layout/Card.vue'
	import Star from '@/components/layout/Star.vue'
	import Loading from '@/components/layout/Loading.vue'
	import ErrorBlock from '@/components/layout/ErrorBlock.vue'
	import { Ishow, Iepisode } from '@/models/tvmaze'
	import { ScheduleContainer } from '@/models/ScheduleContainer'
	import tvmaze from '@/services/tvmaze'
	import { AppState } from '@/models/AppState'

	@Component({
		components: { Container, SchedulePanel, Card, Star, Loading, ErrorBlock }
	})
	export default class Schedule extends Vue {

		public loading: boolean = false
		public schedule: ScheduleContainer[] = []
		public error: string = null

		public get favourites() {
			return (this.$store.state as AppState).favourites
		}

		public async created() {
			try {
				this.loading = true
				let shows = await Promise.all(this.favourites.map((id) => tvmaze.nextEpisode(id)))
				shows = shows.filter((show) => show._embedded)
				this.schedule = shows.map((show) => ({
					show: show,
					episode: show._embedded.nextepisode
				}))
				// Sort schedule
				this.schedule.sort((a, b) => a.episode.airstamp > b.episode.airstamp ? 1 : -1)
			} catch (err) {
				this.error = 'There was an error fetching your schedule from TV Maze'
			} finally {
				this.loading = false
			}
		}

		public get noFavourites() {
			return !this.loading
				&& this.favourites.length === 0
				&& !this.error
		}

		public get noUpcomingEpisodes() {
			return !this.loading
				&& !this.noFavourites
				&& this.schedule.length === 0
				&& !this.error
		}

	}
</script>

<template>
	<Container class="page">
		<h2>Your Schedule</h2>
		<SchedulePanel
			v-for="item in schedule"
			:key="item.episode.id"
			:show="item.show"
			:episode="item.episode"
		/>
		<Loading v-if="loading" />
		<ErrorBlock v-if="error">{{ error }}</ErrorBlock>
		<Card v-if="noFavourites">
			You don't have any favourites, search shows and add them to your favourites, then come back and check schedule!
		</Card>
		<Card v-if="noUpcomingEpisodes">
			There are no upcoming episodes of stuff from your favourites, add more favourites or check back soon.
		</Card>
	</Container>
</template>
