export type AskROOM = {
    id: number;
    question: string;
    upvotes: number;
    answered: boolean;
}
export type Room = {
    id:string;
    speaker: {
        socket: WebSocket,
        id: string
    };
    attendees: {
        socket: WebSocket,
        id: string
    }[];
    asks: AskROOM[];
}
export type ROOMS = Record<string, Room>;