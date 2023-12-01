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
  //   product: productView;
  //   shops: Shop[];
  //   sameBrandProducts: Products[];
  //   relatedProducts: Product[];
  //   frequentlyBought: Product[];
  //   listCoupon: listCouponProduct[];
  //   sameBrandProduct: listProduct[];
};
// ===============================================================

const DIYShare = (props: Props) => {
  //   const { product, listCoupon, sameBrandProducts, sameBrandProduct } = props;

  //   const router = useRouter();
  //   const [selectedOption, setSelectedOption] = useState("overview");

  //   const handleOptionClick = (opt) => () => setSelectedOption(opt);

  //   if (router.isFallback) {
  //     return <h1>Loading...</h1>;
  //   }

  return <Fragment></Fragment>;
};

DIYShare.layout = NavbarLayout;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const shops = await api.getAvailableShop();
//   const sameBrandProducts = await api.getSameBrandProducts();
//   const relatedProducts = await api.getRelatedProducts();
//   const frequentlyBought = await api.getFrequentlyBought();
//   const products = await api.getViewProduct(params.product_id as string);
//   const listCoupon = await api.getListCouponProduct(
//     params.product_id as string
//   );

//   const productsArray = Array.isArray(products) ? products : [products];
//   const catIds =
//     productsArray.length > 0
//       ? productsArray.map((product) => product.cat_id).filter(Boolean)
//       : [];

//   const sameBrandProduct = await api.getSameBrandProduct(catIds);

//   return {
//     props: {
//       frequentlyBought,
//       relatedProducts,
//       product: products,
//       shops,
//       sameBrandProducts,
//       listCoupon,
//       sameBrandProduct,
//     },
//   };
// };

export default DIYShare;
