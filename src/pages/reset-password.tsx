import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useResetPasswordMutation } from "../components/profile-components/services/profile-api";
import { ResetPasswordPayload } from "../services/types";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<ResetPasswordPayload>({
    token: "",
    password: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [resetPasswordPost, { isLoading, isError }] =
    useResetPasswordMutation();
  const isFormValid =
    form.password && form.token && !isLoading && isPasswordValid;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    try {
      const response = await resetPasswordPost({
        password: form.password,
        token: form.token,
      }).unwrap();
      if (
        response.success &&
        response.message === "Password successfully reset"
      ) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error(`Ошибка восстановления пароля: ${err}`);
    }
  };
  if (from !== "/forgot-password") {
    return <Navigate to={"/page404"} replace />;
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Восстановление пароля</h2>

      <div className={styles.input}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          extraClass="mb-2"
          placeholder={"Введите новый пароль"}
          checkValid={(isValid) => {
            setIsPasswordValid(isValid);
          }}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.token}
          name={"token"}
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
          disabled={!isFormValid}
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
