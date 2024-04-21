import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest, getDonationListByTeamIdRequest} from "../../apis/api/teamApi";
import { useState } from "react";
import { now } from 'moment/moment';

function TeamInfoPage(props) {
    const [ teamInfo, setTeamInfo ] = useState();
    const [ donationList, setDonationList ] = useState([]);
    const [ endDonationList, setEndDonationList ] = useState([]);
    const [ searchParams ] = useSearchParams();
    const teamId = searchParams.get("id");
    
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const getTeamInfoQuery = useQuery(
        [ "getTeamListQuery" ],
        async () => {
            return await getTeamInfoRequest({
                teamId: teamId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setTeamInfo(() => response.data);
            },
        }
    );
    const getDonationListRequest = useQuery(
        [ "getDonationListByTeamIdRequest" ],
        async () => {
            return await getDonationListByTeamIdRequest({
                teamId: teamId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const today = new Date();
                const month = today.getMonth()+1;
                const year = today.getFullYear();
                const date = today. getDate();
                for(let arr of response.data) {
                    console.log(arr);
                    const endDate = arr.endDate.split("T")[0].split("-")[2];
                    const endMonth = arr.endDate.split("T")[0].split("-")[1];
                    const endYear = arr.endDate.split("T")[0].split("-")[0];
                    if((endYear - year) * 12 * 30 + (endMonth - month) * 30 + (endDate - date) >= 0) {
                        setDonationList(() => [...donationList, arr]);
                    } else {
                        setEndDonationList(() => [...endDonationList, arr]);
                    }
                }   
            },
        }
    );
    return (
        <div>
            <>  
                
                <img src={teamInfo?.teamLogoImgUrl} alt="" />
                {teamInfo?.teamMembers.filter(teamMember => teamMember.userId === principalData.data.userId)[0]?.teamRoleId === 1
                ? <Link to={`/team/management?id=${teamId}`}  state={{ teamInfo }} >관리하기</Link>
                :null}
                <div>{teamInfo?.teamName}</div>
                <div>{teamInfo?.teamInfoText}</div>
            </>
            <>
            <div><h2>진행중인 스토리</h2>
                {
                    donationList.map(donation => <>
                        <Link to={`/donation?page=${donation.donationPageId}`}>
                            <img src={donation.mainImgUrl} alt="" />
                        </Link>
                        <div>{donation.storyTitle}</div>
                    </>)
                }
            </div>
            <div>
                <h2>스토리 내역</h2>
                {
                    endDonationList.map(donation => <>  
                    <Link to={`/donation?page=${donation.donationPageId}`}>
                        <img src={donation.mainImgUrl} alt="" />
                    </Link>
                    <div>{donation.storyTitle}</div>
                    </>)
                }
            </div>
            </>
        </div>
    );
}

export default TeamInfoPage;