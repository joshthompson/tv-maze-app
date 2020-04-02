<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Card from '@/components/layout/Card.vue'
	import Tag from '@/components/layout/Tag.vue'
	import Star from '@/components/layout/Star.vue'
	import { Ishow, Iepisode } from '@/models/tvmaze'
	import { urlify, getImage } from '@/services/helpers'
	import { dateToString, timeToString } from '@/services/dates'

	@Component({
		components: { Card, Tag, Star }
	})
	export default class SchedulePanel extends Vue {
		@Prop({ required: true }) public show: Ishow
		@Prop({ required: true }) public episode: Iepisode

		public get image() {
			return getImage(this.episode.image, null)
				|| getImage(this.show.image, null)
		}

		public get showLink() {
			return `/show/${this.show.id}/${urlify(this.show.name)}`
		}

		public get airstampString() {
			const today = dateToString(new Date())
			const date = dateToString(this.episode.airstamp)
			const time = timeToString(this.episode.airstamp)
			return `${today === date ? 'Today' : date} at ${time}`
		}
	}
</script>

<template>
	<div>
		<h3>{{ airstampString}}</h3>
		<Card v-if="episode" class="episode-panel">
			<div class="details">
				<h4 class="episode">Season {{ episode.season }}, Episode {{ episode.number }}</h4>
				<h3 class="title">{{ show.name }}: {{ episode.name }}</h3>
				<div class="summary" v-html="episode.summary" />
				<div class="actions">
					<router-link :to="showLink" class="btn">Show details</router-link>
				</div>
			</div>
			<div class="image hide-small" v-if="image">
				<img :src="image" />
			</div>
		</Card>
	</div>
</template>

<style lang="scss" scoped>

	.episode-panel {
		display: flex;
		margin-bottom: 1rem;

		.image {
			margin-left: 1rem;

			img {
				width: 210px;
			}
		}

		.details {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			
			.top {
				display: flex;
				width: 100%;

				.name {
					flex-grow: 1;
				}

				.favourite {
					margin-left: 1rem;
				}
			}

			.genres {
				margin-bottom: 1rem;
			}

			.summary {
				flex-grow: 1;
				/deep/ p {
					margin-bottom: 1rem;
				}
			}

		}

	}
</style>
