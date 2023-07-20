import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
};

const Button = ({buttonTitle, buttonType, isLoading, paymentButton, ...otherProps}) => {
    return (
        <button className={`no-select ${paymentButton ? 'paymentButton' : ''} ${isLoading ? 'buttonSpinner' : 'button-container'} ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {buttonTitle}
        </button>
    )
}

export default Button;