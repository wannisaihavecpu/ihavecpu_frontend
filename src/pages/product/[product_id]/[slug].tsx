import { Fragment, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductIntro from "@component/products/ProductIntro";
import SameBrandProducts from "@component/products/SameBrandProducts";
import ProductDescription from "@component/products/ProductDescription";
import TestResult from "@component/products/TestResult";
import Overview from "@component/products/Overview";
import api from "@utils/__api__/products";
import Shop from "@models/shop.model";
import Product from "@models/product.model";
import Products from "@models/products.model";
import productView from "@models/productView.model";
import listCouponProduct from "@models/listCouponProduct.model";
import ProductDetailNoSeemore from "@component/products/ProductDetailNoSeemore";
import listProduct from "@models/listProduct.model";

// ===============================================================
type Props = {
  product: productView;
  shops: Shop[];
  sameBrandProducts: Products[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
  listCoupon: listCouponProduct[];
  sameBrandProduct: listProduct[];
};
// ===============================================================

const ProductDetails = (props: Props) => {
  const { product, listCoupon, sameBrandProducts, sameBrandProduct } = props;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("overview");

  const handleOptionClick = (opt) => () => setSelectedOption(opt);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <ProductIntro product={product} couponList={listCoupon} />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
        flexWrap="wrap"
      >
        <H5
          mr="10px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("overview")}
          borderBottom={selectedOption === "overview" && "2px solid"}
          color={selectedOption === "overview" ? "primary.main" : "text.muted"}
        >
          ทั้งหมด
        </H5>
        {product.link_youtube && (
          <H5
            mr="10px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("testResult")}
            borderBottom={selectedOption === "testResult" && "2px solid"}
            color={
              selectedOption === "testResult" ? "primary.main" : "text.muted"
            }
          >
            ผลเทส
          </H5>
        )}
        {product.description_th && (
          <H5
            mr="10px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("productDetail")}
            borderBottom={selectedOption === "productDetail" && "2px solid"}
            color={
              selectedOption === "productDetail" ? "primary.main" : "text.muted"
            }
          >
            รายละเอียดสินค้า
          </H5>
        )}
        {product.property && product.property.length > 0 && (
          <H5
            mr="25px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("description")}
            borderBottom={selectedOption === "description" && "2px solid"}
            color={
              selectedOption === "description" ? "primary.main" : "text.muted"
            }
          >
            คุณสมบัติสินค้า
          </H5>
        )}

        {/* <H5
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
        >
          รีวิวสินค้า (3)
        </H5> */}
      </FlexBox>

      {/* DESCRIPTION AND REVIEW TAB DETAILS */}
      <Box mb="50px">
        {selectedOption === "overview" && <Overview product={product} />}
        {selectedOption === "testResult" && <TestResult />}
        {selectedOption === "productDetail" && (
          <ProductDetailNoSeemore product={product} />
        )}
        {selectedOption === "description" && (
          <ProductDescription product={product} />
        )}
        {/* {selectedOption === "review" && <ProductReview />} */}
      </Box>

      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      {/* {frequentlyBought && <FrequentlyBought products={frequentlyBought} />} */}

      {/* AVAILABLE SHOPS */}
      {/* {shops && <AvailableShops shops={shops} />} */}

      {/* RELATED PRODUCTS */}
      {sameBrandProducts && <SameBrandProducts products={sameBrandProduct} />}

      {/* {relatedProducts && <RelatedProducts products={relatedProducts} />} */}
    </Fragment>
  );
};

ProductDetails.layout = NavbarLayout;

// export const getStaticPaths: GetStaticPaths = async () => {
//   // const allProducts = await api.getAllProduct();
//   // const paths = allProducts.map(({ product_id, name_th }) => ({
//   //   params: { product_id: product_id.toString(), slug: name_th },
//   // }));
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shops = await api.getAvailableShop();
  const sameBrandProducts = await api.getSameBrandProducts();
  const relatedProducts = await api.getRelatedProducts();
  const frequentlyBought = await api.getFrequentlyBought();
  const products = await api.getViewProduct(params.product_id as string);
  const listCoupon = await api.getListCouponProduct(
    params.product_id as string
  );

  const productsArray = Array.isArray(products) ? products : [products];
  const catIds =
    productsArray.length > 0
      ? productsArray.map((product) => product.cat_id).filter(Boolean)
      : [];

  const sameBrandProduct = await api.getSameBrandProduct(catIds);

  return {
    props: {
      frequentlyBought,
      relatedProducts,
      product: products,
      shops,
      sameBrandProducts,
      listCoupon,
      sameBrandProduct,
    },
  };
};

export default ProductDetails;
