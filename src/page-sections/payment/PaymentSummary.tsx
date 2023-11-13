import { FC } from "react";
import { Card1 } from "../../components/Card1";
import Divider from "../../components/Divider";
import FlexBox from "../../components/FlexBox";
import { useAppContext } from "@context/AppContext";
import PriceFormat from "@component/PriceFormat";
import Typography from "@component/Typography";

const CheckoutSummary: FC = () => {
  const { state } = useAppContext();
  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  return (
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
              <Typography fontSize="14px" fontWeight="600" lineHeight="1">
                <PriceFormat price={totalPrice} />
              </Typography>
            </div>
          </FlexBox>
        );
      })}

      <Divider mb="1rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ค่าจัดส่ง:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="14px" fontWeight="600" lineHeight="1">
            <PriceFormat price={0} />
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ค่าส่วนลด:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="14px" fontWeight="600" lineHeight="1">
            <PriceFormat price={0} />
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ราคาก่อนภาษี:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="14px" fontWeight="600" lineHeight="1">
            <PriceFormat price={0} />
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">ภาษี VAT 7%:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="14px" fontWeight="600" lineHeight="1">
            <PriceFormat price={0} />
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
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
    </Card1>
  );
};

export default CheckoutSummary;
