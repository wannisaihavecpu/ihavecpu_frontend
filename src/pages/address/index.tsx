import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

const AddressList = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/profile/addressList`,
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

    fetchProfileData();
  }, [session]);

  return (
    <Fragment>
      <DashboardPageHeader
        title="ที่อยู่"
        iconName="pin_filled"
        // button={HEADER_LINK}
      />

      {/* {profileData &&
        profileData.map((item) => (
          <TableRow my="1rem" padding="6px 18px" key={item.address_id}>
            <Typography className="pre" m="6px" textAlign="left">
              {item.address_type === 1
                ? "สำหรับจัดส่ง"
                : "สำหรับออกใบกำกับภาษี"}
            </Typography>

            <Typography flex="1 1 260px !important" m="6px" textAlign="left">
              {item.address1}
              {item.subdistrict && ` ต.${item.subdistrict}`}
              {item.city && ` อ.${item.city}`}
              {item.state && ` จ.${item.state}`} {item.postcode}
            </Typography>

            <Typography className="pre" m="6px" textAlign="left">
              {item.mobile}
            </Typography>

            <Typography className="pre" textAlign="center" color="text.muted">
              <Link href={`/address/${item.address_id}`} passHref>
                <Typography as="a" color="inherit">
                  <IconButton size="small">
                    <Icon variant="small" defaultcolor="currentColor">
                      edit
                    </Icon>
                  </IconButton>
                </Typography>
              </Link>
            </Typography>
          </TableRow>
        ))} */}
      <TableRow my="1rem" padding="6px 18px">
        <Typography className="pre" m="6px" textAlign="left">
          สำหรับจัดส่ง
        </Typography>

        <Typography flex="1 1 260px !important" m="6px" textAlign="left">
          {(profileData &&
            profileData
              .filter((item) => item.address_type === 1)
              .map(
                (item) =>
                  `${item.address1 || ""} ${
                    item.subdistrict ? `ต.${item.subdistrict}, ` : ""
                  }${item.city ? `อ.${item.city} ` : ""}${
                    item.state ? `จ.${item.state} ` : ""
                  }${item.postcode || ""}`
              )
              .join(", ")) ||
            "-"}
        </Typography>

        <Typography className="pre" m="6px" textAlign="left">
          {(profileData &&
            profileData
              .filter((item) => item.address_type === 1)
              .map((item) => (item.mobile ? `${item.mobile}` : ""))
              .join(", ")) ||
            "-"}
        </Typography>

        <Typography className="pre" textAlign="center" color="text.muted">
          <Link href={`/address/delivery`} passHref>
            <Typography as="a" color="inherit">
              <IconButton size="small">
                <Icon variant="small" defaultcolor="currentColor">
                  edit
                </Icon>
              </IconButton>
            </Typography>
          </Link>
        </Typography>
      </TableRow>
      <TableRow my="1rem" padding="6px 18px">
        <Typography className="pre" m="6px" textAlign="left">
          สำหรับออกใบกำกับภาษี
        </Typography>

        <Typography flex="1 1 260px !important" m="6px" textAlign="left">
          {" "}
          {(profileData &&
            profileData
              .filter((item) => item.address_type === 2)
              .map(
                (item) =>
                  `${item.address1 || ""} ${
                    item.subdistrict ? `ต.${item.subdistrict}, ` : ""
                  }${item.city ? `อ.${item.city} ` : ""}${
                    item.state ? `จ.${item.state} ` : ""
                  }${item.postcode || ""}`
              )
              .join(", ")) ||
            "-"}
        </Typography>

        <Typography className="pre" m="6px" textAlign="left">
          {(profileData &&
            profileData
              .filter((item) => item.address_type === 2)
              .map((item) => (item.mobile ? `${item.mobile}` : ""))
              .join(", ")) ||
            "-"}
        </Typography>

        <Typography className="pre" textAlign="center" color="text.muted">
          <Link href={`/address/tax`} passHref>
            <Typography as="a" color="inherit">
              <IconButton size="small">
                <Icon variant="small" defaultcolor="currentColor">
                  edit
                </Icon>
              </IconButton>
            </Typography>
          </Link>
        </Typography>
      </TableRow>

      <FlexBox justifyContent="center" mt="2.5rem">
        {/* <Pagination
          onChange={(data) => console.log(data)}
          pageCount={Math.ceil(addressList.length / 5)}
        /> */}
      </FlexBox>
    </Fragment>
  );
};

AddressList.layout = DashboardLayout;

export default AddressList;
