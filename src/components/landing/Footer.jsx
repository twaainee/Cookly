function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="brand" href="/">
            COOKLY
          </a>
          <p>Simple recipes, shared with people who love good food.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/">Recipes</a>
          <a href="/">Categories</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </nav>
        <p className="copyright">(c) 2026 Cookly. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
