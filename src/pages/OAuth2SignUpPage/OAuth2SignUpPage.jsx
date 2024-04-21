/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useInput } from "../../hooks/useInput";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oAuth2SignupRequest } from "../../apis/api/SignUp";
import { useMutation } from "react-query";

function OAuth2SignUpPage(props) {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const [ username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage ] = useInput("username");
    const [ password, passwordChange, passwordMessage ] = useInput("password");
    const [ checkPassword, checkPasswordChange ] = useInput("checkPassword");
    const [ name, nameChange, nameMessage ] = useInput("name");
    const [ email, emailChange, emailMessage ] = useInput("email");
    const [ checkPasswordMessage, setCheckPasswordMessage ] = useState(null);

    const oAuth2SignupMutation = useMutation({
        mutationKey: "oAuth2SignupMutation",
        mutationFn: oAuth2SignupRequest,
        onSuccess: response => {
            console.log(response);
            localStorage.setItem("AccessToken", response.data);
            navigate("/account/mypage");
            window.location.reload();
        },
        onError: error => {
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                for(let [ k, v ] of errorEntries) {
                    if(k === "username") {
                        setUsernameMessage(() => {
                            return {
                                type: "error",
                                text: v
                            }
                        })
                    }
                }
            } else {
                alert("회원가입 오류");
            }
        }
    });

    useEffect(() => {
        oAuth2SignupMutation.mutate({
            oauth2Name: searchParams.get("name"),
            providerName: searchParams.get("provider")
        });
    }, [checkPassword, password]);

    return (
        <>
        </>
    );
}

export default OAuth2SignUpPage;