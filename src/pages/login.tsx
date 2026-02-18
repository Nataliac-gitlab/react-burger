import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../servives/api";
import { setUser } from "../components/profile-components/services/slice";
import { useAppDispatch } from "../servives/hooks";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
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

  const handleOnClick = async (e: FormEvent) => {
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
        const { user } = response;
        dispatch(setUser({ ...user, password: form.password }));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(`Ошибка входа в систему ${err}`);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.title}>Вход</div>
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
          onClick={handleOnClick}
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
