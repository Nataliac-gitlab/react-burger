import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../servives/api";
import { RegisterPayload } from "../servives/types";

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const from = location.state?.from?.pathname || "/";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [register, { isLoading, isError }] = useRegisterMutation({});

  const isFormValid =
    !isLoading &&
    form.name &&
    form.email &&
    form.password &&
    isEmailValid &&
    isPasswordValid;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    try {
      const response = await register({
        email: form.email,
        password: form.password,
        name: form.name,
      }).unwrap();
      if (response.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      // console.error(`Ошибка регистрации ${err}`);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Регистрация</h2>
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
