import { FC, useState, Fragment } from "react";
import Link from "next/link";
import * as yup from "yup";

import Box from "../Box";
import Icon from "../icon/Icon";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import TextField from "../text-field";
import { Button, IconButton } from "../buttons";
import { H3, H6, SemiSpan, Small, Span } from "../Typography";

import Grid from "@component/grid/Grid";
import { Formik } from "formik";
import { Card1 } from "@component/Card1";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { notify } from "@component/toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const Signup: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values, { setFieldError }) => {
    const { firstname, lastname, email, password, tel, birth_date } = values;

    const birthDate = new Date(birth_date);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    const formData = new FormData();
    formData.append("type", "1");
    formData.append("name", `${firstname} ${lastname}`);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", tel);
    formData.append("date", day.toString());
    formData.append("month", month.toString());
    formData.append("year", year.toString());

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.res_code === "00") {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        notify("success", "สมัครสมาชิกเรียบร้อย !");
        router.push("/profile");
      } else if (response.data.res_code === "01") {
        if (response.data.res_text === "Email already exists.") {
          setFieldError("email", "อีเมลนี้มีอยู่ในระบบแล้ว");
          notify("error", "มีอีเมลนี้อยู่ในระบบแล้ว !");
        } else {
          notify("error", "ไม่สำเร็จ กรุณาลองใหม่ !");
        }
      }
    } catch (error) {
      notify("error", "ไม่สำเร็จ กรุณาลองใหม่ !");
      // console.error("Error", error);
    }
  };

  const width = useWindowSize();

  return (
    <Fragment>
      <Grid container flexWrap="wrap-reverse" spacing={6}>
        {/* LEFT */}
        <Grid item lg={7.5} md={7} xs={12}>
          <Card1 mb="2rem">
            <H3 fontSize={22} textAlign="center" mb="2rem" color="#d4001a">
              ลงทะเบียน
            </H3>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={7}>
                    <Grid item sm={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="firstname"
                            mb="0.75rem"
                            label="ชื่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstname || ""}
                            placeholder="ชื่อ"
                            errorText={touched.firstname && errors.firstname}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              name="lastname"
                              mb="0.75rem"
                              label="นามสกุล"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastname || ""}
                              placeholder="นามสกุล"
                              errorText={touched.lastname && errors.lastname}
                            />
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              mb="1rem"
                              label="เบอร์โทรศัพท์"
                              placeholder="เบอร์โทรศัพท์"
                              name="tel"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.tel}
                              errorText={touched.tel && errors.tel}
                              maxLength={10}
                            />
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            type="date"
                            name="birth_date"
                            label="วันเกิด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birth_date}
                            errorText={touched.birth_date && errors.birth_date}
                          />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <div>
                            <TextField
                              fullwidth
                              mb="0.75rem"
                              name="email"
                              type="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email || ""}
                              placeholder="อีเมล"
                              label="อีเมล"
                              errorText={touched.email && errors.email}
                            />
                          </div>
                        </Grid>

                        <Grid item sm={12} xs={12}>
                          <TextField
                            fullwidth
                            mb="0.75rem"
                            label="รหัสผ่าน"
                            name="password"
                            placeholder="รหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password || ""}
                            errorText={touched.password && errors.password}
                            type={passwordVisibility ? "text" : "password"}
                            endAdornment={
                              <IconButton
                                p="0.25rem"
                                mr="0.25rem"
                                type="button"
                                color={
                                  passwordVisibility ? "gray.700" : "gray.600"
                                }
                                onClick={togglePasswordVisibility}
                              >
                                <Icon
                                  variant="small"
                                  defaultcolor="currentColor"
                                >
                                  {passwordVisibility ? "eye-alt" : "eye"}
                                </Icon>
                              </IconButton>
                            }
                          />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <TextField
                            mb="1rem"
                            fullwidth
                            name="confirm_password"
                            placeholder="ยืนยันรหัสผ่าน"
                            label="ยืนยันรหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirm_password || ""}
                            type={passwordVisibility ? "text" : "password"}
                            errorText={
                              touched.confirm_password &&
                              errors.confirm_password
                            }
                            endAdornment={
                              <IconButton
                                p="0.25rem"
                                mr="0.25rem"
                                type="button"
                                onClick={togglePasswordVisibility}
                                color={
                                  passwordVisibility ? "gray.700" : "gray.600"
                                }
                              >
                                <Icon
                                  variant="small"
                                  defaultcolor="currentColor"
                                >
                                  {passwordVisibility ? "eye-alt" : "eye"}
                                </Icon>
                              </IconButton>
                            }
                          />
                        </Grid>
                        <Grid item xl={12} md={12} xs={12}>
                          <Button
                            mt="1rem"
                            variant="contained"
                            color="ihavecpu"
                            type="submit"
                            style={{ width: "100%" }}
                          >
                            สมัครสมาชิก
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Card1>
        </Grid>
        {/* RIGHT */}
        <Grid
          item
          lg={0.5}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            justifyContent: "center",
          }}
        >
          {width > 900 && (
            <Fragment>
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid rgb(225 225 225)",
                  marginRight: "1rem",
                }}
              ></div>
              <FlexBox
                alignItems="right"
                justifyContent="right"
                mt="1rem"
                mb="1rem"
              >
                <Span color="text.muted">หรือ</Span>
              </FlexBox>
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid rgb(225 225 225)",
                  marginRight: "1rem",
                }}
              ></div>
            </Fragment>
          )}
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            justifyContent: "center",
          }}
        >
          <Card1>
            {width < 900 && (
              <Box mt="1rem" mb="1rem">
                <Divider width="200px" mx="auto" />
                <FlexBox justifyContent="center" mt="-14px">
                  <Span color="text.muted" bg="body.paper" px="1rem">
                    หรือ
                  </Span>
                </FlexBox>
              </Box>
            )}
            <FlexBox
              mb="0.75rem"
              height="40px"
              color="white"
              bg="#3B5998"
              borderRadius={5}
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
            >
              <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                facebook-filled-white
              </Icon>
              <Small fontWeight="600">เข้าสู่ระบบด้วย Facebook</Small>
            </FlexBox>

            <FlexBox
              mb="1.25rem"
              height="40px"
              color="white"
              bg="#4285F4"
              borderRadius={5}
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
            >
              <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                google-1
              </Icon>
              <Small fontWeight="600">เข้าสู่ระบบด้วย Google</Small>
            </FlexBox>

            <Divider mb="1rem" />
            <FlexBox justifyContent="center">
              <SemiSpan>เป็นสมาชิกอยู่แล้ว?</SemiSpan>
              <Link href="/login">
                <a>
                  <H6 ml="0.5rem">เข้าสู่ระบบ</H6>
                </a>
              </Link>
            </FlexBox>
            <FlexBox justifyContent="center" mt="1rem">
              <SemiSpan>หากท่าน</SemiSpan>
              <Link href="/login">
                <a>
                  <H6 ml="0.5rem" color="grey">
                    ลืมรหัสผ่าน
                  </H6>
                </a>
              </Link>
            </FlexBox>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const initialValues = {
  firstname: "",
  lastname: "",
  tel: "",
  email: "",
  password: "",
  confirm_password: "",
  birth_date: null,
};

const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("กรุณากรอกชื่อ"),
  lastname: yup.string().required("กรุณากรอกนามสกุล"),
  tel: yup
    .string()
    .test("is-ten-digit", "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง", (value) => {
      if (value) {
        const telDigits = value.replace(/\D/g, "");
        return telDigits.length === 10 && telDigits.startsWith("0");
      }
      return true;
    })
    .required("กรุณากรอกเบอร์โทรศัพท์"),

  email: yup
    .string()
    .email("กรุณากรอกอีเมลให้ถูกต้อง")
    .required("กรุณากรอกอีเมล"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัว")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "รหัสผ่านต้องประกอบด้วยตัวอักษรตัวเล็ก ตัวใหญ่ และตัวเลข"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "รหัสผ่านไม่ตรงกัน")
    .required("กรุณายืนยันรหัสผ่าน"),
  birth_date: yup
    .date()
    .nullable()
    .transform((originalValue, _) => {
      return originalValue || null;
    })
    .max(new Date(), "วันเกิดต้องไม่เกินวันปัจจุบัน")
    .required("กรุณากรอกวันเกิด"),
});

export default Signup;
