import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Context from "../context/Context";

import NewIsEntryStyle from "../styles/NewIsEntryStyle";

const NewIsEntry = () => {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [isTryingSaveMovimentation, setIsTryingSaveMovimentation] = useState(false);

    const context = useContext(Context);

    const navigate = useNavigate();

    async function saveMovimentation() {
        setIsTryingSaveMovimentation(true);
        try {
            const request = await axios.post(`${process.env.REACT_APP_API_URL}/movimentations/add`, {
                value: Number.parseFloat(value),
                description,
                isEntry: true,
            }, {
                headers: {
                    "Authorization": `Bearer ${context.token}`
                },
            });
            if (request.statusText === "Created") {
                alert("Movimentação de entrada adicionada com sucesso!");
                navigate("/home");
            } else {
                alert("Preencha todos os dados corretamente antes de continuar!");
            }
        } catch (_) {
            alert("Preencha todos os dados corretamente antes de continuar!");
        }
        setIsTryingSaveMovimentation(false);
    }

    if (!context.token) return (<Navigate to="/"></Navigate>);

    return (
        <NewIsEntryStyle.NewIsEntryDiv>
            <NewIsEntryStyle.NewIsEntryContainer>
                <NewIsEntryStyle.TitleText>Nova entrada</NewIsEntryStyle.TitleText>
                <NewIsEntryStyle.AddMovimentationFormDiv>
                    <NewIsEntryStyle.AddMovimentationInput onChange={(input) => Number(input.target.value).toString() === "NaN" ? null : setValue(input.target.value.includes(".") ? `${input.target.value.split(".")[0]}.${input.target.value.split(".")[1].slice(0, 2)}` : input.target.value)} placeholder="Valor" type="text" value={value}></NewIsEntryStyle.AddMovimentationInput>
                    <NewIsEntryStyle.AddMovimentationInput onChange={(input) => setDescription(input.target.value)} placeholder="Descrição" type="text" value={description}></NewIsEntryStyle.AddMovimentationInput>
                    <NewIsEntryStyle.AddMovimentationButton onClick={saveMovimentation}>{isTryingSaveMovimentation ? <ThreeDots color="#FFFFFF" width="100%" height="14">
                    </ThreeDots> : "Salvar entrada"}</NewIsEntryStyle.AddMovimentationButton>
                </NewIsEntryStyle.AddMovimentationFormDiv>
            </NewIsEntryStyle.NewIsEntryContainer>
        </NewIsEntryStyle.NewIsEntryDiv>
    );
};

export default NewIsEntry;