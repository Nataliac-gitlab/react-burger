import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Layout } from "../../pages/layout";
import { Home } from "../../pages/home";
import { Login } from "../../pages/login";
import { IngredientModal } from "../burger-ingredients/ingredient-modal";
import { IngredientDetails } from "../burger-ingredients/ingredient-details/ingredient-details";
import { Register } from "../../pages/register";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Orders } from "../../pages/orders";
import { Profile } from "../../pages/profile";
import { ProfileForm } from "../profile-components/profile-form";
import { ProtectedRoute } from "../protected-route/protected-route";

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                {(user) => <Profile user={user} />}
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<Orders />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={
              <ProtectedRoute isPublic>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute isPublic>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRoute isPublic>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path="ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
