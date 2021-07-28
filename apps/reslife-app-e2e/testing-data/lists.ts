

export const expected = new Array(15).map((value, index) => ({
    name: `Test Student ${index + 1}`,
    uid: `${index + 1}`
}));

export const excused = [
    {
        name: 'Test Student 16',
        uid: '16',
        note: 'Home'
    },
    {
        name: 'Test Student 17',
        uid: '17',
        note: 'College Visit'
    }
]