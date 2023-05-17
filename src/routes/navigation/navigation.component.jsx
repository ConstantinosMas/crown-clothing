import { Fragment, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { SignOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {iscartDropdownOpen} = useContext(CartContext);

    const currentRoute = useLocation().pathname;
    
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>         
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    <span className={currentRoute == '/shop' ? 'nav-link active' : 'nav-link'}>SHOP</span>
                </Link>
                {
                    currentUser ? (<span className='nav-link' onClick={SignOutUser}>SIGN OUT</span>) : 
                    (<Link className='nav-link' to='/auth'> 
                    <span className={currentRoute == '/auth' ? 'nav-link active' : 'nav-link'}>SIGN IN</span> 
                    </Link>)
                }
                <CartIcon makeIconPulsate={true}/>
            </div>
            {iscartDropdownOpen && <CartDropdown />} 
        </div>
        <Outlet/>
      </Fragment> 
      )
  }

export default Navigation;