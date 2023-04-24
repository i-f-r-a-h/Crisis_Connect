// import links from react-router-dome
import { Link } from "react-router-dom";
import Marquee from "./components/marquee.component";
import Bamboo from "../../assets/Bamboo.png";

const Footer = (props) => {
  const socials = [
    {
      id: 1,
      title: "Instagram",
      Url: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "Tiktok",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "Facebook",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
  ];

  return (
    <footer class="footer">
      <Marquee socials={socials} />
      <section className="footer__main">
        <div className="footer__tagline">
          <p>Join the community</p>
        </div>
        <div className="footer__container">
          <div className="footer__newsletter">
            <p>Join Our Subscription List</p>
            <input type={"email"} placeholder="Enter email" />
            <p class="footer__newsletter__info">
              Join our newsletter to stay up to date on features and releases
            </p>
          </div>

          <div className="footer__links">
            <nav className="footer__links__pages">
              <p>Pages</p>
              <ul>
                <li>
                  <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Your Profile
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <Link className="community" to={"/Community"}>
                    {" "}
                    Community Hub{" "}
                  </Link>
                </li>
                <li>
                  <Link className="contact" to={"/Contact"}>
                    {" "}
                    Contact{" "}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="footer__links__external">
              <p>Links</p>
              <ul>
                <li>
                  <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms & conditions
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Site Credit
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

    </footer>
  );
};

export default Footer;
