import reducer, { initialState, setUser, clearUser } from "./slice";
import { UserType } from "../../../common/types";

describe("Profile redicer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const user: UserType = {
      name: "qqq",
      email: "qqq@yandex.ru",
      password: "password",
    };
    const action = setUser(user);
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user });
  });

  it("should handle clearUser", () => {
    const user: UserType = {
      name: "qqq",
      email: "qqq@yandex.ru",
      password: "password",
    };
    const prevState = { ...initialState, user };
    const action = clearUser();
    const state = reducer(prevState, action);
    expect(state).toEqual(initialState);
  });
});
