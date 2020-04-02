<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Iepisode } from '@/models/tvmaze'
	import { getImage, defaultLandscapeImage } from '@/services/helpers'
	import { dateToString } from '@/services/dates'

	@Component
	export default class EpisodeBlock extends Vue {
		@Prop({ required: true }) private episode: Iepisode

		public get image() {
			return getImage(this.episode.image, defaultLandscapeImage)
		}

		public get airdate() {
			return dateToString(this.episode.airdate)
		}
	}
</script>

<template>
	<div class="episode-block" v-if="episode">
		<img :src="image" class="image" />
		<div class="name">{{ episode.name }}</div>
		<div class="number">
			Season {{ episode.season }},
			Episode {{ episode.number }}
		</div>
		<div class="airdate">{{ airdate }}</div>
	</div>
</template>

<style lang="scss" scoped>
	.episode-block {
		display: inline-block;
		vertical-align: top;
		margin: 0 0.5rem 0.5rem 0;
		width: 250px;
		max-width: calc(50vw - 1.5rem);

		.name {
			font-weight: bold;
		}

		.image {
			width: 100%;
		}
	}
</style>
