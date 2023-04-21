import girl from '../../../assets/girl.png'
import cloud from '../../../assets/cloud.png'
import boy from '../../../assets/guy.png'
import { useNavigate } from "react-router-dom";



const Discover = () => {
    const navigate = useNavigate();
    return(
        <section className="discover">
            <div className="discover__title">
                <h2>Discover The <br/> Ultimate Destination <br/> For Global Awareness</h2>
                <p>We are so glad you're here! Our mission is to bring awareness to crisis situations and provide a platform for those in need to connect with the help they require.</p>
            </div>
            <div className="discover__cards">
                <div className="discover__cards__top">
                    <div className='discover__cards__top__container'>
                        <h3>Unite Against Crises</h3>
                        <p>With Crisis Connect, you can join the movement to raise awareness about humanitarian issues. Share your experiences and help bring attention to the cause. By working together, we can create a better world for all.</p>
                         <img src={girl} alt="3d girl with glasses waving"  /> 
                    </div>

                    <div className='discover__cards__top__container'>
                        <h3>Know more, Help more</h3>
                        <p>Our interactive map powered by Three.js and WebGL keeps you updated with real-time information provided by the ReliefWeb API, you can stay informed about the latest developments.</p>
                         <img src={cloud} alt="3d Sun cloud angled rain"  /> 
                    </div>

                </div>
                <div className="discover__cards__bottom">
                    <div className='discover__cards__bottom__container'>
                        <div className="discover__cards__bottom__text"> 
                            <h3>Be a Part of the Solution with Our Community Hub</h3>
                            <p>Our Community Hub is a platform for people to connect and help one another. Share your stories, post for help, and be a part of the solution. With an intuitive design, it's never been easier to make a difference.</p>
                            <button className='explore' onClick={() => {
                            navigate(`/Home`);
                            navigate(0);
                        }}>Start Exploring</button>
                        </div>
                      
                                     <img src={boy} alt="3d girl with glasses waving"  /> 
                       
                
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Discover;