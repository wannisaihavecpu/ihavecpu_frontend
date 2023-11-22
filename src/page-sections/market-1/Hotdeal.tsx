import { FC } from "react";
import Container from "@component/Container";
import styled from "styled-components";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { Button } from "@component/buttons";
import { Carousel } from "@component/carousel";
import TopicFlashSale from "@component/topic/TopicFlashSale";
import flashsale from "@models/flashsale.model";
import useVisibleSilde from "../gadget-shop/hooks/useVisibleSilde";
import { ProductCard1FlashSale } from "@component/product-cards";
import useWindowSize from "@hook/useWindowSize";

// styled component
const SectionWrapper = styled.div`
  margin-top: -0.25rem;
  margin-bottom: -0.25rem;

  .hot {
    position: absolute;
    top: 0;
    right: 3.5rem;
  }

  .dot-group {
    position: absolute;
    bottom: 1rem;
    left: 20%;
  }

  @media only screen and (max-width: 768px) {
    .hot {
      right: 0;
      width: 10%;
    }
    .dot-group {
      display: none;
    }
  }
`;

// ===========================================
type Props = { product: flashsale[] };
// ===========================================

const Hotdeal: FC<Props> = ({ product }) => {
  // const totalSlides = list.length;
  // const [currentSlide, setCurrentSlide] = useState(0);
  const width = useWindowSize();
  // const handleSlideChange = (count: number) => () => {
  //   if (count < 0) setCurrentSlide(0);
  //   else if (count > totalSlides - 1) setCurrentSlide(totalSlides - 1);
  //   else setCurrentSlide(count);
  // };

  const { visibleSlides } = useVisibleSilde({
    initialSlide: 6,
    xs: 2,
    sm: 3,
    md: 4,
  });

  const formatSlug = (name) => {
    let formattedSlug = name.replace(/\s+/g, "-");

    formattedSlug = formattedSlug
      .replace(/\/+/g, "-")
      .replace(/(\(\d{2}\+\w+\))/g, "-$1")
      .replace(/(\(\d{2}\+\w+\))-/g, "$1");

    formattedSlug = formattedSlug.replace(/[^a-zA-Z0-9-().]+/g, "");

    formattedSlug = formattedSlug.replace(/-(?=-)/g, "");

    return formattedSlug.toLowerCase();
  };

  return (
    <Box mb="3.75rem">
      <SectionWrapper>
        <Box>
          <Card
            bg="#ecf2f7"
            overflow="hidden"
            position="relative"
            style={{ borderRadius: "0px" }}
          >
            <Container>
              <Box mt="2rem" mb="2rem">
                <TopicFlashSale
                  iconName="flash"
                  title="Flash Deals"
                  seeMoreLink="#"
                  color="ihavecpu"
                  dateTimeExpired={product[0]?.campaign_end_datetime}
                />
                {/* <Grid container alignItems="center" spacing={6}>
                    <Grid item md={6} xs={12}>
                      <Image
                        mx="auto"
                        maxWidth="100%"
                        height={300}
                        src="/assets/images/products/apple-watch-2.png"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <FlexBox mt="3rem" mb="1.125rem">
                        <IconButton
                          mr="0.5rem"
                          color="primary"
                          variant="contained"
                          disabled={currentSlide === 0}
                          onClick={handleSlideChange(currentSlide - 1)}
                        >
                          <Icon variant="small" defaultcolor="currentColor">
                            arrow-left
                          </Icon>
                        </IconButton>

                        <IconButton
                          color="primary"
                          variant="contained"
                          disabled={currentSlide === totalSlides - 1}
                          onClick={handleSlideChange(currentSlide + 1)}
                        >
                          <Icon variant="small" defaultcolor="currentColor">
                            arrow-right
                          </Icon>
                        </IconButton>
                      </FlexBox>

                      <H3 mb="0.875rem" color="ihavecpu.main" lineHeight="1.3">
                        Flash Deals !
                      </H3>

                      <H3 mb="0.5rem" fontSize="25px" lineHeight="1.2">
                        s
                      </H3>

                      <Paragraph mb="2rem" color="text.muted" maxWidth="400px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quis lobortis consequat eu, quam etiam at quis ut
                        convallis.
                      </Paragraph>

                      <H4 mb="0.5rem" lineHeight="1.3" fontWeight="600">
                        Fresh Deal Everyday, Get It Now!
                      </H4>

                      <FlexBox flexWrap="wrap" mb="2rem">
                        <FlexBox alignItems="flex-end" mr="1.75rem">
                          <H3 lineHeight="1.3" mr="0.25rem">
                            25
                          </H3>

                          <SemiSpan fontWeight="600" lineHeight="1.7">
                            วัน
                          </SemiSpan>
                        </FlexBox>

                        <FlexBox alignItems="flex-end" mr="1.75rem">
                          <H3 lineHeight="1.3" mr="0.25rem">
                            22
                          </H3>

                          <SemiSpan fontWeight="600" lineHeight="1.7">
                            ชั่วโมง
                          </SemiSpan>
                        </FlexBox>

                        <FlexBox alignItems="flex-end" mr="1.75rem">
                          <H3 lineHeight="1.3" mr="0.25rem">
                            39
                          </H3>

                          <SemiSpan fontWeight="600" lineHeight="1.7">
                            นาที
                          </SemiSpan>
                        </FlexBox>

                        <FlexBox alignItems="flex-end">
                          <H3 lineHeight="1.3" mr="0.25rem">
                            42
                          </H3>

                          <SemiSpan fontWeight="600" lineHeight="1.7">
                            วินาที
                          </SemiSpan>
                        </FlexBox>
                      </FlexBox>

                      <FlexBox alignItems="center" mb="3rem">
                        <Button
                          color="primary"
                          variant="contained"
                          borderRadius={8}
                          mr="0.5rem"
                        >
                          ซื้อเลย
                        </Button>

                        <FlexBox
                          size="40px"
                          color="white"
                          bg="gray.500"
                          borderRadius={8}
                          cursor="pointer"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon defaultcolor="currentColor">heart_filled</Icon>
                        </FlexBox>
                      </FlexBox>
                    </Grid>
                  </Grid> */}
                <Carousel
                  showDots={width > 900 ? false : true}
                  step={2}
                  showArrowOnHover={true}
                  arrowButtonColor="inherit"
                  dotColor="#d4001a"
                  autoPlay={true}
                  infinite={true}
                  totalSlides={product[0].product.length}
                  visibleSlides={visibleSlides}
                >
                  {product[0].product?.map((item) => (
                    <Box py="0.25rem" key={item.product_id}>
                      <ProductCard1FlashSale
                        key={item.product_id}
                        id={item.product_id}
                        slug={formatSlug(item.name_th)}
                        title={item.name_th}
                        price={parseFloat(item.price_sale)}
                        priceBefore={parseFloat(item.price_before)}
                        off={parseInt(item.discount)}
                        imgUrl={item.picture_name}
                      />
                    </Box>
                  ))}
                </Carousel>
                {width <= 900 && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Button
                      borderRadius={30}
                      mt="1rem"
                      color="ihavecpu"
                      bg="#ffd7de"
                      style={{ width: "100%" }}
                    >
                      ดูทั้งหมด
                      <Icon>arrow-right</Icon>
                    </Button>
                  </Grid>
                )}
              </Box>
            </Container>
          </Card>
        </Box>
      </SectionWrapper>
    </Box>
  );
};

export default Hotdeal;
