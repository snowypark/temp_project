/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import { getDonatorList } from "../../apis/api/donatorApi";
import * as s from "./style";

function MyDonation(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    
    const donationyearoptions = [
        { value: 0, label: "전체" },
        { value: 1, label: "2024" },
        { value: 2, label: "2023" },
        { value: 3, label: "2022" }
    ]
    const donationsoptions = [
        { value:0, label:"전체" },
        { value:1, label:"기부내역" },
        { value:2, label:"챌린지내역" }
    ]

    const [ selectedYear, setSelectedYear ] = useState(donationyearoptions[0]);
    const [ selectedList, setSelectedList ] = useState(donationsoptions[0]);
    const [ donatorList , setDonatorList ] = useState([]);

    const handleYearChange = (selectedOption) => {
        setSelectedYear(() => selectedOption);        
    };

    const handleListChange = (selectedOption) => {
        setSelectedList(() => selectedOption);
    };

    const getDonatorListQuery = useQuery(
        ["getDonatorListQuery", selectedList, selectedYear],
        async () => {
            const response = await getDonatorList({
                userId:principalData.data.userId,
                donationDate:selectedYear.value,
                mainCategoryId:selectedList.value
            });
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setDonatorList(() => data)
            },
            enabled: !!principalData?.data
        }
    )

    return (
    <div>
        <div>
            <Select 
                options={donationyearoptions}
                value={selectedYear}
                onChange={handleYearChange}
            />
            <Select
                options={donationsoptions}
                value={selectedList}
                onChange={handleListChange}
            />
        </div>
        <table>
            {donatorList.length === 0 ? (
                <td>기부내역이 없습니다.</td>
            ) : (
                donatorList.map((donator, index) => (
                    <th key={index}>
                        <td>기부날짜: {donator.donationDate}</td><br/>
                        <td>타이틀: {donator.storyTitle}</td><br/>
                        <td>기부금액: {donator.amount}</td>
                    </th>
                ))
            )}
        </table>
    </div>
    );
}


export default MyDonation;