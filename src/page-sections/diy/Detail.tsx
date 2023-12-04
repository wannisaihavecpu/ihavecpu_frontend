import { FC } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { H3, H5, H6, Paragraph } from "@component/Typography";
import Category from "@models/category.model";
import viewDIY from "@models/viewDIY.model";
import TableRow from "@component/TableRow";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import { useRouter } from "next/router";
import { useAppContext } from "@context/AppContext";

// ===========================================================
type Props = { details: viewDIY[] };
// ===========================================================

const Detail: FC<Props> = ({ details }) => {
  const router = useRouter();
  const { id } = router.query;
  const { dispatch } = useAppContext();

  const handleEditClick = () => {
    const diyId = id;

    if (diyId) {
      router.push(`/diy?id=${diyId}`);
    }
  };

  const isAnyProductOutOfStock = details.some((item) => item.stock === 0);

  const handleAddToCartButtonClick = async () => {
    try {
      details.forEach((product) => {
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            optionId: null,
            price: parseFloat(product.price_sale),
            qty: 1,
            name: product.name_th,
            imgUrl: product.imgUrl || "",
            id: product.product_id,
          },
        });
      });

      setTimeout(() => {
        router.push(`/cart`);
      }, 1000);
    } catch (error) {
      console.error("Error handling share and adding to cart", error);
    }
  };

  return (
    <Box>
      <H3 fontSize="25px" mb="1rem">
        รายการสั่งซื้อชุดสเปคคอม
      </H3>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>

            <Typography fontSize="14px">s</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>

            <Typography fontSize="14px">s</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>

            <Typography fontSize="14px">s</Typography>
          </FlexBox>
          {/* {order.isDelivered && (
            <FlexBox className="pre" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted" mr="4px">
                Delivered on:
              </Typography>

              <Typography fontSize="14px">
                {format(new Date(order.deliveredAt), "dd MMM, yyyy")}
              </Typography>
            </FlexBox>
          )} */}
        </TableRow>

        <Box py="0.5rem">
          {details.map((item, ind) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.imgUrl} size={64} />

                <Box ml="20px">
                  <H6 my="0px">{item.name_th}</H6>
                </Box>
                <Box ml="20px">
                  <H6 my="0px">
                    {item.product_id} {item.filter_id} {item.filter_sub_id}
                  </H6>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  1
                </Typography>
              </FlexBox>

              <FlexBox flex="160px" m="6px" alignItems="center">
                {item.price_sale}
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>
      <FlexBox justifyContent="right">
        <Button variant="outlined" color="secondary" onClick={handleEditClick}>
          <Typography fontSize="14px">แก้ไขรายการ</Typography>
        </Button>
        <Button
          variant="contained"
          color="ihavecpu"
          disabled={isAnyProductOutOfStock}
          onClick={handleAddToCartButtonClick}
        >
          <Typography fontSize="14px">สั่งซื้อชุดสเปคคอม</Typography>
        </Button>
      </FlexBox>
    </Box>
  );
};

export default Detail;
