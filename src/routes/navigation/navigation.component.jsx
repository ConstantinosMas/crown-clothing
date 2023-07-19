import { Fragment } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useSelector, useDispatch } from 'react-redux';
import { setterMethod } from '../../store/cart/cart.action';
import { signOutStart } from '../../store/user/user.action';
import { SETTER_METHOD_TYPES } from '../../store/cart/cart.types';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { selectIsCartDropdownOpen } from '../../store/cart/cart.selectors';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartFill  }  from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartEmpty} from '@fortawesome/free-regular-svg-icons';
import './navigation.styles.scss';

const Navigation = () => {

    const dispatch = useDispatch();

    const iscartDropdownOpen = useSelector(selectIsCartDropdownOpen);
    const currentUser = useSelector(selectCurrentUser);
    const currentRoute = useLocation().pathname;

    const burgerButtonhandler = () => {
        iscartDropdownOpen && dispatch(setterMethod(SETTER_METHOD_TYPES.setiscartDropdownOpen));
    };

    const signOutHandler = () => dispatch(signOutStart());

    
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>         
            <div className='nav-links-container'>
                <input onClick={burgerButtonhandler} id="menu-toggle" type="checkbox" />
                    <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    {currentUser && <li>
                                        <Link className='nav-link' to='/favorites'>
                                            <span className={currentRoute == '/favorites' ? 'nav-link active' : 'nav-link'}><FontAwesomeIcon icon={currentRoute == '/favorites' ? heartFill : heartEmpty} /></span>
                                        </Link>
                                   </li>}
                    <li><Link className='nav-link' to='/'>
                            <span className={currentRoute == '/' ? 'nav-link active' : 'nav-link'}>HOME</span>
                        </Link>
                    </li>
                    <li><Link className='nav-link' to='/shop'>
                            <span className={currentRoute == '/shop' ? 'nav-link active' : 'nav-link'}>SHOP</span>
                        </Link>
                    </li>
                    <li>{
                        currentUser ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : 
                        (<Link className='nav-link' to='/auth'> 
                        <span className={currentRoute == '/auth' ? 'nav-link active' : 'nav-link'}>SIGN IN</span> 
                        </Link>)
                        }
                    </li>
                </ul>
                <CartIcon />
            </div>
            {iscartDropdownOpen && <CartDropdown />} 
        </div>
        <Outlet/>

        <div className='website-footer'>
            <span>@2023 Constantinos Mastrapas</span>
        </div>
      </Fragment> 
      )
  }

export default Navigation;