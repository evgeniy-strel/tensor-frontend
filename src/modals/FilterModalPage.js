import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  FormLayout,
  FormItem,
  CustomSelect,
  CustomSelectOption,
  unstable_ChipsSelect as ChipsSelect,
  Chip,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { modalBack } from "../store/reducers/modalSlice";

const optionsSelect = [
  { label: "По количеству людей", value: "people" },
  { label: "По времени проведения", value: "time" },
  { label: "По удаленности от адреса", value: "address" },
];

const FilterModalPage = ({ id }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.categories.tags);

  return (
    <ModalPage id={id} onClose={() => dispatch(modalBack())} hideCloseButton>
      <ModalPageHeader
        before={<PanelHeaderClose onClick={() => dispatch(modalBack())} />}
      >
        Фильтры
      </ModalPageHeader>
      <Group>
        <FormLayout>
          <FormItem top="Сортировать">
            <CustomSelect
              placeholder="Сортировать по"
              options={optionsSelect}
              allowClearButton
              renderOption={({ option, ...restProps }) => (
                <CustomSelectOption {...restProps} key={option.value} />
              )}
            />
          </FormItem>
          <FormItem top="Содержит теги" htmlFor="tags">
            <ChipsSelect
              id="tags"
              options={tags.map((el) => ({
                label: el.display,
                value: el.title,
              }))}
              renderChip={({ value, label, ...restProps }) => (
                <Chip {...restProps} key={value}>
                  {label}
                </Chip>
              )}
            />
          </FormItem>
          <FormItem style={{ marginTop: "18px" }}>
            <Button stretched size="l">
              Применить
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </ModalPage>
  );
};

export default FilterModalPage;
