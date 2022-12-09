export declare class AppService {
    getHello(): string;
    getAllLinksAndDomain(): Promise<string[]>;
    getAllLinks(): Promise<string[]>;
    getAllDomains(): Promise<string[]>;
    addDomain(url: string): Promise<addRemoveLinkResponse>;
    addLink(url: string): Promise<addRemoveLinkResponse>;
    check(url: string): Promise<CheckResult>;
    rapidreport(url: string, message?: string): Promise<string>;
}
export interface CheckResult {
    blacklist: boolean;
    domain: string;
    type?: string;
}
export interface addRemoveLinkResponse {
    message: string;
    url: string;
}
