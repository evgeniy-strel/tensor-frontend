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
            (formData.external.categories.includes(card.id) && classes.selected)
          }
          onClick={() =>
            !formData.external.categories.includes(card.id)
              ? setFormData({
                  ...formData,
                  external: {
                    ...formData.external,
                    categories: [...formData.external.categories, card.id],
                  },
                })
              : setFormData({
                  ...formData,
                  external: {
                    ...formData.external,
                    categories: formData.external.categories.filter((i) => i !== card.id),
                  },
                })
          }
          mode="outline"
          style={styleFlex}
          key={card.id}
        >
          {card.icon}
          <Text>{card.title}</Text>
        </Card>
      ))}
    </CardGrid>
  );
};

export default Cards;
