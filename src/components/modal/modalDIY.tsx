import React, { useRef, useEffect } from "react";
import { TableDIYStyle } from "./styles";

import { Button } from "@component/buttons";
import { notify } from "@component/toast";
import { useRouter } from "next/router";
import { display } from "styled-system";
import { useAppContext } from "@context/AppContext";
import ReactDOMServer from "react-dom/server";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import { IconButton } from "@component/buttons";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import { H3, H5, H6, Paragraph } from "@component/Typography";
import Table from "@component/table";

const ModalDIY = ({ selectedProducts, onClose }) => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const handleShareButtonClick = async () => {
    try {
      const productIds = selectedProducts.map((product) => product.id);

      console.log(
        JSON.stringify({
          product_id: productIds,
        })
      );

      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/diy/create`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productIds,
        }),
      });

      const responseData = await response.json();

      if (responseData.res_code === "00" && responseData.res_result?.diyID) {
        const diyID = responseData.res_result.diyID;
        notify("success", "สร้างชุดสเปคคอมแล้ว !");

        setTimeout(() => {
          router.push(`/diy/share/${diyID}`);
        }, 1000);
      } else {
        notify("error", "สร้างชุดสเปคไม่สำเร็จ กรุณาลองใหม่");

        console.error("Error sharing DIY");
      }

      onClose();
    } catch (error) {
      console.error("Error sharing DIY", error);
    }
  };
  const handleAddToCartButtonClick = async () => {
    try {
      // Dispatch CHANGE_CART_AMOUNT for each selected product
      selectedProducts.forEach((product) => {
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            optionId: null,
            price: parseInt(product.price),
            qty: 1,
            name: product.name,
            imgUrl: product.imgUrl || "",
            id: product.id,
          },
        });
      });

      setTimeout(() => {
        router.push(`/cart`);
      }, 1000);

      onClose();
    } catch (error) {
      console.error("Error handling share and adding to cart", error);
    }
  };
  const iframeRef = useRef(null);

  useEffect(() => {
    iframeRef.current = document.createElement("iframe");
    iframeRef.current.style.display = "none";
    document.body.appendChild(iframeRef.current);
  }, []);

  const handlePrint = () => {
    if (!iframeRef.current) {
      console.error("iframeRef is not available.");
      return;
    }

    const printContent = (
      <div>
        <h2>Selected Products</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    const printHTML = ReactDOMServer.renderToStaticMarkup(printContent);

    const iframeDocument =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    iframeDocument.write(printHTML);
    iframeDocument.close();
    iframeRef.current.contentWindow.print();
  };

  const handlePrintButtonClick = () => {
    handlePrint();
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Box
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#d4001a" }}>
          รายการสั่งซื้อ
        </h2>
        <TableDIYStyle>
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รูป</th>
                <th>ชื่อ</th>
                <th>จำนวน</th>
                <th>ส่วนลด</th>
                <th>ราคา</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Avatar src={product.imgUrl} alt={product.name} />
                  </td>
                  <td>{product.name}</td>
                  <td>1</td>
                  <td>{product.discount}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableDIYStyle>
        {/* <Button
            onClick={onClose}
            color="primary"
            bg="primary.light"
            style={{ width: "100px" }} // Adjust the width as needed
          >
            ปิด
          </Button> */}
        <FlexBox justifyContent="space-between" mt="1rem">
          <Button
            onClick={onClose}
            color="primary"
            bg="primary.light"
            style={{ width: "100%", marginRight: "8px" }}
          >
            แก้ไขรายการ
          </Button>
          <Button
            color="primary"
            bg="primary.light"
            onClick={handlePrintButtonClick}
            style={{ width: "100%", marginRight: "8px" }}
          >
            พิมพ์
          </Button>
          <Button
            onClick={handleShareButtonClick}
            color="primary"
            bg="primary.light"
            style={{ width: "100%", marginRight: "8px" }}
          >
            แชร์สเปคคอม
          </Button>
          <Button
            color="primary"
            bg="primary.light"
            onClick={handleAddToCartButtonClick}
            style={{ width: "100%" }}
          >
            ยืนยันการสั่งซื้อ
          </Button>
        </FlexBox>
      </Box>
    </Box>
  );
};

export default ModalDIY;
