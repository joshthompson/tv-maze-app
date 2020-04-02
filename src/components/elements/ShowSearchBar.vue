<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { debounce } from '@/services/helpers'

	@Component
	export default class ShowSearchBar extends Vue {
		@Prop({ required: false, default: '' }) private term: string
		@Prop({ required: false, default: false }) private preview: boolean
		public searchTerm: string = ''
		public searchDebounced: () => void = () => null

		public created() {
			this.searchTerm = this.term || '' // Get initial value
			if (this.preview) {
				this.searchDebounced = debounce(this.search, 50)
			}
		}

		public search(event) {
			event.preventDefault()
			this.$router.push(`/search/${this.searchTerm.trim()}`)
		}
	}
</script>

<template>
	<form class="show-search-bar" @submit="search">
		<input
			autofocus
			type="search"
			v-model="searchTerm"
			placeholder="Search for any TV show by name..."
			@input="searchDebounced"
		/>
		<input type="submit" value="Search" class="btn primary large-search" />
		<input type="submit" value="🔎" class="btn primary small-search" />
	</form>
</template>

<style lang="scss" scoped>
	@import '@/style/responsive.scss';
	@import '@/style/theme.scss';

	.show-search-bar {
		background: $grey-light;
		border-radius: $radius;
		padding: 0.5rem;
		display: flex;

		input[type="search"] {
			flex-grow: 1;
			font-size: 1rem;
			outline: none;
			margin-right: 0.5rem;
			padding: 1rem;
			display: block;
			border: 0;
			border-radius: $radius-small;

			&:focus {
				box-shadow: 0 0 0.5rem $grey;
			}
		}
	}

	.large-search {
		@include small {
			display: none;
		}
	}

	.small-search {
		display: none;
		@include small {
			display: block;
		}
	}
</style>
