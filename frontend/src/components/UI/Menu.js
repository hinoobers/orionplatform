import './SideNav.css'

const SideNav = (props) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isLoggedIn = !!sessionStorage.getItem("token");

  const toggle = () => {
    props.tweetModal(!props.isTweetModalOpen);
    console.log("Tweet modal open", props.isTweetModalOpen);
  }

  return (
    <nav className='sidenav'>
      <div id="nav-content">
        <div className='nav-button'>
          <button className="fa fa-home" onClick={handleLogout}></button>
        </div>
        <div className='nav-button'>
          <button onClick={toggle}>Tweet</button>
        </div>
        
        {isLoggedIn && (
          <div className='nav-button'>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default SideNav