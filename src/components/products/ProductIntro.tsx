import Link from "next/link";
import { FC, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Image from "@component/Image";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H3, H6, SemiSpan, Small, Span } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { ShowStock } from "@component/products/ShowStock";
import SectionVoucher from "@component/SectionVoucher";
import { CarouselVoucher } from "@component/carousel";
import ModalCoupon from "@component/products/ModalCoupon";
import ChoiceDetails from "@component/products/ChoiceDetails";
import Divider from "@component/Divider";
import { IconButton } from "@component/buttons";
import Typography from "@component/Typography";
import { DetailsWrapper, StyledWrapper } from "./styles";
import FlashSaleBar from "@component/flashsale/FlashSaleBar";
import { notify } from "@component/toast";
import "react-toastify/dist/ReactToastify.css";
import CompareNotification from "@component/compare/CompareNotification";
import productView from "@models/productView.model";
import { CarouselViewProduct } from "@component/carousel";
import PriceFormat from "@component/PriceFormat";
import Coupon from "./Coupon";
import listCouponProduct from "@models/listCouponProduct.model";

// ========================================
type ProductIntroProps = {
  product: productView;
  couponList: listCouponProduct[];
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({ product, couponList }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const base = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
  const links = base + router.asPath;

  // image selected and hover
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind);
    setHoveredImage(null);
  };
  const handleImageHover = (ind: number) => () => {
    if (selectedImage !== ind && hoveredImage !== ind) {
      setHoveredImage(ind);
    }
  };
  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const routerId = router.query.id as string;

  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => setOpen((open) => !open), []);
  // // Choose Color
  // const [selectedColor, setSelectedColor] = useState<string>("204");
  // const handleColorClick = (color: string) => {
  //   setSelectedColor(color);
  // };

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [availableStock, setAvailableStock] = useState<number | null>(null);

  const handleOptionClick = (optionName: string, value: string) => {
    // check available stock based on selected options
    const stockEntry = product.stock.find((entry) =>
      Object.entries({ ...selectedOptions, [optionName]: value }).every(
        ([val]) => entry.choose.includes(val)
      )
    );

    // set available stock or null if not found
    setAvailableStock(stockEntry ? stockEntry.stock : null);

    // update state  if stock is > 0
    setSelectedOptions((prevOptions) => {
      return {
        ...prevOptions,
        [optionName]: value,
      };
    });
  };
  // console.log("Selected Options:", selectedOptions);

  // // Choose Button
  // const [selectedSwitch, setSelectedSwitch] = useState(null);
  // const handleSwitchClick = (color) => {
  //   setSelectedSwitch(color);
  // };
  // Wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);
  const handleWishlistClick = () => {
    if (isInWishlist) {
      notify("error", "Removed from Wishlist");
      setIsInWishlist(false);
    } else {
      notify("success", "เพิ่มเข้ารายการสินค้าที่สนใจ");
      setIsInWishlist(true);
    }
  };
  // Compare
  const [compareList, setCompareList] = useState<
    { id: number; category_id: number }[]
  >([]);

  // console.log("compareList", compareList);
  const maxCompareProducts = 4;
  useEffect(() => {
    const storedCompareList = localStorage.getItem("compareList");
    if (storedCompareList) {
      setCompareList(JSON.parse(storedCompareList));
    }
  }, []);

  const handleCompareClick = () => {
    const productIdString = product.product_id;
    const productCategoryId = product.cat_id;

    if (
      compareList.length === 0 ||
      compareList[0].category_id.toString() === productCategoryId
    ) {
      if (compareList.some((product) => product.id === productIdString)) {
        notify("error", "removed from compare");
        const updatedCompareList = compareList.filter(
          (product) => product.id !== productIdString
        );
        localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
        setCompareList(updatedCompareList);
      } else {
        if (compareList.length >= maxCompareProducts) {
          notify("error", "เลือกเปรียบเทียบสินค้าได้สูงสุด 4 สินค้าเท่านั้น");
        } else {
          notify("success", "added to compare");
          // add product to the comparison list
          const updatedCompareList = [
            ...compareList,
            { id: productIdString, category_id: parseInt(productCategoryId) },
          ];

          // store the updated compareList in local storage
          localStorage.setItem(
            "compareList",
            JSON.stringify(updatedCompareList)
          );

          // update the state with the new compareList
          setCompareList(updatedCompareList);
        }
      }
    } else {
      // clear the compare list and add the current product
      notify("success", "added to compare");
      const updatedCompareList = [
        { id: productIdString, category_id: parseInt(productCategoryId) },
      ];
      localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
      setCompareList(updatedCompareList);
    }
  };

  // copy Link
  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(links);
    notify("success", "Copy Link!");
  };

  // keep Coupon
  // const [isInCoupon, setisInCoupon] = useState(false);
  // const handleInCoupleClick = () => {
  //   setisInCoupon(true);
  // };

  const mapSelectedOptionsToOptionId = (
    selectedOptions: Record<string, string>,
    stock: { option_id?: number; stock?: number; choose?: string[] }[]
  ): number | null => {
    const selectedOptionsArray = Object.entries(selectedOptions);

    const matchingEntry = stock.find((entry) =>
      selectedOptionsArray.every(([val]) => entry.choose?.includes(val))
    );

    return matchingEntry ? matchingEntry.option_id || null : null;
  };

  const cartItem = state.cart.find(
    (item) =>
      (item.id === product.product_id || item.id === routerId) &&
      item.optionId ===
        mapSelectedOptionsToOptionId(selectedOptions, product.stock)
  );

  const [quantity, setQuantity] = useState<number>(1);

  // Cart Amount
  const handleCartAmountChange = (newAmount: number) => {
    newAmount = Math.max(newAmount, 1);
    const availableStock = getAvailableStock(selectedOptions);
    // check all required options are selected
    const isAnyOptionRequired = product.option.some(
      (option) => option.sub.length > 0
    );

    if (isAnyOptionRequired) {
      const isAllOptionsSelected = product.option.every((option) =>
        selectedOptions.hasOwnProperty(option.m_option_id)
      );

      if (!isAllOptionsSelected) {
        notify("error", "กรุณาเลือกตัวเลือกสินค้า");
      } else {
        if (!isNaN(newAmount) && newAmount <= availableStock) {
          setQuantity(newAmount);
        } else {
          notify("error", "สินค้าหมดคลัง");
        }
      }
    }
  };
  const handleAddToCartClick = () => {
    const availableStock = getAvailableStock(selectedOptions);
    const optionId = mapSelectedOptionsToOptionId(
      selectedOptions,
      product.stock
    );

    if (cartItem?.qty >= availableStock) {
      notify("error", "สินค้าหมดคลัง");
    } else {
      // check all required options are selected
      const isAnyOptionRequired = product.option.some(
        (option) => option.sub.length > 0
      );

      if (isAnyOptionRequired) {
        const isAllOptionsSelected = product.option.every((option) =>
          selectedOptions.hasOwnProperty(option.m_option_id)
        );
        if (!isAllOptionsSelected) {
          notify("error", "กรุณาเลือกตัวเลือกสินค้า");
          return;
        }
      }

      notify("success", "เพิ่มสินค้าลงตะกร้า");
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          optionId: optionId,
          price: parseInt(product.price_sale),
          qty: (cartItem?.qty || 0) + quantity,
          name: product.name_th,
          imgUrl: product.picture[0]?.pic_150 || "",
          id: product.product_id || routerId,
        },
      });
    }

    // reset quantity and selectedOption after adding to cart
    setSelectedOptions({});
    setQuantity(1);
  };
  const handleBuyNowClick = () => {
    const isAnyOptionRequired = product.option.some(
      (option) => option.sub.length > 0
    );
    const optionId = mapSelectedOptionsToOptionId(
      selectedOptions,
      product.stock
    );

    if (isAnyOptionRequired) {
      const isAllOptionsSelected = product.option.every((option) =>
        selectedOptions.hasOwnProperty(option.m_option_id)
      );
      if (!isAllOptionsSelected) {
        notify("error", "กรุณาเลือกตัวเลือกสินค้า");
        return;
      } else {
        router.push({
          pathname: "/checkout",
          query: {
            product: product?.product_id || "",
            option: optionId || "",
            qty: quantity,
          },
        });
      }
    }
    setSelectedOptions({});
    setQuantity(1);
  };
  // console.log("state cart", state.cart);
  const getAvailableStock = (
    selectedOptions: Record<string, string>
  ): number => {
    const selectedChoices = Object.entries(selectedOptions);

    const matchingEntry = product.stock.find((entry) =>
      selectedChoices.every(([_, val]) => entry.choose.includes(val))
    );

    return matchingEntry ? matchingEntry.stock : 0;
  };

  // Get Color
  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };

  const isCombinationInStock = (options: Record<string, string>): boolean => {
    const selectedChoices = Object.entries(options);

    // check any stock matching the selected choice
    return product.stock.some(
      (entry) =>
        selectedChoices.every(([_, val]) => entry.choose.includes(val)) &&
        entry.stock > 0
    );
  };

  const getAllOptionCombinations = (options) => {
    if (!Array.isArray(options)) {
      console.error("invalid options");
      return [];
    }

    const result = [[]];

    options.forEach((option) => {
      const currentCombinations = [];

      option.sub.forEach((subItem) => {
        result.forEach((combination) => {
          currentCombinations.push([
            ...combination,
            [option.m_option_id, subItem.sub_id],
          ]);
        });
      });

      result.push(...currentCombinations);
    });

    return result.slice(1);
  };

  const isProductInStock = () => {
    const allOptionCombinations = getAllOptionCombinations(product.option);

    for (const optionCombination of allOptionCombinations) {
      const isCombinationInStock = product.stock.some((entry) => {
        const includesAll = optionCombination.every(([_, subId]) =>
          entry.choose.includes(subId.toString())
        );

        if (includesAll && entry.stock > 0) {
          return true;
        }

        return false;
      });

      if (isCombinationInStock) {
        return true;
      }
    }

    return false;
  };

  // style for IconButton (Social Media/Wishlist/Compare)
  const iconButtonStyle = {
    borderColor: "#e6e7e8",
    border: "1px solid #e6e7e8",
  };
  // check Stock
  const isProductAvailable = isProductInStock();
  const status = isProductAvailable ? "IN STOCK" : "OUT OF STOCK";

  const [myCoupon, setMyCoupon] = useState([]);

  const handleCollectCoupon = async (couponCode) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/coupons/collect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userid: "983",
          },
          body: JSON.stringify({
            code: couponCode,
          }),
        }
      );

      const data = await response.json();
      if (data.res_code === "00" && data.res_text === "Success") {
        notify("success", "เก็บโค้ดนี้แล้ว");
        fetchMyCouponAvailable();
      } else if (
        data.res_code === "01" &&
        data.res_text === "Already have this coupon"
      ) {
        notify("error", "คุณมีคูปองนี้อยู่แล้ว");
      }
    } catch (error) {
      console.error("Error collecting coupon:", error);
    }
  };
  const fetchMyCouponAvailable = () => {
    const requestBody = {
      product_id: [product.product_id.toString()],
    };

    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/coupons/mycouponAvaliable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userid: "983",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.res_code === "00" && Array.isArray(data.res_result)) {
          setMyCoupon(data.res_result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const filteredCoupons = couponList.filter(
    (coupon) => !myCoupon.some((myCoupon) => myCoupon.code === coupon.code)
  );

  useEffect(() => {
    fetchMyCouponAvailable();
  }, []);

  return (
    <Box overflow="hidden">
      <CompareNotification count={compareList.length} />

      <Grid container justifyContent="center" spacing={16}>
        {/* PRODUCT IMAGE */}
        <Grid item md={4} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <Box width={300} height={300} borderRadius={20} overflow="hidden">
                <Image
                  width={300}
                  height={300}
                  src={
                    hoveredImage !== null
                      ? product?.picture[hoveredImage]?.pic_800
                      : product?.picture[selectedImage]?.pic_800
                  }
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </FlexBox>
            <FlexBox>
              {product?.picture.length > 5 ? (
                <CarouselViewProduct
                  totalSlides={product.picture.length}
                  visibleSlides={5}
                >
                  {product?.picture?.map((image, ind) => (
                    <Box
                      key={ind}
                      size={70}
                      bg="white"
                      minWidth={70}
                      display="flex"
                      cursor="pointer"
                      border="1px solid"
                      borderRadius="10px"
                      alignItems="center"
                      justifyContent="center"
                      ml={ind === 0 && "auto"}
                      mr={ind === product.picture.length - 1 ? "auto" : "10px"}
                      borderColor={
                        selectedImage === ind ? "primary.main" : "gray.400"
                      }
                      onClick={handleImageClick(ind)}
                      onMouseEnter={handleImageHover(ind)}
                      onMouseLeave={handleImageLeave}
                    >
                      <Avatar
                        src={image.pic_150}
                        borderRadius="10px"
                        size={40}
                      />
                    </Box>
                  ))}
                </CarouselViewProduct>
              ) : (
                product?.picture?.map((image, ind) => (
                  <Box
                    key={ind}
                    size={70}
                    bg="white"
                    minWidth={70}
                    display="flex"
                    cursor="pointer"
                    border="1px solid"
                    borderRadius="10px"
                    alignItems="center"
                    justifyContent="center"
                    ml={ind === 0 && "auto"}
                    mr={ind === product.picture.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "gray.400"
                    }
                    onClick={handleImageClick(ind)}
                    onMouseEnter={handleImageHover(ind)}
                    onMouseLeave={handleImageLeave}
                  >
                    <Avatar src={image.pic_150} borderRadius="10px" size={40} />
                  </Box>
                ))
              )}
            </FlexBox>
          </Box>
        </Grid>
        {/* PRODUCT DETAILS */}
        <Grid item lg={4.5} md={6} xs={12} alignItems="center">
          <Box mb="15px">
            <ShowStock
              p="0.1rem 1rem"
              bg={`${
                isProductInStock() ? getColor("Delivered") : "error"
              }.light`}
            >
              <Small
                color={`${
                  isProductInStock() ? getColor("Delivered") : "error"
                }.main`}
                fontWeight={800}
              >
                {status}
              </Small>
            </ShowStock>
          </Box>
          <H3 mb="1rem">{product?.name_th}</H3>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>แบรนด์:</SemiSpan>
            <SemiSpan ml="8px">{product.brand_name_th}</SemiSpan>
            <SemiSpan ml="8px" mr="8px">
              |
            </SemiSpan>
            <SemiSpan>รหัสสินค้า:</SemiSpan>
            <SemiSpan ml="8px">{product.product_code}</SemiSpan>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox> */}

          <FlexBox mb="24px" alignItems="center">
            <H1 color="ihavecpu.main" mb="4px" lineHeight="1">
              <PriceFormat price={parseInt(product.price_sale)} />
            </H1>
            {parseInt(product.price_sale) < parseInt(product.price_before) && (
              <H6 ml={2} color="grey" fontWeight={300}>
                <del>
                  <PriceFormat price={parseInt(product.price_before)} />
                </del>
              </H6>
            )}
          </FlexBox>
          {/* FLASH SALES DEALS */}
          <Box mb="20px">
            <FlashSaleBar dateExpired="2023-10-05T23:59:59"></FlashSaleBar>
          </Box>

          {/* COLOR */}
          {/* <Box mb="10px">
            <Grid item lg={12} md={12} xs={12}>
              <H6 mb="0.8rem">Color : </H6>
              <Grid container>
                <FlexBox mb="1rem">
                  {colorList.map((item) => (
                    <ColorCircle
                      key={item.id}
                      name={item.id}
                      bg={item.title}
                      size={25}
                      mr="10px"
                      selected={selectedSwitch === item}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleSwitchClick(item)}
                    />
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box> */}
          {/* OPTIONS */}
          <Box mb="20px">
            <Grid item lg={12} md={12} xs={12}>
              {product.option.map((item) => (
                <Box key={item.m_option_id}>
                  <H6 mb="0.8rem">{item.m_option_name_th} :</H6>
                  <Grid container>
                    {item.sub.map((subItem) => (
                      <Grid item lg={3} md={3} xs={6} key={subItem.sub_id}>
                        <ChoiceDetails
                          key={subItem.sub_id}
                          open={open}
                          title={item.m_option_name_th}
                          product_id={subItem.sub_id.toString()}
                          choice={subItem.sub_text}
                          selected={
                            selectedOptions[item.m_option_id] ===
                            subItem.sub_id.toString()
                          }
                          disabled={
                            !isCombinationInStock({
                              ...selectedOptions,
                              [item.m_option_id]: subItem.sub_id.toString(),
                            })
                          }
                          onClick={() =>
                            handleOptionClick(
                              item.m_option_id.toString(),
                              subItem.sub_id.toString()
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}

              {availableStock !== null && (
                <Typography variant="body2">
                  Available Stock: {availableStock}
                </Typography>
              )}
            </Grid>
          </Box>

          {/* BUTTON TO BUY */}
          <Grid container justifyContent="center" spacing={6}>
            <Grid item lg={4} md={4} xs={6}>
              <FlexBox alignItems="center">
                <Button
                  p="9px"
                  size="small"
                  color="ihavecpu"
                  variant="outlined"
                  disabled={!isProductInStock()}
                  onClick={() => handleCartAmountChange(quantity - 1)}
                  style={{ flex: 1 }}
                >
                  <Icon variant="small">minus</Icon>
                </Button>

                <H3 fontWeight="600" mx="10px">
                  {quantity.toString().padStart(2, "0")}
                </H3>

                <Button
                  p="9px"
                  size="small"
                  color="ihavecpu"
                  variant="outlined"
                  disabled={!isProductInStock()}
                  onClick={() => handleCartAmountChange(quantity + 1)}
                  style={{ flex: 1 }}
                >
                  <Icon variant="small">plus</Icon>
                </Button>
              </FlexBox>
            </Grid>
            <Grid item lg={7} md={7} xs={6}>
              <Button
                mb="25px"
                size="small"
                color="ihavecpu"
                variant="outlined"
                width="100%"
                disabled={!isProductInStock()}
                onClick={handleAddToCartClick}
              >
                <Icon defaultcolor="auto" size="20px" ml="5px">
                  cart
                </Icon>
                ใส่รถเข็น
              </Button>
            </Grid>
          </Grid>
          <Grid item lg={12} md={7}>
            <Button
              mb="25px"
              size="small"
              color="ihavecpu"
              variant="contained"
              width="100%"
              onClick={handleBuyNowClick}
              disabled={!isProductInStock()}
            >
              ซื้อเลย
            </Button>
          </Grid>
          <Divider height={1} style={{ backgroundColor: "#DAE1E7" }} />
          <Box mt="15px" display="flex" justifyContent="space-between">
            <div>
              {/** COMPARE */}
              <Typography as="a" color="inherit">
                <IconButton
                  onClick={handleCompareClick}
                  mr="0.5rem"
                  size="extrasmall"
                  style={iconButtonStyle}
                >
                  <Icon
                    variant="small"
                    color={
                      compareList.some(
                        (products) =>
                          products.id === product.product_id &&
                          products.category_id === parseInt(product.cat_id)
                      )
                        ? "ihavecpu"
                        : "social"
                    }
                  >
                    compare
                  </Icon>
                </IconButton>
              </Typography>
              {/** WISHLIST */}
              <Typography as="a" color="inherit">
                <IconButton
                  onClick={handleWishlistClick}
                  mr="1rem"
                  size="extrasmall"
                  style={iconButtonStyle}
                >
                  <Icon
                    variant="small"
                    color={isInWishlist ? "ihavecpu" : "social"}
                  >
                    {isInWishlist ? "heart-filled" : "heart"}
                  </Icon>
                </IconButton>
              </Typography>
            </div>
            <div>
              {/** COPY LINK */}
              <Typography as="a" color="inherit">
                <IconButton
                  onClick={handleCopyLinkClick}
                  mr="0.5rem"
                  size="extrasmall"
                  style={iconButtonStyle}
                >
                  <Icon variant="small" color="social">
                    link
                  </Icon>
                </IconButton>
              </Typography>
              {/** FACEBOOK */}
              <Link href={`/address`}>
                <Typography as="a" color="inherit">
                  <IconButton
                    mr="0.5rem"
                    size="extrasmall"
                    style={iconButtonStyle}
                  >
                    <Icon variant="small" color="social">
                      facebook
                    </Icon>
                  </IconButton>
                </Typography>
              </Link>
              {/** TWITTER */}
              <Link href={`/address`}>
                <Typography as="a" color="inherit">
                  <IconButton size="extrasmall" style={iconButtonStyle}>
                    <Icon variant="small" color="social">
                      twitter
                    </Icon>
                  </IconButton>
                </Typography>
              </Link>
            </div>
          </Box>
        </Grid>
        {/* VOUCHER */}
        <Grid item lg={3} md={12} xs={12} alignItems="left">
          <Grid item lg={12} md={12} xs={12}>
            {filteredCoupons.length > 0 && (
              <SectionVoucher
                iconName="coupon"
                title="คูปองส่วนลด"
                onClickSeeMore={() => {
                  toggleDialog();
                }}
              >
                <CarouselVoucher
                  totalSlides={filteredCoupons.length}
                  visibleSlides={1}
                >
                  {filteredCoupons.map((coupon, index) => (
                    <Coupon
                      key={index}
                      id={coupon.id}
                      topic={coupon.title}
                      highlight1={coupon.highlight.highlight1}
                      highlight2={coupon.highlight.highlight2}
                      description={coupon.description}
                      code={coupon.code}
                      dateExpired={coupon.endDate}
                      color="#f9f9f9"
                      onClick={handleCollectCoupon}
                    />
                  ))}
                </CarouselVoucher>
              </SectionVoucher>
            )}
          </Grid>
          {/* BELOW VOUCHER */}
          <Grid item lg={12}>
            <DetailsWrapper mt="10px" px="0px" py="1.5rem" color="gray.900">
              <StyledWrapper px="1.5rem" mb="1.5rem">
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      truck
                    </Icon>
                  </Box>
                  <Span fontSize={14} fontWeight={500}>
                    ส่งฟรีทั่วไทย
                  </Span>
                </FlexBox>
                <Span ml="30px" fontSize={13}>
                  ช้อปครบ 3,000 บาทขึ้นไป
                </Span>
              </StyledWrapper>
              <StyledWrapper mb="1.5rem" px="1.5rem">
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      verify
                    </Icon>
                  </Box>
                  <Span fontSize={14} fontWeight={500}>
                    ผ่อนสูงสุด 10 เดือน
                  </Span>
                </FlexBox>
                <Span ml="30px" fontSize={13}>
                  ผ่อนได้เลย เพียงแค่มีบัตรเครดิต
                </Span>
              </StyledWrapper>
              <StyledWrapper mb="1.5rem" px="1.5rem">
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      bag
                    </Icon>
                  </Box>
                  <Span fontSize={14} fontWeight={500}>
                    รับเองที่ร้านลด 1000.-
                  </Span>
                </FlexBox>
                <Span ml="30px" fontSize={13}>
                  รับสินค้าเองที่ร้านเพื่อรับส่วนลด
                </Span>
              </StyledWrapper>

              <StyledWrapper px="1.5rem">
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      truck
                    </Icon>
                  </Box>
                  <Span fontSize={14} fontWeight={500}>
                    เปลี่ยนคืนง่าย
                  </Span>
                </FlexBox>
                <Span ml="30px" fontSize={13}>
                  ภายใน 7 วัน
                </Span>
              </StyledWrapper>
            </DetailsWrapper>
          </Grid>
        </Grid>

        <ModalCoupon
          open={open}
          onClose={toggleDialog}
          product={product.product_id}
          listCoupon={couponList}
        />
      </Grid>
    </Box>
  );
};

export default ProductIntro;
