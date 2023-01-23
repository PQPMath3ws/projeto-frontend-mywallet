import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import Context from "../context/Context";

import EditEntryStyle from "../styles/EditEntryStyle";

const EditEntry = () => {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [isTryingSaveMovimentation, setIsTryingSaveMovimentation] = useState(false);

    const { id } = useParams();

    const context = useContext(Context);

    const navigate = useNavigate();

    async function getMovimentationById() {
        try {
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/movimentations/${id}`, {
                headers: {
                    "Authorization": `Bearer ${context.token}`
                },
            });
            return request.data;
        } catch (_) {
            navigate("/");
        }
    }

    async function editMovimentation() {
        setIsTryingSaveMovimentation(true);
        try {
            const request = await axios.patch(`${process.env.REACT_APP_API_URL}/movimentations/edit/${id}`, {
                value: Number.parseFloat(value),
                description,
            }, {
                headers: {
                    "Authorization": `Bearer ${context.token}`
                },
            });
            if (request.statusText === "OK") {
                alert("Movimentação de entrada editada com sucesso!");
                navigate("/home");
            } else {
                alert("Preencha todos os dados corretamente antes de continuar!");
            }
        } catch (_) {
            alert("Preencha todos os dados corretamente antes de continuar!");
        }
        setIsTryingSaveMovimentation(false);
    }

    useEffect(() => {
        getMovimentationById().then(data => {
            if (!data.isEntry) navigate("/home");
            setValue(data.value);
            setDescription(data.description);
        }).catch(_ => navigate("/"));
    }, []);

    if (!context.token || !id) return (<Navigate to="/"></Navigate>);

    return (
        <EditEntryStyle.EditEntryDiv>
            <EditEntryStyle.EditEntryContainer>
                <EditEntryStyle.TitleText>Editar entrada</EditEntryStyle.TitleText>
                <EditEntryStyle.EditMovimentationFormDiv>
                    <EditEntryStyle.EditMovimentationInput onChange={(input) => Number(input.target.value).toString() === "NaN" ? null : setValue(input.target.value.includes(".") ? `${input.target.value.split(".")[0]}.${input.target.value.split(".")[1].slice(0, 2)}` : input.target.value)} placeholder="Valor" type="text" value={value}></EditEntryStyle.EditMovimentationInput>
                    <EditEntryStyle.EditMovimentationInput onChange={(input) => setDescription(input.target.value)} placeholder="Descrição" type="text" value={description}></EditEntryStyle.EditMovimentationInput>
                    <EditEntryStyle.EditMovimentationButton onClick={editMovimentation}>{isTryingSaveMovimentation ? <ThreeDots color="#FFFFFF" width="100%" height="14">
                    </ThreeDots> : "Atualizar entrada"}</EditEntryStyle.EditMovimentationButton>
                </EditEntryStyle.EditMovimentationFormDiv>
            </EditEntryStyle.EditEntryContainer>
        </EditEntryStyle.EditEntryDiv>
    );
};

export default EditEntry;