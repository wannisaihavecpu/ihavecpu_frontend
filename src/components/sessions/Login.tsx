import { FC, useCallback, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H6, SemiSpan, Small } from "@component/Typography";
import { StyledSessionCard } from "./styles";
import styled from "styled-components";
import Modal from "@component/Modal";
import SearchBoxStyle from "@component/search-box/styled";
import Grid from "@component/grid/Grid";
import CheckBox from "@component/CheckBox";
import { signIn,useSession,signOut } from "next-auth/react";
import { notify } from "@component/toast";

type Props = {
  open: boolean;
  onClose: () => void;
};
const IconCloseWrapper = styled.div`
  .icon-button {
    padding: 0px;
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
`;
const Login: FC<Props> = (props) => {
  const { open, onClose } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result.error) {
        notify("error", "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่");
      } else {
        // router.push("/");
        notify("success", "เข้าสู่ระบบสำเร็จ");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <Modal open={open}>
      <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
        <FlexBox
          className="content"
          style={{
            paddingTop: "0px",
            paddingBottom: "0px",
            marginTop: "15px",
            marginBottom: "0px",
            justifyContent: "right",
          }}
        >
          <IconCloseWrapper>
            <Button type="button" className="icon-button" onClick={onClose}>
              <Icon size="24px">close</Icon>
            </Button>
          </IconCloseWrapper>
        </FlexBox>
        <form className="content" onSubmit={handleSubmit}>
          <Box mb="2rem">
            <H3 textAlign="center">เข้าสู่ระบบ</H3>
          </Box>
          <SearchBoxStyle style={{ marginBottom: "0.5rem" }}>
            <Icon className="login-icon" size="22px">
              email
            </Icon>

            <TextField
              fullwidth
              className="login-field"
              name="email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              placeholder="อีเมล"
              style={{
                borderColor:
                  touched.email && errors.email ? "#d4001a" : "#ecedec",
              }}
            />
          </SearchBoxStyle>
          <SearchBoxStyle style={{ marginBottom: "1rem" }}>
            <Icon className="login-icon" size="22px">
              email
            </Icon>

            <TextField
              fullwidth
              className="login-field"
              name="password"
              autoComplete="on"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              style={{
                borderColor:
                  touched.password && errors.password ? "#d4001a" : "#ecedec",
              }}
              value={values.password || ""}
              type={passwordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  // size="small"
                  mr="0.25rem"
                  type="button"
                  onClick={togglePasswordVisibility}
                  color={passwordVisibility ? "gray.700" : "gray.600"}
                >
                  <Icon variant="small" defaultcolor="currentColor">
                    {passwordVisibility ? "eye-alt" : "eye"}
                  </Icon>
                </IconButton>
              }
            />
          </SearchBoxStyle>
          <FlexBox>
            <CheckBox
              mb="1.75rem"
              name="agreement"
              color="secondary"
              onChange={handleChange}
              checked={values.remember}
              label={<SemiSpan>จำฉันเข้าระบบ</SemiSpan>}
            />
          </FlexBox>

          <Grid item xl={12} md={12} xs={12}>
            <Button
              mb="1.65rem"
              variant="contained"
              color="ihavecpu"
              type="submit"
              style={{ width: "100%" }}
            >
              เข้าสู่ระบบ
            </Button>
          </Grid>

          <Box mb="1rem">
            <Divider width="200px" mx="auto" />
            <FlexBox justifyContent="center" mt="-14px">
              <H3
                color="text.muted"
                bg="body.paper"
                px="1rem"
                fontSize={14}
                fontWeight={100}
              >
                หรือเข้าสู่ระบบด้วย
              </H3>
            </FlexBox>
          </Box>

          <FlexBox
            mb="0.75rem"
            height="40px"
            color="white"
            bg="#3B5998"
            borderRadius={5}
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            onClick={() => signIn('facebook')}
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              facebook-filled-white
            </Icon>
            <Small fontWeight="600">เข้าสู่ระบบด้วย Facebook</Small>
          </FlexBox>

          <FlexBox
            mb="0.75rem"
            height="40px"
            color="white"
            bg="#4285F4"
            borderRadius={5}
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            onClick={() => signIn('google')}
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              google-1
            </Icon>
      
            <Small fontWeight="600">เข้าสู่ระบบด้วย Google</Small>
          </FlexBox>

          <FlexBox
            mb="1.25rem"
            height="40px"
            color="white"
            bg="#00b900"
            borderRadius={5}
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              facebook-filled-white
            </Icon>
            <Small fontWeight="600">เข้าสู่ระบบด้วย LINE</Small>
          </FlexBox>

          <FlexBox justifyContent="center" mb="1.25rem">
            <SemiSpan>ไม่ใช่สมาชิก?</SemiSpan>
            <Link href="/signup">
              <a>
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  สมัครสมาชิก
                </H6>
              </a>
            </Link>
          </FlexBox>
        </form>

        <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <Link href="/">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                ลืมรหัสผ่าน ?
              </H6>
            </a>
          </Link>
        </FlexBox>
      </StyledSessionCard>
    </Modal>
  );
};

const initialValues = { email: "", password: "" };

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
