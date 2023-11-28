import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import { Span } from "../Typography";
import TextField from "../text-field";
import StyledSearchBox from "./styled";
import { useRouter } from "next/router";

interface SearchInputProps {
  openModal: boolean;
}

const SearchInputWithCategory: FC<SearchInputProps> = ({ openModal }) => {
  const router = useRouter();
  const [resultList, setResultList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const search = async (value) => {
    if (!value) {
      setResultList([]);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/search/auto?lang=gb&keyword=${value}`
        );
        const data = await response.json();
        if (data.res_result) {
          setResultList(data.res_result.data);
        } else {
          setResultList([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResultList([]);
      }
    }
  };

  useEffect(() => {
    let debounceTimeout;

    debounceTimeout = setTimeout(() => {
      search(searchValue);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  const handleDocumentClick = () => setResultList([]);
  const handleEnterKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !openModal) {
        router.push(`/product/search/${searchValue}`);
        setResultList([]);
        setSearchValue("");
      }
    },
    [router, searchValue, openModal]
  );

  const formatSlug = (name) => {
    let formattedSlug = name.replace(/\s+/g, "-");

    formattedSlug = formattedSlug
      .replace(/\/+/g, "-")
      .replace(/(\(\d{2}\+\w+\))/g, "-$1")
      .replace(/(\(\d{2}\+\w+\))-/g, "$1");

    formattedSlug = formattedSlug.replace(/[^a-zA-Z0-9-().]+/g, "");

    formattedSlug = formattedSlug.replace(/-(?=-)/g, "");

    return formattedSlug.toLowerCase();
  };
  const handleProductClick = () => {
    setResultList([]);
    setSearchValue("");
  };

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
          {resultList.map((item) => (
            <Link
              href={
                item.type === "category"
                  ? `/category/${formatSlug(item.name_gb)}`
                  : `/product/${item.id}/${formatSlug(item.name_gb)}`
              }
              passHref
              key={item.id}
            >
              <MenuItem key={item.id} onClick={() => handleProductClick()}>
                {item.type === "category" && (
                  <>
                    <img
                      src={item.img}
                      alt={item.name_gb}
                      style={{
                        marginRight: "8px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                    />
                    <Span fontSize="14px">{item.name_gb}</Span>
                  </>
                )}
                {item.type === "product" && (
                  <Span fontSize="14px">{item.name_gb}</Span>
                )}
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default SearchInputWithCategory;
