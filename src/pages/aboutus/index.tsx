import { Fragment } from "react";
import { H3, H5 } from "@component/Typography";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import CustomerDashboardLayout from "@component/layout/customer-dashboard";

// ====================================================
// ====================================================

const Aboutus = () => {
  return (
    <Fragment>
      <DashboardPageHeader title="เกี่ยวกับเรา" iconName="bag_filled" />

<Card1>
       <H3>เกี่ยวกับ iHAVECPU</H3> 
         <p>iHAVECPU ร้านขายและจำหน่ายอุปกรณ์คอมพิวเตอร์แบบครบวงจร รับประกันทุกชิ้น รับจัดสเปกคอมพิวเตอร์ตามสั่ง ตามความต้องการใช้งานของลูกค้า รับประกันสินค้าทุกชิ้น iHAVECPU มีสินค้าจำหน่ายเช่น ซีพียู แรม การ์ดจอ เมนบอร์ด ฮาร์ดดิสก์ พาวเวอร์ซัพพลาย เคส เมาส์ คีย์บอร์ด จอคอมพิวเตอร์ และอุปกรณ์ เกมมื่งเกียร์ </p>
         <p>ถ้าคุณชอบคอมพิวเตอร์ ราคาประหยัดต้อง iHAVECPU เท่านั้น ในการซื้อคอมพิวเตอร์นั้น ผู้ซื้อควรจะต้องศึกษาและหาข้อมูลเกี่ยวกับสินค้าให้พอมีความรู้อยู่บ้างในเบื้องต้นก็ยังดี และก่อนที่จะตัดสินใจซื้อเครื่องคอมพิวเตอร์กับร้านไหนควรหาข้อมูลร้านค้าดีๆเสียก่อน เลือกร้านที่ไว้ใจได้ และหากจะให้ดีควรเลือกร้านที่มีการบริการหลังการขายที่ดี อาจจะเลือกดูข้อมูลจากรีวิวต่างๆ หรือตามเว็บไซต์อื่น ๆ ประกอบการตัดสินใจด้วย หากพูดถึงคอมพิวเตอร์แล้ว คนที่ไม่มีข้อมูลสินค้า ไม่มีข้อมูลร้านเลย ไม่มีความรู้ใด ๆ เลย การเลือกซื้อสินค้าคงเป็นไปได้ยาก หากไม่มีร้านที่ไว้ใจได้คอยให้การดูแล หากมีปัญหาเหล่านี้ มาปรึกษาเราได้ที่ iHAVECPU ได้เลย ยินดีให้คำปรึกษา รับประกันบริษัทเราเปิดขายมามากกว่า 9 ปี !!</p>
         <p>สำหรับใครที่กำลังมองหาอุปกรณ์คอมพิวเตอร์แบบมือหนึ่งใหม่แกะกล่อง แวะเข้ามาชมหรือปรึกษากับทางร้านก่อนได้ ไม่ซื้อหาไม่ว่ากัน เข้ามาพูดคุยกันก่อน ทางร้านยินดีให้คำปรึกษาอย่างเต็มที่ ทั้งนี้ทางร้านยังมีบริการจัดสเปคคอมอีกด้วยเอาใจสาวกคอมประกอบ อยากได้อุปกรณ์ชิ้นไหน อัพเกรดส่วนไหน ปรึกษาเราได้ ไม่ว่าคุณจะจัดสเปคมาให้ทางร้านหาอุปกรณ์ประกอบเครื่องให้ หรือจะมาให้ทางร้านจัดสเปคให้ก็ได้ ทุกอย่างจะอยู่ภายใต้งบประมาณที่ลูกค้ากำหนด ไม่มีบังคับซื้อเพิ่มอย่างแน่นอน ทางร้านบริการด้วยความจริงใจ</p>
       <H5>ถ้าคุณชอบคอมพิวเตอร์ เราคือเพื่อนกัน</H5> 
      </Card1>
    </Fragment>
  );
};

Aboutus.layout = CustomerDashboardLayout;

export default Aboutus;
