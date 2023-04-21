// Importing the Button component and the useState hook from React
import Button from "../../components/button/button.component";
import { useState } from "react";
// Importing Axios (commented out for now)
// import axios from 'axios';

const AuthModal = () => {
  // Initializing state variables for the modal type, email, username, and password
  const [modelType, setModalType] = useState("login");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // Handler for registering a new user
  const register = (e) => {
    e.preventDefault();
    // Axios request goes here
    // axios.post('')
  };

  // Rendering the AuthModal component
  return (
    <section className="authModal">
      <div className="authModal__container">
        {/* Rendering the Login or Register title based on the modalType state */}
        {modelType === "login" && <h1>Login</h1>}
        {modelType === "register" && <h1>Register</h1>}

        {/* Rendering the email input field only if the modalType is Register */}
        {modelType === "register" && (
          <label htmlFor="">
            <span>E-mail Address:</span>
            <input
              className="form__input"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        )}

        {/* Rendering the username and password input fields */}
        <label htmlFor="">
          <span>username:</span>
          <input
            className="form__input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>password:</span>
          <input
            className="form__input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Rendering the Log In or Sign Up button based on the modalType state */}
        {modelType === "login" && (
          <Button buttonType="authLogin">Log In</Button>
        )}

        {modelType === "register" && (
          <Button buttonType="authLogin" onClick={(e) => register(e)}>
            Sign Up
          </Button>
        )}

        {/* Rendering the "New to Crisis Connect?" message and button if modalType is Login */}
        {modelType === "login" && (
          <div>
            New to Crisis Connect?{" "}
            <button
              className="authModal__redirect"
              onClick={() => setModalType("register")}
            >
              Sign Up
            </button>
          </div>
        )}
        {/* Rendering the "Already have an account?" message and button if modalType is Register */}
        {modelType === "register" && (
          <div>
            Already have an account?{" "}
            <button
              className="authModal__redirect"
              onClick={() => setModalType("login")}
            >
              Log Up
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Exporting the AuthModal component as the default export
export default AuthModal;
