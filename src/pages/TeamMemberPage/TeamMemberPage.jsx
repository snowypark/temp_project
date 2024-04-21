import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from "react-query";
import { getTeamMemberInfoRequest } from '../../apis/api/teamApi';

function TeamMemberPage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const [ membersId, setMembersId ] = useState(); 
    const [ members, setMembers ] = useState();
    useEffect(() => {
        const memberIds = teamInfo.teamMembers.map(member => `userId=${member.userId}`).join('&');
        setMembersId(() => `teamId=${teamInfo.teamId}&${memberIds}`);
      },[])
    const getDonationListQuery = useQuery(
        ["getDonationQuery", membersId],
        async () => await getTeamMemberInfoRequest(membersId),
        {
            refetchOnWindowFocus: false,
            enabled: !!membersId,
            onSuccess: response => {
                setMembers(() => response.data);
                console.log(response.data);
            }
    });
    return (
        <div></div>
            
    );
}

export default TeamMemberPage;