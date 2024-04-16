/** @jsxImportSource @emotion/react */
import * as s from "../MainPage/style";
import { useQuery } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getChallengeRequest, getDonationListRequest, getDonationTagRequest } from "../../apis/api/DonationAPI";
import { FiSearch } from "react-icons/fi";

function MainPage2() {
    
    const [donationTagList, setDonationTagList] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [ challengeList, setChallengeList ] = useState([])
    const [selectedTag, setSelectedTag] = useState(null);

    //donationTag

    const getDonationTagQuery = useQuery(
        "getDonationTagQuery",
        async () => await getDonationTagRequest({
    
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationTagList(response.data.map(donationTag => ({
                    ...donationTag
                })));
            }
        }
    );
    console.log(donationTagList);

    
    
    const getDonationListQuery = useQuery(
        "getDonationListQuery",
        async () => await getChallengeRequest({ mainCategoryId: 2 }), // 여기서 mainCategoryId를 2로 지정
        {
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setChallengeList(response.data.map((donation) => ({
                    ...donation
                })));
            }
        }
    );
    console.log(challengeList);
    
        
        //handleTag
        const handleTagClick = (tag) => {
            setSelectedTag(tag);
          };

        const filteredDonations = selectedTag
        ? challengeList.filter(
                        (donation) => donation.donationTagName 
                        ? donation.donationTagName.includes(selectedTag) 
                        : false
                        )
        : challengeList;

        return (
        <>
            <div>
                <h1>Main Page</h1>
            </div>
            <div css={s.upperRightMenu}>
                <div css={s.sign}>
                    <Link to={"/signin"}>로그인 </Link>
                    <Link to={"/signup"}>회원가입 </Link>
                </div>
                <div>
                    <Link to={"/search"} css={s.searchIcon}><FiSearch size={40}/></Link>
                </div>
            </div>
            <div css={s.write}>
                <Link to={"/main/write"}>작성하기</Link>
            </div>

            <div css={s.tagContainer}>
            <button 
                key="alltag" 
                css={s.tagButton}
                onClick={() => setSelectedTag(null)} 
                aria-pressed={!selectedTag} 
                >전체보기
            </button>
                {donationTagList.map(
                    tag => (
                    <button 
                        key={tag.donationTagName} 
                        css={s.tagButton}
                        onClick={() => handleTagClick(tag.donationTagName)}
                        aria-pressed={selectedTag === tag.donationTagName}
                    >
                        {tag.donationTagName}
                    </button>
                ))}
            </div>
            <div css={s.donationList}>
                {
                    filteredDonations.map(
                        donation =>
                        <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId}  css={s.linkStyle}>
                            <div key={donation.donationPageId} css={s.donationCard}>
                                <div css={s.donationImage}>
                                    <img src={
                                            ! donation.mainImgUrl
                                            ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                            : donation.mainImgUrl
                                        } alt="" />
                                </div>
                                <div css={s.donationDetails}>
                                    <h2>{donation.storyTitle}</h2>
                                    <p><strong>기관:</strong> {donation.teamName}</p>
                                    <p><strong>목표금액:</strong> {donation.goalAmount}원</p>
                                    {/* <p><strong>시작시간:</strong> {donation.createDate.split('T')[0]}</p>  
                                    <p><strong>종료시간:</strong> {donation.endDate.split('T')[0]}</p> */}
                                   


                                </div>
                            </div>
                        </a>
                    )
                }
            </div>
        </>
        );
}

export default MainPage2;