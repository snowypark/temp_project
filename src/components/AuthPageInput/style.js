import { css } from "@emotion/react";

export const inputBox = css`
`;
export const input = css`
`;
export const messageBox = (type) => css`
    padding: ${type === "error" ? "5px 10px" : 0};
    width: 100%;
    color: ${type === "error" ? "#ff3030" : "#00921b"};
    font-size: 11px;
    font-weight: 600;
`;

export const inputIcon = (type) => css`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${type === "error" ? "#ff3030" : "#00921b"};
`;