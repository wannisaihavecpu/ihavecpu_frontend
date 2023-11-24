import { FC, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H6, SemiSpan, Small, Span } from "@component/Typography";
import { StyledSessionCard } from "./styles";
import styled from "styled-components";
import Modal from "@component/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
};
const Login: FC<Props> = (props) => {
  const { open, onClose } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    router.push("/profile");
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  const IconClose = styled.div`
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

  return (
    <Modal open={open}>
      <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
        <FlexBox style={{ justifyContent: "right", padding: "15px 45px" }}>
          <IconClose>
            <Button type="button" className="icon-button" onClick={onClose}>
              <Icon size="24px">close</Icon>
            </Button>
          </IconClose>
        </FlexBox>
        <form className="content" onSubmit={handleSubmit}>
          <Box mb="2rem">
            <H3 textAlign="center" mb="0.5rem">
              เข้าสู่ระบบ
            </H3>
          </Box>

          <TextField
            fullwidth
            mb="0.75rem"
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ""}
            placeholder="exmple@mail.com"
            // label="Email or Phone Number"
            errorText={touched.email && errors.email}
          />

          <TextField
            mb="1rem"
            fullwidth
            name="password"
            // label="Password"
            autoComplete="on"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="*********"
            value={values.password || ""}
            errorText={touched.password && errors.password}
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

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
          >
            Login
          </Button>

          <Box mb="1rem">
            <Divider width="200px" mx="auto" />
            <FlexBox justifyContent="center" mt="-14px">
              <Span color="text.muted" bg="body.paper" px="1rem">
                on
              </Span>
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
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              facebook-filled-white
            </Icon>
            <Small fontWeight="600">Continue with Facebook</Small>
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
            <Small fontWeight="600">Continue with Google</Small>
          </FlexBox>

          <FlexBox justifyContent="center" mb="1.25rem">
            <SemiSpan>Don’t have account?</SemiSpan>
            <Link href="/signup">
              <a>
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Sign Up
                </H6>
              </a>
            </Link>
          </FlexBox>
        </form>

        <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <SemiSpan>Forgot your password?</SemiSpan>
          <Link href="/">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Reset It
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
