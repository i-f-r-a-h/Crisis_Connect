import { Fragment } from "react";
import Navigation from "layout/navigation";
import Viewer from "./components/viewer";
import Hero from "./components/Hero.component";
import Discover from "./components/Discover.component";
import Testimonials from "./components/Testimonials.component";
import Faqs from "./components/Faqs.component";
import Footer from "layout/footer";


const LandingPage = () => {
  return (
    <Fragment>
       <Navigation/>
        <body>
        {/* <Viewer /> */}
        <Hero />
        <Discover />
        <Testimonials />
        <Faqs />
            <Footer />
    </body>

    </Fragment>
)
};

export default LandingPage;