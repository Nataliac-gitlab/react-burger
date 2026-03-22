import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import { useGetUserQuery, useUpdateUserMutation } from "./services/profile-api";
import { setUser } from "./services/slice";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getUser } from "./services/selectors";
import { UpdateUserPayload } from "../../services/types";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const [form, setForm] = useState<UpdateUserPayload>({
    name: "",
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const { data, isLoading, isError, isSuccess } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateUserPost, { isLoading: isUpdating }] = useUpdateUserMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
    });
  };

  const isFormValid =
    !isUpdating &&
    form.email &&
    form.password &&
    form.name &&
    isEmailValid &&
    isPasswordValid;

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      console.error("Невалидные данные");
      return;
    }
    try {
      await updateUserPost(form).unwrap();
      console.log("Данные успешно сохранены");
    } catch (err) {
      console.error(`Ошибка сохранения данных пользоватиля: ${err}`);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.user) {
      setForm({ ...data.user, password: user?.password || "" });
      dispatch(setUser({ ...data.user }));
    }
  }, [data, isSuccess, dispatch, user?.password]);

  const isFooterVisible =
    form.email !== user?.email ||
    form.password !== user?.password ||
    form.name !== user?.name;

  return (
    <form className={styles.container} onSubmit={handleSave}>
      {isLoading && <span>Загружаем данные пользователя...</span>}
      {isError && <span>Ooops... ошибка загрузки данных пользователя :(</span>}
      {isSuccess && (
        <>
          <div className={styles.input}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name="name"
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              icon="EditIcon"
              extraClass="ml-1"
              disabled={isUpdating}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className={styles.input}>
            <EmailInput
              onChange={onChange}
              placeholder={"Логин"}
              value={form.email}
              name="email"
              isIcon={true}
              disabled={isUpdating}
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
              icon="EditIcon"
              disabled={isUpdating}
              checkValid={(isValid) => {
                setIsPasswordValid(isValid);
              }}
            />
          </div>

          <footer className={styles.footer}>
            {isFooterVisible && (
              <div>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="medium"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Отменить
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="medium"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            )}
          </footer>
        </>
      )}
    </form>
  );
};
