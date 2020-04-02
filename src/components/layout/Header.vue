<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'

	@Component({
		components: { Container }
	})
	export default class Header extends Vue {
		public selectedClass(page: string) {
			// Get first part of route then compare
			const path = this.$route.path.split('/')[1]
			return {
				[`page-${page || 'home'}`]: true,
				selected: path === page
			}
		}

		public get searchLink() {
			return this.lastSearch ? `/search/${this.lastSearch}` : '/search'
		}

		public get lastSearch() {
			return this.$store.state.lastSearch
		}
	}
</script>

<template>
	<div class="header">
		<header class="title">
			<Container>
				<h1>
					<router-link to="/">📺 TV Tracker</router-link>
				</h1>
			</Container>
		</header>
		<nav class="navigation">
			<Container>
				<ul>
					<li :class="selectedClass('')">
						<router-link to="/">Home</router-link>
					</li>
					<li :class="selectedClass('search')">
						<router-link :to="searchLink">Search</router-link>
					</li>
					<li :class="selectedClass('favourites')">
						<router-link to="/favourites"><span class="hide-small">Your</span> Favourites</router-link>
					</li>
					<li :class="selectedClass('schedule')">
						<router-link to="/schedule"><span class="hide-small">Your</span> Schedule</router-link>
					</li>
				</ul>
			</Container>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/responsive.scss';
	@import '@/style/theme.scss';

	.navigation .container {
		@include small {
			max-width: 100vw;
			font-size: 0.75rem;
		}
	}

	.header {
		position: relative;
		z-index: 10;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);

		@include small {
			text-align: center;
		}

		.title {
			background: $black;
			color: $white;
			padding: 1rem;

			a {
				color: inherit;
				text-decoration: none;
			}
		}

		.navigation {
			display: block;
			background: $grey-light;

			li {
				list-style-type: none;
				display: inline-block;
				a {
					display: inline-block;
					padding: 0.5rem 1rem;
					text-decoration: none;
					color: $black;
					outline: none;
				}

				a:hover,
				a:focus,
				&.selected a {
					background: $grey;
				}
			}
			
		}
			
	}
</style>