import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Card from "@component/Card";
import { Carousel } from "@component/carousel";
import { ProductCard22 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import banner from "@models/banner.model";

// =====================================================
type Props = { banner: banner[] };
// =====================================================

const BannerSlide: FC<Props> = ({ banner }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 650) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator>
      <Carousel
        totalSlides={banner.length}
        visibleSlides={visibleSlides}
        showArrow={false}
      >
        {banner.map((item, ind) =>
          item.link ? (
            <Link href={item.link} key={ind}>
              <a>
                <Card p="0rem">
                  <ProductCard22 imgUrl={item.imgUrl} />
                </Card>
              </a>
            </Link>
          ) : (
            <Card p="0rem" key={ind}>
              <ProductCard22 imgUrl={item.imgUrl} />
            </Card>
          )
        )}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default BannerSlide;
