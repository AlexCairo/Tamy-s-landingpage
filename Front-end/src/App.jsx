import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AdminPage from './pages/Adminpage';
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./context/userContext";

function App() {
  return(
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element =  { <Homepage/>}/>
          <Route path='/login' element = {<LoginPage />}/>
          <Route path='/admin' element = {<AdminPage/>} />        
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
