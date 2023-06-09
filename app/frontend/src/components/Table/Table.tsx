import * as React from "react";
import { FolderRegular, EditRegular, OpenRegular, DocumentRegular, PeopleRegular, DocumentPdfRegular, VideoRegular } from "@fluentui/react-icons";
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell, TableCellLayout, PresenceBadgeStatus, Avatar } from "@fluentui/react-components";
import { Stack, TextField } from "@fluentui/react";
import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn, runQueryWorkspace } from "../../api";
import { QueryResultColumn, QueryResultData, QueryResultTable } from "../../api";
import styles from "./Table.module.css";

interface Props {
    queryResultTable: QueryResultTable;
}

export const Default = ({ queryResultTable }: Props) => {
    const columnJson = queryResultTable["columns"];
    const columns = columnJson.map((column: any) => ({ label: column["name"], columnKey: column["name"] }));
    const items = queryResultTable["rows"];

    return (
        <Stack horizontal className={styles.tableContainer}>
            <Table arial-label="Default table">
                <TableHeader>
                    <TableRow>
                        {columns.map(column => (
                            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item: string[], itemIndex) => (
                        <TableRow key={itemIndex}>
                            {item.map((value: string) => (
                                <TableCell>{value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Stack>
    );
};
