const BUTTON_TYPES_CLASSES = {
     highlight:'highlight',
     inverted: 'inverted',
     login:'login',
     social:'social',
    follow: 'follow',
    authLogin: 'authLogin'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button__container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button