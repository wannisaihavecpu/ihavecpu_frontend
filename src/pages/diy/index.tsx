import { GetStaticProps } from "next";
import { useState, FC } from "react";

import Box from "@component/Box";
import { Footer2 } from "@component/footer";
import Wrapper from "@sections/diy/Wrapper";
import Section1 from "@sections/grocery-2/Section1";
import Section2 from "@sections/grocery-2/Section2";
import Section3 from "@sections/grocery-2/Section3";
import Section4 from "@sections/grocery-2/Section4";
import Section6 from "@sections/grocery-2/Section6";
import Section9 from "@sections/grocery-2/Section9";
import SidenavBar from "@sections/grocery-2/SidenavBar";
import SidenavDiy from "@sections/grocery-2/SidenavDiy";
import GroceryLayout from "@component/layout/GroceryLayout";
import useScroll from "@hook/useScroll";
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
  const { isFixed } = useScroll();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Fragment>
      {/* SIDEBAR NAVIGATION AREA */}
      {/* <Box className="sidenav" pt="1.5rem">
        <SidenavDiy navList={props.categoriess} />
      </Box> */}

      {props.categoriess && props.categoriess.length > 0 && (
        <Section4
          navList={props.categoriess}
          title="Featured Items"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Box className="content" pt="1.5rem">
        {/* HERO CAROUSEL AREA */}
        {/* <Section1 carouselData={props.mainCarouselData} /> */}

        {/* SERVICES AREA */}
        {/* <Box mb="3rem" overflow="hidden">
          <Section2 services={props.serviceList} />
        </Box> */}

        {/* SHOP BY CATEGORY AREA */}
        {/* <Box mb="3rem">
          <Section3 categories={props.categories} />
        </Box> */}

        {/* FILTER SEARCH & PRODUCT */}

        {/* BEST SELLER PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="Best Seller in Your Area"
            products={props.bestSellProducts}
          />
        </Box> */}

        {/* DISCOUNT BANNER CAROUSEL AREA */}
        {/* <Box mb="3rem">
          <Section6 cardList={props.discountBanners} />
        </Box> */}

        {/* BEST HOME PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="Best of Home Essentials"
            products={props.bestHomeProducts}
          />
        </Box> */}

        {/* SNACK AND DRINKS PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="Snacks, Drinks, Dairy & More"
            products={props.dairyProducts}
          />
        </Box> */}

        {/* TESTIMONIAL CAROUSEL AREA */}
        {/* <Box mb="3rem">
          <Section9 testimonials={props.testimonials} />
        </Box> */}

        {/* FOOTER AREA */}
        {/* <Footer2 /> */}
      </Box>
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
