import SocialItem from "./socialItem.component";

const Marquee = ({ socials }) => {
  return (
    <div className='marquee'>
       <div className="marquee__container" aria-hidden="true">
          {socials.map((social) => (
            <SocialItem key={social.id} social={social} />
          ))}
           {socials.map((social) => (
            <SocialItem key={social.id} social={social} />
          ))}
       </div>
    </div>
  );
};

export default Marquee