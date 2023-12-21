import BlogView from "@sections/blog/BlogView";
// data models
import NavbarLayout from "@component/layout/NavbarLayout";
// import menuDropdown from "@models/menuDropdown.model";
import { Fragment } from "react";

// ========================================================
// type Grocery2Props = {
//   categories: Category[];
//   serviceList: Service[];
//   dairyProducts: Product[];
//   featuredProducts: Product[];
//   bestSellProducts: Product[];
//   bestHomeProducts: Product[];
//   navigationList: CategoryItem[];
//   mainCarouselData: GroceryTwoCarouselItem[];
//   testimonials: any[];
//   discountBanners: any[];
//   categoriess: menuDropdown[];
// };
// ========================================================

const Blog = () => {
  //   const { isFixed } = useScroll();
  //   const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Fragment>
      <BlogView />
    </Fragment>
  );
};

Blog.layout = NavbarLayout;

// export const getStaticProps: GetStaticProps = async () => {
//   const serviceList = await api.getServices();
//   const categories = await api.getCategories();
//   const testimonials = await api.getTestimonials();
//   const dairyProducts = await api.getDairyProducts();
//   const navigationList = await api.getNavigationList();
//   const mainCarouselData = await api.getMainCarousel();
//   const featuredProducts = await api.getFeaturedProducts();
//   const bestHomeProducts = await api.getBestHomeProducts();
//   const bestSellProducts = await api.getBestSellProducts();
//   const discountBanners = await api.getDiscountBannerList();

//   //   const categoriesResponse = await apiPro.getMenuDIY();
//   //   const categoriess = categoriesResponse;

//   return {
//     props: {
//       categories,
//       serviceList,
//       testimonials,
//       dairyProducts,
//       navigationList,
//       discountBanners,
//       featuredProducts,
//       bestSellProducts,
//       bestHomeProducts,
//       mainCarouselData,
//     },
//   };
// };

export default Blog;
