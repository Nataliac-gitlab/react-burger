import React from "react";
import styles from "./profile-menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../servives/hooks";
import { useLogoutMutation } from "../../servives/api";
import { clearUser } from "./services/slice";

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutPost, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    if (isLoading) {
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await logoutPost({ token: refreshToken }).unwrap();
        if (response.success && response.message === "Successful logout") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(clearUser());
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error(`Ошибка выхода из системы ${err}`);
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
