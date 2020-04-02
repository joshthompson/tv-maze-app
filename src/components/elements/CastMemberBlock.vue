<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Icast } from '@/models/tvmaze'
	import { getImage, defaultPortraitImage } from '@/services/helpers'

	@Component
	export default class ShowEpisodes extends Vue {
		@Prop({ required: true }) private castMember: Icast

		public get characterImage() {
			return getImage(this.castMember.character.image, null)
		}

		public get personImage() {
			return getImage(this.castMember.person.image, null)
		}

		public get image() {
			return this.characterImage || this.personImage || defaultPortraitImage
		}
	}
</script>

<template>
	<div class="cast-member-block" v-if="castMember">
		<img :src="image" class="image" />
		<div class="character">{{ castMember.character.name }}</div>
		<div class="person">{{ castMember.person.name }}</div>
	</div>
</template>

<style lang="scss" scoped>
	.cast-member-block {
		display: inline-block;
		vertical-align: top;
		margin: 0 0.5rem 0.5rem 0;
		width: 200px;
		max-width: calc(50vw - 1rem - 0.5rem);

		.character {
			font-weight: bold;
		}

		.image {
			width: 100%;
		}
	}
</style>
