import CategoryPage from "../../components/category/Category"
import HeroSection from "../../components/heroSection/HeroSection"
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard"
import Layout from "../../components/layout/Layout"
import Testimonial from "../../components/testmonial/Testimonial"
import Track from "../../components/track/Track"

const HomePage = () => {
  return (
    <Layout>
      <HeroSection/>
      <CategoryPage/>
      <HomePageProductCard/>
      <Track/>
      <Testimonial/>
    </Layout>
  )
}

export default HomePage