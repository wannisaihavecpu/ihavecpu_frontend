import { useState, FC } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductsCategory from "@component/products/ProductCategory";
// import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import api from "@utils/__api__/products";
import listProduct from "@models/listProduct.model";
import detailCategory from "@models/detailCategory.model";
import getGroupSearch from "@models/getGroupSearch";

type Props = {
  categoryId: string;
  categoryName: string;
  product: listProduct;
  categoryLink: string;
  categoriesDetail: detailCategory;
  filterProduct: getGroupSearch[];
  page;
};

const Category: FC<Props> & { layout: React.FC } = ({
  categoriesDetail,
  product,
  filterProduct,
  categoryId,
  // page,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Box pt="20px">
      <FlexBox mb="1rem">
        <div>
          <img
            src={categoriesDetail.banner}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </FlexBox>

      <ProductsCategory
        groupSearch={filterProduct}
        categoryID={categoryId}
        products={product}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

Category.layout = NavbarLayout;
export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const slug = params?.slug as string;
  const page = parseInt(query.page as string) || 1;
  const sort = (query.sort as string) || "";

  try {
    const categoriesResponse = await api.getCategoryNameById();
    const categories = categoriesResponse;

    const category = categories.find((c) => c.link === `/category/${slug}`);
    const categoryID = category?.categoryID.toString();

    const categoriesDetail = await api.getDetailCategory(categoryID);

    const offset = (page - 1) * 12;
    const productResponse = await api.getProductOfCategory(
      categoryID,
      offset,
      12,
      sort
    );

    const filterProductCategory = await api.getFilterProductCategory(
      categoryID
    );

    return {
      props: {
        categoryId: category?.categoryID || "",
        categoryName: category?.title_gb || "",
        categoriesDetail,
        product: productResponse,
        filterProduct: filterProductCategory,
        page,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: {
        categoryId: "",
        categoryName: "",
        categoriesDetail: "",
        product: null,
        filterProduct: null,
      },
    };
  }
};

export default Category;
