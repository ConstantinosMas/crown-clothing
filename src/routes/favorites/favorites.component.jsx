import { useEffect } from "react";
import { checkUserSession } from "../../store/user/user.action";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserFavorites, selectCurrentUser, selectUserIsLoading } from "../../store/user/user.selectors";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import './favorites.styles.scss';


const Favorites = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const userFavorites = useSelector(selectUserFavorites);
    const isLoading = useSelector(selectUserIsLoading);

    useEffect(() => {  
        dispatch(checkUserSession());   
      }, []);


    return (
        <>
        <h2 className="category-name">FAVORITES</h2>
        {
            isLoading ? 
            <Spinner /> : (
            <>
            {
            !currentUser ?
                <h4 className="not-logged-in">You need to be <Link className="log-in-link" to='/auth'>logged in</Link> to view favorites</h4> : (    
                    <div className="category-container">
                    {
                        userFavorites.length > 0 &&
                            userFavorites.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                        })
                    }
                </div>
                ) 
            }
            </>)    
        }
        
        </>
    )
}

export default Favorites;