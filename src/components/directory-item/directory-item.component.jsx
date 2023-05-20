import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {

    const {title, imageUrl} = category;
    const navigate = useNavigate();
    const currentCategory = category.title.toLowerCase();

    const navigateHandler = () => {
        navigate(`/shop/${currentCategory}`);
    };


    return (
        <div onClick={navigateHandler} className='directory-item-container'>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}} />
            <div className='directory-item-body'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
      </div>
    )
}

export default DirectoryItem;