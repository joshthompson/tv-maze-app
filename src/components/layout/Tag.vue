<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Tag extends Vue {}
</script>

<template>
	<span class="tag">
		<slot />
	</span>
</template>

<style lang="scss" scoped>
	@import '@/style/theme.scss';

	.tag {
		display: inline-block;
		background: $grey;
		border-radius: $radius-small;
		padding: 0.25rem 1rem;
		font-size: 0.75rem;
		margin-right: 0.5rem;
		text-transform: uppercase;
		line-height: 1rem;
	}
</style>
