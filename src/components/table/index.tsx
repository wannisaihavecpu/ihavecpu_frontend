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
          {product.property.map((row) =>
            row.detail.map((detailItem) => (
              <tr key={detailItem.filter_id}>
                <td className="column1">{row.name_th}</td>
                <td className="column2">{detailItem.name_th}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </TableStyle>
  );
};

export default Table;
