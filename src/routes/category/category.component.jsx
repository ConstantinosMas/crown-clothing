import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selectors';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import './category.styles.scss';

const Category = () => {

    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);     
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-name'>{category.toUpperCase()}</h2>
            {
                isLoading ? (
                <Spinner />
                ) : (
                <div className='category-container'>
                    {products &&
                            products.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })
                    }
                </div> 
                )
            }    
            
            
        </Fragment>
    )

}

export default Category;