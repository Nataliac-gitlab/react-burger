import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../servives/api";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ code: "", password: "" });

  const [resetPasswordPost, { isLoading, isError }] =
    useResetPasswordMutation();
  const isDisabled = !form.password || !form.code || isLoading;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPasswordPost({
        password: form.password,
        token: form.code,
      }).unwrap();
      if (
        response.success &&
        response.message === "Password successfully reset"
      ) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(`Ошибка восстановления пароля: ${err}`);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.title}>Восстановление пароля</div>

      <div className={styles.input}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass="mb-2"
          placeholder={"Введите новый пароль"}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
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
          {isLoading ? "Сохранения..." : "Сохранить"}
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
