<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Card extends Vue {}
</script>

<template>
	<div class="card">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/theme.scss';

	.card {
		margin-top: 1rem;
		background: $grey-light;
		border-radius: $radius;
		padding: 1rem;
	}
</style>
