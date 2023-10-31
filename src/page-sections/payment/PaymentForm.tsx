import { FC, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import PaymentMethod from "@models/paymentMethod.model";

type Props = { paymentMethods };
const PaymentForm: FC<Props> = ({ paymentMethods }) => {
  const router = useRouter();
  const width = useWindowSize();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentOptions, setPaymentOptions] = useState([]);

  const isMobile = width < 769;

  const handleFormSubmit = async (values) => {
    console.log(values);
    router.push("/payment");
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {paymentMethods.map((payment, index) => (
          <Fragment key={payment.gateway_id}>
            <Radio
              mb={index !== paymentMethods.length - 1 ? "1.5rem" : "0"}
              width={15}
              height={15}
              color="secondary"
              name={payment.gateway_id}
              onChange={handlePaymentMethodChange}
              checked={paymentMethod === payment.gateway_id}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px">
                  {payment.method_name_th}
                </Typography>
              }
            />
            {index !== paymentMethods.length - 1 && (
              <Divider mb="1.25rem" mx="-2rem" />
            )}
          </Fragment>
        ))}
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" type="submit" fullwidth>
              Review
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default PaymentForm;
