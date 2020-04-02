<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import EpisodeBlock from '@/components/elements/EpisodeBlock.vue'
	import tvmaze from '@/services/tvmaze'
	import { Iepisode } from '@/models/tvmaze'

	@Component({
		components: { EpisodeBlock }
	})
	export default class ShowEpisodes extends Vue {

		@Prop({ required: true }) public episodes: Iepisode[]

		public latest(amount: number = 8) {
			const length = this.episodes.length
			return this.episodes.slice(length - amount).reverse()
		}

	}
</script>

<template>
	<div class="show-episodes" v-if="episodes && episodes.length">
		<h3>Latest Episodes</h3>
		<EpisodeBlock
			v-for="episode in latest()"
			:key="episode.id"
			:episode="episode"
		/>
	</div>
</template>
