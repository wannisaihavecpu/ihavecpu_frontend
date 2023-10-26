import { FC } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1, Card2, Card3 } from "./showcase-cards";

const Section1: FC = () => {
  return (
    <Box mb="1.5rem">
      <Grid container spacing={6}>
        <Grid item md={4} xs={12}>
          <Card1 />
        </Grid>

        <Grid item md={4} xs={12}>
          <Card2 />
        </Grid>

        <Grid item md={4} xs={12}>
          <Card3 />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section1;
