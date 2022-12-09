import { AppService } from './app.service';
import type { addRemoveLinkResponse } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getAll(): Promise<string[]>;
    getAllLinks(): Promise<string[]>;
    getAllDomains(): Promise<string[]>;
    addDomain(header: {
        authorization: string;
    }, body: {
        url: string;
    }): Promise<addRemoveLinkResponse>;
    addLink(header: {
        authorization: string;
    }, body: {
        url: string;
    }): Promise<addRemoveLinkResponse>;
    check(query: {
        url: string;
    }): Promise<import("./app.service").CheckResult>;
    rapidreport(query: {
        url: string;
        message: string | null;
    }): Promise<string>;
}
