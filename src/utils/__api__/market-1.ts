import axios from "axios";
import Blog from "models/blog.model";
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Banners from "@models/Banners.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import menuDropdown from "@models/menuDropdown.model";
import banner from "@models/banner.model";
import setBrand from "@models/setBrand.model";
import listProduct from "@models/listProduct.model";
import allBlog from "@models/allBlog.model";
import flashsale from "@models/flashsale.model";

const getTopRatedProduct = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/toprated-product");
  return response.data;
};

const getTopRatedBrand = async () => {
  const response = await axios.get("/api/market-1/toprated-brand");
  return response.data;
};

const getNewArrivalList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/new-arrivals");
  return response.data;
};

const getCarBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/car-brand-list");
  return response.data;
};

const getCarList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/car-list");
  return response.data;
};

//DIY
const getDiyBrands = async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/bottom-categories");
  return response.data;
};

const getDiyList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/products");
  return response.data;
};

const getNotebookBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/notebook-brand-list");
  return response.data;
};

const getNotebookList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/notebook-list");
  return response.data;
};

const getMobileBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/mobile-brand-list");
  return response.data;
};

const getMobileShops = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-1/mobile-shop-list");
  return response.data;
};

const getMobileList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/mobile-list");
  return response.data;
};

const getOpticsBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/optics/watch-brands");
  return response.data;
};

const getOpticsShops = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-1/optics/watch-shops");
  return response.data;
};

const getOpticsList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/optics-list");
  return response.data;
};

const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/bottom-categories");
  return response.data;
};

const getMoreItems = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/get-more-items");
  return response.data;
};

const getServiceList = async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-1/get-service-list");
  return response.data;
};

const getMainCarousel = async (): Promise<[MainCarouselItem]> => {
  const response = await axios.get("/api/market-1/main-carousel");
  return response.data;
};

const getFlashDeals = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/flash-deals");
  return response.data;
};

//Banner
const getBanners = async (): Promise<Banners[]> => {
  const response = await axios.get("/api/market-1/banners");
  return response.data;
};

const getTopCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/top-categories");
  return response.data;
};

const getBigDiscountList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/big-discounts");
  return response.data;
};
const getBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get("/api/market-1/blogs");
  return response.data;
};

const getHotDealList = async () => {
  const response = await axios.get("/api/market-1/hot-deals");
  return response.data;
};

const getServices = async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-1/services");
  return response.data;
};

const getBrands = async (): Promise<Brand> => {
  const response = await axios.get("/api/market-1/brand");
  return response.data;
};

const getCategorySetComputer = async (): Promise<menuDropdown[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/setComputer`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching Category Set Computer:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching Category Set Computer:", error.message);
    return [];
  }
};
const getCategoryDIY = async (): Promise<menuDropdown[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/setDIY`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching Category Set DIY:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Category Set DIY:", error.message);
    return [];
  }
};
const getCategoryBrandNoteBook = async (): Promise<setBrand[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/setBrand?category_id=13`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching setBrand Notebook DIY:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching setBrand Notebook:", error.message);
    return [];
  }
};
const getNewProduct = async (): Promise<listProduct[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/latestProduct`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching setBrand getNewProduct:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getNewProduct:", error.message);
    return [];
  }
};
const getNewBlog = async (): Promise<allBlog[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/blog/all?offset=0&limit3`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching New Blog:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching New Blog:", error.message);
    return [];
  }
};
const getBanner = async (): Promise<banner[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/home/banner?type=P`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching get Banner:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching get Banner:", error.message);
    return [];
  }
};

const getBannerSlide = async (): Promise<banner[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/home/banner?type=C&offset=0&limit=3`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getBannerSlide:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getBannerSlide:", error.message);
    return [];
  }
};

const getBannerTwo = async (): Promise<banner[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/home/banner?type=C&offset=3&limit=2`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getBannerTwo:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getBannerTwo:", error.message);
    return [];
  }
};

const getBannerBottom = async (): Promise<banner[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/home/banner?type=B&offset=0&limit=1`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getBannerBottom:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getBannerBottom:", error.message);
    return [];
  }
};

const getCategorySpecific = async (): Promise<menuDropdown[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/menuCategory?category_id=50&offset=0&limit=5`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getCategorySpecific:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getCategorySpecific:", error.message);
    return [];
  }
};

const getFlashSaleProduct = async (): Promise<flashsale[]> => {
  try {
    const formData = new FormData();
    formData.append("show_status", "F");
    formData.append("offset", "0");
    formData.append("limit", "12");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/flashsale`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getCategorySpecific:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getCategorySpecific:", error.message);
    return [];
  }
};

export default {
  getBanners,
  getBrands,
  getBlogs,
  getDiyList,
  getDiyBrands,
  getCarList,
  getCarBrands,
  getMoreItems,
  getFlashDeals,
  getMobileList,
  getCategories,
  getOpticsList,
  getServiceList,
  getMobileShops,
  getOpticsShops,
  getMainCarousel,
  getMobileBrands,
  getOpticsBrands,
  getTopCategories,
  getTopRatedBrand,
  getNotebookList,
  getNotebookBrands,
  getNewArrivalList,
  getBigDiscountList,
  getTopRatedProduct,
  getHotDealList,
  getServices,
  getCategorySetComputer,
  getCategoryDIY,
  getCategoryBrandNoteBook,
  getNewProduct,
  getNewBlog,
  getBanner,
  getBannerSlide,
  getBannerTwo,
  getBannerBottom,
  getCategorySpecific,
  getFlashSaleProduct,
};
