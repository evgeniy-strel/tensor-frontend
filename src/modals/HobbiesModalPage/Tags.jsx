import { CardGrid, Card, Text } from "@vkontakte/vkui";
import { cards } from "../../views/Auth/Interests/cardsList";
import classes from "./index.module.scss";

const styleFlex = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const Tags = ({ tags, setTags }) => {
  return (
    <CardGrid className={classes.card_container} size="s">
      {cards.map((card) => (
        <Card
          className={
            classes.card + " " + (tags.includes(card.tag) && classes.selected)
          }
          onClick={() =>
            !tags.includes(card.tag)
              ? setTags([...tags, card.tag])
              : setTags([...tags.filter((i) => i !== card.tag)])
          }
          mode="outline"
          style={styleFlex}
          key={card.tag}
        >
          {card.icon}
          <Text>{card.title}</Text>
        </Card>
      ))}
    </CardGrid>
  );
};

export default Tags;
