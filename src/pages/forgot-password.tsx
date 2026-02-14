import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../servives/api";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setStateEmail] = useState<string>("");
  const [forgotPasswordPost, { isError, isLoading }] =
    useForgotPasswordMutation();
  const isDisabled = isLoading || !email;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStateEmail(e.target.value);
  };

  const handleOnClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPasswordPost({ email }).unwrap();
      if (response.success && response.message === "Reset email sent") {
        navigate("/reset-password");
      }
    } catch (err) {
      console.log(`Ошибка восстановления пароля ${err}`);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.title}>Восстановление пароля</div>
      <div className={styles.input}>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder="Укажите e-mail"
        />
      </div>

      <div className={styles.button}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          {isLoading ? "Восстановление..." : "Восстановить"}
        </Button>
      </div>
      {isError && (
        <div className={styles.error}>Ошибка восстановления пароля</div>
      )}

      <div className={styles.text}>
        Вспомнили пароль?
        <span className={styles.link} onClick={() => navigate("/login")}>
          Войти
        </span>
      </div>
    </form>
  );
};
