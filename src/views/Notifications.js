import React from "react";
import { 
    View,
    Panel,
    PanelHeader,
    Group,
    Placeholder 
} from "@vkontakte/vkui";
import { Icon28Notifications } from "@vkontakte/icons";


const Notifications = () => {
    return (
        <View id="notifications" activePanel="notifications">
            <Panel id="notifications">
                <PanelHeader>Notifications</PanelHeader>
                <Group style={{ height: '1000px' }}>
                    <Placeholder icon={<Icon28Notifications width={56} height={56} />} />
                </Group>
            </Panel>
        </View>
    )
}

export default Notifications;