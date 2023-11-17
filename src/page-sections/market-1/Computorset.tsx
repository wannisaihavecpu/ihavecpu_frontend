import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography from "@component/Typography";
import { ProductCard1, ProductCard1Skeleton } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import menuDropdown from "@models/menuDropdown.model";

// ======================================================
interface Props {
  category: menuDropdown[];
}

// ======================================================

const Computorset: FC<Props> = ({ category }) => {
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState<"pro" | "base">("pro");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const setPro = category.find((cat) => cat.displayCategoryID === 107);
  const setBase = category.find((cat) => cat.displayCategoryID === 1);

  const [title, setTitle] = useState("");

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
        `${process.env.NEXT_PUBLIC_API_PATH}/product/productSet?category_id=${category_id}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.res_code === "00" && Array.isArray(data.res_result)) {
            const fetchedTitle = type === "pro" ? "Set Promotion" : "Set Base";
            setTitle(fetchedTitle);
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
  const handleCategoryClick = (category: string) => () => {
    if (selected.match(category)) {
      setSelected("");
    } else {
      fetchProduct(parseInt(category));
      setSelected(category);
    }
  };

  const handleChangeType = (value: typeof type) => () => {
    setType(value);
    if (value === "pro") {
      setList(setPro ? setPro.subCategory : []);
    } else {
      setList(setBase ? setBase.subCategory : []);
    }
  };

  useEffect(() => setList(setPro ? setPro.subCategory : []), [setPro]);

  useEffect(() => {
    // set default
    if (setPro && setPro.subCategory.length > 0) {
      const defaultCategoryID = setPro.subCategory[0].categoryID;
      fetchProduct(defaultCategoryID);
      setSelected(defaultCategoryID.toString());
    }
  }, [setPro]);

  return (
    <Container mb="70px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          {setPro && (
            <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
              <FlexBox mt="-0.5rem" mb="0.5rem">
                <Typography
                  fontWeight="600"
                  fontSize="18px"
                  padding="0.5rem 1rem"
                  style={{ cursor: "pointer" }}
                  color={type === "pro" ? "gray.900" : "gray.600"}
                  onClick={handleChangeType("pro")}
                >
                  Set Promotion
                </Typography>

                <Typography
                  fontSize="20px"
                  fontWeight="600"
                  lineHeight="1.3"
                  color="gray.400"
                  paddingTop="0.5rem"
                >
                  |
                </Typography>

                <Typography
                  fontSize="18px"
                  fontWeight="600"
                  padding="0.5rem 1rem"
                  style={{ cursor: "pointer" }}
                  onClick={handleChangeType("base")}
                  color={type === "base" ? "gray.900" : "gray.600"}
                >
                  Set Base
                </Typography>
              </FlexBox>

              {list.map((subcategory, i) => (
                <StyledProductCategory
                  key={i}
                  mb="0.75rem"
                  onClick={handleCategoryClick(
                    subcategory.categoryID.toString()
                  )}
                  shadow={
                    selected.match(subcategory.categoryID.toString()) ? 8 : null
                  }
                  bg={
                    selected.match(subcategory.categoryID.toString())
                      ? "white"
                      : "gray.100"
                  }
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

              <StyledProductCategory
                mt="4rem"
                onClick={handleCategoryClick(`all-${type}`)}
                shadow={selected.match(`all-${type}`) ? 4 : null}
                bg={selected.match(`all-${type}`) ? "white" : "gray.100"}
              >
                <span className="product-category-title show-all">
                  View All Set {type}
                </span>
              </StyledProductCategory>
            </Box>
          )}
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

export default Computorset;
