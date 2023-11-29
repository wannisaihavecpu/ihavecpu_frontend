import { FC, Fragment } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import { SemiSpan } from "@component/Typography";
import { Accordion, AccordionHeader } from "@component/accordion";
import { theme } from "@utils/theme";
import { NavWithChild } from "interfaces";
import { CategoryItem } from "@models/categoryNavList.model";
import menuDropdown from "@models/menuDropdown.model";
import StyledProductCategory from "../market-1/styled";

// styled component
const AccordionHeaderText = styled(FlexBox)({
  flex: "1",
  gap: "0.75rem",
  ":hover": {
    color: theme.colors.primary.main,
    "& + .caret-icon": { color: theme.colors.primary.main },
  },
});

// ======================================================================================
type Props = { isFixed?: boolean; navList: menuDropdown[] };
// =======================================================================================

const SidenavDiy: FC<Props> = ({ isFixed, navList }) => {


  return (
    <Card position="relative" p="20px 20px 14px 24px" overflow={isFixed ? "auto" : "unset"}>
   
   {navList
  .filter(subcategory => ![43, 107].includes(subcategory.displayCategoryID))
  .map((subcategory, i) => (
    <StyledProductCategory
      key={i}
      mb="0.75rem"
    >
      <img
        height={30}
        width={30}
        style={{ borderRadius: "8px" }}
        alt=""
        src={subcategory.icon !== null ? subcategory.icon : null}
      />

      <span className="product-category-title">
        {subcategory.title_th}
      </span>
    </StyledProductCategory>
  ))}

      {/* {navList.map((item) => (
        <Box mb="0.5rem" key={item.title} color="gray.700">
          {item.child ? (
            <Accordion expanded>
              <AccordionHeader px="0px" py="6px" color="inherit" justifyContent="flex-start">
                <AccordionHeaderText>
                  <Icon variant="small" defaultcolor="currentColor">
                    {item.icon}
                  </Icon>

                  <SemiSpan color="inherit" fontWeight="600" flex="1 1 0">
                    {item.title}
                  </SemiSpan>
                </AccordionHeaderText>
              </AccordionHeader>

              {item.child && renderChild(item.child as NavWithChild[])}
            </Accordion>
          ) : (
            <NavLink href={item.href} color="gray.700">
              <FlexBox py="6px" color="inherit">
                <Icon variant="small" mr="0.75rem">
                  {item.icon}
                </Icon>

                <SemiSpan color="inherit" fontWeight="600" mr="9px" flex="1 1 0">
                  {item.title}
                </SemiSpan>
              </FlexBox>
            </NavLink>
          )}
        </Box>
      ))} */}

    </Card>
  );
};

export default SidenavDiy;
