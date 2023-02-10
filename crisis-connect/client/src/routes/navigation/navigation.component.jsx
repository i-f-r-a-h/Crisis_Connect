import { Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom'
import SiteLogo from '../../assets/logo.svg'
import AuthModal from '../authmodal/AuthModal';




const Navigation = () => {
 return(
    
     <Fragment>
       <header>

            {/* logo */}
             <Link className='logo' to={'/home'}>
                 <img src={SiteLogo} alt="logo" className='site_logo' />
                <p>crisis connect</p>
            </Link>
               


            {/* navbar */}
            <nav>
                <Link className='map' to={'/Map'}>
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
                <button className='login' to={'/Login'}>
                    Login
                </button>
                <button className='signup' to={'/SignUp'}>
                    Sign Up
                </button>
            </div>

        </header>
        <AuthModal />
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;