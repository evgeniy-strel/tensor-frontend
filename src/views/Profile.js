import { 
    View,
    Panel,
    PanelHeader,
    Group,
    Placeholder 
} from "@vkontakte/vkui";
import { Icon28Profile } from '@vkontakte/icons';

const Profile = () => {
    return (
        <View id="profile" activePanel="profile">
            <Panel id="profile">
                <PanelHeader>Профиль</PanelHeader>
                <Group>
                    <Placeholder
                        icon={<Icon28Profile width={56} height={56} />}
                    />
                </Group>
            </Panel>
        </View>
    );
};

export default Profile;