import React, { useState, useEffect } from "react";
import useWindowSize from "@hook/useWindowSize";
import Icon from "@component/icon/Icon";
import Link from "next/link";

const CompareNotification = ({ count, category }) => {
  const width = useWindowSize();
  const marginBottomValue = width <= 900 ? "80px" : "15px";

  const hoverStyle = {
    backgroundColor: "#FF0000",
  };

  const [isVisible, setIsVisible] = useState(count > 0);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    setIsVisible(count > 0);

    // Fetch category details when category prop changes
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/category/detail?category_id=${category}`
        );

        if (response.ok) {
          const data = await response.json();
          setCategoryDetails(data.res_result);
        } else {
          // Handle error
          console.error("Failed to fetch category details");
        }
      } catch (error) {
        // Handle error
        console.error("Error during fetch:", error);
      }
    };

    fetchCategoryDetails();
  }, [count, category]);

  return count > 0 ? (
    <Link href="/compare">
      <div
        style={{
          position: "fixed",
          cursor: "pointer",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "10px",
          marginBottom: marginBottomValue,
          borderRadius: "15px",
          width: "400px",
          height: "50px",
          backgroundColor: isVisible ? "#d4001a" : "transparent",
          color: "#fff",
          padding: "8px",
          textAlign: "center",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isVisible
            ? "#d4001a"
            : "transparent";
        }}
      >
        {isVisible && (
          <>
            {categoryDetails && (
              <span>
                เปรียบเทียบสินค้าในหมวดหมู่ (
                {categoryDetails.display_cat_name_th})
                {" "}{count} {count >= 1 ? " ชิ้น" : ""}
              </span>
            )}
            <Icon variant="small" ml="2px">
              compare
            </Icon>
          </>
        )}
      </div>
    </Link>
  ) : null;
};

export default CompareNotification;
