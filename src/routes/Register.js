import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import RegisterStyle from "../styles/RegisterStyle";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isTryingRegister, setIsTryingRegister] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const validateEmail = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    async function register() {
        setIsError(false);
        setIsTryingRegister(true);
        if (!name || !email || !password || !passwordConfirmation || name.length < 2 || password.length < 7 || passwordConfirmation.length < 7) {
            setErrorMessage("Preencha todos os dados corretamente antes de continuar.");
            setIsError(true);
        } else {
            if (!validateEmail()) {
                setErrorMessage("Digite um e-mail válido para continuar.");
                setIsError(true);
            } else {
                const register = {
                    name,
                    email,
                    password,
                    passwordConfirmation,
                };
                try {
                    await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, register, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    setIsSuccess(true);
                    setTimeout(() => navigate("/login"), 1400);
                } catch (error) {
                    const resMessage = error.response.data.message;
                    if (resMessage === "failed to register this user") {
                        setErrorMessage("Não é possível cadastrar esse usuário no sistema.");
                        setIsError(true);
                    } else {
                        setErrorMessage("A senha e a confirmação de senha são diferentes.");
                        setIsError(true);
                    }
                }
            }
        }
        setIsTryingRegister(false);
    }

    return (
        <RegisterStyle.RegisterDiv>
            <RegisterStyle.MyWalletText>MyWallet</RegisterStyle.MyWalletText>
            <RegisterStyle.RegisterFormDiv>
                <RegisterStyle.RegisterInput onChange={input => setName(input.target.value)} placeholder="Nome" type="text" value={name}></RegisterStyle.RegisterInput>
                <RegisterStyle.RegisterInput onChange={input => setEmail(input.target.value.replaceAll(" ", ""))} placeholder="E-mail" type="text" value={email}></RegisterStyle.RegisterInput>
                <RegisterStyle.RegisterInput onChange={input => setPassword(input.target.value)} placeholder="Senha" type="password" value={password}></RegisterStyle.RegisterInput>
                <RegisterStyle.RegisterInput onChange={input => setPasswordConfirmation(input.target.value)} placeholder="Confirmar senha" type="password" value={passwordConfirmation}></RegisterStyle.RegisterInput>
                <RegisterStyle.RegisterButton onClick={register}>{isTryingRegister ? <ThreeDots color="#FFFFFF" width="100%" height="14">
                </ThreeDots> : "Cadastrar"}</RegisterStyle.RegisterButton>
            </RegisterStyle.RegisterFormDiv>
            <RegisterStyle.ErrorText isError={isError}>{errorMessage}</RegisterStyle.ErrorText>
            <RegisterStyle.SuccessText isSuccess={isSuccess}>Usuário cadastrado com sucesso!</RegisterStyle.SuccessText>
            <RegisterStyle.LoginLinkLink to="/login">Já tem uma conta? Entre agora!</RegisterStyle.LoginLinkLink>
        </RegisterStyle.RegisterDiv>
    );
};

export default Register;