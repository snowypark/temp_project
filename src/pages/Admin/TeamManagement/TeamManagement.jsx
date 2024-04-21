import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery } from 'react-query';
import { deleteTeamListRequest, getTeamListRequest, postMessageRequest } from '../../../apis/api/Admin';
import { Link } from 'react-router-dom';

function TeamManagement(props) {
    const [ teamList, setTeamList ] = useState([]);
    const checkBoxRef = useRef();

    const getDonationListRequest = useQuery(
        [ "getDonationListByTeamIdRequest" ],
        async () => {
            return await getTeamListRequest()
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setTeamList(() => response.data.map(team => {
                    return {
                        ...team,
                        checked: false
                    }
                }));
            }
        }
    );
    const handleAllCheckOnChange = (e) => {
        setTeamList(() =>teamList.map(team => {
            return {
                ...team,
                checked: e.target.checked
            }
        }));
    }
    const handleCheckOnChange = (e) => {
        const teamId = parseInt(e.target.value);
        setTeamList(() =>teamList.map(team => {
            if (teamId === team.teamId) {
                return {
                    ...team,
                    checked: e.target.checked
                }
            } else {
                return team
            }
            }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
    }
    useEffect(() => {
        for(let team of teamList) {
            checkBoxRef.current.checked = team.checked;
            if(!checkBoxRef.current.checked) {
                break;
            }
        }
        
    },[teamList])
    const deleteMessageMutation = useMutation({
        mutationKey: "deleteNessageMutation",
        mutationFn: deleteTeamListRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => {}
    })  
    const sendMessageMutation = useMutation({
        mutationKey: "sendMessageMutation",
        mutationFn: postMessageRequest,
        onSuccess: response => {
            console.log(response);
            alert("전송완료.");
        },
        onError: error => {}
    })
    const handleDeleteTeamsOnClick = () => {
        if(!window.confirm("정말로 해당 팀들을 삭제하시겠습니까?")) return;
        deleteMessageMutation.mutate(teamList);
    }

    return (
        <div >
            <button onClick={handleDeleteTeamsOnClick}>선택된 팀 삭제</button>
                <table >
                    <thead>
                        <tr >
                            <th><input type="checkbox" ref={checkBoxRef} onChange={handleAllCheckOnChange}/></th>
                            <th>팀번호</th>
                            <th>팀명</th>
                            <th>로고URL</th>
                            <th>상세정보 보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teamList.map(
                                team => 
                                <tr key={team.teamId}>
                                    <td><input type="checkbox" value={team.teamId} checked={team.checked} onChange={handleCheckOnChange}/></td>
                                    <td>{team.teamId}</td>
                                    <td>{team.teamName}</td>
                                    <td><img src={team.teamLogoImgUrl} alt="" /></td>
                                    <td><Link to={`/team/info?id=${team.teamId}`}>상세정보</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    );
}

export default TeamManagement;