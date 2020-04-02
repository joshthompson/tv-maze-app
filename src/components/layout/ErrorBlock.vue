<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class ErrorBlock extends Vue {}
</script>

<template>
	<div class="error-block">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/theme.scss';

	.error-block {
		margin-top: 1rem;
		background: $error-color;
		color: $error-color-contrast;
		border-radius: $radius;
		padding: 1rem;
	}
</style>
