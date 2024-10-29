export interface Interest {
    id: number;
    name: string;
    color: string;
    icon: string;
}
export interface UserInterests {
    id: number;
    interestList: number[];
}

export const interests: Interest[] = [
    { id: 1, name: "Guitar", color: 'mistyrose', icon: '🎸' },
    { id: 2, name: "Programming", color: 'whitesmoke', icon: '🧑‍💻' },
    { id: 3, name: "Traveling", color: 'azure', icon: '✈️' },
    { id: 4, name: "Reading", color: 'oldlace', icon: '📚' },
    { id: 5, name: "Cooking", color: 'floralwhite', icon: '🥘' }
];

export const userInterests: UserInterests[] = [
    { id: 1, interestList: [1, 2, 3] },
    { id: 2, interestList: [3, 4, 5] }
]

function listInterestsByUser(userId: number) {
    let list = userInterests[userId - 1].interestList
    return list.map((item: number) => (interests[item - 1]))
}

module.exports = { listInterestsByUser };