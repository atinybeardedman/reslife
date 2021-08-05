

export const expected = new Array(15).fill(null).map((value, index) => ({
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
