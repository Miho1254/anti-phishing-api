declare const get: (key: string) => Promise<string>;
declare const set: (key: string, value: string, time?: number | null) => Promise<"OK">;
declare const del: (key: string) => Promise<number>;
declare const getAll: (pattern?: string) => Promise<string[]>;
declare const hasHash: (hash: string) => Promise<boolean | Error>;
export { get, set, del, getAll, hasHash };
