import React from "react";
import styles from "./profile-menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../servives/api";

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const [logoutPost] = useLogoutMutation();

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
      <div className={styles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};
