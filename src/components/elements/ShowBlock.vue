<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Card from '@/components/layout/Card.vue'
	import Star from '@/components/layout/Star.vue'
	import { Ishow } from '@/models/tvmaze'
	import { urlify, getImage } from '@/services/helpers'
	import { AppState } from '../../models/AppState'

	@Component({
		components: { Card, Star }
	})
	export default class ShowBlock extends Vue {
		@Prop({ required: true }) private show: Ishow

		public get image() {
			return getImage(this.show.image)
		}

		public get favouriteTitle() {
			return this.favourite ? 'Remove from favourites' : 'Mark as favourite'
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

		public get link() {
			return `/show/${this.show.id}/${urlify(this.show.name)}`
		}
	}
</script>

<template>
	<Card class="show-block" v-if="show" :to="link">
		<img :src="image" class="image" />
		<div class="details">
			<div class="name">{{ show.name }}</div>
			<div class="favourite" :title="favouriteTitle">
				<Star v-model="favourite" />
			</div>
		</div>
		<div class="actions">
			<router-link class="link" :to="link">
				More Info
			</router-link>
		</div>
	</Card>
</template>


<style lang="scss" scoped>
	@import '@/style/theme.scss';
	
	.show-block {
		display: inline-block;
		vertical-align: top;
		margin: 0 0.5rem 0.5rem 0;
		width: 210px;
		max-width: calc(50vw - 1.5rem);
		padding: 0.5rem;

		.details {
			display: flex;
			width: 100%;
			
			.name {
				font-weight: bold;
				flex-grow: 1;
			}
		}

		.image {
			max-width: 100%;
		}
	}
</style>
