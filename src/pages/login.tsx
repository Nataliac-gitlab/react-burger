import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../components/profile-components/services/profile-api";
import { LoginPayload } from "../services/types";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [loginPost, { isLoading, isError }] = useLoginMutation();

  const isFormValid =
    !isLoading &&
    form.email &&
    form.password &&
    isEmailValid &&
    isPasswordValid;

  const from = location.state?.from?.pathname || "/";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    try {
      const response = await loginPost({
        email: form.email,
        password: form.password,
      }).unwrap();
      if (response.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      //console.error(`Ошибка входа в систему ${err}`);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.input}>
        <EmailInput
          onChange={onChange}
          placeholder={"E-mail"}
          value={form.email}
          name={"email"}
          isIcon={false}
          checkValid={(isValid) => {
            setIsEmailValid(isValid);
          }}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass="mb-2"
          checkValid={(isValid) => {
            setIsPasswordValid(isValid);
          }}
        />
      </div>
      <div className={styles.button}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isFormValid}
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </div>
      {isError && <div className={styles.error}>Ошибка входа</div>}

      <div className={styles.text}>
        Вы - новый пользователь?
        <span className={styles.link} onClick={() => navigate("/register")}>
          Зарегистрироваться
        </span>
      </div>

      <div className={styles.text}>
        Забыли пароль?
        <span
          className={styles.link}
          onClick={() => navigate("/forgot-password")}
        >
          Восстановить пароль
        </span>
      </div>
    </form>
  );
};
