import Footer from "../footer/footer.component";
import Faqs from "../../components/home/Faqs.component";
import Testimonials from "../../components/home/Testimonials.component";
import Discover from "../../components/home/Discover.component";
import Hero from "../../components/home/Hero.component";
import { Fragment } from "react";


const Home = () => {
    return (
        <Fragment>
        <body>
            <Hero />
            <Discover />
            <Testimonials />
            <Faqs />
        </body>
        <Footer />
        </Fragment>
    )

}

export default Home;