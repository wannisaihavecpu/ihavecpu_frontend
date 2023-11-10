import { GetServerSideProps } from "next";
import axios from "axios";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import GroceryLayout from "@component/layout/GroceryLayout";
import CheckoutForm2 from "@sections/checkout/CheckoutForm2";
import CheckoutSummary2 from "@sections/checkout/CheckoutSummary2";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import branchList from "@models/branchList.model";
import shippingList from "@models/shippingList.model";
import paymentList from "@models/paymentList";

type Props = {
  branch: branchList;
  shipping: shippingList;
  payment: paymentList;
};


const CheckoutAlternative = (props: Props) => {
  return (
    <Container my="1.5rem">
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm2
            shippingList={props.shipping}
            paymentList={props.payment}
          />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary2 />
        </Grid>
      </Grid>
    </Container>
  );
};

CheckoutAlternative.layout = CheckoutNavLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // branch list
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

    // shipping list
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

    // payment list
    const paymentResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/paymentlist`
    );
    const paymentData = paymentResponse.data;

    let paymentList = [];
    if (paymentData.res_code === "00") {
      paymentList = paymentData.res_result;
    } else {
      console.error(
        "API returned an error for payment list:",
        paymentData.res_text
      );
    }

    return {
      props: {
        branch: branchList,
        shipping: shippingList,
        payment: paymentList,
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

export default CheckoutAlternative;
