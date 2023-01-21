import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const LoginScreenAnimation = keyframes`
    0% {
        margin-left: 100%;
    }
    100% {
        margin-left: 0%;
    }
`;

const LoginStyle = {
    LoginDiv: styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: ${LoginScreenAnimation} 0.2s linear normal;
    `,
    MyWalletText: styled.p`
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        color: #FFFFFF;
    `,
    LoginFormDiv: styled.div`
        margin-top: 50px;
        width: 100%;
        display: flex;
        gap: 34px;
        align-items: center;
        flex-direction: column;
    `,
    LoginInput: styled.input`
        border: none;
        width: 80%;
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
    LoginButton: styled.button`
        border: none;
        width: 80%;
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
    ErrorText: styled.p`
        ${props => !props.isError ? "display: none;" : ""};
        margin-top: 40px;
        width: 80%;
        text-align: center;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        color: #FF7F7F;
    `,
    RegisterLink: styled(Link)`
        margin-top: 50px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        text-decoration: none;
        color: #FFFFFF;

        &:hover {
            text-decoration: underline;
            color: #DDDDDD;
        }
    `,
};

export default LoginStyle;