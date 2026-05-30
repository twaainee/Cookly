import ctaImage from '../../assets/images/CTA image.png'

function CallToAction() {
  return (
    <section className="cta-section">
      <img className="cta-background" src={ctaImage} alt="" />
      <div className="cta-copy">
        <h2>Cook, save, savor start with Cookly!</h2>
        <button type="button">SIGN UP NOW!</button>
      </div>
    </section>
  )
}

export default CallToAction
