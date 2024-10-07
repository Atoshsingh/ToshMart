// import React from 'react'
// import { Navigate ,Outlet } from "react-router-dom";
// import { useSelector , useDispatch } from "react-redux";
// // const {userInfo} = useSelector((store)=>store.auth);
// // //   const {search}  = useLocation();
// // //   const sp = new URLSearchParams(search);
// // //   const redirect = sp.get('redirect')||'/';
// // return userInfo ? <Outlet/>:<Navigate to="/login" replace/>;                     

// const PrivateRoute = () => {
//   const {userInfo} = useSelector((store)=>store.auth);
//   return userInfo ? <Outlet/>:<Navigate to="/login" replace/>;        
// }
// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;