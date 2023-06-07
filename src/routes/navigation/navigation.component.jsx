import { Fragment, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { selectIsCartDropdownOpen } from '../../store/cart/cart.selectors';
import { SignOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {



    const iscartDropdownOpen = useSelector(selectIsCartDropdownOpen);
    const currentUser = useSelector(selectCurrentUser);
    const currentRoute = useLocation().pathname;
    
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>         
            <div className='nav-links-container'>
                <input id="menu-toggle" type="checkbox" />
                    <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    <li><Link className='nav-link' to='/'>
                            <span className={currentRoute == '/' ? 'nav-link active' : 'nav-link'}>HOME</span>
                        </Link>
                    </li>
                    <li><Link className='nav-link' to='/shop'>
                            <span className={currentRoute == '/shop' ? 'nav-link active' : 'nav-link'}>SHOP</span>
                        </Link>
                    </li>
                    <li>{
                        currentUser ? (<span className='nav-link' onClick={SignOutUser}>SIGN OUT</span>) : 
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