import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
    const [activePanel, setActivePanel] = useState("login")

    return (
        <View id="auth" activePanel={activePanel}> 
            <Login id="login" setActivePanel={setActivePanel}/>
            <Register id="register" setActivePanel={setActivePanel}/>
        </View>
    )
}

export default Auth;