import styled, { keyframes } from "styled-components";
import { AddCircle, Exit } from "@styled-icons/ionicons-outline";

const HomeScreenAnimation = keyframes`
    0% {
        margin-left: 100%;
    }
    100% {
        margin-left: 0%;
    }
`;

const HomeStyle = {
    HomeDiv: styled.div`
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: ${HomeScreenAnimation} 0.2s linear normal;
    `,
    ContainerDiv: styled.div`
        margin: 20px 0px;
        width: 90%;
        height: 100%;
    `,
    HeaderDiv: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    TitleText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    `,
    ExitButton: styled.button`
        border: none;
        cursor: pointer;
        background-color: transparent;
    `,
    ExitIcon: styled(Exit)`
        color: #FFFFFF;
        width: 30px;
        height: 30px;
    `,
    MovimentationsDiv: styled.div`
        margin-top: 20px;
        padding: 10px 10px;
        background-color: #FFFFFF;
        border-radius: 5px;
        width: 100%;
        height: 70%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    `,
    EmptyMovimentationsDiv: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    EmptyMovimentationsText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        color: #868686;
        text-align: center;
    `,
    MovimentationsDivContent: styled.div`
        position: relative;
        width: 100%;
        height: 99%;
    `,
    MovimentationsDivContainer: styled.div`
        width: 100%;
        height: 94%;
        overflow-y: scroll;
    `,
    MovimentationDiv: styled.div`
        margin-bottom: 16px;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    `,
    MovimentationLeft: styled.div`
        display: flex;
    `,
    MovimentationRight: styled.div`
        display: flex;
    `,
    MovimentationDateText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #C6C6C6;
    `,
    MovimentationDescriptionText: styled.p`
        margin-left: 10px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        float: right;
    `,
    MovimentationPriceText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: ${props => props.isEntry ? "#03AC00" : "#C70000"}
    `,
    MovimentationDeleteText: styled.p`
        margin-left: 10px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #C6C6C6;
    `,
    TotalMovimentationDiv: styled.div`
        position: absolute;
        width: 100%;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
    `,
    BalanceText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #000000;
    `,
    ActionsDiv: styled.div`
        margin-top: 20px;
        width: 100%;
        height: 18%;
        display: flex;
        justify-content: space-between;
    `,
    ActionButton: styled.button`
        cursor: pointer;
        border: none;
        background-color: #A328D6;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 48%;
        height: 100%;
        padding: 12px 12px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    `,
    ActionButtonText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 10px;
        width: 40%;
        text-align: left;
    `,
    AddCircleIcon: styled(AddCircle)`
        color: #FFFFFF;
        width: 34px;
        height: 34px;
    `,
};

export default HomeStyle;