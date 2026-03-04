/**
 * Generates a fake MongoDB ObjectId-like string.
 * Demonstrates functional approach to generating unique IDs.
 */
export function generateMongoId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const random = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
    return timestamp + random;
}