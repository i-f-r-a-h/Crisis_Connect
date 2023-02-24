
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import {Outlet, Link} from 'react-router-dom'
import SiteLogo from '../../assets/logo.svg'
import AuthModal from '../authmodal/AuthModal';
import { UserContext } from '../authmodal/UserContext';




const Navigation = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
   
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

    const username = userInfo?.username




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
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link className='login' to={'/Login'}>
                            Login
                        </Link>
                        <Link className='register' to={'/Register'}>
                            Sign Up
                        </Link>
                    </>
                )}
           
            </div>

        </header>
        {/* <AuthModal /> */}
        <Outlet />
      </Fragment>
  
 )
}

export default Navigation;