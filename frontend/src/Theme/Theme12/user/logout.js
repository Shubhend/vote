import {useDispatch} from "react-redux";
import {login, logout} from "../../../Action/usercontroller";


async function LogoutPage ({location,history}) {
    const dispatch = useDispatch();

      await  dispatch(logout());

    const redirect ="/";
    history.push(redirect);

}

export default LogoutPage;