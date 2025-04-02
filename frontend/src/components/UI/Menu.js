import './SideNav.css'

const SideNav = () => {
  return (
    <nav className='sidenav'>
      <div id="nav-content">
        <div className='nav-button'>
          <a className="fa fa-home"></a>
        </div>
        <div className='nav-button'>
          <a className="fa fa-user"></a>
        </div>
        <div className='nav-button'>
          <button>Tweet</button>
        </div>
      </div>
    </nav>
  )
}

export default SideNav