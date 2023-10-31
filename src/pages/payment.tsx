import Grid from "@component/grid/Grid";
import PaymentForm from "@sections/payment/PaymentForm";
import PaymentSummary from "@sections/payment/PaymentSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { GetServerSideProps } from "next";
import axios from "axios";
import PaymentMethod from "@models/paymentMethod.model";

type Props = { payment: PaymentMethod };

const Checkout = (props: Props) => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm paymentMethods={props.payment} />
        {/* Pass paymentMethods as a prop */}
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/paymentlist`
    );
    const data = response.data;

    if (data.res_code === "00") {
      return {
        props: {
          payment: data.res_result,
        },
      };
    } else {
      console.error("API returned an error:", data.res_text);
    }
  } catch (error) {
    console.error("Error fetching payment methods:", error);
  }

  return {
    props: {
      paymentMethods: [],
    },
  };
};

export default Checkout;
