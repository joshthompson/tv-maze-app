<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import Container from '@/components/layout/Container.vue'
	import ShowHeader from '@/components/elements/ShowHeader.vue'
	import ShowDetails from '@/components/elements/ShowDetails.vue'
	import ShowEpisodes from '@/components/elements/ShowEpisodes.vue'
	import ShowCast from '@/components/elements/ShowCast.vue'
	import { Ishow } from '@/models/tvmaze'
	import tvmaze from '@/services/tvmaze'
	import { urlify } from '@/services/helpers'

	@Component({
		components: { Container, ShowHeader, ShowDetails, ShowEpisodes, ShowCast }
	})
	export default class Search extends Vue {

		public loading: boolean = false
		public show: Ishow = null

		public async created() {
			try {
				this.loading = true
				this.show = await tvmaze.showFull(this.$route.params.id)
				this.verifyShow()
				this.verifyUrl()
			} catch (err) {
				this.$router.push('/404')
			} finally {
				this.loading = false
			}
		}

		private verifyShow() {
			// if (this.show.status.toString() === '404') {
			// 	throw new Error('Show not found')
			// }
		}

		private verifyUrl() {
			if (urlify(this.show.name) !== this.$route.params.name) {
				this.$router.replace(`/show/${this.show.id}/${urlify(this.show.name)}`)
			}
		}

		public get episodes() {
			return this.show ? this.show._embedded.episodes : null
		}

		public get cast() {
			return this.show ? this.show._embedded.cast : null
		}

	}
</script>

<template>
	<div>

		<Container v-if="loading">
			<div>Loading...</div>
		</Container>

		<div v-if="!loading && show">
			<ShowHeader :show="show" />
			<Container>
				<ShowDetails :show="show" />
				<ShowEpisodes :episodes="episodes" />
				<ShowCast :cast="cast" />
			</Container>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	
</style>
