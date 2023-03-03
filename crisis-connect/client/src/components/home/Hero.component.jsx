import { Fragment } from "react";
import Button from "../button/button.component";

const Hero = () => {
    return(
        <Fragment>
        <section className="hero">
            <div className="hero__container">
                   <h1>Be the Change with Crisis Connect</h1>
                   <p>Humanitarian crises are affecting millions of people worldwide. It's time for us to come together and raise awareness about the pressing issues happening around the world.</p>
                   <div className="hero__buttons">
                   <button className='signup' to={'/InteractiveMap'}>Start Exploring</button>
                   <button className='signup' to={'/Community'}>Join the community</button>
                   </div>
            </div>
        </section>
        <section className="hero__banner">
            <div className="Hero__image"></div>
            <div className="Hero__card"></div>
        </section>
        </Fragment>
    )
}

export default Hero;