const { listInterestsByUser } = require('../assets/data/interests.tsx');

describe('interest tests', () => {

    test('Get interests for user id = 1', () => {
        userOneInterestsList = listInterestsByUser(1)
        expect(userOneInterestsList).toEqual(
            [
                { id: 1, name: "Guitar", color: 'mistyrose', icon: '🎸' },
                { id: 2, name: "Programming", color: 'whitesmoke', icon: '🧑‍💻' },
                { id: 3, name: "Traveling", color: 'azure', icon: '✈️' }
            ]
        );
    });

    test('Get interests for user id = 2', () => {
        userTwoInterestsList = listInterestsByUser(2)
        expect(userTwoInterestsList).toEqual(
            [
                { id: 3, name: "Traveling", color: 'azure', icon: '✈️' },
                { id: 4, name: "Reading", color: 'oldlace', icon: '📚' },
                { id: 5, name: "Cooking", color: 'floralwhite', icon: '🥘' }
            ]
        );
    });

})