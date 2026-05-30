import CallToAction from './CallToAction.jsx'
import Footer from './Footer.jsx'
import FoodSearch from './FoodSearch.jsx'
import Header from './Header.jsx'
import Hero from './Hero.jsx'

function LandingPage() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <FoodSearch />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
