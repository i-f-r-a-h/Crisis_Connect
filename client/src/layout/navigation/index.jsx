import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import {Outlet, Link, useLocation} from 'react-router-dom';
import SiteLogo from '../../assets/logo.svg';
import { UserContext } from '../authmodal/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";






const Navigation = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false)


  let ref = useRef(null);
  let location = useLocation();

  const [header, setHeader] = useState(false);

  useEffect(() => {
    const headerContainter = ref.current;

    if (
      location.pathname === "/InteractiveMap" 
    ) {
      headerContainter.classList.add('header--transparent')

    }else{
      headerContainter.classList.remove('header--transparent')
    }

    if (location.pathname === "/") {
      setTimeout(() => {
        setHeader(true);
      }, 3500);
    } else {
      setTimeout(() => {
        setHeader(true);
      }, 1500);
    }
  }, [location.pathname]);






// resposive 
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 800px)");
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



  const handleLogout = () => {
    dispatch(setLogout());
      navigate("/");
  }

  return(
    
    <Fragment>
      <header ref={ref} className={`header  ${showNavbar &&  'active'}`}  >
     

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
                   <Link className='community' to={'/Home'} onClick={showNavbar}>
                       Community Hub
                   </Link>
                   <Link className='contact' to={'/Contact'} onClick={showNavbar}>
                       Contact
                   </Link>
               </nav>


               {/* buttons */}
               <div className={`account  ${showNavbar && !isSmallScreen && 'active'}`}>
                  
                   {user && (
                       <>
                     
                            <button className='login' onClick={handleLogout}>Logout</button>
                           <Link to="/create" className='profile'>Your Profile    <AccountCircleIcon ml="10px"  />  </Link>
                           
                       </>
                   )}
                   {!user && (
                       <>
                           <Link className='login' to={'/Login'} onClick={showNavbar}>
                               Write a post 
                           </Link>
                           <Link className='register' to={'/Login'} onClick={showNavbar}>
                               Login
                           </Link>
                       </>
                   )}
           
               </div>     
               </div>       

           </div>
           {!isNonMobileScreens && (
           <Menu className="menu-icon" onClick={handleShowNavbar} fontSize="large"/>
           )}
       </header>
    
       {/* <AuthModal /> */}
       <Outlet />
     </Fragment>
 
)
}

export default Navigation;