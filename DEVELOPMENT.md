# Developer Steps

1. **User Authentication and Role Assignment**:
    - Implement a form to store user data. ✅
    - Implement user authentication functionality ✅
        - Authentication ✅
        - Session management ✅
        - Cookies ✅
            - Creation ✅
            - Deletion ✅
            - Validation ✅
        - Authorization ✅
            - Handle auth to app pages/routes ✅
    - Develop the storage and retrieval of basic user information (username, full name, location). ✅
2. **Handle Page Routing**
    - Implement routing for the following components: ✅
        - Sign up (’/signup’) ✅
        - Log in (’/login’) ✅
        - Home (’/’) ✅
        - Landing (’/landing’) ✅
3. **Write scripts to generate blog and user data to seed database** 
    - Seed database with 100 users ✅
    - Assign random amount of blogs to each user ✅
4. **Build API to retrieve blog data** 
    - Write an API to get blog data in batches ✅
        - API: /get-blog-data ✅
    - Write front end to display user blogs (/landing) page ✅
        - Implement pagination to show ten blogs at a time ✅
    - Write component to display users profile
        - Profile should display:
            - Username, followers, following, about ✅
            - A list of blogs ✅
                - Each blog item should show the title, timestamp, and a brief peek of the content (20-25 words?) in a card component ✅
        - Update the blogs field in the users table so that each blog contains a unique timestamp (random date and time in 2024, January 1 - present) ✅
            - Display timestamp as described above ✅
        - Bonus: include avatars/images for each user
    - Write logic so that profile/[slug]:
        - Shows error if the username slug does not exist ✅
            - if /profile/joe does not exist, then it should show an error on a blank page with Navigation stating `User doesn't exist` or similar ✅
        - Shows profile **without** the Edit icon if the logged in user does not match the slug username ✅
    - Write component to display blog content (blogs/[blog])
        - When a user clicks on a blog item, it should open up page that displays that blog:
            - Title ✅
            - username ✅
            - timestamp
            - content ✅
        - Bonus: show a carousel at the bottom of the blog content that displays other blogs by this user
5. **Additional APIs**
    - Implement the following APIs:
        - Post blog data
            - Fields to keep track of:
                - Author (username)
                - Title
                - Content
                - Timestamp
        - Edit blog data
            - Fields capable of modification:
                - Title
                - Content
                - Adds a new data field:
                    - Modified at timestamp
        - Delete blog data
            - Should allow a user to delete their own blog article by id
6. **Additional Features**
    - Follow feature
        - Allows users to follow and unfollow other users
        - Should update the following/followers count in the user’s record in the database
        - Should update on the ui instantly
7. **...**
