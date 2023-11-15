import axios from "axios";
import Product from "@models/product.model";
import Products from "@models/products.model";
import Shop from "@models/shop.model";
import productView from "@models/productView.model";
import listCouponProduct from "@models/listCouponProduct.model";
import myCouponAvaliable from "@models/myCouponAvaliable.model";

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

const getProductView = async (slug: string): Promise<Product[]> => {
  const response = await axios.get("/api/products/slug", { params: { slug } });
  return response.data;
};

const getViewProduct = async (slug: string): Promise<productView[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/product/view/${slug}`
    );
    if (response.data.res_code === "00") {
      console.log(response.data.res_result);
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
      console.log(response.data.res_result);
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
      console.log(response.data.res_result);
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
};
