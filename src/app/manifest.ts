import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Groviadigi',
    short_name: 'Groviadigi',
    description: 'Growth, beautifully engineered.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcf6',
    theme_color: '#112229',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
