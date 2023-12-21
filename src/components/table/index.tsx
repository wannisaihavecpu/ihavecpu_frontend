import React, { FC } from "react";
import { TableStyle } from "./styles";
import productView from "@models/productView.model";

type TableProps = {
  product: productView;
};
const Table: FC<TableProps> = ({ product }) => {
  return (
    <TableStyle>
      <table>
        <tbody>
          {product.property.map((row) => (
            <tr key={row.name_th}>
              <td className="column1">{row.name_th}</td>
              <td className="column2">
                {row.detail.map((detailItem, index) => (
                  <React.Fragment key={detailItem.filter_id}>
                    {index > 0 && ", "}
                    {detailItem.name_th}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyle>
  );
};

export default Table;
