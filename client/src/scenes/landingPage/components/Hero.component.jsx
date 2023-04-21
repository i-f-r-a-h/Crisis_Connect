import { Fragment } from "react";
import PublicIcon from '@mui/icons-material/Public';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import Viewer from "./viewer";


const Hero = () => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <section className="hero">

                <div className="hero__container">
                    <h1>Be the Change with Crisis Connect</h1>
                    <p>Humanitarian crises are affecting millions of people worldwide. It's time for us to come together and raise awareness about the pressing issues happening around the world.</p>
                    <div className="hero__buttons">
                        <button className='explore' onClick={() => {
                            navigate(`/InteractiveMap`);
                            navigate(0);
                        }} >Start Exploring</button>
                        <button className='community' onClick={() => {
                            navigate(`/Home`);
                            navigate(0);
                        }}> <span><PeopleIcon /></span> Join the community</button>
                    </div>
                </div>
                <Viewer />
            </section>
            <section className="hero__banner">
                <div className="hero__banner__container">
                    <p className="hero__banner__headings"><span ><PublicIcon className="hero__banner__headings__icon" fontSize="3rem" /></span> Global Impact</p>
                    <p className="hero__banner__text">Every year, millions of people around the world are affected by natural disasters, leaving many without access to basic necessities like food, water, and shelter. </p>
                </div>
                <div className="hero__banner__container">
                    <p className="hero__banner__headings"><span ><Diversity1Icon className="hero__banner__headings__icon" fontSize="3rem" /></span> Disaster Relief</p>
                    <p className="hero__banner__text"> Our community is dedicated to taking action that drives real change. With Crisis Connect, we can help create a brighter future for all across the globe.</p>
                </div>
            </section>

        </Fragment>
    )
}

export default Hero;