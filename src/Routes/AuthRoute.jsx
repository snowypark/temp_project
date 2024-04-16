import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import SearchPage from '../pages/SearchPage/SearchPage';
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import RootHeader from '../components/rootHeader/RootHeader';
import AuthPage from '../pages/AuthPage/AuthPage';
import AdminRoute from '../pages/Admin/route/AdminRoute';
import DonationPageboard2 from '../pages/DonationUpdatePage/DonationPageUpdateboard';
import DonationStoryPage from '../pages/DonationStoryPage/DonationStoryPage';
import ReviewPage from '../pages/ReviewPage/ReviewPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MainPage2 from '../pages/DonationChallengerPage/MainPage2';
import NewsPage from '../pages/DonationStoryPage/CategoryPage/NewsPage';
import NewsWrite from '../pages/DonationPageBoard/CategoryPage/NewsWrite';
import DonationPageUpdateBoard from '../pages/DonationUpdatePage/DonationPageUpdateboard';
import NewsUpdatePage from '../pages/DonationStoryPage/CategoryPage/NewsUpdatePage';



function AuthRoute(props) {

    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,{//focus 변경정로도
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response.data);
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });
    return (

        <>
            <RootHeader />
            <Routes>
                <Route path="/auth/*" element={ <AuthPage />}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard/>} />
                <Route path="/main/donation/donationnews" element={ <NewsWrite />} />
                <Route path="/account/mypage" element={<MyPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } /> 
                <Route path='/signup' element={ <SignUpPage /> }/>
                <Route path="/main/review" element={< ReviewPage/>} />
                <Route path="/donation/*" element={<DonationStoryPage />} />
                <Route path="/main/donation/update" element={<DonationPageUpdateBoard />} />
                <Route path='/main/donation/news/update' element={<NewsUpdatePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path='/main/donations/challenge' element={ < MainPage2 />} />

       
           </Routes> 
        </>
    );
}

export default AuthRoute;