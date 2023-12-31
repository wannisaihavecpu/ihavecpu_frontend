import { FC, Fragment } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { H3 } from "@component/Typography";
import viewDIY from "@models/viewDIY.model";
import { Button } from "@component/buttons";
import { useRouter } from "next/router";
import { useAppContext } from "@context/AppContext";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import { ProductCard23 } from "@component/product-cards";
import PriceFormat from "@component/PriceFormat";
import Icon from "@component/icon/Icon";
import SocialButton from "@component/social/SocialButton";
import useWindowSize from "@hook/useWindowSize";

// ===========================================================
type Props = { details: viewDIY };
// ===========================================================

const Detail: FC<Props> = ({ details }) => {
  const router = useRouter();
  const { id } = router.query;
  const { dispatch } = useAppContext();
  const FIXED_ID = "services-area";
  const width = useWindowSize();

  const handleEditClick = () => {
    const diyId = id;

    if (diyId) {
      router.push(`/diy?id=${diyId}`);
    }
  };

  const isAnyProductOutOfStock = details.productDetail.some(
    (item) => item.stock === 0
  );

  const handleAddToCartButtonClick = async () => {
    try {
      details.productDetail.forEach((product) => {
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
  const formattedPrice = details?.netPrice
    ?.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return (
    <Box>
      <FlexBox alignItems="center" mb="2rem" id={FIXED_ID}>
        <Icon defaultcolor="auto" mr="0.6rem">
          list
        </Icon>
        <H3 fontWeight="bold" lineHeight="1" fontSize="22px">
          รายการสั่งซื้อชุดสเปคคอม
        </H3>
      </FlexBox>

      <Fragment>
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} xs={12} id="productlist">
            {details.productDetail.map((item) => (
              <ProductCard23
                mb="1.5rem"
                id={item.product_id}
                key={item.product_id}
                qty={item.quantity}
                slug={item.name_th}
                name={item.name_th}
                categoryName={item.category_name}
                price={parseInt(item.price_sale)}
                priceBefore={parseInt(item.price_before)}
                discount={item.discount}
                imgUrl={item.imgUrl}
              />
            ))}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            {width > 900 ? (
              // <SideNavScrollRight
              //   navFixedComponentID={FIXED_ID}
              //   navBottomFixedComponentID="card1"
              // >
              <Card1 id="card1">
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <Typography
                    fontSize="15px"
                    fontWeight="600"
                    lineHeight="1"
                  ></Typography>
                </FlexBox>
                <FlexBox justifyContent="center" alignItems="center" mb="1rem">
                  <Typography
                    color="#d4001a"
                    fontWeight={800}
                    fontSize={35}
                    textAlign="center"
                  >
                    ฿
                  </Typography>
                  <Typography
                    ml="0.5rem"
                    color="#251f1f"
                    fontWeight={800}
                    fontSize={35}
                    textAlign="center"
                  >
                    {formattedPrice ?? 0}
                  </Typography>
                </FlexBox>

                {/* <Divider mb="0.5rem" /> */}

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <Typography>ยอดรวม :</Typography>

                  <Typography fontSize="15px" fontWeight="600" lineHeight="1">
                    <PriceFormat price={details?.priceBeforeDiscount ?? 0} />
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
                    -<PriceFormat price={details?.discount ?? 0} />
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
                    <PriceFormat price={details?.netPrice ?? 0} />
                  </Typography>
                </FlexBox>

                <FlexBox flexDirection="column"></FlexBox>

                <Box my="1rem">
                  <Button
                    variant="contained"
                    type="submit"
                    color="ihavecpu"
                    disabled={isAnyProductOutOfStock}
                    onClick={handleAddToCartButtonClick}
                    style={{
                      width: "100%",
                      height: "50px",
                      boxShadow: "4px 7px 12px 0 rgba(226 , 35 , 35 , 0.2)",
                    }}
                  >
                    สั่งซื้อชุดสเปคคอม
                  </Button>
                </Box>
                <Box my="1rem">
                  <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    onClick={handleEditClick}
                    style={{
                      width: "100%",
                      height: "40px",
                      // border: "1px solid #dedeea",
                      // boxShadow: "4px 7px 12px 0 rgba(226 , 35 , 35 , 0.2)",
                    }}
                  >
                    แก้ไขรายการ
                  </Button>
                </Box>
                <Divider mt="1.5rem" mb="1rem" />
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontWeight={600}>แชร์ให้เพื่อน</Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <SocialButton />
                </FlexBox>
              </Card1>
            ) : (
              // </SideNavScrollRight>
              <Card1>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  {/* <Typography fontWeight={800} fontSize={18}>
                  ยอดรวม
                </Typography> */}

                  <Typography
                    fontSize="15px"
                    fontWeight="600"
                    lineHeight="1"
                  ></Typography>
                </FlexBox>
                <FlexBox justifyContent="center" alignItems="center" mb="1rem">
                  <Typography
                    color="#d4001a"
                    fontWeight={800}
                    fontSize={35}
                    textAlign="center"
                  >
                    ฿
                  </Typography>
                  <Typography
                    ml="0.5rem"
                    color="#251f1f"
                    fontWeight={800}
                    fontSize={35}
                    textAlign="center"
                  >
                    {formattedPrice ?? 0}
                  </Typography>
                </FlexBox>

                {/* <Divider mb="0.5rem" /> */}

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <Typography>ยอดรวม :</Typography>

                  <Typography fontSize="15px" fontWeight="600" lineHeight="1">
                    <PriceFormat price={details?.priceBeforeDiscount ?? 0} />
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
                    -<PriceFormat price={details?.discount ?? 0} />
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
                    <PriceFormat price={details?.netPrice ?? 0} />
                  </Typography>
                </FlexBox>

                {/* <Select
              mb="1rem"
              label="ต้องการให้ iHAVECPU ประกอบให้หรือไม่"
              options={optionList}
              placeholder="เลือกสั่งประกอบ"
              onChange={(e) => console.log(e)}
            /> */}
                <FlexBox flexDirection="column"></FlexBox>

                <Box my="1rem">
                  <Button
                    variant="contained"
                    type="submit"
                    color="ihavecpu"
                    disabled={isAnyProductOutOfStock}
                    onClick={handleAddToCartButtonClick}
                    style={{
                      width: "100%",
                      height: "50px",
                      boxShadow: "4px 7px 12px 0 rgba(226 , 35 , 35 , 0.2)",
                    }}
                  >
                    สั่งซื้อชุดสเปคคอม
                  </Button>
                </Box>
                <Box my="1rem">
                  <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    onClick={handleEditClick}
                    style={{
                      width: "100%",
                      height: "40px",
                      // border: "1px solid #dedeea",
                      // boxShadow: "4px 7px 12px 0 rgba(226 , 35 , 35 , 0.2)",
                    }}
                  >
                    แก้ไขรายการ
                  </Button>
                </Box>
                <Divider mt="1.5rem" mb="1rem" />
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontWeight={600}>แชร์ให้เพื่อน</Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <SocialButton />
                </FlexBox>
              </Card1>
            )}
          </Grid>
        </Grid>
      </Fragment>
      {/* <Card p="0px" mb="30px" overflow="hidden">
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
          {order.isDelivered && (
            <FlexBox className="pre" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted" mr="4px">
                Delivered on:
              </Typography>

              <Typography fontSize="14px">
                {format(new Date(order.deliveredAt), "dd MMM, yyyy")}
              </Typography>
            </FlexBox>
          )}
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
      </Card> */}
      {/* <FlexBox justifyContent="right">
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
      </FlexBox> */}
    </Box>
  );
};

export default Detail;
