/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				porcelain: '#FDFFFC',
				'velvet-orchid': {
					DEFAULT: '#6C3483',
					dark: '#4A215C',
					light: '#8B4A9E',
				},
				razzmatazz: {
					DEFAULT: '#F61067',
					glow: 'rgba(246, 16, 103, 0.4)',
				},
				surface: '#120A17',
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
				'outfit': ['Outfit', 'sans-serif'],
			},
			fontSize: {
				'xs': '0.75rem',
				'sm': '0.875rem',
				'base': '1rem',
				'lg': '1.125rem',
				'xl': '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
			},
			letterSpacing: {
				'wider': '0.1em',
				'widest': '0.15em',
			},
		},
	},
	plugins: [],
}
