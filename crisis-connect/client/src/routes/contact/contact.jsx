import { Link } from 'react-router-dom';
import Footer from "../footer/footer.component";
import { Fragment } from "react";


const Contact = () => {
    return(
        <Fragment>
            <h1 className="contact_title">We want to hear from you.</h1>
            <p className="contact_text">We are available for your comments, requests and assistance.
                Please use the form below to contact us.
            </p>

            <div className="contact_wrapper">
            <div className="fullName">
                <label for="fullname">Full Name</label>
                <input className='form__input' type="text" />
            </div>

            <div className='email'>
                <label for="email">Email</label>
                <input className='form__input' type="email" />
            </div>

            <div className='subject'>
                <label for="subject">Subject</label>
                <input className='form__input' type="text" />
            </div>

            <div className='message'>
                <label for="textarea">Message</label>
                <textarea name="textarea" id="textarea" cols="28" rows="10"></textarea>
            </div>

            <button type="submit" className="button__container">Send Message</button>
        </div>
        </Fragment>

    )
}
export default Contact;