import { DefaultAzureCredential } from "@azure/identity";
import { Durations, LogsQueryClient, LogsQueryResultStatus, LogsTable } from "@azure/monitor-query";

export async function runQueryWorkspace(query: string) {
    const azureLogAnalyticsWorkspaceId = "28d56dca-549a-4c8e-9625-9a0a7aea8e1a";
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    const kustoQuery = query || "SigninLogs | limit 1";
    const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
        duration: Durations.twentyFourHours
    });

    if (result.status === LogsQueryResultStatus.Success) {
        const tablesFromResult: LogsTable[] = result.tables;

        if (tablesFromResult.length === 0) {
            console.log(`No results for query '${kustoQuery}'`);
            return;
        }
        console.log(`This query has returned table(s) - `);
        processTables(tablesFromResult);
        return tablesFromResult;
    } else {
        console.log(`Error processing the query '${kustoQuery}' - ${result.partialError}`);
        if (result.partialTables.length > 0) {
            console.log(`This query has also returned partial data in the following table(s) - `);
            processTables(result.partialTables);
        }
    }
}

export async function processTables(tablesFromResult: LogsTable[]) {
    for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors.map(column => `${column.name}(${column.type}) `).join("| ");
        console.log("| " + columnHeaderString);

        for (const row of table.rows) {
            const columnValuesString = row.map(columnValue => `'${columnValue}' `).join("| ");
            console.log("| " + columnValuesString);
        }
    }
}
