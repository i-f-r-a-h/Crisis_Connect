import { Link } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function login(ev){
        ev.preventDefault()
        ev.preventDefault()
        fetch('http://localhost:4000/Login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
      });
    }
    return(
        <main>
          
            <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type="text"
               placeholder="username"
               value={username}
               onChange={ev => setUsername(ev.target.value)}/>
        <input type="password"
               placeholder="password"
               value={password}
               onChange={ev => setPassword(ev.target.value)}/>
                <button>Login</button>
            </form>
        </main>

    )
}
export default Login;