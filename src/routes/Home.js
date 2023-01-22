import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Context from "../context/Context";

import HomeStyle from "../styles/HomeStyle";

const Home = () => {
    const [name, setName] = useState("");
    const [movimentations, setMovimentations] = useState([]);

    const context = useContext(Context);
    const navigate = useNavigate();

    async function getUserInfos() {
        const request = await axios.get(`${process.env.REACT_APP_API_URL}/get-infos`, {
            headers: {
                "Authorization": `Bearer ${context.token}`
            },
        });
        return request.data;
    }

    async function getMovimentations() {
        const request = await axios.get(`${process.env.REACT_APP_API_URL}/movimentations`, {
            headers: {
                "Authorization": `Bearer ${context.token}`
            },
        });
        return request.data;
    }

    function exit() {
        context.name = null;
        context.token = null;
        navigate("/login");
    }

    async function canDeleteEntry(mov, event) {
        event.stopPropagation();
        if (window.confirm(`Deseja realmente remover: ${mov.description}?`)) {
            try {
                const request = await axios.delete(`${process.env.REACT_APP_API_URL}/movimentations/delete/${mov._id}`, {
                    headers: {
                        "Authorization": `Bearer ${context.token}`
                    },
                });
                if (request.statusText === "OK") alert("Movimentação removida com sucesso!");
                else alert("Erro ao remover movimentação!");
            } catch (_) {
                alert("Erro ao remover movimentação!");
            }
            getMovimentations().then(mov => {
                setMovimentations(mov);
            }).catch(_ => {
                exit();
            });
        }
    }

    const editEntry = (mov) => navigate(mov.isEntry ? `/editar-entrada/${mov._id}` : `/editar-saida/${mov._id}`);

    const addNewMovimentation = (isEntry) => navigate(isEntry ? "/nova-entrada" : "/nova-saida");

    useEffect(() => {
        getUserInfos().then(infos => {
            context.name = infos.name;
            setName(context.name);
            getMovimentations().then(mov => {
                setMovimentations(mov);
            }).catch(_ => {
                exit();
            });
        }).catch(_ => {
            exit();
        });
    }, []);

    return (
        <HomeStyle.HomeDiv>
            <HomeStyle.ContainerDiv>
                <HomeStyle.HeaderDiv>
                    <HomeStyle.TitleText>Olá, {name}</HomeStyle.TitleText>
                    <HomeStyle.ExitButton onClick={exit}>
                        <HomeStyle.ExitIcon></HomeStyle.ExitIcon>
                    </HomeStyle.ExitButton>
                </HomeStyle.HeaderDiv>
                <HomeStyle.MovimentationsDiv>
                    {movimentations.length === 0 ? <HomeStyle.EmptyMovimentationsDiv>
                        <HomeStyle.EmptyMovimentationsText>
                            Não há registros de entrada ou saída
                        </HomeStyle.EmptyMovimentationsText>
                    </HomeStyle.EmptyMovimentationsDiv> : <HomeStyle.MovimentationsDivContent>
                            <HomeStyle.MovimentationsDivContainer>
                                {movimentations.map(mov => <HomeStyle.MovimentationDiv key={mov._id} onClick={() => editEntry(mov)}>
                                    <HomeStyle.MovimentationLeft>
                                        <HomeStyle.MovimentationDateText>{("0" + new Date(mov.created).getDate()).slice(-2)}/{("0" + new Date(mov.created).getMonth() + 1).slice(-2)}</HomeStyle.MovimentationDateText>
                                        <HomeStyle.MovimentationDescriptionText>{mov.description}</HomeStyle.MovimentationDescriptionText>
                                    </HomeStyle.MovimentationLeft>
                                    <HomeStyle.MovimentationRight>
                                        <HomeStyle.MovimentationPriceText isEntry={mov.isEntry}>{String(mov.value).replace(".", ",")}</HomeStyle.MovimentationPriceText>
                                        <HomeStyle.MovimentationDeleteText onClick={(event) => canDeleteEntry(mov, event)}>x</HomeStyle.MovimentationDeleteText>
                                    </HomeStyle.MovimentationRight>
                                </HomeStyle.MovimentationDiv>)}
                            </HomeStyle.MovimentationsDivContainer>
                            <HomeStyle.TotalMovimentationDiv>
                                <HomeStyle.BalanceText>
                                    SALDO
                                </HomeStyle.BalanceText>
                                <HomeStyle.MovimentationPriceText isEntry={movimentations.reduce((a, b) => b.isEntry ? a + b.value : a - b.value, 0) >= 0}>
                                    {Number(movimentations.reduce((a, b) => b.isEntry ? a + b.value : a - b.value, 0)).toFixed(2)}
                                </HomeStyle.MovimentationPriceText>
                            </HomeStyle.TotalMovimentationDiv>
                        </HomeStyle.MovimentationsDivContent>}
                </HomeStyle.MovimentationsDiv>
                <HomeStyle.ActionsDiv>
                    <HomeStyle.ActionButton onClick={() => addNewMovimentation(true)}>
                        <HomeStyle.AddCircleIcon></HomeStyle.AddCircleIcon>
                        <HomeStyle.ActionButtonText>Nova Entrada</HomeStyle.ActionButtonText>
                    </HomeStyle.ActionButton>
                    <HomeStyle.ActionButton onClick={() => addNewMovimentation(false)}>
                        <HomeStyle.AddCircleIcon></HomeStyle.AddCircleIcon>
                        <HomeStyle.ActionButtonText>Nova Saída</HomeStyle.ActionButtonText>
                    </HomeStyle.ActionButton>
                </HomeStyle.ActionsDiv>
            </HomeStyle.ContainerDiv>
        </HomeStyle.HomeDiv>
    );
};

export default Home;