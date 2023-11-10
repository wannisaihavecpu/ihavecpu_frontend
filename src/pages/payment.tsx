import Grid from "@component/grid/Grid";
import PaymentForm from "@sections/payment/PaymentForm";
import PaymentSummary from "@sections/payment/PaymentSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { GetServerSideProps } from "next";
import axios from "axios";
import PaymentMethod from "@models/paymentMethod.model";
import installmentList from "@models/installmentList.model";
import shippingList from "@models/shippingList.model";

type Props = {
  payment: PaymentMethod;
  installment: installmentList;
  shipping: shippingList;
};

const Payment = (props: Props) => {
  return (
    <PaymentForm
      paymentMethods={props.payment}
      installmentList={props.installment}
      shippingList={props.shipping}
    />
  );
};

Payment.layout = CheckoutNavLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // payment list
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/paymentlist`
    );
    const data = response.data;
    let paymentList = [];

    if (data.res_code === "00") {
      paymentList = data.res_result;
    } else {
      console.error("API returned an error:", data.res_text);
    }

    // installment list
    const requestBody = {
      price: 3000,
    };

    const installmentResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/installment/list`,
      requestBody
    );
    const installmentData = installmentResponse.data;
    let installmentList = [];

    if (installmentData.res_code === "00") {
      installmentList = installmentData.res_result;
    } else {
      console.error("API returned an error:", installmentData.res_text);
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
        payment: paymentList,
        installment: installmentList,
        shipping: shippingList,
      },
    };
  } catch (error) {
    console.error("Error fetching payment methods:", error);
  }

  return {
    props: {
      paymentMethods: [],
      installmentList: [],
    },
  };
};

export default Payment;
