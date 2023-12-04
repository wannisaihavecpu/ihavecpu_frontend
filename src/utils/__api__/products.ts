import axios from "axios";
import Product from "@models/product.model";
import Products from "@models/products.model";
import Shop from "@models/shop.model";
import productView from "@models/productView.model";
import listCouponProduct from "@models/listCouponProduct.model";
import myCouponAvaliable from "@models/myCouponAvaliable.model";
import getAllProduct from "@models/getAllProduct.model";
import listProduct from "@models/listProduct.model";
import menuDropdown from "@models/menuDropdown.model";
import detailCategory from "@models/detailCategory.model";
import getGroupSearch from "@models/getGroupSearch";
import search from "@models/search.model";
import viewDIY from "@models/viewDIY.model";

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

// get product based on slug
const getProduct = async (slug: string): Promise<Product[]> => {
  const response = await axios.get("/api/products/slug", { params: { slug } });
  return response.data;
};

const getFrequentlyBought = async (): Promise<Product[]> => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};

const getRelatedProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/related-products");
  return response.data;
};

const getAvailableShop = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/product/shops");
  return response.data;
};

const getSameBrandProducts = async (): Promise<Products[]> => {
  const response = await axios.get("/api/products/cpu");
  return response.data;
};

const getCompareProducts = async (product_id: any): Promise<Products[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/compare}`,
    {
      params: { product_id },
    }
  );
  return response.data;
};

const getCompareMockUp = async (slug: any): Promise<Products[]> => {
  const response = await axios.get("/api/products/compare", {
    params: { slug },
  });
  return response.data;
};

const getViewProduct = async (slug: string): Promise<productView[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/view/${slug}`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching view product", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching view product", error.message);
    return [];
  }
};

const getListCouponProduct = async (
  slug: string
): Promise<listCouponProduct[]> => {
  try {
    const productIds = [slug];
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/coupons/listCouponProduct`,
      { product: productIds }
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching list coupon product",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching  list coupon produc:", error.message);
    return [];
  }
};

const getMyCoupon = async (slug: string): Promise<myCouponAvaliable[]> => {
  try {
    const productIds = [slug];
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/coupons/mycouponAvaliable`,
      { product_id: productIds },
      {
        headers: {
          "Content-Type": "application/json",
          userid: "983",
        },
      }
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching mycouponAvaliable", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching mycouponAvaliable", error.message);
    return [];
  }
};

const getAllProduct = async (): Promise<getAllProduct[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/allProduct`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching allProduct", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching allProduct", error.message);
    return [];
  }
};
const getSameBrandProduct = async (
  categoryID: string[]
): Promise<listProduct[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getSameBrandProduct",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getSameBrandProduct", error.message);
    return [];
  }
};
const getCategoryNameById = async (): Promise<menuDropdown[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/dropdown`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getCategoryNameById:",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getCategoryNameById:", error.message);
    return [];
  }
};
const getProductOfCategory = async (
  categoryID: string,
  offset: number,
  limit: number,
  sort: string
): Promise<listProduct[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}&offset=${offset}&limit=${limit}&sort=${sort}`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getProductOfCategory",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getProductOfCategory", error.message);
    return [];
  }
};

const getFilterProductCategory = async (
  categoryID: string
): Promise<getGroupSearch[]> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/category/getGroupSearch/${categoryID}`
    );
    if (response.data.res_code === "00") {
      // console.log(response.data.res_result);
      return response.data.res_result;
    } else {
      console.error(
        "Error fetching getFilterProductCategory",
        response.data.res_text
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching getFilterProductCategory", error.message);
    return [];
  }
};

const getDetailCategory = async (
  categoryID: string
): Promise<detailCategory[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/category/detail?category_id=${categoryID}`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getDetailCategory", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getDetailCategory", error.message);
    return [];
  }
};
const searchProduct = async (search: string): Promise<search[]> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/search`,
      {
        search: search,
        lang: "th",
        offset: 0,
        limit: 12,
      }
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching searchProduct", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching searchProduct", error.message);
    return [];
  }
};

const getMenuDIY = async (): Promise<menuDropdown[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/menu/menuDIY`
    );

    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getMenuDIY:", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getMenuDIY:", error.message);
    return [];
  }
};
const getViewDIY = async (id: string): Promise<viewDIY[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/diy/view?id=${id}`
    );
    if (response.data.res_code === "00") {
      return response.data.res_result;
    } else {
      console.error("Error fetching getViewDIY", response.data.res_text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching getViewDIY", error.message);
    return [];
  }
};

export default {
  getSlugs,
  getProduct,
  getFrequentlyBought,
  getRelatedProducts,
  getAvailableShop,
  getSameBrandProducts,
  getCompareProducts,
  getCompareMockUp,
  getViewProduct,
  getListCouponProduct,
  getMyCoupon,
  getAllProduct,
  getSameBrandProduct,
  getCategoryNameById,
  getProductOfCategory,
  getDetailCategory,
  getFilterProductCategory,
  searchProduct,
  getMenuDIY,
  getViewDIY,
};
