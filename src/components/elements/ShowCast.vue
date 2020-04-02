<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import CastMemberBlock from '@/components/elements/CastMemberBlock.vue'
	import tvmaze from '@/services/tvmaze'
	import { Icast } from '@/models/tvmaze'

	@Component({
		components: { CastMemberBlock }
	})
	export default class ShowEpisodes extends Vue {
		@Prop({ required: true }) private cast: Icast[]

		public topCast(amount: number = 10) {
			return this.cast.slice(0, amount)
		}

	}
</script>

<template>
	<div class="show-cast" v-if="cast && cast.length">
		<h3>Cast</h3>
		<CastMemberBlock
			v-for="castMember in topCast()"
			:key="castMember.id"
			:castMember="castMember"
		/>
	</div>
</template>
