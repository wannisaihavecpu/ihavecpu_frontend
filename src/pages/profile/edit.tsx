import { Fragment } from "react";
import Router from "next/router";
import * as yup from "yup";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { notify } from "@component/toast";
import { getSession } from "next-auth/react";

const ProfileEditor = () => {
  const { data: session } = useSession();

  const INITIAL_VALUES = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthday: "",
    line: "",
    facebook: "",
  };
  // const [valuesInitial, setValues] = useState(INITIAL_VALUES);

  const VALIDATION_SCHEMA = yup.object().shape({
    firstname: yup.string().required("กรุณากรอกชื่อ"),
    lastname: yup.string().required("กรุณากรอกนามสกุล"),

    phone: yup
      .string()
      .test("is-ten-digit", "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง", (value) => {
        if (value) {
          const telDigits = value.replace(/\D/g, "");
          return telDigits.length === 10 && telDigits.startsWith("0");
        }
        return true;
      })
      .required("กรุณากรอกเบอร์โทรศัพท์"),
    birthday: yup.date().required("invalid date"),
    line: yup.string(),
    facebook: yup.string(),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    const token = session?.user?.token_expire;
    // console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/profile/edit`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.res_code === "00") {
      notify("success", "แก้ไขสำเร็จ");
      setTimeout(() => {
        Router.push("/profile");
      }, 2000);
    } else {
      notify("error", "แก้ไขไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const handleGoBack = () => Router.push("/profile");

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleGoBack}>
      กลับไปหน้า ข้อมูลส่วนตัว
    </Button>
  );
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleFormSubmit,
  });
  const fetchData = async () => {
    try {
      const token = session?.user?.token_expire;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/profile`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (responseData.res_code === "00") {
        const { firstname, lastname, email, phone, birthday, line, facebook } =
          responseData.res_result;

        const updatedValues = {
          firstname: firstname || "",
          lastname: lastname || "",
          email: email || "",
          phone: phone || "",
          birthday: birthday || "",
          line: line || "",
          facebook: facebook || "",
        };

        // console.log("updatedValues", updatedValues);

        formik.setValues(updatedValues);
      } else {
        console.error(
          "API request failed with res_code:",
          responseData.res_code
        );
      }
    } catch (error) {
      console.error("API request failed with error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="แก้ไขข้อมูลส่วนตัว"
        button={HEADER_LINK}
      />

      <Card1>
        <form onSubmit={formik.handleSubmit}>
          <Box mb="30px">
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="firstname"
                  label="ชื่อ"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  errorText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="lastname"
                  label="นามสกุล"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  errorText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="email"
                  type="email"
                  label="อีเมล"
                  value={formik.values.email}
                  readOnly
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  label="เบอร์โทรศัพท์"
                  name="phone"
                  maxLength={10}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  errorText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  type="date"
                  name="birthday"
                  label="วันเกิด"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                  errorText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>
            </Grid>
            <Box mt="1rem">
              <Grid container horizontal_spacing={6} vertical_spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="facebook"
                    label="Facebook"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                    errorText={
                      formik.touched.facebook && formik.errors.facebook
                    }
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="line"
                    label="Line"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.line}
                    errorText={formik.touched.line && formik.errors.line}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Button type="submit" variant="contained" color="ihavecpu">
            บันทึก
          </Button>
        </form>
      </Card1>
    </Fragment>
  );
};

ProfileEditor.layout = DashboardLayout;

// export const getStaticProps: GetStaticProps = async () => {
//   const user = await api.getUser();
//   return { props: { user } };
// };
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfileEditor;
