import React from "react";
import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import { H4, H5, SemiSpan } from "@component/Typography";
import styles from "./ModalCoupon.module.css";
import FlexBox from "@component/FlexBox";
import StyledSearchBox from "@component/search-box/styled";
import TextField from "@component/text-field";
import { Button } from "@component/buttons";
import * as yup from "yup";
import { useFormik } from "formik";
import Coupon from "./Coupon";
import CouponForUse from "./CouponForUse";
import { notify } from "@component/toast";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import listCouponProduct from "@models/listCouponProduct.model";

// Define the Props type
type Props = {
  open: boolean;
  onClose: () => void;
  selectedCoupon?: string | null;
  setSelectedCoupon?: (coupon: string | null) => void;
  listCoupon?: listCouponProduct[];
  calculatePayment: (shippingMethod: string, couponID: string) => void;
  shippingOption?: string | null;
};

const ModalContainer = styled.div`
  .button,
  .input,
  .select,
  .textarea {
    font: inherit;
  }

  a {
    color: inherit;
  }
  .swiper {
    max-width: 1000px;
    padding: 0px;
  }
  .modal-container {
    max-height: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    border-radius: 16px;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  }
  @media (min-width: 1002px) and (max-width: 1120px) {
    .modal-container {
      width: 960px;
    }
  }
  @media (min-width: 895px) and (max-width: 1002px) {
    .modal-container {
      width: 900px;
    }
  }
  @media (min-width: 700px) and (max-width: 894px) {
    .modal-container {
      width: 750px;
      height: 750px;
    }
  }
  @media (min-width: 600px) and (max-width: 700px) {
    .modal-container {
      width: 600px;
      height: 700px;
    }
  }
  @media (min-width: 500px) and (max-width: 600px) {
    .modal-container {
      width: 500px;
      height: 650px;
    }
  }
  @media (min-width: 400px) and (max-width: 500px) {
    .modal-container {
      width: 400px;
      height: 650px;
    }
  }
  @media (min-width: 300px) and (max-width: 400px) {
    .modal-container {
      width: 300px;
      height: 650px;
    }
  }
  @media (min-width: 0px) and (max-width: 300px) {
    .modal-container {
      width: 280px;
      height: 650px;
    }
  }

  .modal-container-header {
    padding: 16px 32px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 auto;
  }

  .modal-container-title {
    padding: 0.5rem;
    display: column;
    align-items: center;
    gap: 8px;
    line-height: 1.5;
    font-weight: 700;
    font-size: 1.125;
  }

  .modal-container-title svg {
    width: 32px;
    height: 32px;
    color: #d4001a;
  }

  .modal-container-body {
    padding: 24px 32px 51px;
    overflow-y: auto;
    flex: 1 1 auto;
  }
  .modal-container-search {
    padding: 20px 10px 5px;
  }
  .scrollbar::-webkit-scrollbar {
    border-radius: 8px;
    width: 5px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  .head-title {
    font-weight: 800;
  }

  .rtf h1,
  .rtf h2,
  .rtf h3,
  .rtf h4,
  .rtf h5,
  .rtf h6 {
    font-weight: 700;
  }

  .rtf h1 {
    font-size: 1.5rem;
    line-height: 1.125;
  }

  .rtf h2 {
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .rtf h3 {
    font-size: 1rem;
    line-height: 1.5;
  }

  .rtf > * + * {
    margin-top: 1em;
  }

  .rtf > * + :is(h1, h2, h3) {
    margin-top: 2em;
  }

  .rtf > :is(h1, h2, h3) + * {
    margin-top: 0.75em;
  }

  .rtf ul,
  .rtf ol {
    margin-left: 20px;
    list-style-position: inside;
  }

  .rtf ol {
    list-style: numeric;
  }

  .rtf ul {
    list-style: disc;
  }

  .modal-container-footer {
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid #ddd;
    gap: 12px;
    position: relative;
    flex: 0 0 auto;
  }

  .modal-container-footer:after {
    content: "";
    display: block;
    position: absolute;
    top: -51px;
    left: 24px;
    right: 24px;
    height: 50px;
    flex-shrink: 0;
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.75),
      transparent
    );
    pointer-events: none;
  }
  .footer-title {
    font-weight: 800;
  }

  .button {
    padding: 12px 20px;
    border-radius: 8px;
    background-color: transparent;
    border: 0;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s ease;
  }

  .button.is-ghost:hover,
  .button.is-ghost:focus {
    background-color: #dfdad7;
  }

  .button.is-primary {
    background-color: #750550;
    color: #fff;
  }

  .button.is-primary:hover,
  .button.is-primary:focus {
    background-color: #4a0433;
  }

  .icon-button {
    padding: 0;
    border: 0;
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.15s ease;
  }

  .icon-button svg {
    width: 24px;
    height: 24px;
  }

  .icon-button:hover,
  .icon-button:focus {
    background-color: #dfdad7;
  }

  /* iPhone XS - Portrait */
  @media screen and (min-device-width: 414px) and (max-device-width: 896px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    .swiper {
      max-width: 100%;
    }
    .modal-container {
      max-height: 600px;
      max-width: 350px;
    }
  }
  /* iPhone XS - Landscape */
  @media only screen and (min-device-width: 414px) and (max-device-width: 896px) and (orientation: landscape) {
    .swiper {
      max-width: 100%;
    }
    .modal-container {
      max-height: 350px;
      max-width: 100%;
    }
    .modal-container-search {
      padding: 5px 20px 0px;
    }
    .modal-container-header {
      padding: 3px 32px 0px;
    }
    .head-title {
      font-size: 12px;
    }
    .head-description {
      font-size: 11px;
    }
    .footer-title {
      font-size: 12px;
    }
    .modal-container-footer {
      padding: 5px 32px 0px;
    }
  }
`;

// const mockCouponData = [
//   {
//     title: "Coupon 1",
//     description: "Description 1",
//     endDate: "2023-07-29 18:46:56",
//   },
//   {
//     title: "Coupon 2",
//     description: "Description 2",
//     endDate: "2023-08-29 18:46:56",
//   },
//   {
//     title: "Coupon 3",
//     description: "Description 3",
//     endDate: "2023-09-29 18:46:56",
//   },
//   {
//     title: "Coupon 4",
//     description: "Description 4",
//     endDate: "2023-10-29 18:46:56",
//   },
// ];

const ModalCouponPurchase: FC<Props> = (props) => {
  const { open, onClose, setSelectedCoupon } = props;
  const [myCoupon, setMyCoupon] = useState([]);
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);
  const [checkedCoupons, setCheckedCoupons] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1000px)").matches) {
        setSwiperSlidesPerView(3);
      } else {
        setSwiperSlidesPerView(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the value on component load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Function to handle the form submission
  const handleFormSubmit = async (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });
  const fetchMyCouponAvailable = () => {
    const requestBody = {
      product_id: ["4993", "4209", "4997"],
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

  const handleCodeCouponSubmit = async () => {
    if (formik.values.code_coupon.trim() === "") {
      return;
    }
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
            code: formik.values.code_coupon,
          }),
        }
      );

      const data = await response.json();
      if (data.res_code === "00" && data.res_text === "Success") {
        notify("success", "เก็บโค้ดนี้แล้ว");
        formik.setFieldValue("code_coupon", "");
        formik.setFieldTouched("code_coupon", false);
        formik.setFieldError("code_coupon", "");
        fetchMyCouponAvailable();
      } else if (
        data.res_code === "01" &&
        data.res_text === "Already have this coupon"
      ) {
        notify("error", "คุณมีคูปองนี้อยู่แล้ว");
        formik.setFieldValue("code_coupon", "");
        formik.setFieldTouched("code_coupon", false);
        formik.setFieldError("code_coupon", "");
      } else {
        notify("error", "ไม่เจอโค้ดนี้");
        formik.setFieldValue("code_coupon", "");
        formik.setFieldTouched("code_coupon", false);
        formik.setFieldError("code_coupon", "");
      }
    } catch (error) {
      console.error("An error occurred while collecting the coupon:", error);
    }
  };
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
  const handleCouponClick = (coupon) => {
    props.calculatePayment(props.shippingOption, coupon.id);
    const isCouponChecked = checkedCoupons.includes(coupon);
    if (isCouponChecked) {
      setCheckedCoupons(checkedCoupons.filter((c) => c !== coupon));
    } else {
      // if the coupon is not checked, check it
      setCheckedCoupons([...checkedCoupons, coupon]);
      setSelectedCoupon(coupon); // Update the selectedCoupon state
    }
  };

  useEffect(() => {
    fetchMyCouponAvailable();
  }, []);
  useEffect(() => {
    if (!open) {
      setCheckedCoupons([]);
    }
  }, [open]);
  return (
    <Box
      className={`${styles["modal-container"]} ${
        open ? styles["modal-open"] : ""
      }`}
    >
      <ModalContainer>
        <div className="modal">
          <article className="modal-container">
            <header className="modal-container-header">
              <span className="modal-container-title">
                <FlexBox alignItems="center">
                  <Icon className="head-icon" size="32px" mr="0.5rem">
                    coupon
                  </Icon>
                  <H4 className="head-title">คูปองส่วนลด</H4>
                </FlexBox>
                <SemiSpan
                  fontSize="13px"
                  fontWeight={300}
                  ml="0.5rem"
                  className="head-description"
                >
                  ใช้คูปองส่วนลด หรือ โค้ดส่วนลด
                </SemiSpan>
              </span>

              <Button type="button" className="icon-button">
                <Icon size="24px" onClick={onClose}>
                  close
                </Icon>
              </Button>
            </header>
            <section className="modal-container-search">
              <Grid container justifyContent="center" spacing={16}>
                <Grid item lg={12} md={12} xs={12} alignItems="center">
                  <Grid container justifyContent="center">
                    <Box>
                      <form onSubmit={formik.handleSubmit}>
                        <StyledSearchBox>
                          <Icon className="search-icon" size="18px">
                            coupon
                          </Icon>
                          <TextField
                            fullwidth
                            name="code_coupon"
                            className="search-field"
                            placeholder="กรอกโค้ดส่วนลด"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.code_coupon}
                          />
                          <Button
                            className="search-button"
                            variant="contained"
                            color="ihavecpu"
                            onClick={handleCodeCouponSubmit}
                            type="button"
                          >
                            เก็บโค้ด
                          </Button>
                        </StyledSearchBox>
                      </form>
                      {formik.touched.code_coupon &&
                        formik.errors.code_coupon && (
                          <SemiSpan fontSize="11px" style={{ color: "red" }}>
                            {formik.errors.code_coupon}
                          </SemiSpan>
                        )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </section>
            <section className="modal-container-body rtf scrollbar">
              <Swiper
                className="swiper"
                slidesPerView={swiperSlidesPerView}
                spaceBetween={10}
              >
                {Array.isArray(myCoupon) &&
                  myCoupon.map((coupon, index) => (
                    <SwiperSlide key={index}>
                      <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12}>
                          <CouponForUse
                            id={coupon.id}
                            code={coupon.code}
                            topic={coupon.title}
                            description={coupon.description}
                            highlight1={coupon.highlight.highlight1}
                            highlight2={coupon.highlight.highlight2}
                            color="white"
                            dateExpired={coupon.endDate}
                            onClick={() => {
                              handleCouponClick(coupon);
                              onClose();
                            }}
                            checked={checkedCoupons.includes(coupon)}
                          />
                        </Grid>
                      </Grid>
                    </SwiperSlide>
                  ))}
                {myCoupon.length < swiperSlidesPerView &&
                  // add empty placeholders
                  Array(swiperSlidesPerView - myCoupon.length)
                    .fill(null)
                    .map((_, index) => (
                      <SwiperSlide key={`empty_${index}`}>
                        <div style={{ visibility: "hidden" }}></div>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </section>
            <footer
              className="modal-container-footer"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              {props.listCoupon.filter(
                (coupon) =>
                  !myCoupon.some((myCoupon) => myCoupon.code === coupon.code)
              ).length > 0 ? (
                <Grid item xs={12}>
                  <Box>
                    <span className="modal-container-title">
                      <FlexBox alignItems="center">
                        <H5 className="footer-title">เก็บโค้ดส่วนลด</H5>
                      </FlexBox>
                      <Box mt="1rem">
                        <Swiper
                          className="swiper"
                          slidesPerView={swiperSlidesPerView}
                          spaceBetween={10}
                          scrollbar={{ draggable: true }}
                          pagination={{ clickable: true }}
                        >
                          {props.listCoupon
                            .filter(
                              (coupon) =>
                                !myCoupon.some(
                                  (myCoupon) => myCoupon.code === coupon.code
                                )
                            )
                            .map((coupon, index) => (
                              <SwiperSlide key={index}>
                                <Grid container spacing={3}>
                                  <Grid item md={12} sm={12} xs={12}>
                                    <Coupon
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
                                  </Grid>
                                </Grid>
                              </SwiperSlide>
                            ))}
                          {props.listCoupon.length < swiperSlidesPerView &&
                            // add empty placeholders
                            Array(swiperSlidesPerView - props.listCoupon.length)
                              .fill(null)
                              .map((_, index) => (
                                <SwiperSlide key={`empty_${index}`}>
                                  <div style={{ visibility: "hidden" }}></div>
                                </SwiperSlide>
                              ))}
                        </Swiper>
                      </Box>
                    </span>
                  </Box>
                </Grid>
              ) : (
                <></>
              )}
            </footer>
          </article>
        </div>
      </ModalContainer>
    </Box>
  );
};

// Initial form values
const initialValues = {
  code_coupon: "",
};

// Define the form validation schema
const formSchema = yup.object().shape({
  code_coupon: yup.string().required("กรุณากรอกโค้ดส่วนลด"),
});

export default ModalCouponPurchase;
