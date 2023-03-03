import { Link } from 'react-router-dom';
import Footer from "../footer/footer.component";
import { Fragment } from "react";

const Contact = () => {
    return(
        <Fragment>
        <main>
            <h1>We want to hear from you.</h1>
            <p>We are available for your comments, requests and assistance.
                Please use the form below to contact us.
            </p>
        </main>
 <Footer />
 </Fragment>
    )
}
export default Contact;