
import RegisterPage from "./user/register";
import LoginPage from "./user/login";
import Indexpage from "./index";


const Allroutes =[
    {
        'name': 'Home',
        'path': '/',
        'action': Indexpage,
        'display': true
    },
    {
        'name': 'Home',
        'path': '/index',
        'action': Indexpage,
        'display': true
    },
    {
        'name': 'login',
        'path': '/user/login',
        'action': LoginPage,
        'display': true,
        'liClassName': 'button-header margin-left'
    },
    {
        'name': 'Register',
        'path': '/user/register',
        'action': RegisterPage,
        'display': true,
        'liClassName': 'button-header margin-left'
    }



];

export default Allroutes;
