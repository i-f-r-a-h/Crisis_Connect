import { Link } from 'react-router-dom';
import Footer from "../footer/footer.component";
import { Fragment } from "react";


const Contact = () => {
    return(
        <main>
            <h1>We want to hear from you.</h1>
            <p>We are available for your comments, requests and assistance.
                Please use the form below to contact us.
            </p>
        

            <div>
                <label for="fullname">Full Name</label>
                <input type="text" />
            </div>

            <div>
                <label for="email">Email</label>
                <input type="email" />
            </div>

            <div>
                <label for="subject">Subject</label>
                <input type="text" />
            </div>

            <div>
                <label for="textarea">Message</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>

            <button>Send Message</button>
        </main>

    )
}
export default Contact;