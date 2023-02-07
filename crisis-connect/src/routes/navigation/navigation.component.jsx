import { Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom'
import { ReactComponent as SiteLogo } from '../../assets/logo.svg'
import '../../main.scss'



const Navigation = () => {
 return(
    
     <Fragment>
       <header>

            {/* logo */}
            <Link className='logo' to={'/home'}>
                <SiteLogo className='site_logo' />
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
                <Link className='login' to={'/Login'}>
                    Login
                </Link>
                <Link className='signup' to={'/SignUp'}>
                    Sign Up
                </Link>
            </div>

        </header>
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;