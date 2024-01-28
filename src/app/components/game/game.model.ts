export interface Game {
    code: string;
    eTag?: string;
    partitionKey?: string;
    players: Player[];
    rounds: Round[];
    rowKey?: string;
    timestamp?: string;
}

export interface Player {
    playerId: number;
    name: string;
    avatarUrl: string;
    nouns: string[];
    verbs: string[];
    score: number
}

export interface Round {
    roundNumber: number;
    template: string;
    solutions: Solutions[];
}

export interface Solutions {
    playerId: number;
    prompt: string;
    ImageUrl: string;
    votes: number;
}
