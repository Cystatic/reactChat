import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6243be4064d4c2afa07d671a",
    username: "Jack",
    email: "jack@qq.com",
    password: "$2b$10$FOnu/uJswE4xC5vGx6a1ReZm1A5e3bQIVV7PooVjpDyxz285fU0t.",
    profilePicture: "person/4.jpeg",
    coverPicture: "post/4.jpeg",
    followers: ["624292b637d2e50467abf4d4"],
    followings: ["624292b637d2e50467abf4d4"],
    isAdmin: false,
    city: "合肥",
    desc: "踌躇百步无寸功",
    from: "六安",
    relationship: 2,
  },
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  // 给出初始状态和调度
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
