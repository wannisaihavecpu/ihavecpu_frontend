import { FC } from "react";
import Card from "@component/Card";
import SettingSearch from "./SettingSearch";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import ButtonText from "@component/buttons/ButtonText";
import TextField from "@component/text-field";
import { H6, H5, SemiSpan } from "@component/Typography";
import { useState } from "react";
import Box from "@component/Box";
import { RangeSlider } from "next-range-slider";
import getGroupSearch from "@models/getGroupSearch";

type ProductFilterCardProps = {
  groupSearch?: getGroupSearch[];
  onCheckboxChange?: (filterId: string, isSelected: boolean) => void; 
  onMinPriceChange?: (value: string) => void;
  maxPrice?: string | null;
  onMaxPriceChange?: (value: string) => void;
  clearFilters?: () => void;
  // handleItemRemove?: (itemToRemove: string) => void;
};

const ProductFilterCard: FC<ProductFilterCardProps> = ({
  // onCheckboxChange,
  // minPrice,
  onMinPriceChange,
  // maxPrice,
  onMaxPriceChange,
  clearFilters,

  groupSearch,
}) => {
  const [low, setLow] = useState("0");
  const [high, setHigh] = useState("1000");
  const [selectedItems, setSelectedItems] = useState<
    { id: string; name: string }[]
  >([]);

  const getSelectedItemsNames = () => {
    return selectedItems;
  };

  const handleCheckboxChange = (filterId: string, itemName: string) => {
    const selectedItem = selectedItems.find((item) => item.id === filterId);

    if (selectedItem) {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item.id !== filterId)
      );
    } else {
      setSelectedItems((prevItems) => [
        ...prevItems,
        { id: filterId, name: itemName },
      ]);
    }
  };
  const handleItemRemove = (itemId: string) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <Card p="18px 27px" elevation={5}>
      {getSelectedItemsNames().length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <H5>การค้นหา</H5>
            <ButtonText onClick={clearFilters}>ล้างทั้งหมด</ButtonText>
          </div>
          <Box m="6px">
            <SettingSearch
              items={getSelectedItemsNames()}
              handleItemRemove={handleItemRemove}
            />
          </Box>
          <Divider mt="18px" mb="24px" />
        </>
      ) : null}
      <H6 mb="16px">ช่วงราคา</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          placeholder="0"
          type="number"
          fullwidth
          value={low}
          onChange={(e) => {
            const value = e.target.value;
            setLow(value);
            onMinPriceChange(value);
          }}
        />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField
          placeholder="250"
          type="number"
          fullwidth
          value={high}
          onChange={(e) => {
            const value = e.target.value;
            setHigh(value);
            onMaxPriceChange(value);
          }}
        />
      </FlexBox>
      <RangeSlider
        min={0}
        max={12000}
        step={50}
        options={{
          leftInputProps: {
            value: low,
            onChange: (e) => {
              const value = e.target.value;
              setLow(value);
              onMinPriceChange(value);
            },
          },
          rightInputProps: {
            value: high,
            onChange: (e) => {
              const value = e.target.value;
              setHigh(value);
              onMaxPriceChange(value);
            },
          },
        }}
      />
      <Divider my="24px" />
      {groupSearch?.map((filter) => (
        <div key={filter.filter_id} style={{ marginBottom: "16px" }}>
          <H6>{filter.name_th}</H6>
          {filter.sub_filter.map((item) => (
            <CheckBox
              my="10px"
              key={item.filter_id}
              name={item.name_th}
              value={item.filter_id.toString()}
              color="ihavecpu"
              label={<SemiSpan color="inherit">{item.name_th}</SemiSpan>}
              onChange={() =>
                handleCheckboxChange(item.filter_id.toString(), item.name_th)
              }
              checked={selectedItems.some(
                (selected) => selected.id === item.filter_id.toString()
              )}
            />
          ))}
          <Divider my="24px" />
        </div>
      ))}
    </Card>
  );
};

export default ProductFilterCard;
