import React from "react";
import styles from "./profile-menu.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../../services/api";

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const [logoutPost] = useLogoutMutation();
  const location = useLocation();
  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const ordersText =
    "В этом разделе вы можете просмотреть историю своих заказов";
  const text =
    location.pathname === "/profile"
      ? profileText
      : location.pathname === "/profile/orders"
        ? ordersText
        : "";

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await logoutPost({ token: refreshToken }).unwrap();
        if (response.success && response.message === "Successful logout") {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        //console.error(`Ошибка выхода из системы ${err}`);
      }
    }
  };

  return (
    <div className={styles.menu}>
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          isActive ? styles.active_link : styles.normal_link
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          isActive ? styles.active_link : styles.normal_link
        }
      >
        История заказов
      </NavLink>
      <div className={styles.normal_link} onClick={handleLogout}>
        Выход
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
