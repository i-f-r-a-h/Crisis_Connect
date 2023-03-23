import Button from "../../components/button/button.component";
import { useState } from 'react';
// import axios from 'axios';

const AuthModal = () => {
    const [modelType, setModalType] = useState('login');
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const register = (e) => {
        e.preventDefault()
        // axios.post('')
    }


    return (
        <section className="authModal">
            <div className="authModal__container">
                {modelType === 'login' && (
                    <h1>Login</h1>
                )}
                {modelType === 'register' && (
                    <h1>Register</h1>
                )}

                {modelType === 'register' && (
                     <label htmlFor="">
                        <span>E-mail Address:</span>
                        <input className="form__input" type="text" placeholder="email" value={email}  onChange={e => setEmail(e.target.value)} />
                     </label>
                )}
                
                <label htmlFor="">
                    <span>username:</span>
                    <input className="form__input" type="text" placeholder="username" value={username}  onChange={e => setUsername(e.target.value)}  />
                </label>
                
                <label htmlFor="">
                    <span>password:</span>
                    <input  className="form__input" type="password" placeholder="password" value={password}  onChange={e => setPassword(e.target.value)} />
                </label>
                {modelType === 'login' && (
                        <Button buttonType='authLogin'>Log In</Button>
                )}

                  {modelType === 'register' && (
                         <Button buttonType='authLogin' onClick={e => register(e)}>Sign Up</Button>
                )}

                


                
                {modelType === 'login' && (
                    <div>
                        New to Crisis Connect? <button className="authModal__redirect" onClick={() => setModalType( 'register' )}>Sign Up</button>
                    </div>
                )}
                  {modelType === 'register' && (
                    <div>
                        Already have an account? <button className="authModal__redirect" onClick={() => setModalType( 'login' )}>Log Up</button>
                    </div>
                ) }
              

            </div>
        </section>
        
    )

}

export default AuthModal;