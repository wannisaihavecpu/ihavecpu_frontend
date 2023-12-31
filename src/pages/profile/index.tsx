import React, { Fragment, useEffect, useState } from "react";
import Card from "@component/Card";
import Router from "next/router";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import { H3, Small } from "@component/Typography";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import DateFormat from "@component/DateFormat";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// ============================================================
// type ProfileProps = { user: User };
// ============================================================

const Profile = ({}) => {
  const handleEdit = () => Router.push("/profile/edit");
  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session.user);

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleEdit}>
      แก้ไขข้อมูลส่วนตัว
    </Button>
  );

  const [profileData, setProfileData] = useState(null);
  const [orderStatusData, setStatusData] = useState(null);

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session, router]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session?.user.token_expire}`,
            },
          }
        );

        if (response.data.res_code === "00") {
          setProfileData(response.data.res_result);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    const fetchStatusOrder = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/profile/orderStatus`,
          { lang: "th" },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.user.token_expire}`,
            },
          }
        );

        if (response.data.res_code === "00") {
          setStatusData(response.data.res_result);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
    fetchStatusOrder();
  }, [session]);

  return (
    <Fragment>
      {session && (
        <Fragment>
          <DashboardPageHeader
            iconName="user_filled"
            title="ข้อมูลส่วนตัว"
            button={HEADER_LINK}
          />
          <Box mb="30px">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FlexBox
                  as={Card}
                  p="14px 32px"
                  height="100%"
                  alignItems="center"
                >
                  <Avatar src="/assets/images/profile/profile.png" size={64} />

                  <Box ml="12px" flex="1 1 0">
                    <FlexBox
                      flexWrap="wrap"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div>
                        {profileData?.firstname} {profileData?.lastname}
                      </div>
                    </FlexBox>
                  </Box>
                </FlexBox>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid container spacing={4}>
                  {orderStatusData &&
                    ["Completed", "Shipped", "Paid", "Waiting"].map(
                      (status) => (
                        <Grid item lg={3} sm={6} xs={6} key={status}>
                          <FlexBox
                            as={Card}
                            height="100%"
                            p="1.35rem"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <H3 color="primary.main" my="0px" fontWeight="600">
                              {orderStatusData[status].total}
                            </H3>

                            <Small
                              style={{ whiteSpace: "nowrap" }}
                              color="text.muted"
                              textAlign="center"
                            >
                              {orderStatusData[status].class}
                            </Small>
                          </FlexBox>
                        </Grid>
                      )
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <TableRow p="0.75rem 1.5rem">
            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px" textAlign="left">
                ชื่อ - นามสกุล
              </Small>
              <span>
                {profileData?.firstname} {profileData?.lastname}
              </span>
            </FlexBox>
            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px" textAlign="left">
                อีเมล
              </Small>

              <span> {profileData?.email ?? "-"} </span>
            </FlexBox>

            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px" textAlign="left">
                หมายเลขโทรศัพท์
              </Small>
              <span>
                {profileData?.phone !== "" && profileData?.phone !== null
                  ? profileData?.phone
                  : "-"}
              </span>
            </FlexBox>

            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px">
                วัน / เดือน / ปีเกิด
              </Small>

              <span className="pre">
                {profileData?.birthday ? (
                  <DateFormat date={profileData.birthday} />
                ) : (
                  "-"
                )}
              </span>
            </FlexBox>
            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px">
                ไลน์ไอดี
              </Small>

              <span className="pre">{profileData?.line ?? "-"} </span>
            </FlexBox>
            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px">
                เฟสบุ๊ค
              </Small>

              <span className="pre">{profileData?.facebook ?? "-"} </span>
            </FlexBox>
          </TableRow>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.layout = DashboardLayout;

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

// export const getStaticProps: GetStaticProps = async () => {
//   const user = await api.getUser();
//   return { props: { user } };
// };
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

export default Profile;
