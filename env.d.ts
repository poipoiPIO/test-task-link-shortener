
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            SERVICE_BASE_URL: string;
            MONGO_URI: string;
            REDIS_CACHE_URI: string;
            JWT_SECRET: string;
            JWT_LIFETIME: string;
        }
    }
}

export { }