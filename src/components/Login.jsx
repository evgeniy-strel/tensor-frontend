import React, { useState } from "react";
import { 
    FormLayout,
    FormLayoutGroup,
    FormItem,
    Input,
    Button,
} from "@vkontakte/vkui";
import { useDispatch } from "react-redux";
import { postLogin } from "../store/reducers/userSlice";
import { Link } from "react-router-dom";


const Login = ({ setActivePanel }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin(formData))
    }

    return (
        <FormLayout onSubmit={handlerSubmit}>
            <FormLayoutGroup mode="vertical">
                <FormItem top="Username" htmlFor="username">
                    <Input 
                        id="username" 
                        type="text" 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        value={formData.login}
                        autoFocus
                    />
                </FormItem>
                <FormItem top="Password" htmlFor="password">
                    <Input 
                        id="password"
                        type="password" 
                        autoComplete="on"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}  
                        value={formData.password}
                    />
                </FormItem>
            </FormLayoutGroup>
            <FormLayoutGroup>
                <FormItem>
                    <Button onClick={handlerSubmit} size="l" stretched> 
                        login
                    </Button>
                </FormItem>
                <FormItem>
                    <Link to="forgot">
                        <Button 
                            onClick={() => setActivePanel("forgot")} 
                            size="l" 
                            stretched 
                            appearance="neutral"
                        > 
                            forgot password
                        </Button>
                    </Link>
                </FormItem>
                <FormItem>
                    <Link to="register">
                        <Button 
                            onClick={() => setActivePanel("register")} 
                            size="l" 
                            stretched 
                            appearance="neutral"
                        > 
                            sign up
                        </Button>
                    </Link>
                </FormItem>
            </FormLayoutGroup>
        </FormLayout>

    )
}

export default Login;