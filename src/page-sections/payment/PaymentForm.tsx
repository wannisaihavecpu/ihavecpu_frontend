import { FC, Fragment, useState,useEffect } from "react";
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
import { useRouter } from "next/router";
import Select from "@component/Select";
import FlexBox from "../../components/FlexBox";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import Box from "@component/Box";

type Props = { paymentMethods };
const PaymentForm: FC<Props> = ({ paymentMethods }) => {
  // const width = useWindowSize();
  const router = useRouter();
  const { state, updateCustomerDetailsPurchase, dispatch } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleFormSubmit = async (values) => {
    const updatedCustomerDetail = {
      ...state.customerDetail[0],
      paymentOption: values.paymentOption,
    };

    updateCustomerDetailsPurchase(updatedCustomerDetail);

    router.push("/checkout-alternative");
  };

  const handlePaymentMethodChange = (event) => {
    const name = event.target.name;
    setPaymentMethod(name);
  };

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };
  function calculatePointsFromTotalPrice(totalPrice) {
    const conversionRate = 25;
    const points = Math.floor((totalPrice / 2500) * conversionRate);

    return points;
  }
  console.log("paymentMethod", paymentMethod);

  return (
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
          <Grid container flexWrap="wrap-reverse" spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              <Card1>
                {paymentMethods.map((payment, index) => (
                  <Fragment key={payment.gateway_id}>
                    <Radio
                      key={payment.gateway_id}
                      mb={index !== paymentMethods.length - 1 ? "1.5rem" : "0"}
                      width={15}
                      height={15}
                      color={errors.paymentOption ? "ihavecpu" : "secondary"}
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
                {values.paymentOption === 8 && (
                  <Fragment>
                    <Fragment>
                      <Grid item lg={6}>
                        <Box mt="1rem">
                          <Select
                            className="custom-select"
                            mb="1rem"
                            name="bank-select"
                            options="{value}"
                            placeholder="เลือกธนาคาร"
                            onChange={(e) => console.log(e)}
                          />
                        </Box>
                      </Grid>
                    </Fragment>

                    <Fragment>
                      <Grid item lg={6}>
                        <Box>
                          <Select
                            className="custom-select"
                            name="term-select"
                            mb="1rem"
                            options="{value}"
                            placeholder="จำนวนงวดที่ผ่อนชำระ"
                            onChange={(e) => console.log(e)}
                          />
                        </Box>
                      </Grid>
                    </Fragment>
                  </Fragment>
                )}
              </Card1>

              <Box mt="1.5rem">
                {touched.paymentOption && errors.paymentOption && (
                  <Typography
                    fontWeight={300}
                    fontSize="12px"
                    textAlign="left"
                    color="red"
                  >
                    {errors.paymentOption}
                  </Typography>
                )}
              </Box>
              <Box mt="2rem">
                <Grid container spacing={7}>
                  <Grid item sm={6} xs={12}>
                    <Link href="/checkout">
                      <Button
                        variant="outlined"
                        color="ihavecpu"
                        type="button"
                        fullwidth
                      >
                        กลับไปที่หน้ารายละเอียด
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Card1>
                {state.cart.map((item) => {
                  const totalQty = item.qty;
                  const totalPrice = item.price * totalQty;

                  return (
                    <FlexBox
                      key={item.id}
                      justifyContent="space-between"
                      alignItems="center"
                      mb="0.5rem"
                    >
                      <div>
                        <Typography
                          fontSize="14px"
                          color="text.hint"
                          style={{
                            flex: "1",
                            width: "120px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </div>

                      <Typography
                        fontSize="14px"
                        color="text.hint"
                        style={{ flex: "1", textAlign: "center" }}
                      >
                        {item.qty}
                      </Typography>

                      <div style={{ flex: "1", textAlign: "right" }}>
                        <Typography
                          fontSize="14px"
                          fontWeight="600"
                          lineHeight="1"
                        >
                          <PriceFormat price={totalPrice} />
                        </Typography>
                      </div>
                    </FlexBox>
                  );
                })}

                <Divider mb="1rem" />

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography color="text.hint">ค่าจัดส่ง:</Typography>

                  <FlexBox alignItems="flex-end">
                    <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={0} />
                    </Typography>
                  </FlexBox>
                </FlexBox>

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography color="text.hint">ค่าส่วนลด:</Typography>

                  <FlexBox alignItems="flex-end">
                    <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={0} />
                    </Typography>
                  </FlexBox>
                </FlexBox>

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography color="text.hint">ราคาก่อนภาษี:</Typography>

                  <FlexBox alignItems="flex-end">
                    <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={0} />
                    </Typography>
                  </FlexBox>
                </FlexBox>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography color="text.hint">ภาษี VAT 7%:</Typography>

                  <FlexBox alignItems="flex-end">
                    <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={0} />
                    </Typography>
                  </FlexBox>
                </FlexBox>

                <Divider mb="1rem" />

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <Typography fontWeight="600" fontSize="16px">
                    ยอดรวมสุทธิ:
                  </Typography>

                  <FlexBox alignItems="flex-end">
                    <Typography
                      fontSize="18px"
                      fontWeight="600"
                      lineHeight="1"
                      textAlign="right"
                    >
                      <PriceFormat price={getTotalPrice()} />
                    </Typography>
                  </FlexBox>
                </FlexBox>
                <Grid item xl={12} md={12} xs={12}>
                  <Button
                    mt="1rem"
                    variant="contained"
                    color="ihavecpu"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    ถัดไป
                  </Button>
                </Grid>
              </Card1>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  paymentOption: "",
};

const checkoutSchema = yup.object().shape({
  paymentOption: yup.string().required("กรุณาเลือกวิธีการชำระเงิน"),
});

export default PaymentForm;
