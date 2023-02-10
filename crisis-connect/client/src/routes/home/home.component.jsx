import { Fragment } from 'react';
import {Link} from 'react-router-dom'


const Home = () => {
return(
    <Fragment>

        {/* hero */}
        <section className='home-hero'>

            {/* hero */}
            <div>
                {/* text */}
                <div>
                    <h1>Be the Change with Crisis Connect</h1>
                    <p> Humanitarian crises are affecting millions of people worldwide. 
                        It's time for us to come together and raise awareness about the
                        pressing issues happening around the world.</p>
                    
                    {/* links */}
                    <Link className='' to={'/map'}>
                        <p>start exploring</p>
                    </Link>

                     <Link className='' to={'/community'}>
                        <p>join the community</p>
                    </Link>
                </div>

                 {/* 3d Globe */}
                <div>
                </div>
                
            </div>

            {/* banner */}
            <div>
                {/* feature one */}
                <div>
                    <div>
                        <span></span>
                        <p>Feature one</p>
                    </div>
                    <p>All base UI elements are made using Nested Symbols and shared styles that are logically connected with one another.</p>
                </div>
                {/* feature two */}
                <div>
                    <div>
                        <span></span>
                        <p>Feature two</p>
                    </div>
                    <p>All base UI elements are made using Nested Symbols and shared styles that are logically connected with one another.</p>
                </div>
            </div>

        </section>

         {/* about */}
        <section className='home-about'>
            {/* heading */}
            <div>
                <h2>Discover the ultimate destination for global awareness</h2>
                <p>We are so glad you're here! Our mission is to bring awareness to crisis situations and provide a platform for those in need to connect with the help they require.</p>
            </div>

            {/* create components for grid elements  */}
        </section>

         {/* latest posts */}
        <section className='home-posts'>
            {/* image */}
            <div>
            </div>
            {/* slider */}
            <div>

            </div>
        </section>

         {/* faqs */}
        <section className='home-faqs'>
            {/* heading */}
            <div>
                <p>FAQs</p>
                <h2>Helping you to help others</h2>
            </div>

            {/* accordion */}
            <div></div>
        </section>

    </ Fragment>
)
}

export default Home;