import { Fragment } from "react";
import { GetStaticProps } from "next";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2, SemiSpan } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import api from "@utils/__api__/shops";
import Shop from "@models/shop.model";

// =============================================
type Props = { shopList: Shop[] };
// =============================================

const ShopList = ({ shopList }: Props) => {
  return (
    <Fragment>
      <H2 mb="24px">All Shops</H2>

      <Grid container spacing={6}>
        {shopList.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ShopCard1
              name={item.name}
              phone={item.phone}
              address={item.address}
              rating={item.rating || 5}
              imgUrl={item.profilePicture}
              coverImgUrl={item.coverPicture}
              shopUrl={`/shops/${item.slug}`}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
        <SemiSpan>Showing 1-9 of {shopList.length} Shops</SemiSpan>
        <Pagination pageCount={Math.ceil(shopList.length / 9)} />
      </FlexBox>
    </Fragment>
  );
};

ShopList.layout = NavbarLayout;

export const getStaticProps: GetStaticProps = async () => {
  const shopList = await api.getShopList();
  return { props: { shopList } };
};

export default ShopList;
