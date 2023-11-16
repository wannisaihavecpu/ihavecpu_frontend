import { FC, useState } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Container from "@component/Container";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import Product from "@models/product.model";
import Category from "@models/category.model";

// ==============================================================
type Props = { diyList: Product[]; diyBrands: Category[]};
// ==============================================================

const Diy2: FC<Props> = ({ diyList, diyBrands }) => {
  const [selected, setSelected] = useState("");

  const handleCategoryClick = (categories: Category) => () => {
    if (selected === categories.slug) setSelected("");
    else setSelected(categories.slug);
  };

  return (
    <Container mb="80px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            {diyBrands.map((categories) => (
              <StyledProductCategory
                mb="0.75rem"
                id={categories.id}
                key={categories.id}
                title={categories.name}
                onClick={handleCategoryClick(categories)}
                shadow={selected === categories.slug ? 4 : null}
                bg={selected === categories.slug ? "white" : "gray.100"}
              >
                <Icon size="20px" defaultcolor="auto">
                          {categories.icon}
                </Icon>
                <span className="product-category-title">{categories.name}</span>
              </StyledProductCategory>
            ))}

            <StyledProductCategory
              id="all"
              mt="4rem"
              onClick={handleCategoryClick}
              shadow={selected.match("all") ? 4 : null}
              bg={selected.match("all") ? "white" : "gray.100"}
            >
              <Icon size="20px" defaultcolor="auto">tools</Icon>
              <span id="all" className="product-category-title">
                จัดสเป็กคอมเอง
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title="สินค้า DIY" seeMoreLink="#" />

          <Grid container spacing={6}>
            {diyList.map((item, ind) => (
              <Grid item lg={3} sm={6} xs={12} key={ind}>
                <ProductCard1
                  hoverEffect
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  off={item.discount}
                  rating={item.rating}
                  images={item.images}
                  imgUrl={item.thumbnail}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};

export default Diy2;
