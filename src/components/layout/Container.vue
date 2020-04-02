<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Container extends Vue {}
</script>

<template>
	<div class="container">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/responsive.scss';

	.container {
		width: $max-page-width;
		max-width: calc(100vw - 2rem);
		min-width: calc(#{$min-page-width} - 2rem);
		margin-left: auto;
		margin-right: auto;
	}
</style>
