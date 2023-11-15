import React, { FC } from "react";
import { TableStyle } from "./styles";
import productView from "@models/productView.model";

type TableProps = {
  product: productView;
};
const Table: FC<TableProps> = ({ product }) => {
  const data = [
    {
      id: 1,
      column1: "Warranty",
      column2: "3 Years",
    },
    {
      id: 2,
      column1: "Graphic Memory Type",
      column2: "GDDR6",
    },
    {
      id: 3,
      column1: "GPU Model",
      column2: "GeForce RTX 4060 Ti",
    },
    {
      id: 4,
      column1: "GPU Series",
      column2: "NVDIA Geforce 40 Series",
    },
    {
      id: 5,
      column1: "Base Clock",
      column2: "2310 MHz",
    },
    {
      id: 6,
      column1: "Boost Clock",
      column2: "2655 MHz",
    },
  ];

  return (
    <TableStyle>
      <table>
        <tbody>
          {product?.name_th}
          {product?.property.map((row) => (
            <tr key={row.filter_sub_id}>
              <td className="column1">{row.name_th}</td>
              {/* <td className="column2">{row.detail}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyle>
  );
};

export default Table;
