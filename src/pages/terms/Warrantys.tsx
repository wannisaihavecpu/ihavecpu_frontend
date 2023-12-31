import { Fragment } from "react";
import { H3, H4, H6 } from "@component/Typography";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TermsandConditionsLayout from "@component/layout/terms-and-conditions";

// ====================================================
// ====================================================

const Warrantys = () => {
  return (
    <Fragment>
      <DashboardPageHeader title="นโยบายการรับประกันสินค้า" iconName="feedback-thumbs-up" />

<Card1>
       <H3>นโยบายการรับประกันสินค้า</H3> 
         <H4>เงื่อนไขการรับประกันสินค้าทั่วไป</H4>
         <H6>เว็บไซต์  iHAVECPU.com พร้อมให้ลูกค้าได้รับประสบการณ์การซื้อสินค้า ที่ได้รับความพึงพอใจสูงสุดจากเรา ด้วยนโยบายการรับประกันสินค้า ดังนี้</H6>
        <ul>
            <li>รับประกันสินค้าจากผู้ผลิต ตามมาตรฐานการใช้งาน (เริ่มต้นที่ 1 วัน) 1 ปี หรือ 3 – 5 ปี ตามประเภทสินค้า นับตั้งแต่วันที่ได้ระบุไว้ในใบเสร็จรับเงิน</li>
            <li>รับประกันสินค้าจากผู้ผลิต ตามรูปแบบการใช้งานปกติ ตามข้อกำหนดการใช้งานของสินค้า ผลิตภัณฑ์ ตามที่ถูกระบุไว้ในคู่มือการใช้งาน หรือ เอกสารแสดงรายการสินค้า ที่อยู่ในบรรจุภัณฑ์ การรับประกันสินค้าจะไม่รวมถึงการเกิดอุบัติเหตุ ตกหล่น หรือหล่นน้ำ และภัยที่เกิดจากธรรมชาติทุกกรณี</li>
            <li>บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลง แก้ไข เงื่อนไขการรับประกัน โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
        </ul>

        <H4>ระยะเวลาการรับประกันการใช้งานตามประเภทสินค้า</H4>
        <ul>
            <li>* สินค้าประเภท แรม, อุปกรณ์เน็ตเวิร์ค บางยี่ห้อ จะให้การรับประกันแบบ Life Time (LT) ซึ่งจะรับประกันสินค้าตลอดระยะเวลาการใช้งาน จนกว่าสินค้าดังกล่าวจะหยุดการผลิตจากโรงงานผู้ผลิต (End of Life :EOL)</li>
            <li>* รายละเอียดการรับประกัน จะแสดงข้อมูลที่รายละเอียดของสินค้าแต่ละรายการ</li>
            <li>** ขอสงวนสิทธิ์การรับประกัน ตามที่ได้มีการระบุจากบริษัทฯ</li>
            <li>*** ขอสงวนสิทธิ์การให้การรับประกัน จากการใช้งานตามเงื่อนไขของการใช้งาน ที่ถูกระบุจากผู้ผลิตสินค้าเท่านั้น</li>
        </ul>

        <H4>ความเสียหายของสินค้าและอุปกรณ์ ที่ไม่อยู่ในเงื่อนไขการรับประกัน</H4>
        <ul>
            <li>อุปกรณ์ชำรุด, แตก, หัก, บุบ, ไหม้, บิ่น, งอ, เบี้ยว, ร้าว, หล่น, ทะลุหรือมีรอยขูดขีดที่แผงวงจร หรือ อุปกรณ์บางส่วนหลุดหายไป เช่น จอ, Body เครื่อง, ปุ่มกดต่างๆ ทางบริษัทฯ จะถือว่า สิ้นสุดการรับประกันในทันที</li>
            <li>ความเสียหายที่เกิดจาก อุบัติเหตุ ภัยธรรมชาติ (ฟ้าผ่า น้ำท่วม ไฟไหม้ แผ่นดินไหว) หรือ จากแมลงและสัตว์ต่างๆ ทางบริษัทฯ จะถือว่า สิ้นสุดการรับประกันในทันที</li>
            <li>ความเสียหายที่สืบเนื่องมาจากการนำอุปกรณ์อื่นๆ มาต่อพ่วง, ซ่อมแซม หรือดัดแปลงอย่างไม่ถูกต้อง หรือการใช้อะไหล่อื่นทดแทน ทางบริษัทฯ จะถือว่า สิ้นสุดการรับประกันในทันที</li>
            <li>ความเสียหายของโปรแกรม หรือข้อมูลใดๆ บนฮาร์ดดิสก์ (ผู้ใช้งานควรสำรองข้อมูล (Back up) ที่สำคัญก่อนส่งซ่อม เพราะอาจเสียหายระหว่างการส่งซ่อม)</li>
            <li>สินค้าที่มีสภาพผิดปกติซึ่งไม่ควรเกิดขึ้นเอง หรือการเก็บรักษาอย่างไม่ถูกต้อง คราบกาว คราบออกไซด์ คราบน้ำ คราบมูลสัตว์ รอยสนิม PCB มีลายวงจรขาด เป็นต้น ถือว่าสิ้นสุดการรับประกันในทันที</li>
            <li>สภาพภายนอกของสินค้า เช่น สี, รอยขีดข่วน, ที่ไม่อยู่ในเงื่อนไขของการรับประกัน</li>
            <li>สินค้าประเภท หมึกเติมเครื่องพิมพ์ ตลับหมึกทุกประเภท หากกล่องบรรจุภัณฑ์มีสภาพไม่สมบูรณ์ มีการแกะ ฉีก แตกต่างจากสภาพเดิมก่อนส่งสินค้า ที่มีสภาพไม่พร้อมต่อการขาย จะไม่สามารถรับคืนสินค้าได้</li>
            <li>สินค้าประเภท HDD, External, มัลติมีเดียการ์ด หรือ สินค้าประเภทที่ไม่มี Sticker รับประกันติดที่ตัวสินค้า ลูกค้าจะต้องนำใบเสร็จมายืนยันกับ ทางบริษัทฯ โดยสินค้าต้องมีสติ๊กเกอร์ และหมายเลขประจำตัวสินค้า (Serial No……) ของทางบริษัทฯและ Supplier รวมทั้ง Serial ต่างประเทศติดอยู่ หากมีรอย ชำรุด, ฉีกขาด, รอยเลือนหรือจางหาย, หลุดหาย, หรือมีการแก้ไขตามที่ระบุ ในสติ๊กเกอร์รับประกันที่ติดบน ตัวสินค้าถือว่าสิ้นสุดการรับประกันในทันที</li>
            <li>สินค้าประเภทจอ LCD LED Monitor, Notebook และ Desktop หากเกิดจุด Dead pixel(ดอท) โดยมี 4 จุด ขึ้นไป จะรับประกันภายใน 7 วันนับตั้งแต่วันที่รับสินค้า หากเกินระยะเวลาดังกล่าว การรับประกันจะเป็นไปตามเงื่อนไขของผู้ผลิตสินค้านั้นๆ ในทันที</li>
            <li>ทางบริษัทฯ ขอปฎิเสธการรับคืนสินค้า ในกรณีที่ลูกค้ามีความไม่พึงพอใจในสินค้า แต่สินค้าได้ถูกแกะกล่องเป็นที่เรียบร้อยแล้วหรือนำไปใช้งานแล้ว</li>
            <li>บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลง แก้ไขหรือเงื่อนไขการรับประกัน โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
        </ul>

      </Card1>
    </Fragment>
  );
};

Warrantys.layout = TermsandConditionsLayout;

export default Warrantys;
