import { TableRow, TableCell } from "@carbon/react";
export default function generateEmptyRows(rowsLeft) {
  const rows = [];
  for (let i = 0; i < rowsLeft; i++) {
    rows.push(
      <>
        <TableRow>
          <TableCell className="cell-height"></TableCell>
          <TableCell className="cell-height"></TableCell>
          <TableCell className="cell-height"></TableCell>
          <TableCell className="cell-height"></TableCell>

        </TableRow>
      </>
    );
  }

  return rows;
}
