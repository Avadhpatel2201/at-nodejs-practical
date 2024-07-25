import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp1 from 'views/auth/signup/SignUp1';
import Signin1 from 'views/auth/signin/SignIn1';
import DashDefault from 'views/dashboard';
import SamplePage from 'views/extra/SamplePage';
import Loader from 'components/Loader/Loader';
import AdminLayout from 'layouts/AdminLayout';
import Logout from 'views/extra/Logout';
import ChangePassword from 'views/extra/ChangePassword';
const App = () => {
  const Guard = Fragment;
  const Layout = AdminLayout || Fragment;
 /*  return <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>; */
  return (
    <Router>
      <Suspense fallback={<Loader />}>
      <Routes>
      <Route path="/" element={<SignUp1 />} />
      <Route path="/login" element={<Signin1 />} /> 
      <Route path="/logout" element={<Logout />} /> 
      <Route path="/change_password" element={
              <Guard>
                <Layout><ChangePassword /></Layout>
              </Guard>
            } /> 
      <Route path="/dashboard" element={
              <Guard>
                <Layout><SamplePage /></Layout>
              </Guard>
            } />
      </Routes>
      
      </Suspense>
    </Router>
  );
};

export default App;
