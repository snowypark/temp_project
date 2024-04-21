/** @jsxImportSource @emotion/react */
import TeamCreatePage from "../TeamCreatePage/TeamCreatePage";
import TeamInfoPage from "../TeamInfoPage/TeamInfoPage";
import TeamMemberPage from "../TeamMemberPage/TeamMemberPage";
import TeamPage from "../TeamPage/TeamPage";
import UpdateTeamPage from "../UpdateTeamPage/UpdateTeamPage";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';

function TeamRoutePage(props) {
    return (
        <div css={s.layout}>    
            <Routes>
                <Route path="/management" element={<TeamPage />} />
                <Route path="/member" element={<TeamMemberPage />} />
                <Route path="/write" element={<TeamCreatePage />} />
                <Route path="/info" element={<TeamInfoPage />} />
                <Route path="/update" element={<UpdateTeamPage />} />
            </Routes>
        </div>
    );
}

export default TeamRoutePage;