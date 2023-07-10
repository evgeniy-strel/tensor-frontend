import React from "react";
import { FormLayout, FormItem, Input, Button } from "@vkontakte/vkui";


const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");

    const handlerSubmit = () => {
        console.log()    
    }

    return (
        <FormLayout onSubmit={handlerSubmit}>
            <FormItem top="Email" htmlFor="email">
                <Input 
                    id="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </FormItem>
            <FormItem>
                <Button
                    onClick={handlerSubmit}
                    size="l" 
                    stretched
                >
                    Done
                </Button>
            </FormItem>
        </FormLayout>
    )
}

export default ForgotPassword;