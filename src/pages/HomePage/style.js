import { css } from "@emotion/react";


////////홈 CSS ////////////////
export const mainLayout = css`
padding : 20px;
background-color: #F4FFFF;
`
export const rootheader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   
`;
export const headerStyle = css`
  padding: 20px;
   
`;
export const introStyle = css`
  display: flex;
  align-items: center;


    & > img {
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    & > h3 {
        padding: 5px 20px;
        border: solid 0.5px #dbdbdb;
        border-radius: 15px;
        color: gray;
    }
    & > button {
        border: none;
        background-color: transparent;
        padding-right: 20px;

        
    }
`;

export const contentAreaStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
`;

export const leftCardLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 63%;
`;

export const rightCardLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 35%;
`;

export const cardStyle = css`
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
   
`;

export const cardText = css`
  margin: 20px;
`;

export const sidebarStyle = css`

  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: #FFD79999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  overflow: hidden;

  & > div > img {
        width: 150px;
        height: 150px;
    }

`;

export const sidebarText = css`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const totalAmountBox = css`
border: 1px solid #dbdbdb;
padding: 10px;
background-color: white;
display:flex;
justify-content: center;
`




////////카드 CSS ////////////////


export const progressbar = css`
    width: 100%;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
`;
export const progress = css`
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease-in-out;
`;


export const donationList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
`;

export const donationCard = css`
  display: flex;
  box-sizing: border-box;
  width: 100%; 
  height: 100%;
  border-radius: 8px; 
  overflow: hidden; 
 
`;

export const donationImage = css`

  height: 100%; 
  margin: 20px;
  & > img {
    border-radius: 10px;
    width:300px;
    height: 200px;
  }
`;

export const donationDetails = css`
  box-sizing: border-box;
  width: 100%;
  padding: 15px; 
  margin: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    margin-top: 0;
  }

  p {
    margin: 5px 0; 
  }
`;
export const linkStyle = css`
  text-decoration: none; 
  color: inherit; 
  width: 100%;
  &:hover, &:active, &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const LikeDonate = css`
&>div{
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  &>a{
    color: black;
    text-decoration-line: none;
  }
}
`;

//////////// footer ////////////
export const additionalContentStyle = css`
  // styles for additional content
`;


export const footerStyle = css`
  border-top: 1px solid #dbdbdb;
  text-align: center;
  &>p {
    margin: 20px;
    font-weight: bold;
  }
  &>a {
    color: black;
    text-decoration-line: none;
  }
`;
