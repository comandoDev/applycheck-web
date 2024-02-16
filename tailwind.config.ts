import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        cloud: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Flight-blue-background&psig=AOvVaw3djmEjsBbQ5FLoJiIIENyp&ust=1705757361025000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLCSvr_H6YMDFQAAAAAdAAAAABAI')",
        successPassword: "url('https://denunc.s3.sa-east-1.amazonaws.com/96cfb309-676c-457e-8351-79841367589a-bg-iamge.png')",
        login: "url('https://denunc.s3.sa-east-1.amazonaws.com/0109805c-7a49-4025-9e2e-5427964f0766-_26f71430-48f9-4ae4-a6cd-12c9eb1081b4.jpg')"
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
