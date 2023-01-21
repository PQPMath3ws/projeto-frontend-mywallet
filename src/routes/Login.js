import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Context from "../context/Context";
import LoginStyle from "../styles/LoginStyle";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTryingAuth, setIsTryingAuth] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const context = useContext(Context);

    const validateEmail = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    async function login() {
        setIsError(false);
        setIsTryingAuth(true);
        if (!email || !password || password.length < 7) {
            setErrorMessage("Preencha todos os dados corretamente antes de continuar.");
            setIsError(true);
        } else {
            if (!validateEmail()) {
                setErrorMessage("Digite um e-mail válido para continuar.");
                setIsError(true);
            } else {
                const auth = {
                    email,
                    password,
                };
                try {
                    const request = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, auth, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    context.token = request.data.token;
                    navigate("/home");
                } catch (error) {
                    setErrorMessage("E-mail e/ou senha inválidos.");
                    setIsError(true);
                }
            }
        }
        setIsTryingAuth(false);
    }

    return (
        <LoginStyle.LoginDiv>
            <LoginStyle.MyWalletText>MyWallet</LoginStyle.MyWalletText>
            <LoginStyle.LoginFormDiv>
                <LoginStyle.LoginInput onChange={input => setEmail(input.target.value.replaceAll(" ", ""))} placeholder="E-mail" type="text" value={email}></LoginStyle.LoginInput>
                <LoginStyle.LoginInput onChange={input => setPassword(input.target.value)} placeholder="Senha" type="password" value={password}></LoginStyle.LoginInput>
                <LoginStyle.LoginButton onClick={login}>{isTryingAuth ? <ThreeDots color="#FFFFFF" width="100%" height="14">
                </ThreeDots> : "Entrar"}</LoginStyle.LoginButton>
            </LoginStyle.LoginFormDiv>
            <LoginStyle.ErrorText isError={isError}>{errorMessage}</LoginStyle.ErrorText>
            <LoginStyle.RegisterLink to="/cadastro">Primeira vez? Cadastre-se!</LoginStyle.RegisterLink>
        </LoginStyle.LoginDiv>
    );
};

export default Login;