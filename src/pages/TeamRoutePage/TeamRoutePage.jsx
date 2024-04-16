/** @jsxImportSource @emotion/react */
import TeamCreatePage from "../TeamCreatePage/TeamCreatePage";
import TeamInfoPage from "../TeamInfoPage/TeamInfoPage";
import TeamPage from "../TeamPage/TeamPage";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';

function TeamRoutePage(props) {
    return (
        <div css={s.layout}>
            <Routes>
                <Route path="/management" element={<TeamPage />} />
                <Route path="/write" element={<TeamCreatePage />} />
                <Route path="/info" element={<TeamInfoPage />} />
            </Routes>
        </div>
    );
}

export default TeamRoutePage;