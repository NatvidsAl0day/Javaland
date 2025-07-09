import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Tours from './pages/Tours';
import SearchBar from './shared/SearchBar';
import TourCard from './shared/TourCard';
import TourDetails from './pages/TourDetails';
import FeaturedTourList from './pages/Featured-tours/FeaturedTourList';
import ThankYou from './pages/ThankYou';
import Newslatter from './shared/Newslatter';
import SearchResultList from './pages/SearchResultList';
import { AuthContextProvider } from './context/AuthContext';
import Header from './pages/Header/Header';
import Register from './pages/Register';
import Admin from './pages/Admin/Admin';
import EditTours from './pages/Admin/EditTours';
import LoginAdmin from './pages/Admin/LoginAdmin';
import PrivateRoute from './context/privateRoute';
import { AdminAuthContext, AdminAuthContextProvider } from './context/AdminAuthContext';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/home'/>,
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/tours",
    element: <Tours/>,
  },
  {
    path: "/srbar",
    element: <SearchBar/>,
  },
  {
    path: "/trcard",
    element: <TourCard/>,
  },
  {
    path: "/featuredlist",
    element: <FeaturedTourList/>,
  },
  {
    path: "/tours/:id",
    element: <TourDetails/>,
  },
  {
    path: "/thank-you",
    element: <ThankYou/>,
  },
  {
    path: "/nwslatter",
    element: <Newslatter/>,
  },
  {
    path: "/tours/search",
    element: <SearchResultList/>,
  },
  {
    path: "/header",
    element: <Header/>,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <PrivateRoute>
        <EditTours />
      </PrivateRoute>
    )
  },
  {
    path: "/logadmin",
    element: <LoginAdmin/>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthContextProvider>
    <AdminAuthContextProvider>
      <RouterProvider router={router}/>
    </AdminAuthContextProvider>
  </AuthContextProvider>
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
