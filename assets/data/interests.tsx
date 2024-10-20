export interface Interest {
    id: number;
    name: string;
    color: string;
    icon: string;
}

export const interests: Interest[] = [
    { id: 1, name: "Guitar", color: 'mistyrose', icon: '🎸' },
    { id: 2, name: "Programming", color: 'whitesmoke', icon: '🧑‍💻' },
    { id: 3, name: "Traveling", color: 'azure', icon: '✈️' },
    { id: 4, name: "Reading", color: 'oldlace', icon: '📚' },
    { id: 5, name: "Cooking", color: 'floralwhite', icon: '🥘' }
];