export interface Game {
    code: string;
    eTag?: string;
    partitionKey?: string;
    players: Player[];
    round?: Round;
    rowKey?: string;
    timestamp?: string;
}

export interface Player {
    id: string;
    name: string;
    avatarUrl: string;
    nouns: string[];
    verbs: string[];
    locations: string[];
    foods: string[];
    adjectives: string[];
    score: number
}

export interface Round {
    roundNumber: number;
    template: string;
    solutions: Solutions[];
}

export interface Solutions {
    playerId: string;
    prompt: string;
    imageUrl: string;
    votes: number;
}
