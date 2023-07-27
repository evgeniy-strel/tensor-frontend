import { CardGrid, Card, Text, Counter } from "@vkontakte/vkui";
import classes from "../auth.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Icon28PrivacyOutline } from "@vkontakte/icons";

const Cards = ({ tags, onClick }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  return (
    <CardGrid className={classes.card_container} size="s">
      {categories.map((category) => (
        <Card
          className={
            classes.card +
            " " +
            (tags.filter((el) => el.category_id === category.id).length > 0 &&
              classes.selected)
          }
          onClick={() => onClick(category)}
          mode="outline"
          key={category.id}
        >
          {tags.filter((el) => el.category_id === category.id).length > 0 && (
            <Counter
              mode="primary"
              size="s"
              style={{ position: "absolute", top: 6, right: 6 }}>
              {tags.filter((el) => el.category_id === category.id).length}
            </Counter>
          )}
          {<div dangerouslySetInnerHTML={{ __html: category.external.icon }} />}
          <Text style={{ wordBreak: "break-word" }}>{category.title}</Text>
        </Card>
      ))}
    </CardGrid>
  );
};

export default Cards;
