import logo from './logo.svg';
import './App.css';
import Home from "./Theme/Theme12/home";
import 'react-notifications/lib/notifications.css';
import AdminIndex from "./Admin/index";

function App() {

  return (
      <div className="App">

          {
              window.location.href.includes('admin') ? ( <AdminIndex/>  ): (<Home/>)
          }

      </div>


  );
}

export default App;
