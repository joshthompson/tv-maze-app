<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Card from '@/components/layout/Card.vue'
	import Tag from '@/components/layout/Tag.vue'
	import Star from '@/components/layout/Star.vue'
	import { Ishow } from '@/models/tvmaze'
	import { urlify, getImage } from '@/services/helpers'
	import { AppState } from '@/models/AppState'

	@Component({
		components: { Card, Tag, Star }
	})
	export default class ShowPanel extends Vue {
		@Prop({ required: true }) public show: Ishow

		public get image() {
			return getImage(this.show.image)
		}

		public get favouriteTitle() {
			return this.favourite ? 'Remove from favourites' : 'Mark as favourite'
		}

		public get link() {
			return `/show/${this.show.id}/${urlify(this.show.name)}`
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
	}
</script>

<template>
	<Card v-if="show" class="show-panel">
		<div class="image hide-small">
			<img :src="image" />
		</div>
		<div class="details">
			<div class="top">
				<h3 class="name">{{ show.name }}</h3>
				<div class="favourite" :title="favouriteTitle">
					<Star v-model="favourite" />
				</div>
			</div>
			<div v-if="show.genres.length > 0" class="genres">
				<Tag v-for="(genre, i) in show.genres" :key="i">{{ genre }}</Tag>
			</div>
			<div class="summary" v-html="show.summary" />
			<div class="actions">
				<router-link class="btn" :to="link">
					Find out more
				</router-link>
			</div>
		</div>
	</Card>
</template>

<style lang="scss" scoped>

	$panel-min-height: 300px;

	.show-panel {
		display: flex;

		.image {
			margin-right: 1rem;

			img {
				width: 210px;
			}
		}

		.details {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			min-height: $panel-min-height;
			
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
				line-height: 2rem;
			}

			.summary {
				flex-grow: 1;
				/deep/ p {
					margin-bottom: 1rem;
				}
			}

			.actions {
				text-align: right;
			}
		}

	}
</style>
