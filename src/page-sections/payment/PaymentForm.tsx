import { FC, Fragment, useState } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as yup from "yup";
// import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";

type Props = { paymentMethods };
const PaymentForm: FC<Props> = ({ paymentMethods }) => {
  // const width = useWindowSize();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleFormSubmit = async (values) => {
    console.log(values);
    // router.push("/payment");
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Grid item lg={8} md={8} xs={12}>
        <Fragment>
          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Card1 mb="2rem">
                  {paymentMethods.map((payment, index) => (
                    <Fragment key={payment.gateway_id}>
                      <Radio
                        key={payment.gateway_id}
                        mb={
                          index !== paymentMethods.length - 1 ? "1.5rem" : "0"
                        }
                        width={15}
                        height={15}
                        color="secondary"
                        name="paymentOption"
                        value={payment.gateway_id}
                        onChange={() => {
                          setFieldValue("paymentOption", payment.gateway_id);
                        }}
                        checked={values.paymentOption === payment.gateway_id}
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
                <Button variant="contained" color="primary" type="submit">
                  test
                </Button>
              </form>
            )}
          </Formik>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/checkout">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  กลับไปที่หน้ารายละเอียด
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Link href="/orders">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullwidth
                >
                  Review
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Fragment>
      </Grid>
    </Fragment>
  );
};

const initialValues = {
  paymentOption: "",
};

const checkoutSchema = yup.object().shape({
  paymentOption: yup.string().required("กรุณาเลือกวิธีการชำระเงิน"),
});

export default PaymentForm;
