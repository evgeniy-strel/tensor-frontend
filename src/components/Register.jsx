import React, { useState } from "react";
import { 
    FormLayout,
    FormLayoutGroup,
    FormItem,
    Input,
    Select,
    Button
} from "@vkontakte/vkui";
import { useDispatch } from "react-redux";
import { postRegister } from "../store/reducers/userSlice";

const domain = ['@mail.ru', '@gmail.com', '@yandex.ru']

const Register = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateBirth: ""
    })

    const handlerSubmit = e => {
        e.preventDefault(); 
        dispatch(postRegister(formData));       
    }

    return (
        <FormLayout onSubmit={handlerSubmit}>
            <FormItem top="Username" htmlFor="username">
                <Input 
                    id="username"
                    type="text"
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    value={formData.username}
                />
            </FormItem>
            <FormLayoutGroup mode="horizontal" segmented>
                <FormItem top="First name" htmlFor="firstName">
                    <Input 
                        id="firstName"
                        type="text"
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        value={formData.firstName}
                    />
                </FormItem>
                <FormItem top="Last name" htmlFor="lastName">
                    <Input 
                        id="lastName"
                        type="text"
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        value={formData.lastName}
                    />
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Date of Birth" htmlFor="dateBirth">
                <Input 
                    id="dateBirth"
                    type="date"
                    onChange={e => setFormData({...formData, dateBirth: e.target.value})}
                    value={formData.dateBirth}
                />
            </FormItem>
            <FormLayoutGroup mode="horizontal" segmented>
                <FormItem top="Email" htmlFor="email">
                    <Input 
                        id="email"
                        type="email"
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        value={formData.email}
                    />
                </FormItem>
                <FormItem>
                    <Select
                        options={domain.map(i => ({
                              label: i,
                              value: i,
                            }),
                        )}
                        defaultValue={'@mail.ru'}
                    />
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Password" htmlFor="password">
                <Input 
                    id="password"
                    type="password"
                    autoComplete="on"
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    value={formData.password}
                />
            </FormItem>
            <FormItem>
                <Button 
                    onClick={handlerSubmit}
                    size="l" 
                    stretched
                >
                    sign up
                </Button>
            </FormItem>
        </FormLayout>

    )
}

export default Register;