import { CardGrid, Card, Text } from "@vkontakte/vkui";
import { cards } from "./cardsList";
import classes from "../auth.module.scss";

const styleFlex = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const Cards = ({ formData, setFormData }) => {
  return (
    <CardGrid className={classes.card_container} size="s">
      {cards.map((card) => (
        <Card
          className={
            classes.card +
            " " +
            (formData.external.tags.includes(card.tag) && classes.selected)
          }
          onClick={() =>
            !formData.external.tags.includes(card.tag)
              ? setFormData({
                  ...formData,
                  external: {
                    ...formData.external,
                    tags: [...formData.external.tags, card.tag],
                  },
                })
              : setFormData({
                  ...formData,
                  external: {
                    ...formData.external,
                    tags: formData.external.tags.filter((i) => i !== card.tag),
                  },
                })
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

export default Cards;
