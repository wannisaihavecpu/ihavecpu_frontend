import { FC, useState, useEffect } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Container from "@component/Container";
import { ProductCard1, ProductCard1Skeleton } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import categoryDIYHome from "@models/categoryDIYHome.model";

// ==============================================================
// type Props = { diyList: Product[]; diyBrands: Category[]};
interface Props {
  category: categoryDIYHome[];
}
// ==============================================================

const Diy2: FC<Props> = ({ category }) => {
  const [selected, setSelected] = useState("");
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const handleCategoryClick = (categoryId) => () => {
    const clickedCategory = category.find(
      (value) => value.categoryID.toString() === categoryId
    );

    if (clickedCategory && selected !== categoryId) {
      fetchProduct(parseInt(categoryId));
      setSelected(categoryId);
      setTitle(clickedCategory.title_th);
    }
  };

  const formatSlug = (name) => {
    let formattedSlug = name.replace(/\s+/g, "-");

    formattedSlug = formattedSlug
      .replace(/\/+/g, "-")
      .replace(/(\(\d{2}\+\w+\))/g, "-$1")
      .replace(/(\(\d{2}\+\w+\))-/g, "$1");

    formattedSlug = formattedSlug.replace(/[^a-zA-Z0-9-().]+/g, "");

    formattedSlug = formattedSlug.replace(/-(?=-)/g, "");

    return formattedSlug.toLowerCase();
  };
  const fetchProduct = (category_id: number) => {
    setLoading(true);
    setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${category_id}&offset=0&limit=8`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.res_code === "00" && Array.isArray(data.res_result)) {
            setProduct(data.res_result);
            setLoading(false);
          } else {
            console.error("Unexpected response:", data);
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }, 800);
  };
  useEffect(() => {
    // set default (first category in api)
    const defaultCategoryID = category[0].categoryID;
    fetchProduct(defaultCategoryID);
    setSelected(defaultCategoryID.toString());
    setTitle(category[0].title_th);
  }, []);

  return (
    <Container mb="80px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            {category.map((value, i) => (
              <StyledProductCategory
                key={i}
                mb="0.75rem"
                onClick={handleCategoryClick(value.categoryID.toString())}
                shadow={selected === value.categoryID.toString() ? 8 : null}
                bg={
                  selected === value.categoryID.toString()
                    ? "white"
                    : "gray.100"
                }
              >
                <Icon size="20px" defaultcolor="auto">
                  {value.icon}
                </Icon>

                <span className="product-category-title">{value.title_th}</span>
              </StyledProductCategory>
            ))}

            <StyledProductCategory
              id="all"
              mt="4rem"
              onClick={handleCategoryClick}
              shadow={selected.match("all") ? 4 : null}
              bg={selected.match("all") ? "white" : "gray.100"}
            >
              <Icon size="20px" defaultcolor="auto">
                tools
              </Icon>
              <span id="all" className="product-category-title">
                จัดสเป็กคอมเอง
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title={title} seeMoreLink="#" />

          {loading ? (
            <Grid container spacing={6}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Grid item lg={3} sm={6} xs={12} key={index}>
                  <ProductCard1Skeleton />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={6}>
              {product &&
                product.map((item, ind) => (
                  <Grid item lg={3} sm={6} xs={12} key={ind}>
                    <ProductCard1
                      hoverEffect
                      id={item.product_id}
                      slug={formatSlug(item.name_th)}
                      title={item.name_th}
                      price={parseInt(item.price_sale)}
                      priceBefore={parseInt(item.price_before)}
                      off={item.discount}
                      imgUrl={item.image800}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Box>
      </FlexBox>
    </Container>
  );
};

export default Diy2;
