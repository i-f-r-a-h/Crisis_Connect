import { Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom'
// import { ReactComponent as SiteLogo } from '../../assets/logo.svg'

const Navigation = () => {
 return(
    
     <Fragment>
       <header>

            {/* logo */}

                <Link className='' to={'/'}>
                     <p>crisis connect</p>
                </Link>
               


            {/* navbar */}
            <nav>
                <Link className='' to={'/Map'}>
                    Immersive Map
                </Link>
                <Link className='' to={'/Community'}>
                    Community Hub
                </Link>
                <Link className='' to={'/Contact'}>
                    Contact
                </Link>
            </nav>

            {/* buttons */}
            <div>
                <Link className='' to={'/Login'}>
                    Login
                </Link>
                <Link className='' to={'/SignUp'}>
                    Sign Up
                </Link>
            </div>

        </header>
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;