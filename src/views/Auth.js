import { useState, useEffect } from "react";
import {
    View,
    Panel,
    PanelHeader,
    Group,
    TabsItem,
    Tabs,
    Spinner,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

const panels = [
    {
        id: "login",
        text: "Вход",
        path: "",
    },
    {
        id: "register",
        text: "Регистрация",
        path: "register",
    },
];

const TabsHeader = ({ selected, setSelected }) => {
    const navigate = useNavigate();

    return (
        <Tabs>
            {panels.map(({ id, text, path }) => (
                <TabsItem
                    selected={selected === id}
                    onClick={() => {
                        setSelected(id);
                        navigate(path);
                    }}
                    aria-controls={id}
                    id={id}
                    key={id}
                >
                    {text}
                </TabsItem>
            ))}
        </Tabs>
    );
};

const Auth = () => {
    const loader = useSelector((state) => state.user.loader);
    const location = useLocation();

    const currentStory = () => {
        return location.pathname === "/auth"
            ? "login"
            : location.pathname.split("/")[2];
    };

    const [activePanel, setActivePanel] = useState(
        currentStory(location.pathname)
    );

    useEffect(() => setActivePanel(currentStory()), [location.pathname]);

    return (
        <View id="auth" activePanel={activePanel}>
            <Panel id={activePanel}>
                <PanelHeader>
                    <TabsHeader
                        selected={activePanel}
                        setSelected={setActivePanel}
                    />
                </PanelHeader>
                <Group>
                    {loader ? <Spinner size="medium" /> : <Outlet />}
                </Group>
            </Panel>
        </View>
    );
};

export default Auth;
