import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        cloud: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Flight-blue-background&psig=AOvVaw3djmEjsBbQ5FLoJiIIENyp&ust=1705757361025000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLCSvr_H6YMDFQAAAAAdAAAAABAI')"
      },
      colors: {
        principal: '#287AF8',
        blackPrincipal: '#0F26A6',
        selected: '#979797',
        progress: '#63C172'
      }
    }
  },
  plugins: []
}
export default config
