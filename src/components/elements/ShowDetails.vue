<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Tag from '@/components/layout/Tag.vue'
	import { getImage } from '@/services/helpers'
	import { dateToString } from '@/services/dates'
	import { Ishow } from '@/models/tvmaze'
	import { AppState } from '@/models/AppState'

	@Component({
		components: { Tag }
	})
	export default class ShowDetails extends Vue {
		@Prop({ required: true }) public show: Ishow

		public get image() {
			return getImage(this.show.image)
		}

		public get premiered() {
			return dateToString(this.show.premiered)
		}

		public get lastUpdated() {
			return this.show ? dateToString(this.show.updated * 1000) : null
		}

		public get totalEpisodes() {
			if (this.show && this.show._embedded.episodes) {
				return this.show._embedded.episodes.length
			} else {
				return null
			}
		}

		public get totalSeasons() {
			if (this.show && this.show._embedded.seasons) {
				return this.show._embedded.seasons.length
			} else {
				return null
			}
		}

		public get favourite() {
			return (this.$store.state as AppState).favourites.includes(this.show.id)
		}

		public set favourite(value: boolean) {
			if (value) {
				this.$store.commit('addFavourite', this.show.id)
			} else {
				this.$store.commit('removeFavourite', this.show.id)
			}
		}

		public toggleFavourite() {
			this.favourite = !this.favourite
		}
	}
</script>

<template>
	<div class="show-details">

		<div class="sidebar">
			<img class="image" :src="image" />
			<div>
				<a class="btn" @click="toggleFavourite">
					{{ favourite ? 'Remove Favourite' : 'Add Favourite' }}
				</a>
			</div>
		</div>

		<div class="summary" v-html="show.summary" />

		<div class="details">
			<div v-if="show.genres.length > 0" class="field genres">
				<div class="label">Genres:</div>
				<Tag v-for="(genre, i) in show.genres" :key="i">{{ genre }}</Tag>
			</div>

			<div class="field language">
				<div class="label">Original language:</div>
				{{ show.language }}
			</div>

			<div class="field status">
				<div class="label">Status:</div>
				{{ show.status }}
			</div>

			<div class="field premiered" v-if="totalSeasons">
				<div class="label">Total Seasons:</div>
				{{ totalSeasons }}
			</div>

			<div class="field premiered" v-if="totalEpisodes">
				<div class="label">Total Episodes:</div>
				{{ totalEpisodes }}
			</div>

			<div class="field runtime">
				<div class="label">Runtime:</div>
				{{ show.runtime }} minutes
			</div>

			<div class="field premiered">
				<div class="label">Premiered:</div>
				{{ premiered }}
			</div>

			<div class="field official-site" v-if="show.officialSite">
				<div class="label">Official Site:</div>
				<a :href="show.officialSite" target="_blank" class="link">{{ show.officialSite }}</a>
			</div>

			<div class="field schedule">
				<div class="label">Schedule:</div>
				<div v-if="show.schedule.time">
					Time: {{ show.schedule.time }}
				</div>
				<div v-if="show.schedule.days">
					{{ show.schedule.days.length === 1 ? 'Day' : 'Days' }}:
					{{ show.schedule.days.join(', ') }}
				</div>
			</div>

			<div class="field rating" v-if="show.rating && show.rating.average">
				<div class="label">Rating:</div>
				{{ show.rating.average }} / 10
			</div>

			<div class="field network" v-if="show.network">
				<div class="label">Network:</div>
				{{ show.network.name }},
				{{ show.network.country.name }}
			</div>

			<div class="field network" v-if="show.webChannel">
				<div class="label">Website:</div>
				{{ show.webChannel.name }}
			</div>

			<div class="field updated">
				<div class="label">Information last updated:</div>
				{{ lastUpdated }}
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/responsive.scss';
	@import '@/style/theme.scss';

	.show-details {
		margin-bottom: 1rem;
	}

	.sidebar {
		position: relative;
		z-index: 2;
		float: right;
		width: 225px;
		border: 0.5rem solid $white;
		margin: -5rem 0 1rem 1rem;

		@include small {
			float: none;
			margin: 0 auto 1rem;
		}

		.btn {
			width: 100%;
		}

		.image {
			width: 100%;
		}
	}

	.summary {
		margin-top: 1rem;
		font-size: 1.125rem;
		/deep/ p {
			margin-bottom: 1rem;
		}
	}

	.details {
		columns: 2;

		@include small {
			columns: 1;
		}

		.field {
			margin-bottom: 1rem;
			break-inside: avoid;

			.label {
				font-weight: bold;
				margin-bottom: 0.25rem;
			}
		}
	}
</style>
