import { Iimage } from '@/models/tvmaze'

export const defaultPortraitImage = 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
export const defaultLandscapeImage = 'https://static.tvmaze.com/images/no-img/no-img-landscape-text.png'

export function urlify(text: string) {
	text = text.trim().toLowerCase()
	text = text.replace(/[^a-z0-9 ]/gmi, '').replace(/\s+/g, '-')
	return text
}

export function getImage(
	image: Iimage,
	backup: string = defaultPortraitImage,
	size: 'medium' | 'original' = 'medium'
) {
	return image && image[size] ? image[size] : backup
}

export function debounce(fn: (...args: any) => any, timeout: number) {
	let running = false
	let pid = -1
	return (...param: any) => {
		if (running === true) {
			clearTimeout(pid)
		}
		pid = setTimeout(fn.bind(null, ...param), timeout)
		running = true
	}
}
