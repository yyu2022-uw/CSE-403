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

})