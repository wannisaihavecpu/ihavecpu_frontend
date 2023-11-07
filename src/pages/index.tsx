import { GetStaticProps } from "next";
// import Container from "@component/Container";
import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
import Section6 from "@sections/market-1/Section6";
import Section7 from "@sections/market-1/Section7";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
import Section13 from "@sections/market-1/Section13";
import Banner1 from "@sections/market-1/Banner1";
import Bannersection4 from "@sections/market-1/Bannersection4";
import Hotdeal from "@sections/market-1/Hotdeal";
import Blogs from "@sections/market-1/Blogs";
import api from "@utils/__api__/market-1";

import api_hotdeal from "@utils/__api__/fashion-1";

// import api_fashion2 from "@utils/__api__/fashion-2";
// data models
import Blog from "@models/blog.model";
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";

// =================================================================
type Props = {
  blogs: Blog[];
  carList?: Product[];
  carBrands?: Brand[];
  opticsShops?: Shop[];
  mobileShops?: Shop[];
  moreItems?: Product[];
  opticsList?: Product[];
  mobileList?: Product[];
  mobileBrands?: Brand[];
  opticsBrands?: Brand[];
  serviceList?: Service[];
  topRatedBrands?: Brand[];
  topCategories?: Category[];
  flashDealsData?: Product[];
  newArrivalsList?: Product[];
  bigDiscountList?: Product[];
  topRatedProducts?: Product[];
  bottomCategories?: Category[];
  mainCarouselData?: MainCarouselItem[];
  hotDealList: any[];
};
// =================================================================

const Home = (props: Props) => {
  return (
    <main>

       {/* HERO CAROUSEL AREA */}
       {/* <Herobanner data={props.mainCarouselData} /> */}
      
      
      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={props.mainCarouselData} />

      
      {/* FLASH DEAL PRODUCTS AREA */}
      <Section2 products={props.flashDealsData} />
   
       {/* DEAL OF THE DAY CAROUSEL AREA */}
  
       <Hotdeal list={props.hotDealList} />
     
      {/* TOP CATEGORIES AREA */}
      <Section3 categoryList={props.topCategories} />

      {/* TOP RATING AND BRANDS AREA */}
      <Section4 topRatedList={props.topRatedProducts} topRatedBrands={props.topRatedBrands} />

      {/* NEW ARRIVALS AREA */}
      <Section5 newArrivalsList={props.newArrivalsList} />

      {/* BIG DISCOUNT AREA */}
      <Section13 bigDiscountList={props.bigDiscountList} />

      {/* DIY LIST AREA */}
      <Section6 carBrands={props.carBrands} carList={props.carList} />

      {/* BANNER1 OFFER BANNERS AREA */}
      <Banner1 />

      {/* MOBILE PHONES AREA */}
      <Section7
        title="Set Promotiom"
        shops={props.mobileShops}
        brands={props.mobileBrands}
        productList={props.mobileList}
      />

      {/* DISCOUNT BANNERS AREA */}
      <Section8 />

      {/* BANNER SECTION 4 AREA */}
      <Bannersection4 />

      {/* OPTICS AND WATCH AREA */}
      <Section7
        title="Accessories"
        shops={props.opticsShops}
        brands={props.opticsBrands}
        productList={props.opticsList}
      />

      {/* CATEGORIES AREA */}
      <Section10 categories={props.bottomCategories} />

      {/* MORE PRODUCTS AREA */}
      <Section11 moreItems={props.moreItems} />

      <Blogs blogs={props.blogs} />

      {/* SERVICES AREA */}
      <Section12 serviceList={props.serviceList} />
      
    </main>
  );
};

Home.layout = AppLayout;

// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await api.getBlogs();
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const moreItems = await api.getMoreItems();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const serviceList = await api.getServiceList();
  const mobileBrands = await api.getMobileBrands();
  const flashDealsData = await api.getFlashDeals();
  const opticsBrands = await api.getOpticsBrands();
  const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const topRatedBrands = await api.getTopRatedBrand();
  const mainCarouselData = await api.getMainCarousel();
  const newArrivalsList = await api.getNewArrivalList();
  const bigDiscountList = await api.getBigDiscountList();
  const topRatedProducts = await api.getTopRatedProduct();
  const hotDealList = await api_hotdeal.getHotDealList();

  return {
    props: {
      blogs,
      carList,
      carBrands,
      moreItems,
      mobileList,
      opticsList,
      serviceList,
      mobileShops,
      opticsShops,
      mobileBrands,
      opticsBrands,
      topCategories,
      flashDealsData,
      topRatedBrands,
      newArrivalsList,
      bigDiscountList,
      mainCarouselData,
      topRatedProducts,
      bottomCategories,
      hotDealList,
    },
  };
};

export default Home;
