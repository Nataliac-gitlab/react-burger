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

enum HeaderItemText {
  constructor = "Конструктор",
  list = "Лента заказов",
  profile = "Личный кабинет",
}

type TIconProps = { type: "primary" | "secondary" };

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
            title: HeaderItemText.constructor,
            Icon: BurgerIcon,
          })}
          {renderNavLink({
            to: "order-feed",
            title: HeaderItemText.list,
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
            title: HeaderItemText.profile,
            Icon: ProfileIcon,
          })}
        </div>
      </nav>
    </header>
  );
};
