import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function OAuth2SignInPage(props) {
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    useEffect(() => {
        localStorage.setItem("AccessToken", accessToken);
        window.location.replace("/");
    }, []);
    return (
        <div>
            
        </div>
    );
}

export default OAuth2SignInPage;