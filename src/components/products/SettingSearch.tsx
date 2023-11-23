// SettingSearch.tsx
import React from "react";
import { Small } from "@component/Typography";
import { ButtonSearch } from "@component/buttons/ButtonSearch";
import ButtonDeleteLoading from "@component/buttons/ButtonDeleteLoading";
import Icon from "../icon/Icon";
type Item = {
  id: string;
  name: string;
};
type SettingSearchProps = {
  items: Item[];
  handleItemRemove: (itemToRemove: string) => void;
};

const SettingSearch: React.FC<SettingSearchProps> = ({
  items,
  handleItemRemove,
}) => {
  // const handleRemoveClick = (itemToRemove: string) => {
  //   handleItemRemove(itemToRemove);
  // };

  return (
    <div style={{ marginTop: "15px" }}>
      {items.map((item) => (
        <ButtonSearch
          key={item.id}
          p="0.30rem 2rem"
          bg={`error.light`}
          style={{
            border: "10px",
            marginBottom: "8px",
            marginLeft: "2px",
            position: "relative",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <Small color={`error.main`} style={{ flex: 1 }}>
            {item.name}
          </Small>
          <ButtonDeleteLoading onClick={() => handleItemRemove(item.id)}>
            <Icon defaultcolor="auto" pl="3px" size="10px" color={`error`}>
              _close
            </Icon>
          </ButtonDeleteLoading>
        </ButtonSearch>
      ))}
    </div>
  );
};

export default SettingSearch;
