import React from "react";
import { Button } from "@component/buttons";
import { notify } from "@component/toast";
import { useRouter } from "next/router";
import { display } from "styled-system";
import { useAppContext } from "@context/AppContext";

const ModalDIY = ({ selectedProducts, onClose }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

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

      // Close the modal after handling the response
      onClose();
    } catch (error) {
      console.error("Error handling share and adding to cart", error);
    }
  };

  return (
    <div
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
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2>Selected Products</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
        <Button onClick={onClose} color="primary" bg="primary.light">
          ปิด
        </Button>
        <Button onClick={onClose} color="primary" bg="primary.light">
          แก้ไขรายการ
        </Button>
        <Button color="primary" bg="primary.light">
          พิมพ์
        </Button>
        <Button
          onClick={handleShareButtonClick}
          color="primary"
          bg="primary.light"
        >
          แชร์สเปคคอม
        </Button>
        <Button
          color="primary"
          bg="primary.light"
          onClick={handleAddToCartButtonClick}
        >
          ยืนยันการสั่งซื้อ
        </Button>
      </div>
    </div>
  );
};

export default ModalDIY;
