import React, { FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { HeaderItem } from "./header-item";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

//type TIconProps = { type: "primary" | "secondary" | "error" };

export const AppHeader = () => {
  const renderNavLink = ({
    to,
    title,
    Icon,
  }: {
    to: string;
    title: string;
    Icon: FC<TIconProps>;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? styles.active_link : styles.normal_link
      }
    >
      {({ isActive }) => (
        <HeaderItem text={title} isSelected={isActive}>
          <Icon type={isActive ? "primary" : "secondary"} />
        </HeaderItem>
      )}
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.left_group}>
          {renderNavLink({
            to: "/",
            title: "Конструктор",
            Icon: BurgerIcon,
          })}
          {renderNavLink({
            to: "feed",
            title: "Лента заказов",
            Icon: ListIcon,
          })}
        </div>
        <NavLink to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </NavLink>

        <div className={styles.right_group}>
          {renderNavLink({
            to: "/profile",
            title: "Личный кабинет",
            Icon: ProfileIcon,
          })}
        </div>
      </nav>
    </header>
  );
};
