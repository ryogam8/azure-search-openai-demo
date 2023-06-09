export const enum Approaches {
    RetrieveThenRead = "rtr",
    ReadRetrieveRead = "rrr",
    ReadDecomposeAsk = "rda"
}

export type AskRequestOverrides = {
    semanticRanker?: boolean;
    semanticCaptions?: boolean;
    excludeCategory?: string;
    top?: number;
    temperature?: number;
    promptTemplate?: string;
    promptTemplatePrefix?: string;
    promptTemplateSuffix?: string;
    suggestFollowupQuestions?: boolean;
};

export type AskRequest = {
    question: string;
    approach: Approaches;
    overrides?: AskRequestOverrides;
};

export type AskResponse = {
    answer: string;
    thoughts: string | null;
    data_points: string[];
    error?: string;
};

export type ChatTurn = {
    user: string;
    bot?: string;
};

export type ChatRequest = {
    history: ChatTurn[];
    approach: Approaches;
    overrides?: AskRequestOverrides;
};

export type QueryResultColumn = {
    name: string;
    type: string;
};

export type QueryResultTable = {
    name: string;
    columns: QueryResultColumn[];
    rows: string[][];
};

export type QueryResultData = {
    tables: QueryResultTable[];
};

export type QueryError = {
    error: {
        message: string;
        code: string;
        correlationId: string;
        innererror: {
            code: string;
            message: string;
            innererror: {
                code: string;
                message: string;
            };
        };
    };
};
