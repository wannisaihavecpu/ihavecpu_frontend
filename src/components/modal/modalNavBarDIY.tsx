// ModalNavBarDIY.js

import React from "react";
import { ModalNavListDIY } from "./styles";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import { IconButton } from "@component/buttons";
import { H5 } from "@component/Typography";
import Icon from "@component/icon/Icon";

// import { Grid, Box, IconButton, Icon, FlexBox, H5, SemiSpan } from "@component";

const ModalNavBarDIY = ({ onClose }) => {
  return (
    <ModalNavListDIY>
      <div style={{ width: "100%" }}>
        <div className="selected-products">
          {/* {navList.map((value, i) => (
            <Fragment key={i}>
              {selectedProduct &&
                selectedProduct
                  .filter((item) => {
                    if (value.parent_id !== null) {
                      const matchingProduct = selectedProduct.find(
                        (selectedItem) =>
                          selectedItem?.additionCate[0] === value.categoryID
                      );
                      return (
                        matchingProduct &&
                        matchingProduct.additionCate.some((cate) =>
                          item.additionCate.includes(cate)
                        )
                      );
                    } else {
                      return item.categoryID === value.categoryID;
                    }
                  })
                  .map((item, ind) => (
                    <Grid item lg={12} key={ind}>
                      <StyledProductCategory
                        mb="0.75rem"
                        shadow={
                          selected === value.categoryID.toString() ? 8 : null
                        }
                        bg={
                          selected === value.categoryID.toString()
                            ? "white"
                            : "gray.100"
                        }
                        onClick={handleCategoryClick(
                          value.categoryID.toString()
                        )}
                        style={{ width: "100%" }}
                      >
                        <FlexBox
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <FlexBox alignItems="center">
                            <NextImage
                              src={item.imgUrl}
                              height={40}
                              width={40}
                              objectFit="contain"
                            />
                            <SemiSpan fontSize={12} ml="1rem">
                              {item.name.length > 12
                                ? item.name.slice(0, 12) + "..."
                                : item.name}
                            </SemiSpan>
                          </FlexBox>
                        </FlexBox>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleRemoveFromSelectedProducts(item.id)
                          }
                          style={{ marginLeft: "auto" }}
                        >
                          <Icon
                            variant="small"
                            defaultcolor="auto"
                            color="error"
                          >
                            delete
                          </Icon>
                        </IconButton>
                      </StyledProductCategory>
                    </Grid>
                  ))}

              {(!selectedProduct ||
                !selectedProduct.some((item) =>
                  value.parent_id !== null
                    ? selectedProduct
                        .find((selectedItem) =>
                          selectedItem.additionCate.includes(value.categoryID)
                        )
                        ?.additionCate?.some((cate) =>
                          item.additionCate.includes(cate)
                        )
                    : item.categoryID === value.categoryID
                )) && (
                <StyledProductCategory
                  mb="0.75rem"
                  onClick={handleCategoryClick(value.categoryID.toString())}
                  shadow={selected === value.categoryID.toString() ? 8 : null}
                  bg={
                    selected === value.categoryID.toString()
                      ? "white"
                      : "gray.100"
                  }
                >
                  {value.icon && (
                    <Icon size="20px" defaultcolor="auto">
                      {value.icon}
                    </Icon>
                  )}
                  <span className="product-diy-title">{value.title_th}</span>
                </StyledProductCategory>
              )}
            </Fragment>
          ))}

          {selectedProduct.length > 0 && (
            <Fragment>
              <StyledProductCategory
                id="all"
                mt="2rem"
                shadow={selected.match("all") ? 4 : null}
                onClick={handleCreateSpecClick}
                bg="#d4001a"
              >
                <Icon size="20px">tools</Icon>
                <span
                  id="all"
                  className="product-diy-title"
                  style={{ color: "white" }}
                >
                  สร้างชุดสเปคคอม
                </span>
              </StyledProductCategory>
              <StyledProductCategory
                id="all"
                mt="0.5rem"
                onClick={handleResetButtonClick}
                shadow={selected.match("all") ? 4 : null}
                bg="grey"
                style={{ padding: "8px" }}
              >
                <Box>
                  <span
                    id="all"
                    className="product-diy-title"
                    style={{ color: "white" }}
                  >
                    รีเซ็ต
                  </span>
                </Box>
              </StyledProductCategory>
            </Fragment>
          )} */}
        </div>

        <div className="modal-buttons"></div>
      </div>

      <FlexBox justifyContent="space-between">
        <Box className="text-left" display="flex" alignItems="center">
          <Icon size="12px" mr="0.5rem">
            menu
          </Icon>
          <H5>รายการจัดสเปคคอม</H5>
        </Box>
        <Box className="exit-button">
          <IconButton
            type="button"
            p="3px 6px 3px"
            style={{ width: "25px", height: "25px" }}
            onClick={onClose}
          >
            <Icon size="12px">close</Icon>
          </IconButton>
        </Box>
      </FlexBox>
    </ModalNavListDIY>
  );
};

export default ModalNavBarDIY;
