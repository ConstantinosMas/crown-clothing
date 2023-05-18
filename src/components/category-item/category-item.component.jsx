import { useNavigate } from 'react-router-dom';
import './category-item.styles.scss';

const CategoryItem = ({category}) => {

    const {title, imageUrl} = category;
    const navigate = useNavigate();
    const currentCategory = category.title.toLowerCase();

    const navigateHandler = () => {
        navigate(`/shop/${currentCategory}`);
    };


    return (
        <div onClick={navigateHandler} className='home-category-container'>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}} />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
      </div>
    )
}

export default CategoryItem;