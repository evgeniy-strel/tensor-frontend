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

const Categories = ({ categories, setCategories }) => {
  return (
    <CardGrid className={classes.card_container} size="s">
      {cards.map((card) => (
        <Card
          className={
            classes.card +
            " " +
            (categories.includes(card.id) && classes.selected)
          }
          onClick={() =>
            !categories.includes(card.id)
              ? setCategories([...categories, card.id])
              : setCategories([...categories.filter((i) => i !== card.id)])
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

export default Categories;
