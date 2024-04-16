import { css } from "@emotion/react";

export const searchBar = css`
    box-sizing: border-box;
    display: flex;
    margin: 20px;
    flex-direction: row;
    justify-content: center;
    height: 50px;
`;

export const searchInput = css`
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    border: none;
    border: 1px solid #dbdbdb;
    outline: none;
    background-color: #fdfdfd;
    width: 800px;
    size: 50px;
    padding: 10px;
    font-size: 20px;
`;

export const searchButton=css`
    box-sizing: border-box;
    border: none;
    border-left: 1px solid #dbdbdb;
    width: 60px;
    cursor: pointer;
    &:hover {
        background-color: #eeeeee;
    }
`;

export const searchSelect = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 100px;
`;

export const searchCategory = css`
  display: flex;
  justify-content: center;
`;


export const donationList = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 100px;
  gap: 20px; 
`;

export const donationCard = css`
  display: flex;
  height: 150px;
  border: 1px solid #ccc; 
  border-radius: 8px; 
  overflow: hidden; 
`;

export const donationImage = css`
  display: flex;
  align-items: center;
  width: 200px; 
  height: 100%; 
  margin-left: 7px;
  & > img {
    width:100%;
    height: 150px;
  }
`;

export const donationDetails = css`
  padding: 15px; 
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const donationText = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  h2 {

  }

  p {
    margin: 5px 0; 
  }
`;

export const donationAmount = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const tagContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
`;



