import { Fragment } from "react";
import { GetServerSideProps } from "next";
import viewDIY from "@models/viewDIY.model";
import NavbarLayout from "@component/layout/NavbarLayout";
import api from "@utils/__api__/products";
import Detail from "@sections/diy/Detail";
// ===============================================================
type Props = {
  //   product: productView;
  //   shops: Shop[];
  //   sameBrandProducts: Products[];
  //   relatedProducts: Product[];
  //   frequentlyBought: Product[];
  //   listCoupon: listCouponProduct[];
  detailDIY: viewDIY[];
};
// ===============================================================

const DIYShare = (props: Props) => {
  return (
    <Fragment>
      <Detail details={props.detailDIY} />
    </Fragment>
  );
};

DIYShare.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const detailDIY = await api.getViewDIY(params.id as string);

    return {
      props: {
        detailDIY,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: {
        detailDIY: null,
      },
    };
  }
};

export default DIYShare;
