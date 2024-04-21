import {css} from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 100%;
`
export const header = css`
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 10px 30px;
    width: 100%;
    height: 200px;
    background-color: white;
`
export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 178px;
    height: 178px;
`
export const propfileImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`
export const infoBox = css`
    box-sizing: border-box;
    margin-left: 30px;
    padding-top: 30px;
`
export const infoText = css`
    font-size: 14px;
    margin-bottom: 10px;
`
export const emailBox = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & > div:nth-of-type(1) {
        margin:0px 10px 0px 0px;
    }
`

export const infoButton = css`
    box-sizing: border-box;
        border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 5px;
    background-color: white;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eeeeee;
    }
`
export const emailCheck = css`
    display: flex;
    align-items: center;
    & > * {
        color: #008734;
    }
`
export const infoButtons = css`
    box-sizing: border-box;
    display: flex;
    padding-top: 5px;
    & > button:nth-of-type(1) {
        margin-right: 5px;
    }

`
export const bottom = css`
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 10px;
    width: 100%;
    height: 250px;
    background-color: white;
`
