import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from './Components/Authentication_Components/RegistrationForm'
import LoginForm from './Components/Authentication_Components/LoginForm';
import StandProductsPage from './Components/Products/StandProductsPage';
import StandProductsAdmin from './Components/StandAdmin_Components/StandAdminProducts/StandAdminProducts';
import StandRegistration from './Components/Authentication_Components/StandRegistration';
import StandsComponent from './Components/Stands/StandsComponent';
import StandAdmin from './Components/StandAdmin_Components/StandAdmin';
import Auth from './Components/Authentication_Components/Auth';
import CheckoutComponent from './Components/CheckOut/CheckoutComponent';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import About from './Components/About/About';
import UserOrdersPage from './Components/UserInfo_Components/Orders/UserOrdersPage';
import UserInfo from './Components/UserInfo_Components/UserInfo';
import UserPersonalInfo from './Components/UserInfo_Components/UserPersonalInfo';
import CheckOutComplete from './Components/CheckOut/CheckOutComplete';
import WebAdmin from './Components/Web_Administration_Components/WebAdmin';
import WebAdminProducts from './Components/Web_Administration_Components/WebAdminProducts/WebAdminProducts';
import WebAdminGeneral from './Components/Web_Administration_Components/WebAdminGeneral';
import WebAdminStands from './Components/Web_Administration_Components/WebAdminStands/WebAdminStands';
import WebAdminAreas from './Components/Web_Administration_Components/WebAdminAreas/WebAdminAreas';
import StandAdminCategories from './Components/StandAdmin_Components/StandAdminCategories';
import StandAdminInfo from './Components/StandAdmin_Components/StandAdminInfo';
import StandAdminOrders from './Components/StandAdmin_Components/Orders/StandAdminOrders';
import WebAdminOrders from './Components/Web_Administration_Components/WebAdminOrders/WebAdminOrders';


const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<WelcomePage />}></Route>
            <Route path="/about" element={<About />}></Route>

            {/* Authentication related components: */}
            <Route path="/auth" element={<Auth />}>
              <Route path="" element={<RegistrationForm />}></Route>
              <Route path="login" element={<LoginForm />}></Route>
            </Route>
            <Route path="standregister" element={<StandRegistration />} />

            {/* Stands, Products and order related components - the path to complete a purchase: */}
            <Route path="/allstands" element={<StandsComponent />} />
            <Route path="/shoppingprods/:stand_id" element={<StandProductsPage />} />
            <Route path="/checkoutpage/:stand_id" element={<CheckoutComponent />} />
            <Route path="/checkoutcomplete" element={<CheckOutComplete />} />

            {/* User profile related component: */}
            <Route path="/userinfo" element={<UserInfo />} >
              <Route path="" element={<UserPersonalInfo />} />
              <Route path="userorders" element={<UserOrdersPage />} />
            </Route>

            {/* Stand Administration related components: */}
            <Route path="/standadmin" element={<StandAdmin />} >
              <Route path="" element={<StandAdminInfo />} />
              <Route path="productsadmin" element={<StandProductsAdmin />} />
              <Route path="categoriesadmin" element={<StandAdminCategories />} />
              <Route path="ordersadmin" element={<StandAdminOrders />} />
            </Route>

            {/* Superuser/Web Admin related components: */}
            <Route path="/webadmin" element={<WebAdmin />} >
              <Route path="" element={<WebAdminGeneral />} />
              <Route path="areaswebadmin" element={<WebAdminAreas />} />
              <Route path="standswebadmin" element={<WebAdminStands />} />
              <Route path="productswebadmin" element={<WebAdminProducts />} />
              <Route path="orderswebadmin" element={<WebAdminOrders />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);
