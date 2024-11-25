export default async function getUsername() {
    try {
        const response = await fetch('api/get-username');
        const data = await response.json();
        return data.username;
    } catch (error) {
        console.error('Error', error);
    };
};