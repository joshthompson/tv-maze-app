import xhr from '@/services/xhr'
import { IshowSearch, Ishow, Iepisode, Icast } from '@/models/tvmaze'

export const baseUrl = 'https://api.tvmaze.com'

export async function search(term: string) {
	return await xhr.get(`${baseUrl}/search/shows?q=${term}`) as IshowSearch[]
}

export async function show(showId: number | string) {
	return await xhr.get(`${baseUrl}/shows/${showId}`) as Ishow
}

export async function showFull(showId: number | string) {
	const embed = '?embed[]=episodes&embed[]=cast&embed[]=seasons'
	return await xhr.get(`${baseUrl}/shows/${showId}${embed}`) as Ishow
}

export async function nextEpisode(showId: number | string) {
	const embed = '?embed[]=nextepisode'
	return await xhr.get(`${baseUrl}/shows/${showId}${embed}`) as Ishow
}

export async function episodes(showId: number | string) {
	return await xhr.get(`${baseUrl}/shows/${showId}/episodes`) as Iepisode[]
}

export async function cast(showId: number | string) {
	return await xhr.get(`${baseUrl}/shows/${showId}/cast`) as Icast[]
}

export default {
	search,
	show,
	showFull,
	nextEpisode,
	episodes,
	cast
}
