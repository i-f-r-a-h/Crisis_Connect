import { useState } from "react";
import { accordionData } from "utils/content/accordionData";

const Accordion = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
  
    return (
      <div className="accordion__item">
        <div className="accordion__title" onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div className="accordion__dropdown">{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion__content">{content}</div>}
      </div>
    );
};

const Faqs = () => {
    const [isActive, setIsActive] = useState(false);

    return (
     <section className='faqs'>
        <div>
            <h2 className='faqs__heading'>FAQs</h2>
            <p className='faqs__subheading'>Helping you <br/>to help others</p>
        </div>
        <div className="faqs__accordion">
        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
        
    </section>
    )

}


export default Faqs;