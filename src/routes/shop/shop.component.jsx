import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setCategories } from '../../store/categories/category.action';
import { setterMethod } from '../../store/cart/cart.action';
import { SETTER_METHOD_TYPES } from '../../store/cart/cart.types';
import { selectCartIconPulsate } from '../../store/cart/cart.selectors';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();
    const makeCartIconPulsate = useSelector(selectCartIconPulsate);

    useEffect(()=>{
        const getShopItems = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        };

        getShopItems();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setterMethod(SETTER_METHOD_TYPES.setMakeCartIconPulsate, false));
        }, 800);
    }, [makeCartIconPulsate]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>         
    )
}

export default Shop;