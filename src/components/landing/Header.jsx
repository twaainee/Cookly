function Header() {
  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Cookly home">
          COOKLY
        </a>
        <button className="login-button" type="button">
          <span aria-hidden="true">+</span>
          Login
        </button>
      </nav>
    </header>
  )
}

export default Header
