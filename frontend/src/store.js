import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userreducer} from "./Reducer/userreducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {reactLocalStorage} from "reactjs-localstorage";

const userInfoStorage = reactLocalStorage.get('userInfo') ? JSON.parse(reactLocalStorage.get('userInfo')): null ;

const reducer = combineReducers({
      user:userreducer
});
const initialState={
     user:{userInfo:userInfoStorage}
};
const middleware = [thunk];
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)
    ));

export default store;