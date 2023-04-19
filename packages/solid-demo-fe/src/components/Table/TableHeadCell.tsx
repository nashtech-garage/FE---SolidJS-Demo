import { Typography, TableCell } from "@suid/material"

type TableCellProps = {
  children: any
}

function TableHeadCell(props: TableCellProps) {
  return (
    <TableCell>
      <Typography color="#222" textTransform="uppercase">{props.children}</Typography>
    </TableCell>
  )
}

export default TableHeadCell