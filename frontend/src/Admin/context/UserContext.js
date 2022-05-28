import React from "react";
import {login, logout,register} from "../../Action/usercontroller";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("userInfo"),
    userInfo:  !!localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut,registerUser };

// ###########################################################


async function registerUser(dispatch,name,email,password,phone,history,setIsLoading, setError){

  var data= await register({name:name,email:email,password:password,phone:phone});

  if(data.err==1){

  }else{

  await  loginUser(dispatch,email,password,history,    setIsLoading, setError);

  }

  console.log(data);

}

async function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  var response=await login({email:email,password:password});

  if(response.err==1){
    setError(true);
    setIsLoading(false);
  }
  else{
    setTimeout(() => {
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/admin/dashboard')
    }, 2000);
  }

}

async function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
 await logout();
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/admin/login");
}
