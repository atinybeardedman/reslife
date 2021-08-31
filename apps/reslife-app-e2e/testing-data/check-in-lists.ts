

export const expected = new Array(9).fill(null).map((value, index) => ({
    name: `Test Student ${index + 1}`,
    uid: `${index + 1}`
}));
 
export const excused = [
    {
        name: 'Test Student 10',
        uid: '10',
        note: 'Home'
    },
    {
        name: 'Test Student 11',
        uid: '11',
        note: 'College Visit'
    }
]

export function generateCheckInPath(): string {
    return new Date().toISOString().substr(0,10) + '+' + 'Dinner';
}

export function generateCheckInDocument() {
    const id = generateCheckInPath();
    return {
        date: id.substr(0,10),
        'check-in': 'Dinner',
        start: '17:30',
        end: '18:15'
    }
}
