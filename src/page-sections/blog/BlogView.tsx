// components/BlogView.js
import React, { useEffect, useRef, Fragment } from "react";
import styles from "./styles.module.css";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Avatar from "@component/avatar";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
const BlogView = () => {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rightColumn.style.top = "0";
        } else {
          rightColumn.style.top = `${
            entry.intersectionRect.height - window.innerHeight
          }px`;
        }
      },
      { threshold: 0.5 }
    );

    if (leftColumn) {
      observer.observe(leftColumn);
    }

    return () => {
      if (leftColumn) {
        observer.unobserve(leftColumn);
      }
    };
  }, []);

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="ihavecpu.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">รายละเอียดจัดส่ง</Typography>
            </FlexBox>
            <Grid container spacing={6}>
              <Box>sdsd</Box>
            </Grid>
          </Card1>
          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="ihavecpu.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">รายละเอียดจัดส่ง</Typography>
            </FlexBox>
            <Grid container spacing={6}>
              <FlexBox>
                <Grid lg={2}>
                  <Box className={styles.rightColumn}>
                    <Icon mb="2rem">facebook</Icon>
                    <Icon mb="2rem">line</Icon>
                    <Icon mb="2rem">twitter</Icon>
                    <Icon mb="2rem">facebook</Icon>
                    <Icon mb="2rem">line</Icon>
                    <Icon mb="2rem">twitter</Icon>
                  </Box>
                </Grid>
                <Grid lg={10}>
                  <Box className={styles.content}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of. Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It
                    was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of . Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of
                  </Box>
                </Grid>
              </FlexBox>
            </Grid>
          </Card1>
          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="ihavecpu.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">รายละเอียดจัดส่ง</Typography>
            </FlexBox>
            <Grid container spacing={6}>
              <Box>sdsd</Box>
            </Grid>
          </Card1>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <Typography color="secondary.900" fontWeight="700" mb="1.5rem">
              Latest
            </Typography>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BlogView;
