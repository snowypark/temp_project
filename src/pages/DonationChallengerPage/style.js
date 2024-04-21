
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const buttonBox = css`
    margin-top: 20px;
    padding: '10px 20px'
`;

export const imageBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    overflow: hidden;

    & img {
        height: 150px;
    }
`;

export const imgUrlBox = css`
    display: inline-block;
    width: 95%;
    line-height: 10px;
`;


