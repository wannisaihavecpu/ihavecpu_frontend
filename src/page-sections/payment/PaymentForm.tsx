import { FC, Fragment, useState, useEffect } from "react";
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

interface SelectedValue {
  label: string;
  value: string;
}

type Props = { paymentMethods; installmentList; shippingList };


const PaymentForm: FC<Props> = ({
  paymentMethods,
  installmentList,
}) => {
  // const width = useWindowSize();
  const router = useRouter();
  const { state, updateCustomerDetailsPurchase} = useAppContext();
  // const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedBank, setSelectedBank] = useState(null);

  const [selectedTerm, setSelectedTerm] = useState(null);

  const [apiResponsePayment, setApiResponsePayment] = useState(null);
  const [apiResponseInstallment, setApiResponseInstallment] = useState(null);

  const [termOptions, setTermOptions] = useState([]);

  const handleFormSubmit = async (values) => {
    const updatedCustomerDetail = {
      ...state.customerDetail[0],
      paymentOption: values.paymentOption,
      bankOption: values.bankOption,
      termOption: values.termOption,
    };

    updateCustomerDetailsPurchase(updatedCustomerDetail);

    router.push("/checkout-alternative");
  };


  // const handlePaymentMethodChange = (event) => {
  //   const name = event.target.name;
  //   setPaymentMethod(name);
  // };


  const handleBankSelectChange = (
    selectedValue,
    setFieldValue,
    setFieldTouched
  ) => {
    setSelectedTerm(null);
    setFieldValue("termOption", "");
    setFieldTouched("termOption", false);
    setFieldTouched("bankOption", false);

    const selectedBankData = installmentList.find(
      (installment) => installment.bank_id.toString() === selectedValue.value
    );
    if (selectedBankData) {
      setTermOptions(selectedBankData.installment_terms);
    } else {
      setTermOptions(null);
    }
  };

  // calculate
  const product = state.cart.map((item) => ({
    product_id: item.id,
    quantity: item.qty.toString(),
  }));
  const initialSelectedLabel = installmentList.find(
    (installment) => installment.bank_id.toString() === state.customerDetail[0].bankOption
  )?.bank_name;

  const calculatePayment = async () => {
    let parsedPoint = state.customerDetail[0]?.use_point;
    if (isNaN(parsedPoint)) {
      parsedPoint = 0;
    }

    const url = `${process.env.NEXT_PUBLIC_API_PATH}/payment/calculate`;

    const payload = {
      product,
      shippingMethod:
        state.customerDetail[0]?.shippingOption !== null
          ? state.customerDetail[0]?.shippingOption
          : null,
      couponID:
        state.customerDetail[0]?.code_coupon !== null
          ? state.customerDetail[0]?.code_coupon
          : null,
      point: parsedPoint !== 0 ? parsedPoint : 0,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userid: "983",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.res_code === "00") {
        setApiResponsePayment(data.res_result);
        setApiResponseInstallment(data.installmentOption);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  
  

  useEffect(() => {
    calculatePayment();
  }, []);
  useEffect(() => {
    if (state.customerDetail[0].bankOption) {
      const selectedBankData = installmentList.find(
        (item) => item.bank_id.toString() === state.customerDetail[0].bankOption
      );
  
      setSelectedBank({
        label: initialSelectedLabel || '',
        value: state.customerDetail[0].bankOption.toString() || '',
      });
  
      if (
        state.customerDetail[0].termOption !== undefined &&
        selectedBankData &&
        selectedBankData.installment_terms
      ) {
        const initialSelectedTermValue = state.customerDetail[0].termOption.toString();
        const initialSelectedTermOption = selectedBankData.installment_terms.find(
          (termOption) => termOption.term.toString() === initialSelectedTermValue
        );
  
        setSelectedTerm({
          label: initialSelectedTermOption?.interest_rate || '',
          value: initialSelectedTermValue,
        });
      }
    }
  }, [initialSelectedLabel, state.customerDetail, installmentList]);
  useEffect(() => {
    const fetchSelectedBankData = async () => {
      if (state.customerDetail[0].bankOption) {
        const selectedBankData = installmentList.find(
          (item) => item.bank_id.toString() === state.customerDetail[0].bankOption
        );
        const initialSelectedTermValue = state.customerDetail[0].termOption.toString();
        const initialSelectedTermOption = selectedBankData.installment_terms.find(
          (termOption) => termOption.term.toString() === initialSelectedTermValue
        );
  
        if (selectedBankData && selectedBankData.installment_terms) {
          setSelectedTerm({
            label: initialSelectedTermOption?.interest_rate || '',
            value: initialSelectedTermValue || '',
          });
  
          setTermOptions(selectedBankData.installment_terms);
        }
      }
    };
  
    fetchSelectedBankData();
  }, [state.customerDetail[0].bankOption, installmentList]);
  

  return (
    <Formik
      initialValues={state.customerDetail[0] || initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container flexWrap="wrap-reverse" spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              <Card1>
                {paymentMethods.map((payment, index) => (
                  <Fragment key={payment.gateway_id}>
                    <Radio
                      key={index}
                      mb={index !== paymentMethods.length - 1 ? "1.5rem" : "0"}
                      width={15}
                      height={15}
                      color={errors.paymentOption ? "ihavecpu" : "secondary"}
                      name="paymentOption"
                      value={payment.gateway_id}
                      onChange={() => {
                        setFieldValue("bankOption", "");
                        setFieldValue("termOption", "");
                        setFieldTouched("bankOption", false);
                        setFieldTouched("termOption", false);
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
                        <Box mt="1rem" p="0.5rem 1rem 0rem 1rem">
                          <Select
                            className="custom-select"
                            name="bankOption"
                            placeholder="เลือกธนาคาร"
                            mb="1rem"
                            options={installmentList.map((installment) => ({
                              label: installment.bank_name,
                              value: installment.bank_id.toString(),
                            }))}
                            value={selectedBank}
                            errorText={touched.bankOption && errors.bankOption}
                            onChange={(selectedValue: SelectedValue) => {
                              setSelectedBank({
                                label: selectedValue.label,
                                value: selectedValue.value || "0", 
                              });
                              setFieldValue("bankOption", selectedValue.value);
                              handleBankSelectChange(
                                selectedValue,
                                setFieldValue,
                                setFieldTouched
                              );
                            }}
                          />
                        </Box>
                      </Grid>
                    </Fragment>

                    {selectedBank && (
                      <Fragment>
                        <Grid item lg={6}>
                          <Box p="0.5rem 1rem 0rem 1rem">
                            <Select
                              className="custom-select"
                              name="termOption"
                              mb="1rem"
                              options={termOptions.map((term) => ({
                                label: term.interest_rate,
                                value: term.term.toString(),
                              }))}
                              placeholder="จำนวนงวดที่ผ่อนชำระ"
                              value={selectedTerm || ""}
                              errorText={
                                touched.termOption && errors.termOption
                              }
                              onChange={(selectedValue: SelectedValue) => {
                                setSelectedTerm({
                                  label: selectedValue.label,
                                  value: selectedValue.value || "0", 
                                });
                                setFieldValue(
                                  "termOption",
                                  selectedValue.value
                                );
                              }}
                            />
                          </Box>
                        </Grid>
                      </Fragment>
                    )}
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
                      <PriceFormat
                        price={apiResponsePayment?.shippingFee ?? 0}
                      />
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
                      <PriceFormat
                        price={apiResponsePayment?.discountCoupon ?? 0}
                      />
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
                      <PriceFormat
                        price={apiResponsePayment?.priceBeforeVat ?? 0}
                      />
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
                      <PriceFormat price={apiResponsePayment?.vat ?? 0} />
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
                      {selectedBank && selectedTerm ? (
                        apiResponseInstallment &&
                        apiResponseInstallment
                          .filter(
                            (option) =>
                              option.bank_id.toString() ===
                              (selectedBank?.value ?? "")
                          )
                          .map((option) => {
                            const termInfo = option.installment_terms.find(
                              (term) =>
                                term.term.toString() ===
                                (selectedTerm?.value ?? "")
                            );
                            if (termInfo) {
                              const calculatedValue =
                                termInfo.monthlyPrice *
                                parseInt(selectedTerm?.value ?? "0", 10);
                              return (
                                <PriceFormat
                                  key={`${selectedBank?.value}-${selectedTerm?.value}`}
                                  price={calculatedValue}
                                />
                              );
                            } else {
                              return null;
                            }
                          })
                      ) : (
                        <PriceFormat
                          price={apiResponsePayment?.netPrice ?? 0}
                        />
                      )}
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
  bankOption: "",
  termOption: "",
};

const checkoutSchema = yup.object().shape({
  paymentOption: yup.string().required("กรุณาเลือกวิธีการชำระเงิน"),
  bankOption: yup.string().when("paymentOption", {
    is: "8",
    then: yup.string().required("กรุณาเลือกธนาคาร"),
  }),
  termOption: yup.string().when("paymentOption", {
    is: "8",
    then: yup.string().required("กรุณาเลือกจำนวนงวดที่ผ่อนชำระ"),
  }),
});

export default PaymentForm;
