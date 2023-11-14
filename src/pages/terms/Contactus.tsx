import { Fragment } from "react";
import { H3, H4, H6 } from "@component/Typography";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TermsandConditionsLayout from "@component/layout/terms-and-conditions";

// ====================================================
// ====================================================

const Contactus = () => {
  return (
    <Fragment>
      <DashboardPageHeader title="ติดต่อ iHAVECPU" iconName="customer-service" />

<Card1>
       <H3>ติดต่อ iHAVECPU</H3> 
         {/* <H4>ลูกค้าสามารถติดต่อ iHAVECPU ได้ในวันและเวลาทำการ ตั้งแต่เวลา 10.00 น. -17.00 น. (เว้นวันเสาร์)</H4> */}
         {/* <p></p> */}
         <H4>บริษัท ไอ แฮฟ ซีพียู จำกัด (สำนักงานใหญ่)</H4>
        <ul>
            <li> <H6>เลขที่ 252 ตำบล หนองแสง อำเภอปากพลี นครนายก 26130</H6></li>
            <li><H6>โทรศัพท์ : 02 105 4757</H6></li>
            <li><H6>อีเมล : info@ihavecpu.com</H6></li>
            <li><H6>ไลน์ ไอดี : @ihavecpu</H6></li>
        </ul>
         <p></p>
         <H4>ช่องทางโซเชี่ยล</H4>
        <ul>
            
            <li><H6>Facebook : CPUCore2Duo</H6></li>
            <li><H6>Instagrame : ihavecpu_official</H6></li>
            <li><H6>Youtube : @iHAVECPU_</H6></li>
            <li><H6>Tictok : @iHAVECPU</H6></li>
        </ul>
        


      </Card1>
    </Fragment>
  );
};

Contactus.layout = TermsandConditionsLayout;

export default Contactus;
