import React, { useState } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { HeaderItem } from "./header-item";
import styles from "./app-header.module.css";

enum HeaderItemText {
  constructor = "Конструктор",
  list = "Лента заказов",
  account = "Личный кабинет",
}

export const AppHeader = () => {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState<HeaderItemText>(
    HeaderItemText.constructor
  );
  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <div className={styles.left_group}>
            <HeaderItem
              text={HeaderItemText.constructor}
              isSelected={selectedHeaderItem === HeaderItemText.constructor}
              onClick={() => setSelectedHeaderItem(HeaderItemText.constructor)}
            >
              <BurgerIcon
                type={
                  selectedHeaderItem === HeaderItemText.constructor
                    ? "primary"
                    : "secondary"
                }
              />
            </HeaderItem>
            <HeaderItem
              text={HeaderItemText.list}
              isSelected={selectedHeaderItem === HeaderItemText.list}
              onClick={() => setSelectedHeaderItem(HeaderItemText.list)}
            >
              <ListIcon
                type={
                  selectedHeaderItem === HeaderItemText.list
                    ? "primary"
                    : "secondary"
                }
              />
            </HeaderItem>
          </div>

          <div className={styles.logo}>
            <Logo />
          </div>

          <div className={styles.right_group}>
            <HeaderItem
              text={HeaderItemText.account}
              isSelected={selectedHeaderItem === HeaderItemText.account}
              onClick={() => setSelectedHeaderItem(HeaderItemText.account)}
            >
              <ProfileIcon
                type={
                  selectedHeaderItem === HeaderItemText.account
                    ? "primary"
                    : "secondary"
                }
              />
            </HeaderItem>
          </div>
        </div>
      </header>
    </>
  );
};
