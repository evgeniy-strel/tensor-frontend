import { View, Panel, PanelHeader, Group, Placeholder } from "@vkontakte/vkui";
import { Icon28CalendarOutline } from "@vkontakte/icons";

const Event = () => {
  return (
    <View id="event" activePanel="event">
      <Panel id="event">
        <PanelHeader>События</PanelHeader>
        <Group>
          <Placeholder
            icon={<Icon28CalendarOutline width={56} height={56} />}
          />
        </Group>
      </Panel>
    </View>
  );
};

export default Event;
