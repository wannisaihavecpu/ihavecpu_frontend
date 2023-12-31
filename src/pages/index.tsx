import { GetServerSideProps } from "next";
// import Container from "@component/Container";
import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
import BannerSlide from "@sections/market-1/BannerSlide";
import Topcatrgories from "@sections/market-1/Topcatrgories";
import Toprating from "@sections/market-1/Toprating";
import Newproduct from "@sections/market-1/Newproduct";
import Diy from "@sections/market-1/Diy";
import Computorset from "@sections/market-1/Computorset";
import Notebook from "@sections/market-1/Notebook";
import Categories from "@sections/market-1/Categories";
// import Discounts from "@sections/market-1/Discounts";
// import Banner1 from "@sections/market-1/Banner1";
import Banner1box from "@sections/market-1/Banner1box";
import Banner2box from "@sections/market-1/Banner2box";
import Banner3box from "@sections/market-1/Banner3box";
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
import banner from "@models/banner.model";
import categoryDIYHome from "@models/categoryDIYHome.model";
import setBrand from "@models/setBrand.model";
import listProduct from "@models/listProduct.model";
import Banners from "@models/Banners.model";
import allBlog from "@models/allBlog.model";
import flashsale from "@models/flashsale.model";
import productShelf from "@models/productShelf";

// =================================================================
type Props = {
  brands: Brand[];
  blogs: Blog[];
  notebookList?: Product[];
  notebookBrands?: Brand[];
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
  bannerSlides?: Banners[];

  topCategories?: Category[];
  flashDealsData?: Product[];
  newArrivalsList?: Product[];
  bigDiscountList?: Product[];
  topRatedProducts?: Product[];
  bottomCategories?: Category[];
  mainCarouselData?: MainCarouselItem[];
  hotDealList?: any[];
  categorySetComputer?: menuDropdown[];
  categorySetDIY?: categoryDIYHome[];
  categorySetBrandNotebook?: setBrand[];
  newProduct?: listProduct[];
  bannerHome?: banner[];
  bannerSlide?: banner[];
  bannerTwo?: banner[];
  bannerBottom?: banner[];
  newBlog?: allBlog[];
  categorySpecific?: menuDropdown[];
  productFlashSale?: flashsale[];
  productBestSeller?: productShelf[];
};
// =================================================================

const Home = (props: Props) => {
  const FIXED_ID = "services-area";
  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      {props.bannerHome && props.bannerHome.length > 0 && (
        <Section1
          carouselData={props.mainCarouselData}
          banner={props.bannerHome}
        />
      )}

      {/* BANNER SLIDE */}
      {props.bannerSlide && props.bannerSlide.length > 0 && (
        <BannerSlide banner={props.bannerSlide} />
      )}

      {/* BANNER1 OFFER BANNERS AREA */}
      {/* <Banner1 /> */}

      {/* FEATURES BRAND LIST AREA */}
      <Featureds brands={props.brands} />

      {/* หมวดหมู่สินค้า */}
      <Categories categories={props.bottomCategories} />

      {/* DEAL OF THE DAY CAROUSEL AREA */}
      {props.productFlashSale && props.productFlashSale.length > 0 && (
        <Hotdeal product={props.productFlashSale} />
      )}

      {/* สินค้าลดราคา */}
      {/* <Discounts bigDiscountList={props.bigDiscountList} /> */}

      {/* BANNER2BOX  BANNERS AREA */}
      {props.bannerTwo && props.bannerTwo.length > 0 && (
        <Banner2box banner={props.bannerTwo} />
      )}

      {/* NEW ARRIVALS AREA */}
      {props.newProduct && props.newProduct.length > 0 && (
        <Newproduct product={props.newProduct} />
      )}

      {/* COMPUTOR SET AREA */}
      {props.categorySetComputer && props.categorySetComputer.length > 0 && (
        <Computorset category={props.categorySetComputer} />
      )}

      {/* อุปกรณ์เสริม เกมเมอร์ */}
      {props.topCategories && props.topCategories.length > 0 && (
        <Topcatrgories categoryList={props.topCategories} />
      )}

      {/* BANNER3BOX  BANNERS AREA */}
      {props.bannerSlide && props.bannerSlide.length > 0 && (
        <Banner3box banner={props.bannerSlide} />
      )}

      {/* TOP RATING AND BRANDS AREA */}
      <Toprating
        topRatedList={props.topRatedProducts}
        topRatedBrands={props.topRatedBrands}
        bestSeller={props.productBestSeller}
      />
      {/* สินค้า DIY */}
      {props.categorySetDIY && props.categorySetDIY.length > 0 && (
        <Diy category={props.categorySetDIY} />
      )}

      {/* BANNER2BOX BANNERS AREA */}
      {props.bannerTwo && props.bannerTwo.length > 0 && (
        <Banner2box banner={props.bannerTwo} />
      )}

      {/* NOTEBOOK AND WATCH AREA */}
      {props.categorySetBrandNotebook &&
        props.categorySetBrandNotebook.length > 0 && (
          <Notebook category={props.categorySetBrandNotebook} />
        )}

      {/* อุปกรณ์ต่อพ่วง */}
      {props.categorySpecific && props.categorySpecific.length > 0 && (
        <Accessories category={props.categorySpecific} />
      )}

      {/* BANNER1 OFFER BANNERS AREA */}
      {props.bannerBottom && props.bannerBottom.length > 0 && (
        <Banner1box banner={props.bannerBottom} />
      )}

      {/* บทความ */}
      {props.newBlog && props.newBlog.length > 0 && (
        <Blogs blogs={props.newBlog} />
      )}

      {/* SERVICES AREA */}
      <Services id={FIXED_ID} services={props.serviceList} />
    </main>
  );
};

Home.layout = AppLayout;

// ==============================================================

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const bannerSlides = await api.getBanners();
    const brands = await api.getBrands();
    const blogs = await api.getBlogs();
    const notebookList = await api.getNotebookList();
    const notebookBrands = await api.getNotebookBrands();
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
    const categorySetDIY = await api.getCategoryDIY();
    const categorySetBrandNotebook = await api.getCategoryBrandNoteBook();
    const newProduct = await api.getNewProduct();
    const newBlog = await api.getNewBlog();
    const bannerHome = await api.getBanner();
    const bannerSlide = await api.getBannerSlide();
    const bannerTwo = await api.getBannerTwo();
    const bannerBottom = await api.getBannerBottom();
    const categorySpecific = await api.getCategorySpecific();
    const productFlashSale = await api.getFlashSaleProduct();
    const productBestSeller = await api.getBestSeller();

    return {
      props: {
        bannerSlides,
        brands,
        blogs,
        notebookList,
        notebookBrands,
        diyList,
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
        categorySetDIY,
        categorySetBrandNotebook,
        newProduct,
        newBlog,
        bannerHome,
        bannerSlide,
        bannerTwo,
        bannerBottom,
        categorySpecific,
        productFlashSale,
        productBestSeller,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        bannerSlides: null,
        brands: null,
        blogs: null,
        notebookList: null,
        notebookBrands: null,
        diyList: null,
        diyBrands: null,
        moreItems: null,
        mobileList: null,
        opticsList: null,
        serviceList: null,
        mobileShops: null,
        opticsShops: null,
        mobileBrands: null,
        opticsBrands: null,
        topCategories: null,
        flashDealsData: null,
        topRatedBrands: null,
        newArrivalsList: null,
        bigDiscountList: null,
        mainCarouselData: null,
        topRatedProducts: null,
        bottomCategories: null,
        hotDealList: null,
        categorySetComputer: null,
        categorySetDIY: null,
        categorySetBrandNotebook: null,
        newProduct: null,
        newBlog: null,
        bannerHome: null,
        bannerSlide: null,
        bannerTwo: null,
        bannerBottom: null,
        categorySpecific: null,
        productFlashSale: null,
        productBestSeller: null,
      },
    };
  }
};

export default Home;
