import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import Container from "@component/Container";
import { H2, H4, Paragraph } from "@component/Typography";
import { theme } from "@utils/theme";
import allBlog from "@models/allBlog.model";

// styled components
const ImageBox = styled(Box)({
  padding: 0,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": { transition: "0.3s" },
  ":hover": { "& img": { transform: "scale(1.1)" } },
});

const DateBox = styled(FlexBox)({
  top: 30,
  left: 30,
  width: 50,
  height: 50,
  textAlign: "center",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[1],
  backgroundColor: theme.colors.gray[200],
});

const StyledLink = styled(NavLink)({
  fontWeight: 600,
  position: "relative",
  paddingBottom: "2px",
  textTransform: "uppercase",
  ":hover::after": { width: "100%" },
  ":after": {
    left: 0,
    bottom: 0,
    width: "0%",
    content: "''",
    height: "2px",
    transition: "0.3s",
    position: "absolute",
    backgroundColor: theme.colors.primary.main,
  },
});

// ======================================================================
type BlogProps = { blogs: allBlog[] };
// ======================================================================

const Blogs: FC<BlogProps> = ({ blogs }) => {
  return (
    <Container mb="1rem">
      <H2 textAlign="center" mb={4}>
        บทความ
      </H2>

      <Grid container spacing={5}>
        {blogs.map((item) => (
          <Grid item md={4} xs={12} key={item.article_id}>
            <Card
              style={{
                borderRadius: 10,
                boxShadow: theme.shadows[3],
                padding: ".8rem",
              }}
            >
              <ImageBox p={2} maxHeight={220}>
                <Image
                  width={580}
                  height={272}
                  alt="blog-1"
                  objectFit="cover"
                  layout="responsive"
                  src={item.article_img}
                />

                <DateBox>
                  <Paragraph
                    width="min-content"
                    lineHeight={1}
                    fontWeight={600}
                  >
                    {item.create_date_th}
                  </Paragraph>
                </DateBox>
              </ImageBox>

              <Box p={0} pt={3}>
                <Link href="#">
                  <a>
                    <H4 fontWeight={700}>{item.article_name_th}</H4>
                  </a>
                </Link>

                <Paragraph mt={0.5} mb={3}>
                  {item.article_sdesc_th}
                </Paragraph>

                <StyledLink href="#">อ่านต่อทั้งหมด</StyledLink>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
