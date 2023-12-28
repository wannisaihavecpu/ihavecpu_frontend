import { Fragment } from "react";
import { GetStaticProps } from "next";
import Router from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import api from "@utils/__api__/users";
import User from "@models/user.model";
// import { format } from "date-fns";
// import { useSession } from "next-auth/react";
// ===========================================================
type Props = { user: User };
// ===========================================================

const ProfileEditor = ({ user }: Props) => {
  const INITIAL_VALUES = {
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    phone: user.phone || "",
    birthday: user.birthday || "",
    line: user.line || "",
    facebook: user.facebook || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.date().required("invalid date"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    console.log(values);
  };

  const handleGoBack = () => Router.push("/profile");

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleGoBack}>
      Back to Profile
    </Button>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="แก้ไขข้อมูลส่วนตัว"
        button={HEADER_LINK}
      />

      <Card1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
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
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="firstname"
                      label="ชื่อ"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      errorText={touched.firstname && errors.firstname}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="last_name"
                      label="นามสกุล"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.lastname}
                      errorText={touched.lastname && errors.lastname}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="email"
                      type="email"
                      label="อีเมล"
                      onBlur={handleBlur}
                      value={values?.email}
                      onChange={handleChange}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      label="เบอร์โทรศัพท์"
                      name="phone"
                      onBlur={handleBlur}
                      value={values?.phone}
                      onChange={handleChange}
                      errorText={touched.phone && errors.phone}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      type="date"
                      name="birthday"
                      label="วันเกิด"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.birthday}
                      errorText={touched.birthday && errors.birthday}
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.facebook}
                        errorText={touched.facebook && errors.facebook}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        fullwidth
                        name="line"
                        label="Line"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.line}
                        errorText={touched.line && errors.line}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Button type="submit" variant="contained" color="ihavecpu">
                บันทึก
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </Fragment>
  );
};

ProfileEditor.layout = DashboardLayout;

export const getStaticProps: GetStaticProps = async () => {
  const user = await api.getUser();
  return { props: { user } };
};

export default ProfileEditor;
