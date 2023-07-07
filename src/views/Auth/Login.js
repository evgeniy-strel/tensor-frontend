import React, { useState } from "react";
import { 
    View,
    Panel,
    PanelHeader,
    Group,
    FormLayout,
    FormLayoutGroup,
    FormItem,
    Input,
    Button
} from "@vkontakte/vkui";
import RequestAPI from "../../API/requests";


const Login = () => {
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });
  
    const submit = () => {
        RequestAPI.login(formData)
    }

    return (
        <View id="login" activePanel="login">
            <Panel id="login">
                <PanelHeader>Login</PanelHeader>
                <Group style={{ height: '1000px' }}>
                    <FormLayout>
                        <FormLayoutGroup mode="vertical">
                            <FormItem top="Email" htmlFor="email">
                                <Input 
                                    id="email" 
                                    onChange={(e) => setFormData({...formData, login: e.target.value})} 
                                    type="email" 
                                    value={formData.login}
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
                                <Button onClick={submit} size="l" stretched>
                                    Login
                                </Button>
                            </FormItem>
                        </FormLayoutGroup>
                    </FormLayout>
                </Group>
            </Panel>
        </View>
    )
}

export default Login;