import { FC, useEffect, useState } from "react";
import Divider from "@component/Divider";
import { useRouter } from "next/router";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";

const CheckoutSummary2: FC = () => {
  const { state } = useAppContext();
  const router = useRouter();
  const [apiResponseCheckout, setApiResponseCheckout] = useState(null);
  const { product: urlProduct, qty: urlQty } = router.query;

  const product = urlProduct
    ? [{ product_id: urlProduct, quantity: urlQty || "1" }]
    : state.cart.map((item) => ({
        product_id: item.id,
        quantity: item.qty.toString(),
      }));
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
        setApiResponseCheckout(data.res_result);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  useEffect(() => {
    calculatePayment();
  }, []);

  return (
    <Card1>
      <Typography color="secondary.900" fontWeight="700" mb="1.5rem">
        คำสั่งซื้อของคุณ
      </Typography>

      {urlProduct && urlQty ? (
        <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
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
              {apiResponseCheckout?.productDetail[0]?.name_th}
            </Typography>
          </div>

          <Typography
            fontSize="14px"
            color="text.hint"
            style={{ flex: "1", textAlign: "center" }}
          >
            {urlQty}
          </Typography>

          <div style={{ flex: "1", textAlign: "right" }}>
            <Typography fontSize="14px" fontWeight="600" lineHeight="1">
              <PriceFormat
                price={
                  apiResponseCheckout?.productDetail[0]?.discountPrice *
                  Number(urlQty)
                }
              />
            </Typography>
          </div>
        </FlexBox>
      ) : (
        state.cart.map((item) => {
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
                <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                  <PriceFormat price={totalPrice} />
                </Typography>
              </div>
            </FlexBox>
          );
        })
      )}

      <Divider bg="gray.300" mb="1.5rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ค่าจัดส่ง:</Typography>
        <Typography fontWeight="700">
          <PriceFormat price={apiResponseCheckout?.shippingFee ?? 0} />
        </Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ค่าส่วนลด:</Typography>
        <Typography fontWeight="700">
          <PriceFormat price={apiResponseCheckout?.discountCoupon ?? 0} />
        </Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ราคาก่อนภาษี:</Typography>
        <Typography fontWeight="700">
          <PriceFormat price={apiResponseCheckout?.priceBeforeVat ?? 0} />
        </Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
        <Typography color="text.hint">ภาษี VAT 7%:</Typography>
        <Typography fontWeight="700">
          <PriceFormat price={apiResponseCheckout?.vat ?? 0} />
        </Typography>
      </FlexBox>

      <Divider bg="gray.300" mb="0.5rem" />

      <FlexBox
        fontWeight="700"
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
      >
        <Typography>ยอดรวมสุทธิ:</Typography>
        <Typography fontWeight="700">
          <PriceFormat price={apiResponseCheckout?.netPrice ?? 0} />
        </Typography>
      </FlexBox>
      <Grid item xl={12} md={12} xs={12}>
        <Button
          mt="1rem"
          variant="contained"
          color="ihavecpu"
          type="submit"
          style={{ width: "100%" }}
        >
          ชำระเงิน
        </Button>
      </Grid>
    </Card1>
  );
};

export default CheckoutSummary2;
