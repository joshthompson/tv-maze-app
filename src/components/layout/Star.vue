<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Star extends Vue {
		@Prop({ required: true }) private value: boolean

		public get starClass() {
			return {
				selected: this.value
			}
		}

		public toggle() {
			this.$emit('input', !this.value)
		}
	}
</script>

<template>
	<div class="star" :class="starClass" @click="toggle">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48">
			<path fill="none" stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
		</svg>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/theme.scss';

	$size: 1.5em;

	.star {
		display: inline-block;
		width: $size;
		height: $size;
		cursor: pointer;

		svg {
			width: 100%;
		}

		path {
			stroke: $grey;
			stroke-width: 0.25rem;
		}

		&:hover path,
		&:focus path {
			stroke: $yellow;
		}

		&.selected path {
			stroke: $yellow;
			fill: $yellow; 
		}
	}
</style>
