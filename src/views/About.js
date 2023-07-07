import React from "react";
import { 
    View,
    Panel,
    PanelHeader,
    Group,
    Placeholder 
} from "@vkontakte/vkui";
import { Icon28BookOutline } from "@vkontakte/icons";


const About = () => {
    return (
        <View id="about" activePanel="about">
            <Panel id="about">
                <PanelHeader>About</PanelHeader>
                <Group style={{ height: '1000px' }}>
                    <Placeholder icon={<Icon28BookOutline width={56} height={56} />} />
                </Group>
            </Panel>
        </View>    
    )
}

export default About;