import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { GetServerSideProps } from "next";
import axios from "axios";
import branchList from "@models/branchList.model";
import shippingList from "@models/shippingList.model";

type Props = { branch: branchList; shipping: shippingList };

const Checkout = (props: Props) => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <CheckoutForm branchList={props.branch} shippingList={props.shipping} />
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const branchResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/branchlist`
    );
    const branchData = branchResponse.data;

    let branchList = [];
    if (branchData.res_code === "00") {
      branchList = branchData.res_result;
    } else {
      console.error(
        "API returned an error for branch list:",
        branchData.res_text
      );
    }

    const shippingResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/shippinglist`
    );
    const shippingData = shippingResponse.data;

    let shippingList = [];
    if (shippingData.res_code === "00") {
      shippingList = shippingData.res_result;
    } else {
      console.error(
        "API returned an error for shipping list:",
        shippingData.res_text
      );
    }

    return {
      props: {
        branch: branchList,
        shipping: shippingList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      branch: [],
      shippingList: [],
    },
  };
};

export default Checkout;
