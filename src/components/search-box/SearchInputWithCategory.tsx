import { FC, useCallback, useEffect, useState } from "react";
// import Link from "next/link";
import { debounce } from "lodash";
import Box from "../Box";
// import Menu from "../Menu";
import Card from "../Card";
import Icon from "../icon/Icon";
// import FlexBox from "../FlexBox";
// import MenuItem from "../MenuItem";
// import { Span } from "../Typography";
import TextField from "../text-field";
import StyledSearchBox from "./styled";
import { useRouter } from "next/router";

const SearchInputWithCategory: FC = () => {
  const router = useRouter();
  const [resultList, setResultList] = useState([]);
  // const [category, setCategory] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");

  // const handleCategoryChange = (cat) => () => setCategory(cat);

  const search = debounce((value) => {
    if (!value) setResultList([]);
    else setResultList(dummySearchResult);
  }, 200);
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    search(value);
  };

  const handleDocumentClick = () => setResultList([]);
  const handleEnterKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        router.push(`/product/search/${searchValue}`);
        setSearchValue("");
      }
    },
    [router, searchValue]
  );

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    window.addEventListener("keydown", handleEnterKeyPress);

    return () => {
      window.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          onChange={handleSearchChange}
          value={searchValue}
          className="search-field"
          placeholder="ค้นหาสินค้า"
        />

        {/* <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          {categories.map((item) => (
            <MenuItem key={item} onClick={handleCategoryChange(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu> */}
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {/* {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))} */}
        </Card>
      )}
    </Box>
  );
};

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

export default SearchInputWithCategory;
