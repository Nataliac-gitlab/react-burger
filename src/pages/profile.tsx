import React from "react";
import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import { ProfileMenu } from "../components/profile-components/profile-menu";

export const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <ProfileMenu />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
