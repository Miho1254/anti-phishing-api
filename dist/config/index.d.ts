declare const config: backendConfig;
export default config;
export interface backendConfig {
    redis: {
        host: string;
        port: number;
        password: string;
    };
    github: {
        token: string | null;
        repo: string | null;
    };
    timezone: string;
    authorization: string;
    identity: string;
    port: number;
}
