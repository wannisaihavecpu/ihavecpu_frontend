import { Fragment } from "react";
import { H3 } from "@component/Typography";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import CustomerDashboardLayout from "@component/layout/customer-dashboard";

// ====================================================
// ====================================================

const Privacy = () => {
  return (
    <Fragment>
      <DashboardPageHeader title="เกี่ยวกับเรา" iconName="bag_filled" />

<Card1>
       <H3>นโยบายความเป็นส่วนตัว</H3> 
         <p>เมื่อคุณเข้าชมเว็บไซต์ของเรา เว็บไซต์ของเราจะจัดเก็บหรือดึงข้อมูลจากเบราว์เซอร์ของคุณซึ่งส่วนใหญ่อยู่ในรูปแบบของ cookie ข้อมูลเหล่านี้อาจเกี่ยวกับคุณ การตั้งค่าของคุณ อุปกรณ์ของคุณ หรือเพื่อช่วยให้เว็บไซต์ทำงานอย่างที่คุณต้องการ ซึ่งเป็นข้อมูลที่ไม่สามารถระบุตัวตนของคุณได้โดยตรง แต่ช่วยให้คุณใช้งานเว็บตามความต้องการส่วนบุคคลได้มากยิ่งขึ้น โดยที่เราเคารพสิทธิความเป็นส่วนตัวของคุณ คุณสามารถปิดการทำงานของ cookie บางประเภทได้ โปรดคลิกที่หัวข้อประเภทต่างๆ เพื่อดูข้อมูลเพิ่มเติมและเปลี่ยนการตั้งค่าเริ่มต้นในการใช้งาน cookie อย่างไรก็ตาม คุณควรทราบว่าการปิดการทำงานของ cookie บางประเภทอาจส่งผลต่อการใช้งานเว็บไซต์และบริการของเรา</p>
      
      </Card1>
    </Fragment>
  );
};

Privacy.layout = CustomerDashboardLayout;

export default Privacy;
