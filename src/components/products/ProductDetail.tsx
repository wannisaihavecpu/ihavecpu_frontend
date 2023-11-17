import { FC, useState } from "react";
import Box from "@component/Box";
import { FadeInUp } from "./styles";
import productView from "@models/productView.model";
import { Button } from "@component/buttons";

type ProductDetailProp = {
  product: productView;
};

const ProductDetail: FC<ProductDetailProp> = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const extractFirstImage = (htmlContent: string) => {
    const match = htmlContent.match(/<img[^>]*src="([^"]*)"[^>]*>/);
    return match ? match[1] : null;
  };

  const firstImage = extractFirstImage(product.description_th);

  return (
    <FadeInUp>
      <Box
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {firstImage && !showMore && (
          <div style={{ height: "250px", position: "relative" }}>
            <img
              src={firstImage}
              alt="Product Image"
              style={{
                width: "100%",
                maxWidth: "100%",
                marginBottom: "-5px",
              }}
            />
            {!showMore && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "150px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  background:
                    "linear-gradient(0deg, #F6F9FC 8.85%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                {firstImage && (
                  <Button
                    size="small"
                    color="ihavecpu"
                    variant="contained"
                    onClick={toggleShowMore}
                  >
                    ดูเพิ่มเติม
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        {(showMore || !firstImage) && (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description_th,
            }}
          />
        )}
      </Box>
    </FadeInUp>
  );
};

export default ProductDetail;
