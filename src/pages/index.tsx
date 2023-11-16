import { GetStaticProps } from "next";
// import Container from "@component/Container";
import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
// import Section2 from "@sections/market-1/Section2";
import Topcatrgories from "@sections/market-1/Topcatrgories";
import Toprating from "@sections/market-1/Toprating";
import Newproduct from "@sections/market-1/Newproduct";
// import Section5 from "@sections/market-1/Section5";
// import Section6 from "@sections/market-1/Section6";
// import Diy from "@sections/market-1/Diy";
import Diy from "@sections/market-1/Diy";
import Computorset from "@sections/market-1/Computorset";
import Notebook from "@sections/market-1/Notebook";
// import Section8 from "@sections/market-1/Section8";
import Categories from "@sections/market-1/Categories";
// import Section11 from "@sections/market-1/Section11";
// import Section12 from "@sections/market-1/Section12";
// import Section13 from "@sections/market-1/Section13";
import Discounts from "@sections/market-1/Discounts";
import Banner1 from "@sections/market-1/Banner1";
import Banner1box from "@sections/market-1/Banner1box";
import Banner2box from "@sections/market-1/Banner2box";
import Banner3box from "@sections/market-1/Banner3box";
// import Bannersection4 from "@sections/market-1/Bannersection4";
import Featureds from "@sections/market-1/Featureds";
import Accessories from "@sections/market-1/Accessories";
import Hotdeal from "@sections/market-1/Hotdeal";
import Blogs from "@sections/market-1/Blogs";
import Services from "@sections/market-1/Service";
// API
import api from "@utils/__api__/market-1";
// data models
import Blog from "@models/blog.model";
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import menuDropdown from "@models/menuDropdown.model";

// =================================================================
type Props = {
  brands: Brand[];
  blogs: Blog[];
  notebookList?: Product[];
  notebookBrands?: Brand[];
  carList?: Product[];
  carBrands?: Brand[];
  diyList?: Product[];
  diyBrands?: Category[];
  opticsShops?: Shop[];
  mobileShops?: Shop[];
  notebookShops?: Shop[];
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
  categorySetComputer?: menuDropdown[];
};
// =================================================================

const Home = (props: Props) => {
  const FIXED_ID = "services-area";
  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      {/* <Herobanner data={props.mainCarouselData} /> */}

      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={props.mainCarouselData} />

      {/* BANNER1 OFFER BANNERS AREA */}
      <Banner1 />
      
        {/* FEATURES BRAND LIST AREA */}
        <Featureds brands={props.brands} />

      {/* CATEGORIES AREA */}
      <Categories categories={props.bottomCategories} />

      {/* BIG DISCOUNT AREA */}
      <Discounts bigDiscountList={props.bigDiscountList} />

      {/* DEAL OF THE DAY CAROUSEL AREA */}
      <Hotdeal list={props.hotDealList} />

      {/* BANNER2BOX  BANNERS AREA */}
      <Banner2box />
      
      {/* NEW ARRIVALS AREA */}
      <Newproduct newArrivalsList={props.newArrivalsList} />
      
      {/* COMPUTOR SET AREA */}
      <Computorset
        shops={props.mobileShops}
        brands={props.mobileBrands}
        productList={props.mobileList}
        category={props.categorySetComputer}
      />

      {/* TOP CATEGORIES AREA */}
      <Topcatrgories categoryList={props.topCategories} />

      {/* BANNER3BOX  BANNERS AREA */}
      <Banner3box />
      
      {/* TOP RATING AND BRANDS AREA */}
      <Toprating
        topRatedList={props.topRatedProducts}
        topRatedBrands={props.topRatedBrands}
      />
      
      {/* DIY LIST AREA */}
      {/* <Diy carBrands={props.carBrands} carList={props.carList} /> */}

      <Diy diyBrands={props.diyBrands} diyList={props.diyList} />

      {/* BANNER2BOX BANNERS AREA */}
      <Banner2box />

      {/* DIY LIST AREA */}
      {/* <Diy carBrands={props.carBrands} carList={props.carList} /> */}

      {/* DISCOUNT BANNERS AREA */}
      {/* <Section8 /> */}

      {/* BANNER SECTION 4 AREA */}
      {/* <Bannersection4 /> */}

      {/* OPTICS AND WATCH AREA */}
      {/* <Section7
        title="Accessories"
        shops={props.opticsShops}
        brands={props.opticsBrands}
        productList={props.opticsList}
      /> */}

      {/* NOTEBOOK AND WATCH AREA */}
      <Notebook
        notebookBrands={props.notebookBrands}
        notebookList={props.notebookList}
      />

      {/* MORE PRODUCTS AREA */}
      {/* <Section11 moreItems={props.moreItems} /> */}

      {/* ACCESSORIES PRODUCTS AREA */}
      <Accessories />

      {/* FLASH DEAL PRODUCTS AREA */}
      {/* <Section2 products={props.flashDealsData} /> */}

      {/* BANNER1 OFFER BANNERS AREA */}
      <Banner1box />

      {/* BLOG AREA */}
      <Blogs blogs={props.blogs} />

      {/* SERVICES AREA */}
      {/* <Section12 serviceList={props.serviceList} /> */}

      {/* SERVICES AREA */}
      <Services id={FIXED_ID} services={props.serviceList} />
    </main>
  );
};

Home.layout = AppLayout;

// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
  const brands = await api.getBrands();
  const blogs = await api.getBlogs();
  const notebookList = await api.getNotebookList();
  const notebookBrands = await api.getNotebookBrands();
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const diyList = await api.getCarList();
  const diyBrands = await api.getDiyBrands();
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
  const hotDealList = await api.getHotDealList();
  const categorySetComputer = await api.getCategorySetComputer();

  return {
    props: {
      brands,
      blogs,
      notebookList,
      notebookBrands,
      diyList,
      carList,
      carBrands,
      diyBrands,
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
      categorySetComputer,
    },
  };
};

export default Home;
