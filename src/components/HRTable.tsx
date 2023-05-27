import { boxShadow } from "@/styles/boxShadow";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type HRTableRowType = {
  row: ReactNode[];
};

export type HRTableType = {
  headers: string[];
  rows: ReactNode[][];
};

export const HRTable = (props: HRTableType) => {
  const { headers, rows } = props;
  return (
    <TableContainer>
      <Table
        variant="unstyled"
        sx={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
        px={4}
      >
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr
              key={i}
              bg="background.primary"
              boxShadow={boxShadow}
              border={0}
            >
              {row.map((el, j) => (
                <Td key={j}>{el}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
