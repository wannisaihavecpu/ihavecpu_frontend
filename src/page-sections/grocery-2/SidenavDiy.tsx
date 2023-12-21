import { FC } from "react";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import { SemiSpan } from "@component/Typography";
import menuDropdown from "@models/menuDropdown.model";
import StyledProductCategory from "../market-1/styled";

// ======================================================================================
type Props = { isFixed?: boolean; navList: menuDropdown[] };
// =======================================================================================

const SidenavDiy: FC<Props> = ({ navList }) => {
  return (
    <Card
      position="relative"
      p="20px 20px 14px 24px"
      // overflow={isFixed ? "auto" : "unset"}
    >
      {navList.map((subcategory, i) => (
        <StyledProductCategory key={i} mb="0.75rem">
          <Icon size="20px" defaultcolor="auto">
            {subcategory.icon}
          </Icon>

          <SemiSpan className="product-diy-title">
            {subcategory.title_th}
          </SemiSpan>
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
