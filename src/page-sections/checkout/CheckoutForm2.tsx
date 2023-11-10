import { FC, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Card1 } from "@component/Card1";
import Typography, { H6, Paragraph } from "@component/Typography";
import { useAppContext } from "@context/AppContext";

type Props = { shippingList; paymentList };

const CheckoutForm2: FC<Props> = ({ shippingList, paymentList }) => {
  const router = useRouter();
  const { state } = useAppContext();

  // const [dateList, setDateList] = useState([]);
  // const [hasVoucher, setHasVoucher] = useState(false);

  const selectedShippingOption = shippingList.find(
    (option) => option.shipping_id === state.customerDetail[0].shippingOption
  );

  const selectedPaymentOption = paymentList.find(
    (option) => option.gateway_id === state.customerDetail[0].paymentOption
  );

  const handleFormSubmit = async (values) => {
    console.log(values);
    router.push("/payment");
  };

  const handleFieldValueChange = (value, fieldName, setFieldValue) => () => {
    setFieldValue(fieldName, value);
  };

  // const toggleHasVoucher = () => setHasVoucher((has) => !has);

  useEffect(() => {
    let list = [];
    let today = new Date();
    let dateCount = today.getDate();

    list.push({ label: format(today, "dd MMMM"), value: today });

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({ label: format(today, "dd MMMM"), value: today });
    }
  }, []);
  // console.log("Checkout alternative");
  // console.log(state);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="ihavecpu.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">รายละเอียดจัดส่ง</Typography>
            </FlexBox>

            {/* <Box mb="1.75rem">
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <Select
                    label="วันที่ต้องการรับสินค้า"
                    options={dateList}
                    value={values.date || ""}
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                    errorText={touched.date && errors.date}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Select
                    label="เวลาที่สะดวกรับ"
                    options={timeList}
                    value={values.time || ""}
                    onChange={(time) => {
                      setFieldValue("time", time);
                    }}
                    errorText={touched.time && errors.time}
                  />
                </Grid>
              </Grid>
            </Box> */}

            <Typography mb="0.75rem"></Typography>
            <Grid container spacing={6}>
              {/* shipping address*/}
              {state.customerDetail.map((item, ind) => (
                <Grid item md={6} sm={6} xs={12} key={ind}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.ship_firstname === values.ship_firstname
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.ship_firstname || "",
                      "address",
                      setFieldValue
                    )}
                    style={{ height: "100%" }}
                  >
                    <H6 mb="0.25rem">ที่อยู่ในการจัดส่งสินค้า</H6>
                    <Paragraph color="gray.700">
                      {item.ship_firstname} {item.ship_lastname}
                    </Paragraph>
                    <Paragraph color="gray.700">
                      {item.ship_address1} ต.{item.ship_subdistrict} อ.
                      {item.ship_city} จ.
                      {item.ship_state} {item.ship_postcode}
                    </Paragraph>
                  </Card>
                </Grid>
              ))}
              {/* tax address*/}
              {state.customerDetail[0].request_tax === true ? (
                <Grid item md={6} sm={6} xs={12}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      state.customerDetail[0].bill_firstname ===
                      values.bill_firstname
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      state.customerDetail[0].bill_firstname || "",
                      "address",
                      setFieldValue
                    )}
                    style={{ height: "100%" }}
                  >
                    <H6 mb="0.25rem">ที่อยู่ในการจัดส่งสินค้า (ใบกำกับภาษี)</H6>
                    <Paragraph color="gray.700">
                      {state.customerDetail[0].bill_firstname}{" "}
                      {state.customerDetail[0].bill_lastname}
                    </Paragraph>
                    <Paragraph color="gray.700">
                      {state.customerDetail[0].bill_address1} ต.
                      {state.customerDetail[0].bill_subdistrict} อ.
                      {state.customerDetail[0].bill_city} จ.
                      {state.customerDetail[0].bill_state}{" "}
                      {state.customerDetail[0].bill_postcode}
                    </Paragraph>
                  </Card>
                </Grid>
              ) : (
                <></>
              )}
              {/* delivery*/}
              {state.customerDetail[0].shippingOption ? (
                <Grid item md={6} sm={6} xs={12}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      state.customerDetail[0].bill_firstname ===
                      values.bill_firstname
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      state.customerDetail[0].bill_firstname || "",
                      "address",
                      setFieldValue
                    )}
                    style={{ height: "100%" }}
                  >
                    <H6 mb="0.25rem">วิธีการจัดส่ง</H6>
                    <Paragraph color="gray.700">
                      {selectedShippingOption.title}
                    </Paragraph>
                  </Card>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </Card1>

          {/* <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                3
              </Avatar>
              <Typography fontSize="20px">ข้อมูลส่วนตัว</Typography>
            </FlexBox>

            <Typography mb="0.75rem">ข้อมูลในการติดต่อ</Typography>

            <Grid container spacing={6}>
              {contactList.map((item) => (
                <Grid item md={4} sm={6} xs={12} key={item.contact}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.contact === values.contact
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.contact,
                      "contact",
                      setFieldValue
                    )}
                  >
                    <H6 mb="0.25rem">{item.contactType}</H6>
                    <Paragraph color="gray.700">{item.contact}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card1> */}

          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="ihavecpu.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                2
              </Avatar>
              <Typography fontSize="20px">รายละเอียดในการชำระเงิน</Typography>
            </FlexBox>

            <Typography mb="0.75rem">วิธีการชำระเงินที่เลือกไว้</Typography>
            <Grid container spacing={6}>
              {/* {paymentMethodList.map((item) => (
                <Grid item md={6} sm={6} xs={12} key={item.last4Digits}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.last4Digits === values.card
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.last4Digits,
                      "card",
                      setFieldValue
                    )}
                  >
                    <Box
                      height="24px"
                      width="36px"
                      position="relative"
                      mb="0.5rem"
                    >
                      <NextImage
                        src={`/assets/images/payment-methods/${item.cardType}.svg`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>

                    <Paragraph color="gray.700">{item.name}</Paragraph>
                  </Card>
                </Grid>
              ))} */}
              {state.customerDetail[0].paymentOption ? (
                <Grid item md={7} sm={6} xs={12}>
                  <Card
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor="primary.main"
                    // onClick={handleFieldValueChange(
                    //   item.last4Digits,
                    //   "card",
                    //   setFieldValue
                    // )}
                  >
                    <Box
                      height="24px"
                      width="36px"
                      position="relative"
                      mb="0.5rem"
                    >
                      <NextImage
                        src={`/assets/images/payment-methods/${selectedPaymentOption.icon}.svg`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>

                    <Box mt="1rem">
                      <Paragraph color="gray.800" fontWeight={600}>
                        {selectedPaymentOption.method_name_th}
                      </Paragraph>
                    </Box>
                    <Box mt="0.3rem">
                      <Paragraph color="gray.600" fontSize="12px">
                        {selectedPaymentOption.method_desc_th ? (
                          <>({selectedPaymentOption.method_desc_th})</>
                        ) : (
                          <></>
                        )}
                      </Paragraph>
                    </Box>
                    <Box mt="0.3rem">
                      <Paragraph color="gray.600" fontSize="12px">
                        {state.customerDetail[0].bankOption ? (
                          <>({selectedPaymentOption.method_desc_th})</>
                        ) : (
                          <></>
                        )}
                      </Paragraph>
                    </Box>
                  </Card>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>

            {/* <Paragraph
              className="cursor-pointer"
              color="primary.main"
              mt="1.5rem"
              lineHeight="1"
              onClick={toggleHasVoucher}
            >
              ใช้คูปองส่วนลด
            </Paragraph>

            {hasVoucher && (
              <FlexBox mt="1.5rem" maxWidth="400px">
                <TextField
                  name="voucher"
                  placeholder="โค๊ดส่วนลด"
                  fullwidth
                  value={values.voucher || ""}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  ml="1rem"
                >
                  ยืนยัน
                </Button>
              </FlexBox>
            )} */}

            {/* <Button
              variant="contained"
              color="primary"
              mt="1.5rem"
              type="submit"
              fullwidth
            >
              สถานะคำสั่งซื้อ
            </Button> */}
          </Card1>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  // address: "",
  // contact: "",
  // card: "",
  // date: "",
  // time: "",
  // voucher: "",
};

const checkoutSchema = yup.object().shape({
  // address: yup.string().required("required"),
  // contact: yup.string().required("required"),
  // card: yup.string().required("required"),
  // date: yup.object().required("required"),
  // time: yup.object().required("required"),
  // voucher: yup.string(),
});

export default CheckoutForm2;
