export const generateProfileImageUrl = (userId) => {
    if (!userId) {
      return;
    }
    return `https://users-pfp.s3.amazonaws.com/profiles/${userId}/profile.jpg?timestamp=${Date.now()}`;
};