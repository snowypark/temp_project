import React, { useEffect, useState } from 'react';
import { getTeamListRequest } from '../../apis/api/teamApi';
import { getPrincipalRequest } from '../../apis/api/principal';
import { useQuery } from 'react-query';

import Select from 'react-select';
import { Link } from 'react-router-dom';

function TeamSelectPage({teamId}) {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [userId, setUserId] = useState();

    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId); // 사용자 ID 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    useEffect(() => {
        if (userId) {
            const fetchTeams = async () => {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName
                        }));
                        setTeams(formattedTeams);
                    }
                } catch (error) {
                    console.error('Failed to fetch teams', error);
                }
            };

            fetchTeams();
        }
    }, [userId]);

    const handleSelectTeam = (selectedOption) => {
        setSelectedTeam(selectedOption);
    };

    const handleSubmit = () => {
        console.log("Selected Team ID:", selectedTeam?.value);
        alert(`Selected Team ID: ${selectedTeam?.value}`);
    };

    return (
        <div>
            <h3>Select Your Team</h3>
            <Select
                value={selectedTeam}
                onChange={handleSelectTeam}
                options={teams}
                placeholder="Select your team..."
            />
            <button onClick={handleSubmit}>확인</button>
            <button><Link to={'/main/write'}>펀딩 작성하러 가기</Link></button>
        </div>
    );
}

export default TeamSelectPage;
