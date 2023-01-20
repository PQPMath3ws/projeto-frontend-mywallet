import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Context from "../context/Context";

const IsLoggedIn = () => {
    const { token } = useContext(Context);
    if (token) return (<Navigate to="home"></Navigate>);
    else return (<Navigate to="login"></Navigate>)
};

export default IsLoggedIn;