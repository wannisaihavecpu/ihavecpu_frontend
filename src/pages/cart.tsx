import { Fragment } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import Radio from "@component/radio";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

const Cart = () => {
  const { state, updateCustomerDetailsPurchase } = useAppContext();
  const router = useRouter();

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };
  const handleFormSubmit = async (values) => {
    const updatedCustomerDetail = {
      ...state.customerDetail[0],
      customOption: values.customOption,
    };

    updateCustomerDetailsPurchase(updatedCustomerDetail);

    router.push("/checkout");
  };

  return (
    <Formik
      initialValues={state.customerDetail[0] || initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Grid container spacing={6}>
              <Grid item lg={8} md={8} xs={12}>
                {state.cart.map((item) => (
                  <ProductCard7
                    mb="1.5rem"
                    id={item.id}
                    key={item.id}
                    qty={item.qty}
                    slug={item.slug}
                    name={item.name}
                    price={item.price}
                    imgUrl={item.imgUrl}
                  />
                ))}
              </Grid>

              <Grid item lg={4} md={4} xs={12}>
                <Card1>
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb="1rem"
                  >
                    <Typography>ยอดรวม :</Typography>

                    <Typography fontSize="15px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={getTotalPrice()} />
                    </Typography>
                  </FlexBox>
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb="1rem"
                  >
                    <Typography color="#d4001a">ส่วนลด :</Typography>

                    <Typography
                      color="#d4001a"
                      fontSize="15px"
                      fontWeight="600"
                      lineHeight="1"
                    >
                      -<PriceFormat price={0} />
                    </Typography>
                  </FlexBox>

                  <Divider mb="1rem" />

                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb="1rem"
                  >
                    <Typography fontWeight={600}>ยอดรวมสุทธิ :</Typography>

                    <Typography fontSize="15px" fontWeight="600" lineHeight="1">
                      <PriceFormat price={0} />
                    </Typography>
                  </FlexBox>

                  <Divider mb="1.5rem" />

                  <Typography fontWeight="600" mb="1rem">
                    ข้อมูลเพิ่มเติม
                  </Typography>

                  {/* <Select
              mb="1rem"
              label="ต้องการให้ iHAVECPU ประกอบให้หรือไม่"
              options={optionList}
              placeholder="เลือกสั่งประกอบ"
              onChange={(e) => console.log(e)}
            /> */}
                  <FlexBox flexDirection="column">
                    {optionList.map((option, index) => (
                      <Radio
                        key={index}
                        mb="1rem"
                        color="secondary"
                        name="customOption"
                        value={option.value}
                        width={18}
                        height={18}
                        label={
                          <Typography ml="6px" fontWeight="600" fontSize="13px">
                            {option.label}
                          </Typography>
                        }
                        checked={values.customOption === option.value}
                        onChange={() => {
                          setFieldValue("customOption", option.value);
                        }}
                      />
                    ))}
                  </FlexBox>

                  <Box my="1rem">
                    <Button
                      variant="contained"
                      type="submit"
                      color="ihavecpu"
                      style={{ width: "100%" }}
                    >
                      ดำเนินการต่อ
                    </Button>
                  </Box>
                </Card1>
              </Grid>
            </Grid>
          </Fragment>
        </form>
      )}
    </Formik>
  );
};

// const stateList = [
//   { value: "New York", label: "New York" },
//   { value: "Chicago", label: "Chicago" },
// ];

const optionList = [
  { value: 1, label: "สั่งประกอบ" },
  { value: 2, label: "ไม่ต้องประกอบ" },
];
const initialValues = {
  customOption: "",
};
const checkoutSchema = yup.object().shape({});
Cart.layout = CheckoutNavLayout;

export default Cart;
