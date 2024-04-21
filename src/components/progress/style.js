import { css } from "@emotion/react";


export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;


export const progressbar = css`
    width: 100%;
    height: 10px;
    background-color: #dbecf7;
    border-radius: 4px;
    overflow: hidden;
    font-size: 15px;
    margin-bottom: 5px;
`;
export const progress = css`
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease-in-out;
`;

