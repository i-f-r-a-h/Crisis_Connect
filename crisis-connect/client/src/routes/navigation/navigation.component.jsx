import { Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom'
import SiteLogo from '../../assets/logo.svg'
import AuthModal from '../authmodal/AuthModal';




const Navigation = () => {
 return(
    
     <Fragment>
       <header>

            {/* logo */}
             <Link className='logo' to={'/'}>
                 <img src={SiteLogo} alt="logo" className='site_logo' />
                <p>crisis connect</p>
            </Link>
               


            {/* navbar */}
            <nav className='nav'>
                <Link className='interactiveMap' to={'/InteractiveMap'}>
                    Immersive Map
                </Link>
                <Link className='community' to={'/Community'}>
                    Community Hub
                </Link>
                <Link className='contact' to={'/Contact'}>
                    Contact
                </Link>
            </nav>

            {/* buttons */}
            <div className="account">
                <Link className='login' to={'/Login'}>
                    Login
                </Link>
                <Link className='register' to={'/Register'}>
                    Sign Up
                </Link>
            </div>

        </header>
        {/* <AuthModal /> */}
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;