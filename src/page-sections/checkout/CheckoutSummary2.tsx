import { FC } from "react";
import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography, { Span } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import { Card1 } from "@component/Card1";

const CheckoutSummary2: FC = () => {
  const { state } = useAppContext();

  return (
    <Card1>
      <Typography color="secondary.900" fontWeight="700" mb="1.5rem">
        คำสั่งซื้อของคุณ
      </Typography>

      {state.cart.map((item) => (
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          mb="1.5rem"
          key={item.id}
        >
          <Typography>
            <Span fontWeight="700" fontSize="14px">
              {item.qty}
            </Span>{" "}
            x {item.name}
          </Typography>
          <Typography>
            <PriceFormat price={item.price} />
          </Typography>
        </FlexBox>
      ))}

      <Divider bg="gray.300" mb="1.5rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ราคารวม:</Typography>
        <Typography fontWeight="700">฿{(2610).toFixed(2)}</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ค่าจัดส่ง:</Typography>
        <Typography fontWeight="700">-</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ภาษี:</Typography>
        <Typography fontWeight="700">฿{(40).toFixed(2)}</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
        <Typography color="text.hint">ส่วนลด:</Typography>
        <Typography fontWeight="700">-</Typography>
      </FlexBox>

      <Divider bg="gray.300" mb="0.5rem" />

      <FlexBox
        fontWeight="700"
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
      >
        <Typography>ราคารวมทั้งหมด:</Typography>
        <Typography fontWeight="700">฿{(2610).toFixed(2)}</Typography>
      </FlexBox>
    </Card1>
  );
};

const cartList = [
  { name: "iPhone 12", quantity: 1, price: 999 },
  { name: "iPhone 12 pro", quantity: 1, price: 1199 },
  { name: "iPhone 12 pro max", quantity: 1, price: 1299 },
];

export default CheckoutSummary2;
