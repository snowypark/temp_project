/** @jsxImportSource @emotion/react */
import { useQueryClient } from "react-query";
import OAuth2Page from "../OAuth2Page/OAuth2Page";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import OAuth2SignUpPage from "../OAuth2SignUpPage/OAuth2SignUpPage";
import OAuth2SignInPage from "../OAuth2SignInPage/OAuth2SignInPage";
import OAuth2MergePage from "../OAuth2MergePage/OAuth2MergePage";

function AuthPage() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    useEffect(() => {
        if(!!principalData) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        }
    }, []);

    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={ <SignInPage /> }/>
                <Route path='/signup' element={ <SignUpPage /> }/>
                <Route path='/oauth2' element={ <OAuth2Page /> } />
                <Route path='/oauth2/signup' element={ <OAuth2SignUpPage /> }/>
                <Route path='/oauth2/merge' element={ <OAuth2MergePage /> }/>
                <Route path='/oauth2/signin' element={ <OAuth2SignInPage /> }/>
            </Routes>
        </div>
    );
}

export default AuthPage;