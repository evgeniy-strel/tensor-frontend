import React, { useState } from "react";
import { 
    Panel,
    PanelHeader,
    Group,
    FormLayout,
    FormLayoutGroup,
    FormItem,
    Input,
    Button,
} from "@vkontakte/vkui";
import RequestAPIauth from "../API/authRequests";


const Login = ({ setActivePanel }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        RequestAPIauth.login(formData);
    }

    return (
        <Panel id="login">
            <PanelHeader>Login</PanelHeader>
            <Group style={{ height: '1000px' }}>
                <FormLayout onSubmit={handlerSubmit}>
                    <FormLayoutGroup mode="vertical">
                        <FormItem top="Username" htmlFor="username">
                            <Input 
                                id="username" 
                                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                type="text" 
                                value={formData.login}
                                autoFocus
                            />
                        </FormItem>
                        <FormItem top="Password" htmlFor="pass">
                            <Input 
                                id="pass"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}  
                                type="password" 
                                autoComplete="on"
                                value={formData.password}
                            />
                        </FormItem>
                        <FormItem>
                            <Button onClick={handlerSubmit} size="l" stretched> 
                                login
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button onClick={() => setActivePanel("register")} size="l" stretched appearance="neutral"> 
                                sign up
                            </Button>
                        </FormItem>
                    </FormLayoutGroup>
                </FormLayout>
            </Group>
        </Panel>
    )
}

export default Login;