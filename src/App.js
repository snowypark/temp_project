import './App.css';
import AuthRoute from './Routes/AuthRoute';
import { Route, Routes } from 'react-router-dom';
import { getPrincipalRequest } from './apis/api/principal';
import { useQuery } from 'react-query';
import MyPage from './pages/MyPage/MyPage';
import TeamCreatePage from './pages/TeamCreatePage/TeamCreatePage';
import DonatorInfo from './pages/DonatorInfo/DonatorInfo';

function App() {
  return (
    <>
       <AuthRoute />
    </>
  );
}

export default App;