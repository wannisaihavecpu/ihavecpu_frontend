import { GetStaticProps } from "next";
import { useState } from "react";

import Box from "@component/Box";
import Section4 from "@sections/grocery-2/Section4";
import api from "@utils/__api__/grocery-2";
// data models
import Service from "@models/service.model";
import Product from "@models/product.model";
import Category from "@models/category.model";
import { CategoryItem } from "@models/categoryNavList.model";
import { GroceryTwoCarouselItem } from "@models/carousel.model";
import NavbarLayout from "@component/layout/NavbarLayout";
import apiPro from "@utils/__api__/products";
import menuDropdown from "@models/menuDropdown.model";
import { Fragment } from "react";

// ========================================================
type Grocery2Props = {
  categories: Category[];
  serviceList: Service[];
  dairyProducts: Product[];
  featuredProducts: Product[];
  bestSellProducts: Product[];
  bestHomeProducts: Product[];
  navigationList: CategoryItem[];
  mainCarouselData: GroceryTwoCarouselItem[];
  testimonials: any[];
  discountBanners: any[];
  categoriess: menuDropdown[];
};
// ========================================================

const GroceryTwo = (props: Grocery2Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Fragment>
      {props.categoriess && props.categoriess.length > 0 && (
        <Section4
          navList={props.categoriess}
          title="Featured Items"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Box className="content" pt="1.5rem"></Box>
    </Fragment>
  );
};

GroceryTwo.layout = NavbarLayout;

export const getStaticProps: GetStaticProps = async () => {
  const serviceList = await api.getServices();
  const categories = await api.getCategories();
  const testimonials = await api.getTestimonials();
  const dairyProducts = await api.getDairyProducts();
  const navigationList = await api.getNavigationList();
  const mainCarouselData = await api.getMainCarousel();
  const featuredProducts = await api.getFeaturedProducts();
  const bestHomeProducts = await api.getBestHomeProducts();
  const bestSellProducts = await api.getBestSellProducts();
  const discountBanners = await api.getDiscountBannerList();

  const categoriesResponse = await apiPro.getMenuDIY();
  const categoriess = categoriesResponse;

  return {
    props: {
      categories,
      serviceList,
      testimonials,
      dairyProducts,
      navigationList,
      discountBanners,
      featuredProducts,
      bestSellProducts,
      bestHomeProducts,
      mainCarouselData,
      categoriess,
    },
  };
};

export default GroceryTwo;
