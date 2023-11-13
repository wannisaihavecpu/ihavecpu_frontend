import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography from "@component/Typography";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import menuDropdown from "@models/menuDropdown.model";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ======================================================
interface Props {
  shops: Shop[];
  title: string;
  brands: Brand[];
  productList: Product[];
  category: menuDropdown[];
}

// ======================================================

const Section7: FC<Props> = ({ title, category }) => {
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState<"pro" | "base">("pro");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const setPro = category.find((cat) => cat.displayCategoryID === 107);
  const setBase = category.find((cat) => cat.displayCategoryID === 1);

  const fetchProduct = (category_id: number) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/productSet?category_id=${category_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.res_code === "00" && Array.isArray(data.res_result)) {
          setProduct(data.res_result);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                  fontSize="20px"
                  padding="0.5rem 1rem"
                  style={{ cursor: "pointer" }}
                  color={type === "pro" ? "gray.900" : "gray.600"}
                  onClick={handleChangeType("pro")}
                >
                  Set Pro
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
                  fontSize="20px"
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
            <Grid item lg={3} sm={6} xs={12}>
              <section>
                <article className="item">
                  <div className="item-img">
                    <Skeleton width={140} height={140} />
                  </div>
                  <h3 className="item-title">
                    <Skeleton count={4} />
                  </h3>
                  <div className="item-info">
                    <Skeleton width={160} height={20} />
                    <Skeleton width={30} height={20} />
                    <Skeleton width={22} height={22} circle={true} />
                  </div>
                  <Skeleton height={48} count={2} className="skeleton" />
                </article>
              </section>
            </Grid>
          ) : (
            // Render the product grid when loading is false
            <Grid container spacing={6}>
              {product &&
                product.map((item, ind) => (
                  <Grid item lg={3} sm={6} xs={12} key={ind}>
                    <ProductCard1
                      hoverEffect
                      id={item.product_id}
                      slug={item.product_id}
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

export default Section7;
