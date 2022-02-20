
import RegisterPage from "./user/register";
import LoginPage from "./user/login";
import Indexpage from "./index";
import Feed from "./feed";
import LogoutPage from "./user/logout";
import PofilePage from "./user/profile";
import ListCampaign from "./Campaign/listCampaign";
import CreateCampaign from "./Campaign/CreateCampaign"
import ImageCampaign from "./Campaign/Images";
import QrCampaign from "./Campaign/qrcode";




const Allroutes =[
    {
        'name': 'Feed',
        'path': '/feed',
        'action': Feed,
        'display': true,
        'position': 1,
        'icon': 'feather-tv btn-round-md bg-blue-gradiant me-3'
    },
    {
        'name': 'Home',
        'path': '/',
        'action': Indexpage,
        'display': true,
        'position': 1,
        'icon': 'feather-home btn-round-md bg-blue-gradiant me-3  '
    },
    {
        'name': 'Home',
        'path': '/index',
        'action': Indexpage,
        'display': false,
        'position': 1,
        'icon': 'feather-home btn-round-md bg-blue-gradiant me-3  '
    },
    {
        'name': 'login',
        'path': '/user/login',
        'action': LoginPage,
        'display': true,
        'hideOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Register',
        'path': '/user/register',
        'action': RegisterPage,
        'display': true,
        'hideOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Create Feed',
        'path': '/user/register',
        'action': RegisterPage,
        'display': true,
        'showOnLogin': true,
        'position': 1,
        'isAdmin': true,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Vote Campaign',
        'path': '/campaign/listCampaign',
        'action': ListCampaign,
        'display': true,
        'showOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Create Campaign',
        'path': '/campaign/create',
        'action': CreateCampaign,
        'display': false,
        'showOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Edit Campaign',
        'path': '/campaign/edit/:CampaignId',
        'action': CreateCampaign,
        'display': false,
        'showOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Qr Code',
        'path': '/campaign/qr/:CampaignId',
        'action': QrCampaign,
        'display': false,
        'showOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Add Campaign Images',
        'path': '/campaign/images/:CampaignId',
        'action': ImageCampaign,
        'display': false,
        'showOnLogin': true,
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Logout',
        'path': '#',
        'action': LogoutPage,
        'display': true,
        'showOnLogin': true,
        'onClick': 'logoutHandler',
        'position': 1,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },

    {
        'name': 'Profile',
        'path': '/user/profile',
        'action': PofilePage,
        'display': true,
        'showOnLogin': true,
        'position': 2,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Settings',
        'path': '/user/profile',
        'action': LogoutPage,
        'display': true,
        'showOnLogin': true,
        'position': 2,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    },
    {
        'name': 'Statics',
        'path': '/user/profile',
        'action': LogoutPage,
        'display': true,
        'showOnLogin': true,
        'position': 2,
        'icon': 'feather-user btn-round-md bg-primary-gradiant me-3'
    }


];

export default Allroutes;
