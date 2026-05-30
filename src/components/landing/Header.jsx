function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Cookly home">
        COOKLY
      </a>
      <button className="login-button" type="button">
        <span aria-hidden="true">+</span>
        Login
      </button>
    </header>
  )
}

export default Header
