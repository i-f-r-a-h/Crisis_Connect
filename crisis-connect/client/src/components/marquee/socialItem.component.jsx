import Button from "../button/button.component";

const SocialItem = ({ social }) => {
    const { hrefLink, title } = social;
    return (
        <div className="marquee__inner" aria-hidden="true">
            <Button buttonType='social'>{title}</Button>
            <Button buttonType='follow'>Follow us @CrisisConnect </Button>
        </div>
    );
  };

  export default SocialItem;