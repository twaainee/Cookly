import noodleImage from '../../assets/images/noodle.png'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1>Are you starving?</h1>
          <p>Find &amp; Share Delicious Recipes</p>
        </div>
        <img className="hero-noodle" src={noodleImage} alt="Noodle bowl" />
      </div>
    </section>
  )
}

export default Hero
