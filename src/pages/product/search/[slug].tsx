import { useState, FC } from "react";
import api from "@utils/__api__/products";
import NavbarLayout from "@component/layout/NavbarLayout";
// import useWindowSize from "@hook/useWindowSize";
// import { useRouter } from "next/router";
import ProductSearch from "@component/products/ProductSearch";
import { GetServerSideProps } from "next";
import detailCategory from "@models/detailCategory.model";
import getGroupSearch from "@models/getGroupSearch";
import search from "@models/search.model";

type Props = {
  categoryId: string;
  categoryName: string;
  product: search;
  categoryLink: string;
  categoriesDetail: detailCategory;
  filterProduct: getGroupSearch[];
  page;
};
const ProductSearchResult: FC<Props> & { layout: React.FC } = ({ product }) => {
  // const width = useWindowSize();
  // const [view, setView] = useState<"grid" | "list">("grid");

  // const isTablet = width < 1025;
  // const toggleView = useCallback((v) => () => setView(v), []);

  // const router = useRouter();
  // const { query } = router;

  // const productName = query.slug?.toString() || "";
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <ProductSearch
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        products={product}
      />
    </>
  );
};

ProductSearchResult.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const searchProduct = await api.searchProduct(slug);

    return {
      props: {
        product: searchProduct,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: {
        searchProduct: null,
      },
    };
  }
};

export default ProductSearchResult;
