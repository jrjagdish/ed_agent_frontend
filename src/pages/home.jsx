import React from 'react'
import HeroSection from '../sections/hero-section'
import OurLatestCreation from '../sections/our-latest-creation'
import AboutOurApps from "../sections/about-our-apps";
import OurTestimonials from "../sections/our-testimonials";
import TrustedCompanies from "../sections/trusted-companies";
import GetInTouch from "../sections/get-in-touch";
import SubscribeNewsletter from "../sections/subscribe-newsletter";


const Home = () => {
  return (
    <>
      <HeroSection />
      <OurLatestCreation />
      <AboutOurApps />
      <OurTestimonials />
      <TrustedCompanies />
      <GetInTouch />
      <SubscribeNewsletter />
    </>
  )
}

export default Home