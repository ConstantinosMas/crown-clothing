import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import './warning.styles.scss';

const WarningMessage = ({ warningText }) => {

    return (
        <h6 className="warning-text">
            <FontAwesomeIcon icon={faCircleExclamation} fade /> {warningText}
        </h6>
    )

}

export default WarningMessage;