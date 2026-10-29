import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import Featured from '../components/home/Featured'
import Bridal from '../components/home/Bridal'
import Story from '../components/home/Story'
import Trust from '../components/home/Trust'
import Testimonials from '../components/home/Testimonials'
import { usePageTitle } from '../hooks/useUi'

export default function Home() {
  usePageTitle('')
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <Bridal />
      <Story />
      <Trust />
      <Testimonials />
    </>
  )
}
