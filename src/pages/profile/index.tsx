import React, { Fragment, useEffect, useState } from "react";

import { GetStaticProps } from "next";
import Router from "next/router";
import { format } from "date-fns";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import User from "@models/user.model";
import api from "@utils/__api__/users";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import DateFormat from "@component/DateFormat";
import { useRouter } from "next/router";

// ============================================================
type ProfileProps = { user: User };
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

  const infoList = [
    { title: "16", subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
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
          // console.log(response);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
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
                  {infoList.map((item) => (
                    <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                      <FlexBox
                        as={Card}
                        height="100%"
                        p="1rem 1.25rem"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <H3 color="primary.main" my="0px" fontWeight="600">
                          {item.title}
                        </H3>

                        <Small color="text.muted" textAlign="center">
                          {item.subtitle}
                        </Small>
                      </FlexBox>
                    </Grid>
                  ))}
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

              <span> {profileData?.phone ?? "-"} </span>
            </FlexBox>

            <FlexBox flexDirection="column" p="0.5rem">
              <Small color="text.muted" mb="4px">
                วัน / เดือน / ปีเกิด
              </Small>

              <span className="pre">
                <DateFormat date={profileData?.birthday} />
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
