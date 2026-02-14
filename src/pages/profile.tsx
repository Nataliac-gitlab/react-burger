import React from "react";
import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import { ProfileMenu } from "../components/profile-components/profile-menu";
import { UserType } from "../common/types";

type ProfileProps = {
  user: UserType;
};

export const Profile = (user: ProfileProps) => {
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
