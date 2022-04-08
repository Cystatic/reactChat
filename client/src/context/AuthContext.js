// import { createContext, useReducer } from "react";
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   user: {
//     _id: "6243be4064d4c2afa07d671a",
//     username: "Jack",
//     email: "jack@qq.com",
//     password: "$2b$10$FOnu/uJswE4xC5vGx6a1ReZm1A5e3bQIVV7PooVjpDyxz285fU0t.",
//     profilePicture: "person/4.jpeg",
//     coverPicture: "post/4.jpeg",
//     followers: [],
//     followings: [],
//     isAdmin: false,
//     city: "合肥",
//     desc: "踌躇百步无寸功",
//     from: "六安",
//     relationship: 2,
//   },
// };

// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }) => {
//   // 给出初始状态和调度
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
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
