/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as s from "./style";
import { useInput } from "../../hooks/useInput";
import { signinRequest } from "../../apis/api/SignIn";

function SignInPage(props) {

    const [ username, usernameChange ] = useInput();
    const [ password, passwordChange ] = useInput();
    
    const handleLogin = (e) => {
        signinRequest({
            username,
            password
        }).then(response => {
            const accessToken = response.data;
            console.log(accessToken);
            localStorage.setItem("AccessToken", accessToken);
            window.location.replace("/");
        }).catch(error => {
            alert(error.response.data);
        })
    }

    return (
        <>
        <div css={s.header}>
                <h1>로그인</h1>
                <button onClick={handleLogin}>로그인하기</button>
            </div>
            <input type={"text"} name={"username"} placeholder={"사용자 ID"} value={username} onChange={usernameChange} />
            <input type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
            <Link to={"/signup"}>회원가입</Link>
            <div>
                <a href={null}>카카오로그인</a>
                <a href={null}>구글로그인</a>
                <a href={null}>네이버로그인</a>
            </div>
        </>
    );
}

export default SignInPage;