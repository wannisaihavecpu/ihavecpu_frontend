import { FC, useEffect } from "react";
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
// import axios from "axios";
import getGroupSearch from "@models/getGroupSearch";

type ProductFilterCardProps = {
  categoryID?: string;
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
  categoryID,

  groupSearch,
}) => {
  const [low, setLow] = useState("0");
  const [high, setHigh] = useState("1000");
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string }[]
  >([]);

  const [filters, setFilter] = useState(groupSearch);

  const getSelectedItemsNames = () => {
    return selectedItems;
  };
  const handleCheckboxChange = (filterId: number, itemName: string) => {
    setSelectedItems((prevItems) => {
      const selectedItem = prevItems.find((item) => item.id === filterId);

      if (selectedItem) {
        // Remove item if already selected
        return prevItems.filter((item) => item.id !== filterId);
      } else {
        // Add item if not selected
        return [...prevItems, { id: filterId, name: itemName }];
      }
    });
  };

  useEffect(() => {
    // Fetch data when selectedItems change
    const fetchData = async () => {
      console.log("fetchData");
      try {
        const filterIds = selectedItems.map((item) => item.id);
        console.log("filterIds", filterIds);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/category/getGroupSearch/${categoryID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:
              filterIds.length > 0
                ? JSON.stringify({ filter: filterIds })
                : undefined,
          }
        );

        const data = await response.json();

        if (data.res_code === "00") {
          setFilter(data.res_result);
        } else {
          console.error("failed");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    // Call the fetch operation when selectedItems change
    fetchData();
  }, [selectedItems]); // Add selectedItems as a dependency to useEffect

  // const handleCheckboxChange = async (filterId: number, itemName: string) => {
  //   const selectedItem = selectedItems.find((item) => item.id === filterId);

  //   if (selectedItem) {
  //     setSelectedItems((prevItems) =>
  //       prevItems.filter((item) => item.id !== filterId)
  //     );
  //   } else {
  //     setSelectedItems((prevItems) => [
  //       ...prevItems,
  //       { id: filterId, name: itemName },
  //     ]);

  //     // Find the corresponding groupSearch item
  //     const selectedFilter = groupSearch.find((filter) =>
  //       filter.sub_filter.some((item) => item.filter_id === filterId)
  //     );
  //     const subFilterId = selectedFilter.sub_filter.find(
  //       (item) => item.filter_id === filterId
  //     )?.filter_id;
  //     const filterIds = selectedItems.map((item) => item.id);
  //     console.log(filterIds);

  //     // if (selectedFilter) {
  //     //   // Extract the sub_filter ID
  //     //   const subFilterId = selectedFilter.sub_filter.find(
  //     //     (item) => item.filter_id === filterId
  //     //   )?.filter_id;
  //     //   const filterIds = selectedItems.map((item) => item.id);

  //     //   if (subFilterId) {
  //     //     try {
  //     //       console.log("filterIds", filterIds);
  //     //       const response = await fetch(
  //     //         `${process.env.NEXT_PUBLIC_API_PATH}/category/getGroupSearch/13`,
  //     //         {
  //     //           method: "POST",
  //     //           headers: {
  //     //             "Content-Type": "application/json",
  //     //           },
  //     //           body: JSON.stringify({ filter: filterIds }),
  //     //         }
  //     //       );
  //     //       const data = await response.json();

  //     //       if (data.res_code === "00") {
  //     //         setFilter(data.res_result);
  //     //       } else {
  //     //         console.error("failed");
  //     //       }
  //     //     } catch (error) {
  //     //       console.error("Error", error);
  //     //     }
  //     //   }
  //     // }
  //   }
  // };

  const handleItemRemove = (itemId: number) => {
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
      {filters?.map((filter) => (
        <div key={filter.filter_id} style={{ marginBottom: "16px" }}>
          <H6>{filter.name_th}</H6>
          {filter.sub_filter.length > 0 ? (
            filter.sub_filter.map((item) => (
              <CheckBox
                my="10px"
                key={item.filter_id}
                name={item.name_th}
                value={item.filter_id.toString()}
                color="ihavecpu"
                label={<SemiSpan color="inherit">{item.name_th}</SemiSpan>}
                onChange={() =>
                  handleCheckboxChange(item.filter_id, item.name_th)
                }
                checked={selectedItems.some(
                  (selected) => selected.id === item.filter_id
                )}
              />
            ))
          ) : (
            <p>No sub-filters available</p>
          )}
          <Divider my="24px" />
        </div>
      ))}
    </Card>
  );
};

export default ProductFilterCard;
