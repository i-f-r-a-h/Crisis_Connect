const BUTTON_TYPES_CLASSES = {
     highlight:'highlight',
     inverted: 'inverted',
     login:'login'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button