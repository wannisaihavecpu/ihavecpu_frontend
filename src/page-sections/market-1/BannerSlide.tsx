import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Card from "@component/Card";
import { Carousel } from "@component/carousel";
import { ProductCard22 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import Banners from "@models/Banners.model";

// =====================================================
type Props = { BannerList: Banners[] };
// =====================================================

const BannerSlide: FC<Props> = ({ BannerList }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 650) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator
      // iconName="categories"
      // title="อุปกรณ์เสริม เกมเมอร์"
      // seeMoreLink="#"
    >
      <Carousel totalSlides={BannerList.length} visibleSlides={visibleSlides}>
        {BannerList.map((item, ind) => (
          <Link href={`/product/search/${item.slug}`} key={ind}>
            <a>
              <Card p="0rem">
                <ProductCard22
                  title={item.name}
                  subtitle={item.description}
                  imgUrl={item.image}
                />
              </Card>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default BannerSlide;
