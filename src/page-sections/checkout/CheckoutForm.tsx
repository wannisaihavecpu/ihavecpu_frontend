import { FC, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik } from "formik";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography, { H6 } from "@component/Typography";
import { Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Divider from "@component/Divider";
import Radio from "@component/radio";
import Icon from "@component/icon/Icon";
import ModalCouponPurchase from "@component/products/ModalCouponPurchase";
import CouponNoButton from "@component/products/CouponNoButton";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import StyledSearchBox from "@component/search-box/styled";
import Box from "@component/Box";
import Select from "@component/Select";

// import { useFormik } from "formik";
type Props = { branchList; shippingList; listCoupon };

const CheckoutForm: FC<Props> = ({ shippingList, listCoupon }) => {
  const router = useRouter();
  const { state, updateCustomerDetailsPurchase } = useAppContext();

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [taxInvoice, setTaxInvoice] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const [buttonClicked, setButtonClicked] = useState(null);

  const handleFormSubmit = async (values) => {
    if (buttonClicked === "submitPayment") {
      updateCustomerDetailsPurchase(values);

      router.push("/payment");
    }
  };
  const clearSelectedCoupon = () => {
    setSelectedCoupon(null);
  };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: handleFormSubmit,
  //   validationSchema: checkoutSchema,
  // });

  const updateCustomerDetails = (values) => {
    const { dispatch } = useAppContext();

    dispatch({
      type: "UPDATE_CUSTOMER_DETAILS_PURCHASE",
      payload: values,
    });
  };

  const handleCheckboxChange =
    (values, setFieldValue) =>
    ({ target: { checked } }) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);

      if (!checked) {
        // clear the billing address fields when unchecked
        setFieldValue("bill_address1", "");
        setFieldValue("bill_subdistrict", "");
        setFieldValue("bill_state", "");
        setFieldValue("bill_city", "");
        setFieldValue("bill_postcode", "");
      } else {
        // opulate billing address fields with shipping address if checked
        setFieldValue("bill_address1", values.ship_address1);
        setFieldValue("bill_subdistrict", values.ship_subdistrict);
        setFieldValue("bill_state", values.ship_state);
        setFieldValue("bill_city", values.ship_city);
        setFieldValue("bill_postcode", values.ship_postcode);
      }
    };

  const handleRequestTaxCheckboxChange =
    (values: typeof initialValues, setFieldValue) =>
    ({ target: { checked } }) => {
      setTaxInvoice(checked);
      setFieldValue("request_tax", checked);
      setFieldValue("same_as_shipping", checked);
      setFieldValue("billing_name", checked ? values.ship_firstname : "");
    };

  function calculatePointsFromTotalPrice(totalPrice) {
    const conversionRate = 25;
    const points = Math.floor((totalPrice / 2500) * conversionRate);

    return points;
  }
  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  console.log("selectedCoupon", selectedCoupon);

  return (
    <Fragment>
      <Formik
        initialValues={state.customerDetail[0] || initialValues}
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
              {/* LEFT */}
              <Grid item lg={8} md={8} xs={12}>
                <Card1 mb="2rem">
                  <Typography fontWeight="600" mb="1rem">
                    ที่อยู่ในการจัดส่ง
                  </Typography>

                  <Grid container spacing={7}>
                    <Grid item sm={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ชื่อ"
                            name="ship_firstname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ship_firstname}
                            errorText={
                              touched.ship_firstname && errors.ship_firstname
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              mb="1rem"
                              label="นามสกุล"
                              name="ship_lastname"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.ship_lastname}
                              errorText={
                                touched.ship_lastname && errors.ship_lastname
                              }
                            />
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              mb="1rem"
                              label="อีเมล"
                              name="ship_email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.ship_email}
                              errorText={
                                touched.ship_email && errors.ship_email
                              }
                            />
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              mb="1rem"
                              label="เบอร์โทรศัพท์"
                              name="ship_mobile"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.ship_mobile}
                              errorText={
                                touched.ship_mobile && errors.ship_mobile
                              }
                              maxLength={10}
                            />
                          </div>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ที่อยู่"
                            name="ship_address1"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ship_address1}
                            errorText={
                              touched.ship_address1 && errors.ship_address1
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ตำบล/แขวง"
                            name="ship_subdistrict"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ship_subdistrict}
                            errorText={
                              touched.ship_subdistrict &&
                              errors.ship_subdistrict
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="จังหวัด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="ship_state"
                            value={values.ship_state}
                            errorText={touched.ship_state && errors.ship_state}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="เขต/อำเภอ"
                            name="ship_city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ship_city}
                            errorText={touched.ship_city && errors.ship_city}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="รหัสไปรษณีย์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="ship_postcode"
                            value={values.ship_postcode}
                            errorText={
                              touched.ship_postcode && errors.ship_postcode
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <CheckBox
                            color="secondary"
                            name="request_tax"
                            label="ขอใบกำกับภาษี"
                            mb={taxInvoice ? "" : "1rem"}
                            onChange={handleRequestTaxCheckboxChange(
                              values,
                              setFieldValue
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card1>
                {sameAsShipping}
                {taxInvoice && (
                  <Card1 mb="2rem">
                    <Typography fontWeight="600" mb="1rem">
                      ที่อยู่ออกใบกำกับภาษี
                    </Typography>

                    <CheckBox
                      color="secondary"
                      name="address_bill"
                      label="ใช้ที่อยู่เดียวกันกับจัดส่ง"
                      mb="1rem"
                      onChange={handleCheckboxChange(values, setFieldValue)}
                    />
                    <Grid item sm={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ชื่อ"
                            name="bill_firstname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_firstname}
                            errorText={
                              touched.bill_firstname && errors.bill_firstname
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="นามสกุล"
                            name="bill_lastname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_lastname}
                            errorText={
                              touched.bill_lastname && errors.bill_lastname
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            onBlur={handleBlur}
                            label="ชื่อบริษัท"
                            name="bill_companyname"
                            onChange={handleChange}
                            value={values.bill_companyname}
                            errorText={
                              touched.bill_companyname &&
                              errors.bill_companyname
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="หมายเลขประจำตัวผู้เสียภาษี"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="bill_tax_id"
                            value={values.bill_tax_id}
                            errorText={
                              touched.bill_tax_id && errors.bill_tax_id
                            }
                          />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="เบอร์มือถือ"
                            name="bill_mobile"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_mobile}
                            errorText={
                              touched.bill_mobile && errors.bill_mobile
                            }
                            maxLength={10}
                          />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ที่อยู่"
                            name="bill_address1"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_address1}
                            errorText={
                              touched.bill_address1 && errors.bill_address1
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="ตำบล/แขวง"
                            name="bill_subdistrict"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_subdistrict}
                            errorText={
                              touched.bill_subdistrict &&
                              errors.bill_subdistrict
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="จังหวัด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="bill_state"
                            value={values.bill_state}
                            errorText={touched.bill_state && errors.bill_state}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="เขต/อำเภอ"
                            name="bill_city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bill_city}
                            errorText={touched.bill_city && errors.bill_city}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            mb="1rem"
                            label="รหัสไปรษณีย์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="bill_postcode"
                            value={values.bill_postcode}
                            errorText={
                              touched.bill_postcode && errors.bill_postcode
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card1>
                )}

                <Grid container spacing={7}>
                  <Grid item sm={6} xs={12}>
                    <Link href="/cart">
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        fullwidth
                      >
                        กลับไปที่หน้ารถเข็น
                      </Button>
                    </Link>
                  </Grid>

                  {/* <Grid item sm={6} xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullwidth
                    >
                      ดำเนินการชำระเงิน
                    </Button>
                  </Grid> */}
                </Grid>
              </Grid>
              {/* RIGHT */}
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
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        lineHeight="1"
                      >
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
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        lineHeight="1"
                      >
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
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        lineHeight="1"
                      >
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
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        lineHeight="1"
                      >
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
                    <Typography color="text.hint">วิธีการจัดส่ง:</Typography>
                    <FlexBox flexDirection="column">
                      {shippingList &&
                        shippingList.map((option) => (
                          <Radio
                            key={option.shipping_id}
                            mb="0.5rem"
                            color="secondary"
                            name="shippingOption"
                            value={option.shipping_id}
                            width={15}
                            height={15}
                            checked={
                              values.shippingOption === option.shipping_id
                            }
                            onChange={() => {
                              setFieldValue(
                                "shippingOption",
                                option.shipping_id
                              );
                            }}
                            label={
                              <Typography
                                ml="6px"
                                fontWeight="600"
                                fontSize="13px"
                              >
                                {option.title}
                              </Typography>
                            }
                          />
                        ))}
                      {touched.shippingOption && errors.shippingOption && (
                        <H6
                          fontWeight={300}
                          fontSize="12px"
                          textAlign="right"
                          color="red"
                        >
                          {errors.shippingOption}
                        </H6>
                      )}
                    </FlexBox>
                  </FlexBox>
                  <FlexBox>
                    <Grid item sm={12} xs={12}>
                      {/* <Select
                        label="สาขาที่ต้องการรับ"
                        options={branchList.map((branch) => ({
                          value: branch.branch_id,
                          label: branch.branch_name_th,
                        }))}
                        value={values.selectedBranch}
                      /> */}
                    </Grid>
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
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb="1rem"
                  >
                    <Typography
                      color="#d4001a"
                      fontWeight="600"
                      fontSize="15px"
                    >
                      สมาชิก รับคะแนนสะสม{" "}
                      {calculatePointsFromTotalPrice(getTotalPrice())} คะแนน
                    </Typography>
                  </FlexBox>

                  <Grid item xl={12} md={12} xs={12}>
                    <Box mb="1rem">
                      <FlexBox alignItems="center" mb="0.5rem">
                        <H6>ใช้คะแนนสะสม</H6>
                      </FlexBox>
                      <StyledSearchBox>
                        <Icon className="search-icon" size="18px">
                          coupon
                        </Icon>
                        <TextField
                          fullwidth
                          name="code_coupon"
                          className="search-field"
                          placeholder="กรอกคะแนนสะสม"
                        />
                        <Button
                          className="search-button"
                          variant="contained"
                          color="ihavecpu"
                          type="button"
                        >
                          กดใช้
                        </Button>
                      </StyledSearchBox>
                    </Box>
                  </Grid>

                  <Grid item xl={12} md={12} xs={12}>
                    <Card1 style={{ border: "2px solid #f1f1f1" }}>
                      {selectedCoupon ? (
                        <>
                          <CouponNoButton
                            topic={selectedCoupon.code}
                            code={selectedCoupon.code}
                            description={selectedCoupon.description}
                            color="white"
                            dateExpired={selectedCoupon.endDate}
                            onClear={clearSelectedCoupon}
                          />
                        </>
                      ) : (
                        <>
                          <FlexBox alignItems="center">
                            <Icon
                              mr="1rem"
                              size="30px"
                              variant="medium"
                              defaultcolor="currentColor"
                            >
                              coupon
                            </Icon>
                            <H6>ใช้รหัสคูปองส่วนลด?</H6>
                          </FlexBox>
                          <FlexBox>
                            <Button
                              onClick={toggleDialog}
                              mt="1rem"
                              variant="outlined"
                              color="ihavecpu"
                              style={{ width: "100%" }}
                              type="button"
                            >
                              ใช้รหัสคูปองส่วนลด
                            </Button>
                          </FlexBox>
                        </>
                      )}
                    </Card1>
                  </Grid>

                  <Grid item xl={12} md={12} xs={12}>
                    <Button
                      onClick={() => setButtonClicked("submitPayment")}
                      mt="1rem"
                      variant="contained"
                      color="ihavecpu"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      ดำเนินการชำระเงิน
                    </Button>
                    <ModalCouponPurchase
                      open={open}
                      onClose={toggleDialog}
                      selectedCoupon={selectedCoupon}
                      setSelectedCoupon={setSelectedCoupon}
                      listCoupon={listCoupon}
                    />
                  </Grid>
                </Card1>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const initialValues = {
  selectedBranch: "",
  ship_firstname: "",
  ship_lastname: "",
  ship_email: "",
  ship_mobile: "",
  ship_address1: "",
  ship_subdistrict: "",
  ship_state: "",
  ship_city: "",
  ship_postcode: "",
  bill_firstname: "",
  bill_lastname: "",
  bill_companyname: "",
  bill_tax_id: "",
  bill_mobile: "",
  bill_address1: "",
  bill_subdistrict: "",
  bill_state: "",
  bill_city: "",
  bill_postcode: "",
  shippingOption: "",
};

const checkoutSchema = yup.object().shape({
  // for shipping
  ship_firstname: yup.string().required("กรุณากรอกชื่อ"),
  ship_lastname: yup.string().required("กรุณากรอกนามสกุล"),
  ship_email: yup
    .string()
    .email("กรุณากรอกอีเมลให้ถูกต้อง")
    .required("กรุณากรอกอีเมล"),
  ship_mobile: yup
    .string()
    .test("is-ten-digit", "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง", (value) => {
      if (value) {
        const telDigits = value.replace(/\D/g, "");
        return telDigits.length === 10 && telDigits.startsWith("0");
      }
      return true;
    })
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  ship_address1: yup.string().required("กรุณากรอกที่อยู่"),
  ship_subdistrict: yup.string().required("กรุณากรอกตำบล/แขวง"),
  ship_state: yup.string().required("กรุณากรอกจังหวัด"),
  ship_city: yup.string().required("กรุณากรอกเขต/อำเภอ"),
  ship_postcode: yup.string().required("กรุณากรอกรหัสไปรษณีย์"),

  // for tax invoice
  bill_firstname: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกชื่อ"),
    otherwise: yup.string(),
  }),
  bill_lastname: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกนามสกุล"),
    otherwise: yup.string(),
  }),
  bill_companyname: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกชื่อบริษัท"),
    otherwise: yup.string(),
  }),
  bill_tax_id: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกหมายเลขประจำตัวผู้เสียภาษี"),
    otherwise: yup.string(),
  }),
  bill_mobile: yup.string().when("request_tax", {
    is: true,
    then: yup
      .string()
      .test("is-ten-digit", "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง", (value) => {
        if (value) {
          const telDigits = value.replace(/\D/g, "");
          return telDigits.length === 10 && telDigits.startsWith("0");
        }
        return true;
      })
      .required("กรุณากรอกเบอร์มือถือ"),
    otherwise: yup.string(),
  }),
  bill_address1: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกที่อยู่"),
    otherwise: yup.string(),
  }),
  bill_subdistrict: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกตำบล/แขวง"),
    otherwise: yup.string(),
  }),
  bill_state: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกจังหวัด"),
    otherwise: yup.string(),
  }),
  bill_city: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกเขต/อำเภอ"),
    otherwise: yup.string(),
  }),
  bill_postcode: yup.string().when("request_tax", {
    is: true,
    then: yup.string().required("กรุณากรอกรหัสไปรษณีย์"),
    otherwise: yup.string(),
  }),
  shippingOption: yup.string().nullable().required("กรุณาเลือกวิธีการจัดส่ง"),
});

export default CheckoutForm;
