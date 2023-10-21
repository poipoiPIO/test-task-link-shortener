
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            MONGO_URI: string;
            REDIS_CACHE_URI: string;
            JWT_SECRET: string;
            JWT_LIFETIME: string;
        }
    }
}

export { }