import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { getTheme } from "@utils/utils";

// styled component
const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer1: FC = () => {
  return (
    <footer>
      <Box bg="#000000">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image alt="logo" mb="1.25rem" src="/assets/images/logo_light.svg" height="70px" />
                  </a>
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                ถ้าคุณชอบคอมพิวเตอร์ เราคือเพื่อนกัน iHAVECPU ร้านจำหน่ายอุปกรณ์คอมพิวเตอร์ โน๊ตบุ๊ก อุปกรณ์ต่อพ่วง เกมมิ่งเกียร์ รับประกันทุกชิ้น บริการจัดสเปกคอมพิวเตอร์ ตามการใช้งานในงบประมาณที่ลูกค้าเลือกได้เอง
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize="25px" fontWeight="600">
                  เกี่ยวกับเรา
                </Typography>

                <div>
                  {aboutLink.map((item) => (
                    <a
                    href={item.url}
                    target="_blank"
                    key={item.title}
                    rel="noreferrer noopenner"
                  >
                      <StyledLink>{item.title}</StyledLink>
                    </a>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize="25px" fontWeight="600">
                  บริการลูกค้า
                </Typography>
                <div>
                  {customerList.map((item) => (
                    <a
                    href={item.url}
                    target="_blank"
                    key={item.title}
                    rel="noreferrer noopenner"
                  >
                      <StyledLink>{item.title}</StyledLink>
                    </a>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize="25px" fontWeight="600">
                  ติดต่อเรา
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                เลขที่ 252 ตำบล หนองแสง อำเภอปากพลี นครนายก 26130
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  อีเมล: info@ihavecpu.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  โทร: 086 838 5200
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box m="5px" p="10px" size="small" borderRadius="50%" bg="rgba(0,0,0,0.2)">
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLink = [
  { title: "บริการของเรา", url: "https://www.ihavecpu.com/" },
  { title: "ร้านค้าของเรา", url: "/" },
  { title: "ความห่วงใยของเรา", url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg" },
  { title: "ข้อตกลงและเงื่อนไข", url: "/" },
  { title: "นโยบายความเป็นส่วนตัว", url: "/" },
];

const customerList = [
  { title: "ศูนย์ช่วยเหลือ", url: "https://www.ihavecpu.com/" },
  { title: "วิธีการซื้อ", url: "/" },
  { title: "ติดตามคำสั่งซื้อของคุณ", url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg" },
  { title: "จัดการคำสั่งซื้อ", url: "/" },
  { title: "การคืนสินค้าและการคืนเงิน", url: "/" },
];


const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/UILibOfficial" },
  { iconName: "twitter", url: "/" },
  { iconName: "youtube", url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg" },
  { iconName: "google", url: "/" },
  { iconName: "instagram", url: "/" },
];

export default Footer1;
