import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest } from "../../apis/api/teamApi";
import { useState } from "react";

function TeamInfoPage(props) {
    const [ searchParams ] = useSearchParams();
    const [ teamInfo, setTeamInfo ] = useState();
    const teamId = searchParams.get("id");
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
    console.log(teamInfo);
    return (
        <div>
            <>
                <img src={teamInfo?.teamLogoImgUrl} alt="" />
                <div>{teamInfo?.teamName}</div>
                <div>{teamInfo?.teamInfoText}</div>
            </>
        </div>
    );
}

export default TeamInfoPage;