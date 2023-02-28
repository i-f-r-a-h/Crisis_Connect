import { useState, useEffect, useContext, Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom';
import SiteLogo from '../../assets/logo.svg';
import { UserContext } from '../authmodal/UserContext';




const Navigation = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false)

    // dynamic user
   
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
             response.json().then(userInfo => {
                setUserInfo(userInfo)
             })
        })
    }, [])


    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method:'POST',
        })
        setUserInfo(null)
    }


    const username = userInfo?.username;



      useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 600px)");
        const handleMediaQueryChange = (mq) => {
        
            if (mediaQuery.matches) {
                setIsSmallScreen(true);
              } else {
                setIsSmallScreen(false);
              }
        };
        
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    });
    

    
    const handleShowNavbar = () => {
            setShowNavbar(!showNavbar)
    }

    

 return(
    
     <Fragment>
       <header className={`header  ${showNavbar &&  'active'}`}  >
       <div className={`header__wrapper  ${showNavbar && !isSmallScreen && 'active'}`}>
           

                {/* logo */}
                <Link className='logo' to={'/'}>
                    <img src={SiteLogo} alt="logo" className='site_logo' />
                    <p>crisis connect</p>
                </Link>
                
                <div className={`header__main   ${showNavbar && !isSmallScreen && 'active header__main-mobile'}`}>
       

                {/* navbar */}
                <nav className={`nav  ${showNavbar && !isSmallScreen && 'active'}`}>
                    <Link className='interactiveMap' to={'/InteractiveMap'} onClick={showNavbar}>
                        Immersive Map
                    </Link>
                    <Link className='community' to={'/Community'} onClick={showNavbar}>
                        Community Hub
                    </Link>
                    <Link className='contact' to={'/Contact'} onClick={showNavbar}>
                        Contact
                    </Link>
                </nav>

                {/* buttons */}
                <div className={`account  ${showNavbar && !isSmallScreen && 'active'}`}>
                   
                    {username && (
                        <>
                             <button className='login' onClick={logout}>Logout</button>
                            <Link to="/create" className='register'>Create new post</Link>
                            
                        </>
                    )}
                    {!username && (
                        <>
                            <Link className='login' to={'/Login'} onClick={showNavbar}>
                                Login
                            </Link>
                            <Link className='register' to={'/Register'} onClick={showNavbar}>
                                Sign Up
                            </Link>
                        </>
                    )}
            
                </div>     
                </div>       
      
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
                🍔
        </div>

            
        </header>
     
        {/* <AuthModal /> */}
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;