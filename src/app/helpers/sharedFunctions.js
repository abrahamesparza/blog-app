export const generateProfileImageUrl = (userId) => {
    if (!userId) {
      return;
    }
    return `https://d2ttp8nkg66jp0.cloudfront.net/profiles/${userId}/profile.jpg?timestamp=${Date.now()}`;
};