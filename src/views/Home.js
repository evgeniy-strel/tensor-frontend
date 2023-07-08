import React from "react";
import { 
    View,
    Panel,
    PanelHeader,
    Group,
    Placeholder 
} from "@vkontakte/vkui";
import { Icon28HomeOutline } from "@vkontakte/icons";


const Home = () => {
    return (
        <View id="home" activePanel="home">
            <Panel id="home">
                <PanelHeader>Home</PanelHeader>
                <Group style={{ height: '1000px' }}>
                    <Placeholder icon={<Icon28HomeOutline width={56} height={56} />} />
                </Group>
            </Panel>
        </View>
    )
}

export default Home;