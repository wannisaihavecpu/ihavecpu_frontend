import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Stepper from "../Stepper";
import AppLayout from "./AppLayout";
import Navbar from "../navbar/Navbar";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CheckoutNavLayout: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();

  const { product: urlProduct, option: optionID, qty: urlQty } = router.query;
  const { pathname, query } = router;

  const handleStepChange = (_step, ind) => {
    const cartPath = "/cart";
    const checkoutPath = "/checkout";
    const paymentPath = "/payment";
    const checkoutAlterPath = "/checkout-alternative";

    const cartQuery = {
      product: urlProduct || "",
      option: optionID || "",
      qty: urlQty || "",
    };

    switch (ind) {
      case 0:
        if (urlProduct || optionID || urlQty) {
          router.push({
            pathname: checkoutPath,
            query: cartQuery,
          });
        } else {
          router.push(cartPath);
        }
        break;
      case 1:
        if (urlProduct || optionID || urlQty) {
          router.push({
            pathname: paymentPath,
            query: cartQuery,
          });
        } else {
          router.push(checkoutPath);
        }
        break;
      case 2:
        if (urlProduct || optionID || urlQty) {
          router.push({
            pathname: checkoutAlterPath,
            query: cartQuery,
          });
        } else {
          router.push(paymentPath);
        }
        break;
      case 3:
        if (urlProduct || optionID || urlQty) {
          router.push({
            pathname: checkoutAlterPath,
            query: cartQuery,
          });
        } else {
          router.push(checkoutAlterPath);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        if (urlProduct || optionID || urlQty) {
          setSelectedStep(1);
        } else {
          setSelectedStep(2);
        }
        break;
      case "/payment":
        if (urlProduct || optionID || urlQty) {
          setSelectedStep(2);
        } else {
          setSelectedStep(3);
        }
        break;
      case "/checkout-alternative":
        if (urlProduct || optionID || urlQty) {
          setSelectedStep(3);
        } else {
          setSelectedStep(4);
        }
        break;
      default:
        break;
    }
  }, [pathname]);
  const shouldShowCartStep = !query.product || !query.option || !query.qty;

  const dynamicStepperList = shouldShowCartStep
    ? stepperList
    : stepperList.slice(1);

  return (
    <AppLayout navbar={<Navbar />}>
      <Container my="2rem">
        <Box mb="14px">
          <Grid container spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              <Stepper
                stepperList={dynamicStepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>
        {children}
      </Container>
    </AppLayout>
  );
};

const stepperList = [
  { title: "ตะกร้าสินค้า", disabled: false },
  { title: "รายละเอียด", disabled: false },
  { title: "ชำระเงิน", disabled: false },
  { title: "ตรวจสอบรายละเอียด", disabled: false },
];

export default CheckoutNavLayout;
