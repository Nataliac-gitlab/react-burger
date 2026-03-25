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
import { Feed } from "../../pages/feed";
import { Profile } from "../../pages/profile";
import { Page404 } from "../../pages/page-404";
import { ProfileForm } from "../profile-components/profile-form";

import { ProtectedRoute } from "../protected-route/protected-route";
import { CardDetails } from "../feed-components/card-details/card-details";
import { FeedModal } from "../feed-components/feed-modal";
import { ProfileOrders } from "../profile-components/profile-orders";

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const feedBackground = location.state?.feedBackground;
  const profileBackground = location.state?.profileBackground;
  const displayLocation =
    background || feedBackground || profileBackground || location;

  return (
    <>
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="feed" element={<Feed />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<ProfileOrders />} />
          </Route>
          <Route
            path="login"
            element={
              <ProtectedRoute isPublic>
                <Login />
              </ProtectedRoute>
            }
          />
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
          <Route path="feed/:number" element={<CardDetails />} />
          <Route
            path="profile/orders/:number"
            element={
              <ProtectedRoute>
                <CardDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
      {feedBackground && (
        <Routes>
          <Route path="/feed/:number" element={<FeedModal />} />
        </Routes>
      )}

      {profileBackground && (
        <Routes>
          <Route path="/profile/orders/:number" element={<FeedModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
