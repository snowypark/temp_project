/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import * as s from "./style";
import Select from "react-select";
import { useInput } from "../../hooks/useInput";
import { useMutation, useQueryClient } from 'react-query';
import { submitDonatorEditData } from "../../apis/api/donatorApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { storage } from "../../apis/filrebase/config/firebaseConfig";

function UserInfoEditPage(props) {
    // useAuthCheck();
    const [ oldPassword, handleOldPassword, oldMessage, setOldMessage ] = useInput("oldPassword");
    const [ newPassword, handleNewPassword, newMessage, setNewMessage ] = useInput("newPassword");
    const [ newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheckMessage ] = useInput("newPasswordCheck");
    const [ name, handleNewName ] = useInput();
    const [ email, handleNewEmail ] = useInput();
    const [ age , handleNewAge ] = useInput();
    const [ gender, setGender ] = useState(); 
    const [ phonenumber , handlePhoneNumber ] = useInput(); 
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [profileImg, setProfileImg] = useState("");
    const imgFileRef = useRef();

    const editMutation = useMutation({
        mutationKey: "editMutation",
        mutationFn: submitDonatorEditData,
        onSuccess: response => {
            console.log(response);
            alert("정상적으로 변경하였습니다.\n다시 로그인 하세요.");
            localStorage.removeItem("AccessToken");
            // window.location.replace("/auth/signin");
        },
        onError: error => {
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                setOldMessage(null);
                setNewMessage(null);
                setNewCheckMessage(null);
                for(let [ k, v ] of errorEntries) {
                    const message = {
                        type: "error",
                        text: v
                    }
                    if(k === "oldPassword") {
                        setOldMessage(() => message);
                    }
                    if(k === "newPassword") {
                        setNewMessage(() => message);
                    }
                    if(k === "newPasswordCheck") {
                        setNewCheckMessage(() => message);
                    }
                }
            }
        }
    });
    
    const handleImgFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            e.target.value = "";
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setProfileImg(e.target.result);  
        };
        fileReader.readAsDataURL(e.target.files[0]);
        
        const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        
        uploadTask.on(
            "state_changed",
            Snapshot => {},
            error => {},
            () => {
                alert("업로드를 완료하셨습니다.");
                getDownloadURL(storageRef)
                    .then(url => {
                        setProfileImg(() => url);
                    });
            }   
        );
    };

    const handleEditSubmitClick = () => {
        console.log(principalData.data);
        editMutation.mutate({
            userId:principalData?.data.userId,
            username:principalData?.data.username,
            oldPassword,
            newPassword,
            newPasswordCheck,
            name,
            email,
            age,
            gender,
            phonenumber,
            profileImg
        });
    }

    const genderOption = [
        {
            value: "male",
            label: "남성"
        },
        {
            value: "female",
            label: "여성"
        },
        {
            value: "none",
            label: "선택안함"
        },
    ];

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption.value);
    };

    return (
        <>
        <title>회원 정보 수정</title>
        <div>
            <label htmlFor={name}>닉네임:</label>
            <input type="text" id={name} onChange={handleNewName} required/>
        </div>  
        <div>
            <label htmlFor={"password"}>비밀번호:</label>
            <input type={"password"} id={oldPassword} onChange={handleOldPassword} placeholder={"현재 비밀번호를 입력하세요."} message={oldMessage}/>
            <input type={"password"} id={newPassword} onChange={handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요."} message={newMessage}/>
            <input type={"password"} id={newPasswordCheck} onChange={handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인하세요."} message={newCheckMessage}/>
        </div> 
        <div>
            <label htmlFor={email}>이메일:</label>
            <input type="email" id={email} onChange={handleNewEmail} required />
        </div> 
        <div>   
            <label htmlFor={age}>나이:</label>
            <input type="date" id={age} onChange={handleNewAge} required />
        </div> 
        <div>
            <label htmlFor="gender">성별:</label>
            <Select 
                options={genderOption}
                value={{ value: setGender, label: gender }}
                onChange={handleGenderChange}
            />
        </div>
        <div>
            <label htmlFor={phonenumber}>전화번호:</label>
            <input type="text" id={phonenumber} onChange={handlePhoneNumber} required/>
        </div>
        <div css={s.imgBox} onClick={() => imgFileRef.current.click()}>
                <input type="file" style={{ display: "none" }} ref={imgFileRef} multiple={true} onChange={handleImgFileChange} />
                <img src={profileImg} alt="" />
        </div>
        <div>
            <button type="submit" onClick={handleEditSubmitClick}>제출하기</button>
        </div>    
        
        </>
    );
}

export default UserInfoEditPage;