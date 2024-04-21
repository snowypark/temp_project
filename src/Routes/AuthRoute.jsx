import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import SearchPage from '../pages/SearchPage/SearchPage';
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import RootHeader from '../components/rootHeader/RootHeader';
import AuthPage from '../pages/AuthPage/AuthPage';
import AdminRoute from '../pages/Admin/route/AdminRoute';
import DonationPageboard2 from '../pages/DonationUpdatePage/DonationUpdatePageboard';
import DonationStoryPage from '../pages/DonationStoryPage/DonationStoryPage';
import ReviewPage from '../pages/ReviewPage/ReviewPage'
import MessagePage from '../pages/MessagePage/MessagePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import NewsWrite from '../pages/DonationPageBoard/CategoryPage/NewsWrite';
import NewsUpdatePage from '../pages/DonationStoryPage/CategoryPage/NewsUpdatePage'
import MyDonation from '../pages/MyDonation/MyDonation';
import DonatorInfo from '../pages/DonatorInfo/DonatorInfo';
import NowFundingPage from '../pages/MainPage/fundings/NowFundingPage';
import EndedFundingsPage from '../pages/MainPage/fundings/EndedFundings';
import TeamRoutePage from '../pages/TeamRoutePage/TeamRoutePage';
import TeamSelectPage from '../pages/DonationPageBoard/TeamSelectPage';
import DonationChallengePage from '../pages/DonationChallengerPage/DonationChallengePage';
import ChallengeMainPage from '../pages/MainPage/ChallengeMainPage';

function AuthRoute(props) {

    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {//focus 변경정로도
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log("Auth: "+response.data);
            },
            onError: error => {
                console.log("오류");
                console.log(error);
            }
        }
    );

    return (
        <>

        <RootHeader/>
        <Routes>
            <Route path="/auth/*" element={ <AuthPage />}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard/>} />
                <Route path="/main/donation/donationnews" element={ <NewsWrite />} />
                <Route path="/account/mypage" element={<MyPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } /> 
                <Route path="/main/review" element={< ReviewPage/>} />
                <Route path="/donation/*" element={<DonationStoryPage />} />
                <Route path="/main/donation/update" element={<DonationPageboard2 />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/message" element={<MessagePage />} />
                <Route path='/main/donations/challenge' element={ < ChallengeMainPage />} />
                <Route path='/main/challenge/write' element={< DonationChallengePage />} />
                <Route path='/main/donation/news/update' element={<NewsUpdatePage />} />       
                <Route path="/test" element= {<DonatorInfo/>} />
                <Route path="/account/mypage/donation" element={<MyDonation />} />        
                <Route path="/main/donation/fundings/now" element= {  <NowFundingPage />} />
                <Route path="/main/donation/fundings/end" element= {  <EndedFundingsPage />} />
                <Route path='/team/*' element={<TeamRoutePage />} />
                <Route path='/team/select' element={<TeamSelectPage />} />
           </Routes> 

        </>
    );
}

export default AuthRoute;