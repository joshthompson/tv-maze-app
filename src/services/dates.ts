export interface DateLocaleOptions {
	localeMatcher?: 'lookup' | 'best fit'
	timeZone?: string
	hour12?: boolean
	hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
	formatMatcher?: 'basic' | 'best fit'
	weekday?: 'narrow' | 'short' | 'long'
	era?: 'narrow' | 'short' | 'long'
	year?: 'numeric' | '2-digit'
	month?: '2-digit' | 'narrow' | 'short' | 'long'
	day?: 'numeric' | '2-digit'
	hour?: 'numeric' | '2-digit'
	minute?: 'numeric' | '2-digit'
	second?: 'numeric' | '2-digit'
	timeZoneName?: 'short' | 'long'
}

const locale = 'en'

export const defaultDateOptions: DateLocaleOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric'
}

export const defaultTimeOptions: DateLocaleOptions = {
	hour: 'numeric',
	minute: '2-digit'
}

export function dateToString(date: Date | string | number, options: DateLocaleOptions = defaultDateOptions) {
	date = new Date(date)
	return date.toLocaleDateString(locale, options)
}

export function timeToString(date: Date | string | number, options: DateLocaleOptions = defaultTimeOptions) {
	date = new Date(date)
	return date.toLocaleTimeString(locale, options)

}
