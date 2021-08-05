export const generateSignout = () => ({
    student: {
        uid: '1234',
        name: 'Test Boarder'
    },
    // generate a time of 5 minutes ago
    timeOut: new Date(new Date().getTime() - (5  * 60 *1000)).toISOString(),
    destination: 'Starbucks',
    transportation: 'Walk',
    isCurrentlyOut: true,
    uid: 'abc'
});