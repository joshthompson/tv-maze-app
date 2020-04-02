<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Header from './components/layout/Header.vue'

	@Component({
		components: {
			Header
		}
	})
	export default class App extends Vue {}
</script>

<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>

<style lang="scss">
	@import '@/style/main.scss';
</style>
