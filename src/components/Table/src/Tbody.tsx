import React from "react";
import { TableBody } from "@mui/material";

import { isEmpty } from "../../../utils";
import Empty from "./Empty";
import TbodyRow from "./TbodyRow";
import TbodyCell from "./TbodyCell";
import { FbmTbodyProps, FbmTdColumnProps } from "../types";

const Tbody: React.FC<FbmTbodyProps> = ({
  data,
  columns,
  loading,
  emptyText,
  emptyUrl,
  onRowClick,
}) => {
  const EmptyRender: React.FC = () => {
    if (!data || (data && data.length === 0 && !loading)) {
      return <Empty colSpan={columns.length} desc={emptyText} src={emptyUrl} />;
    }
    return null;
  };

  const ColumnsRender: React.FC<{
    row: FbmTdColumnProps["row"];
  }> = ({ row }) => {
    const commonProps = {
      checked: false,
    };

    const columnsRender = columns.map((columnItem) => {
      if (columnItem.type === "checkbox") {
        const { checked } = columnItem;
        Object.assign(commonProps, {
          checked: (() => {
            const props = {
              row,
              cell: row[columnItem.id],
            };
            if (checked && typeof checked === "function") return checked(props);
          })(),
        });
      }

      return (
        <TbodyCell
          key={columnItem.id}
          row={row}
          {...columnItem}
          {...commonProps}
        />
      );
    });

    return <>{columnsRender}</>;
  };

  const RowsRender: React.FC = () => {
    if (isEmpty(data)) return null;
    const rows = data.map((row, index) => (
      <TbodyRow
        key={index}
        index={index}
        onClick={onRowClick ? (event) => onRowClick(row, event) : undefined}
      >
        <ColumnsRender row={row} />
      </TbodyRow>
    ));

    return <>{rows}</>;
  };

  return (
    <TableBody>
      <RowsRender />
      <EmptyRender />
    </TableBody>
  );
};

export default Tbody;
