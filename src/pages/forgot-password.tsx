import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../servives/api";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setStateEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [forgotPasswordPost, { isError, isLoading }] =
    useForgotPasswordMutation();
  const isFormValid = !isLoading && email && isEmailValid;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStateEmail(e.target.value);
  };

  const handleOnClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    try {
      const response = await forgotPasswordPost({ email }).unwrap();
      if (response.success && response.message === "Reset email sent") {
        navigate("/reset-password", {
          state: { from: location },
          replace: true,
        });
      }
    } catch (err) {
      console.error(`Ошибка восстановления пароля ${err}`);
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
          checkValid={(isValid) => {
            setIsEmailValid(isValid);
          }}
        />
      </div>

      <div className={styles.button}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleOnClick}
          disabled={!isFormValid}
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
