export const normalizeUserSearchQuery = (query: string): string => {
    return query.trim().replace(/^@+/, "");
};
