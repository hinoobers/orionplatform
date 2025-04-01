const SideNav = () => {
  return (
    <nav>
      <div id="nav-content">
        <li className="nav-button">
          <a className="fa fa-home"></a>
          <span></span>
        </li>
        <li className="nav-button">
          <a className="fa fa-user"></a>
          <span></span>
        </li>
        <li className="nav-button">
          <button>Tweet</button>
        </li>
      </div>
    </nav>
  )
}

export default SideNav