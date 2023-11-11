import Home from '../component/pages/Home';
import Category from "../component/pages/Category";
import Login from "../component/pages/Login";
import DefaultLayout from "../component/Layout/DefaultLayout";
import SignUp from '~/component/pages/Signup';
import Profile from '~/component/pages/Profile';
import Product from '~/component/pages/Product';
import ProductDetail from '~/component/pages/ProductDetail';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout},
    { path: '/category', component: Category, layout: DefaultLayout},
    { path: '/login', component: Login, layout: null},
    { path: '/signup', component: SignUp, layout: DefaultLayout},
    { path: '/profile', component: Profile, layout: null},
    { path: '/product', component: Product, layout: DefaultLayout},
    { path: '/product/:productid', component: ProductDetail, layout: DefaultLayout},

]

const privateRoutes = {

}

export {publicRoutes, privateRoutes}