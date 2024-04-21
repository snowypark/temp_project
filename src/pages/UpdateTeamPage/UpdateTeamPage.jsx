/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import {v4 as uuid} from "uuid";
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { registerTeam, updateTeam, updateTeamRequest } from '../../apis/api/teamApi';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";

const header = css`
    & > div{
        max-width: 300px;
        margin-bottom: 20px;
    }
`   
const imgBox = css`
    & > img {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        overflow: hidden;
    }
`
function UpdateTeamPage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const navigate = useNavigate();
    const [ teamPhoneNumber, setTeamPhoneNumber ] = useState(teamInfo.teamPhoneNumber);
    const [ teamEmail,  setTeamEmail ] = useState(teamInfo.teamEmail);
    const [ teamHomepage,  setTeamHomepage ] = useState(teamInfo.teamHomepage);
    const [ teamInfoText,  setTeamInfoText ] = useState(teamInfo.teamInfoText);
    const [ teamLogoImgUrl,  setTeamLogoImgUrl ] = useState(teamInfo.teamLogoImgUrl);
    const [ accountInfos, setAccountInfos ] = useState(teamInfo.accounts);
    const [ createAccount, setCreateAccount ] = useState(false);
    const [ accountNumber, setAccount ] = useState();
    const [ bankName, setBankName ] = useState();
    const [ accountUsername, setAccountUsername ] = useState();
    const [ accountUrl, setAccountUrl ] = useState();
    const profileImgRef = useRef();
    const handleContentChange = (value) => {
        setTeamInfoText(() => value);
    }
    const updateTeamMutation = useMutation({
        mutationKey: "updateTeamMutation",
        mutationFn: updateTeamRequest,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    })
    const accountCounter = (e) => {
        setCreateAccount(() => true);
    }
    const submit = () => {
        const data = {
            teamId: teamInfo.teamId,
            teamPhoneNumber,
            teamEmail,
            teamHomepage,
            teamInfoText,
            teamLogoImgUrl,
            accountInfos      
        };
        updateTeamMutation.mutate(data);
        // accountInfos
        navigate(`/team/info?id=${teamInfo.teamId}`)
    }
    const handlefileChange = (e, setFile) => {
        const files = Array.from(e.target.files);
        if(files.length === 0) {
            e.target.value = "";
            return;
        }
        const storageRef = ref(storage, `donation/team/profile/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        console.log();
        uploadTask.on(
            "state_changed",
            Snapshot => {},
            error => {console.log(error.message);},
            () => {
                getDownloadURL(storageRef)
                .then(url => {
                    setFile(() => url);
                });
            }
        )
    }
    const handleAccountInfos = () => {
        const accountInfo = {
            accountUsername,
            accountNumber,
            bankName,
            accountUrl
        }
        setAccountInfos(() => [...accountInfos, accountInfo]);
        setAccountUsername(() => "");
        setAccountUrl(() => "");
        setAccount(() => "");
        setBankName(() => "");
        setCreateAccount(() => false)
    }
    const handleDeleteAccountInfos = (id) => {
        setAccountInfos(() => [...accountInfos.filter(accountInfo => accountInfo.accountId !== id)]);
    }
    return (
        <div css={header}>
            <div>
                팀 정보수정
            </div>
            <div>
                {teamInfo.teamName}
            </div>
            <div css={imgBox}>
                팀로고
                <input type="file" src="" alt="" ref={profileImgRef} style={{display:"none"}} onChange={(e) => handlefileChange(e, setTeamLogoImgUrl)}/>
                <img src={teamLogoImgUrl} alt="" onClick={() => profileImgRef.current.click()}/>
            </div>
            <div>
                <input type="text" placeholder="팀 소개" value={teamInfoText} 
                    onChange={(e) => setTeamInfoText(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="email" value={teamEmail} 
                    onChange={(e) => setTeamEmail(e.target.value)}/>
                <input type="text" placeholder="전화번호" value={teamPhoneNumber} 
                    onChange={(e) => setTeamPhoneNumber(e.target.value)}/>
                <input type="url" placeholder="홈페이지" value={teamHomepage} 
                    onChange={(e) => setTeamHomepage(e.target.value)}/>
            </div>
            <div>
                <button onClick={accountCounter}>은행 계좌 등록</button>
                
                {createAccount ?  
                    <div>  
                        <input type="text" placeholder="예금주명"  value={accountUsername} 
                            onChange={(e) => setAccountUsername(e.target.value)}/>
                        <input type="text" placeholder="계좌번호"  value={accountNumber } 
                            onChange={(e) => setAccount(e.target.value)}/>
                        <input type="text"placeholder="은행명"  value={bankName} 
                            onChange={(e) => setBankName(e.target.value)}/>   
                        <input type="file" src="" alt="" onChange={(e) => handlefileChange(e, setAccountUrl)}/>
                        <button onClick={handleAccountInfos}>은행 등록</button>
                    </div>
                    : null
                }
                {accountInfos.map(accountInfo => 
                    <div>  
                        <span>예금주: {accountInfo.accountUsername}</span>
                        <span>은행:{accountInfo.bankName}</span>
                        <span>계좌번호: {accountInfo.accountNumber}</span>
                        <img src={accountInfo.accountUrl} alt="" />
                        <button onClick={() => handleDeleteAccountInfos(accountInfo.accountId)}>계좌 삭제</button>
                    </div>
                )}
            </div>
            <button onClick={submit}>수정하기</button>
        </div>
    );
}

export default UpdateTeamPage;