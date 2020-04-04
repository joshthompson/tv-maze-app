<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import Card from '@/components/layout/Card.vue'
	import ShowSearchBar from '@/components/elements/ShowSearchBar.vue'

	@Component({
		components: { Container, Card, ShowSearchBar }
	})
	export default class Home extends Vue {
		public get lastSearch() {
			return this.$store.state.lastSearch
		}
	}
</script>

<template>
	<Container class="page">
		<h2>Welcome to TV Tracker</h2>
		<ShowSearchBar :term="lastSearch" />
		<Card>
			<h3>What do we do?</h3>
			<p>TV Tracker allows you to search for any TV show, mark your favourites and then see when.</p>

			<h3>How does it work?</h3>
			<p>We search through the data provided by <a class="link" href="https://www.tvmaze.com/" target="_blank">tvmaze.com</a> to fetch the details and episodes of your favourite shows.</p>

			<h3>Who made this?</h3>
			<p>This was made by <a class="link" href="https://joshthompson.github.io" target="_blank">Josh Thompson</a>.</p>
		</Card>
	</Container>
</template>

<style lang="scss" scoped>
	h3 {
		margin-top: 2rem;

		&:nth-child(1) {
			margin-top: 0;
		}
	}
</style>