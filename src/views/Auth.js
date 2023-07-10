import React, { useState, useEffect } from "react";
import { View, Panel, PanelHeader, PanelHeaderBack, Group } from "@vkontakte/vkui";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import { Routes, Route, useLocation, Link } from "react-router-dom";

const panels = {
    login: {
        id: "login",
        title: "Login",
    },
    forgot: {
        id: "forgot",
        title: "Forgot Password"
    },
    register: {
        id: "register",
        title: "Sign Up"
    }
}

const Auth = () => {
    const location = useLocation();
    const currentStory = () => location.pathname === "/auth" ? "login" : location.pathname.split("/")[2];
    const [activePanel, setActivePanel] = useState(currentStory());

    useEffect(() => setActivePanel(currentStory()), [])

    return (
        <View id="auth" activePanel={activePanel}> 
            <Panel id={activePanel}>
                <PanelHeader 
                    before={ activePanel !== "login" &&
                        <Link to="" style={{ color: "#FFF" }}>
                            <PanelHeaderBack onClick={() => setActivePanel("login")}/>
                        </Link>
                    }
                >
                    {panels[activePanel].title}
                </PanelHeader>
                <Group style={{ height: '80vh' }}>
                    <Routes id={activePanel}>
                        <Route path="" element={<Login setActivePanel={setActivePanel} />}/>
                        <Route path="forgot" element={<ForgotPassword setActivePanel={setActivePanel} />}/>
                        <Route path="register" element={<Register setActivePanel={setActivePanel} />}/>
                    </Routes>
                </Group>
            </Panel>

        </View>
    )
}

export default Auth;