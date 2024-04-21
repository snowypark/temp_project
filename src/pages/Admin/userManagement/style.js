import {css} from "@emotion/react";

export const searchBar = css`
    display: flex;
    box-sizing: border-box;
    margin: 5px 0px;
    border: 1px solid #dbdbdb;

`
export const searchButton = css`
    box-sizing: border-box;
    border: none;
    border-left: 1px solid #dbdbdb;
    width: 60px;
    cursor: pointer;
    background-color: white;
    &:hover{
        background-color: #fafafa;
    }
    &:active{
        background-color: #eeeeee;
    }
`
export const tableLayout =css`
    position: absolute;
    border: 1px solid #dbdbdb;
    height: 320px;
    background-color: white;
    overflow: auto;

    &::-webkit-scrollbar {
        box-sizing: border-box;
        border: 1px solid #ffffff;
        width: 10px;
        height: 10px;
        background-color: #fdfdfd;
    }
    &::-webkit-scrollbar-thumb {
        box-sizing: border-box;
        background-color: #dbdbdb;
        border: 1px solid #fafafa;
    }
`

export const table =css`
    border: 1px solid black;
    border-collapse: collapse;
    width: max-content;
    & td, & th {
        border: 1px solid #dbdbdb;
        padding: 0px 5px;
    }
    & th {
        border-top: none;
    } 
    & td {
        font-size: 14px;
    }
    & tr > td:nth-of-type(1),
    & tr > th:nth-of-type(1) {
        border-left: none;
    }
    & tr > td:nth-last-of-type(1),
    & tr > th:nth-last-of-type(1) {
        border-right: none;
    }
    & tr > td:nth-of-type(1),
    & tr > th:nth-of-type(1) {
        text-align: center;
        min-width: 30px;
    }
    & tr > td:nth-of-type(2),
    & tr > th:nth-of-type(2) {
        min-width: 80px;
    }
    & tr > td:nth-of-type(2) {
        text-align: right;
    }
    & tr > td:nth-of-type(3),
    & tr > th:nth-of-type(3) {
        min-width: 250px;
    }
    & tr > td:nth-of-type(4),
    & tr > th:nth-of-type(4) {
        min-width: 150px;
    }
    & tr > td:nth-of-type(5),
    & tr > th:nth-of-type(5) {
        min-width: 150px;
    }
    & tr > td:nth-of-type(6),
    & tr > th:nth-of-type(6) {
        min-width: 150px;
    }
    & tr > td:nth-of-type(7),
    & tr > th:nth-of-type(7) {
        min-width: 100px;
    }
    & tr > td:nth-of-type(8),
    & tr > th:nth-of-type(8) {
        width: 100px;
    }
    & tr > td:nth-of-type(9),
    & tr > th:nth-of-type(9) {
        width: 100px;
    }
    
`
export const theadTr =css`
    position: sticky;
    top: 0px;
    background-color: #fdfdfd;
`

export const searchInput=css`
    flex-grow: 1;
    border: none;
    border-left: 1px solid #dbdbdb;
    outline: none;
    background-color: #fdfdfd;
    
`
