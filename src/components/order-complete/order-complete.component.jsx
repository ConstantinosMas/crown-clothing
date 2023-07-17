import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import './order-complete.styles.scss';

const OrderComplete = () => {
    return (
        <div className="order-complete-container">
            <div className="icon-container">
                <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2>Your order has been placed</h2>
            <p>Thank you for shopping with us</p>
        </div>
    )
}

export default OrderComplete;