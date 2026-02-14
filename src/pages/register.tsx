import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../servives/hooks";
import { useRegisterMutation } from "../servives/api";
import { setUser } from "../components/profile-components/services/slice";

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [register, { isLoading, isError }] = useRegisterMutation({});

  const isDisabled = !(form.name && form.password && form.email) || isLoading;

  const handleOnClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await register({
        email: form.email,
        password: form.password,
        name: form.name,
      }).unwrap();
      if (response.success) {
        const { user } = response;
        dispatch(setUser(user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(`Ошибка регистрации ${err}`);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.title}>Регистрация</div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </div>
      <div className={styles.input}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass="mb-2"
        />
      </div>
      <div className={styles.button}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={isDisabled}
          onClick={handleOnClick}
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </div>
      {isError && <div className={styles.error}>Ошибка регистрации</div>}

      <div className={styles.text}>
        Уже зарегистрированы?
        <span className={styles.link} onClick={() => navigate("/login")}>
          Войти
        </span>
      </div>
    </form>
  );
};
