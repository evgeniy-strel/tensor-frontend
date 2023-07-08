import React, { useState } from "react";
import { 
    Panel, 
    PanelHeader, 
    PanelHeaderBack, 
    Group, 
    FormLayout,
    FormLayoutGroup,
    FormItem,
    Input,
    Select
} from "@vkontakte/vkui";


const domain = ['@mail.ru', '@gmail.com', '@yandex.ru']

const Register = ({ setActivePanel }) => {
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
        console.log(formData)       
    }

    return (
        <Panel id="register">
            <PanelHeader 
                before={<PanelHeaderBack onClick={() => setActivePanel("login")}/>}
            >
                Sign Up
            </PanelHeader>
            <Group style={{ height: '1000px' }}>
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
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            value={formData.password}
                        />
                    </FormItem>

                </FormLayout>
            </Group>
        </Panel>
    )
}

export default Register;