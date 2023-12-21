import React, { useRef, useEffect } from "react";
import { TableDIYStyle } from "./styles";
import { H4, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import { notify } from "@component/toast";
import { useRouter } from "next/router";
import { useAppContext } from "@context/AppContext";
import ReactDOMServer from "react-dom/server";
import PriceFormat from "@component/PriceFormat";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import useWindowSize from "@hook/useWindowSize";
import Table from "@component/table";
import Icon from "@component/icon/Icon";
import CategorySectionHeader from "@component/CategorySectionHeader";

const ModalDIY = ({ selectedProducts, onClose }) => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const handleShareButtonClick = async () => {
    try {
      const productData = selectedProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      }));

      // console.log(
      //   JSON.stringify({
      //     product_id: productIds,
      //   })
      // );

      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/diy/create`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: productData,
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
                  <td data-label="ลำดับ" style={{ textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td data-label="รูป">
                    <img
                      src={product.imgUrl}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td data-label="ชื่อ">{product.name}</td>
                  <td data-label="จำนวน" style={{ textAlign: "center" }}>
                    1
                  </td>
                  <td data-label="ส่วนลด" style={{ textAlign: "center" }}>
                    {`${product.price} บาท - ${product.priceBefore} บาท`}
                  </td>

                  <td data-label="ราคา" style={{ textAlign: "center" }}>
                    {product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableDIYStyle>
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

  const width = useWindowSize();

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
          width: "80%",
          maxWidth: "800px",
          maxHeight: "80%",
          overflowY: "auto",
          border: "solid 1px #e2eef1",
        }}
      >
        <FlexBox alignItems="center" mb="0.5rem" mt="2rem">
          <Icon defaultcolor="auto" mr="0.6rem">
            list
          </Icon>

          <H4 fontWeight="bold" lineHeight="1" fontSize="20px">
            รายการ
          </H4>
        </FlexBox>
        {/* <FlexBox>
          <Icon>list</Icon>
          <h2 style={{ textAlign: "left", color: "#183b56" }}>รายการ</h2>
        </FlexBox> */}
        {/* <TableDIYStyle>
          {selectedProducts.map((product, index) => (
            <div key={index} className="loader">
              <div className="song">
                <p className="name">{product.name}</p>
                <p className="artist">{product.artist} x1</p>
              </div>
              <div className="albumcover">
                <img src={product.imgUrl} />
              </div>
              <div className="play">1</div>
            </div>
          ))}
        </TableDIYStyle> */}
        <TableDIYStyle>
          <table className="custom-scrollbar">
            <thead>
              <tr>
                <th colSpan={2}>รูป</th>
                <th colSpan={5}>สินค้า</th>
                <th colSpan={3}>จำนวน</th>
                <th colSpan={3}>ส่วนลด</th>
                <th colSpan={4}>ราคา</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td colSpan={2} data-label="รูป">
                    <img src={product.imgUrl} alt={product.name} />
                  </td>
                  <td colSpan={5} data-label="สินค้า">
                    {product.name}
                  </td>
                  <td colSpan={3} data-label="จำนวน">
                    {product.quantity}
                  </td>
                  <td colSpan={3} data-label="ส่วนลด">
                    {product.discount ? (
                      <SemiSpan
                        color="#d4001a"
                        ml="0.5rem"
                        style={{ textAlign: "center" }}
                      >
                        <PriceFormat
                          price={
                            parseInt(product?.priceBefore) -
                            parseInt(product?.price)
                          }
                        />
                      </SemiSpan>
                    ) : null}
                  </td>
                  <td colSpan={4} data-label="ราคา">
                    <FlexBox display="block" alignContent="center">
                      <PriceFormat price={parseInt(product?.price)} />{" "}
                    </FlexBox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableDIYStyle>
        <FlexBox justifyContent="space-between" mt="2rem">
          <Button
            onClick={onClose}
            color="secondary"
            bg="secondary.light"
            style={{ width: "20%" }}
          >
            แก้ไขรายการ
          </Button>
          <Button
            color="secondary"
            bg="secondary.light"
            onClick={handlePrintButtonClick}
            style={{ width: "20%" }}
          >
            พิมพ์
          </Button>
          <Button
            onClick={handleShareButtonClick}
            color="primary"
            bg="primary.light"
            style={{ width: "20%" }}
          >
            แชร์สเปคคอม
          </Button>
          <Button
            color="primary"
            bg="primary.light"
            onClick={handleAddToCartButtonClick}
            style={{ width: "25%" }}
          >
            ยืนยันการสั่งซื้อ
          </Button>
        </FlexBox>
        {/* <FlexBox justifyContent="space-between" mt="1rem">
          <Button
            onClick={handleShareButtonClick}
            color="primary"
            bg="primary.light"
            style={{ width: "48%" }}
          >
            แชร์สเปคคอม
          </Button>
          <Button
            color="primary"
            bg="primary.light"
            onClick={handleAddToCartButtonClick}
            style={{ width: "48%" }}
          >
            ยืนยันการสั่งซื้อ
          </Button>
        </FlexBox> */}
      </Box>
    </Box>
  );
};

export default ModalDIY;
