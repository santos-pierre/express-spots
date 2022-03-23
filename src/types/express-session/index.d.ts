declare namespace Request {
    export interface Session {
        user: {
            email: string;
            user_id: string;
        };
    }
}
