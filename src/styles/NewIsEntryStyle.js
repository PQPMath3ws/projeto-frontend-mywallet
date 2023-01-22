import styled, { keyframes } from "styled-components";

const NewIsEntryScreenAnimation = keyframes`
    0% {
        margin-left: 100%;
    }
    100% {
        margin-left: 0%;
    }
`;

const NewIsEntryStyle = {
    NewIsEntryDiv: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: ${NewIsEntryScreenAnimation} 0.2s linear normal;
    `,
    NewIsEntryContainer: styled.div`
        margin: 20px 0px;
        width: 90%;
        height: 100%;
    `,
    TitleText: styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    `,
    AddMovimentationFormDiv: styled.div`
        margin-top: 40px;
        width: 100%;
        display: flex;
        gap: 34px;
        align-items: center;
        flex-direction: column;
    `,
    AddMovimentationInput: styled.input`
        border: none;
        width: 100%;
        height: 60px;
        padding: 0px 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box; 
        outline: none;
        border-radius: 5px;
        background-color: #FFFFFF;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    `,
    AddMovimentationButton: styled.button`
        border: none;
        width: 100%;
        height: 60px;
        padding: 0px 20px;
        border-radius: 5px;
        background-color: #A328D6;
        cursor: pointer;
        text-align: center;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
    `,
};

export default NewIsEntryStyle;