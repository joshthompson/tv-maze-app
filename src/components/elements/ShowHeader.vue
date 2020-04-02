<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import Star from '@/components/layout/Star.vue'
	import { AppState } from '@/models/AppState'

	@Component({
		components: { Container, Star }
	})
	export default class ShowHeader extends Vue {
		@Prop({ required: true }) public show

		public get backgroundStyle() {
			if (this.show.image && this.show.image.medium) {
				return {
					backgroundImage: `url(${this.show.image.medium})`
				}
			} else {
				return null
			}
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
	}
</script>

<template>
	<div class="show-header">
		<div class="background" :style="backgroundStyle"></div>
		<Container>
			<div class="top">
				<Star v-model="favourite" class="star" />
			</div>
			<h2 class="title">{{ show.name }}</h2>
		</Container>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/responsive.scss';
	@import '@/style/theme.scss';

	$top-height: 12.5rem;
	$top-blur: 1rem;

	.show-header {
		position: relative;
		min-height: $top-height;
		overflow: hidden;
		color: $white;

		.background {
			position: absolute;
			background-color: $grey;
			background-size: cover;
			background-position: center;
			z-index: 1;
			filter: blur($top-blur);
			top: $top-blur * -2;
			left: $top-blur * -2;
			width: calc(100vw + #{$top-blur * 4});
			min-height: calc(#{$top-height} + #{$top-blur * 4});
		}

		.top {
			position: relative;
			z-index: 2;
			padding: 1rem;
			font-size: 2rem;
			text-align: right;

			@include small {
				font-size: 1rem;
				margin-bottom: 1rem;
			}
		}

		.title {
			position: absolute;
			bottom: 0;
			z-index: 2;
			color: $white;
			font-size: 2rem;
			text-shadow: 0 0.0725rem 0.25rem $black;

			@include small {
				position: relative;
				text-align: center;
				bottom: 0;
			}
		}
	}
</style>
