import { Link } from 'react-router-dom';
import Marquee from '../../components/marquee/marquee.component';


const Footer = (props) => {
    const socials = [
        {
          "id": 1,
          "title": "Instagram",
          "Url": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "Tiktok",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "Facebook",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        }
      
    ]

  return (
    <footer class='footer'>
        <Marquee socials={socials}/>
        {/* <section className='footer__marque'>

        </section> */}

        <section className='footer__main'>
            <p>join the community</p>
            <nav className='footer-content'>
                <section className='footer-main'>
            <p>join the community</p>
            <div className='footer__links'>
                <ul>
                    <li>
                        {/* subscription */}
                        <p>Join Our Subscription List</p>
                        {/* input field */}
                        <p>Join our newsletter to stay up to date on features and releases</p>
                    </li>
                    <li>
                        <p>Pages</p>
                        <div>
                        </div>
                    </li>
                      <li>
                        <p>Links</p>
                        <div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
            </nav>
        </section>
      
    </footer>
  )
}

export default Footer
