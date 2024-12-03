import { uniqueNamesGenerator, adjectives, animals, colors, names } from "unique-names-generator";
import { v4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";
import bcrypt from 'bcryptjs';

import dynamoDB from '../api/lib/dynamodb.js';

const generateUniqueName = () => {
    const config = {
        dictionaries: [names]
    }
    const firstName = uniqueNamesGenerator(config);
    const lastName = uniqueNamesGenerator(config);
    return `${firstName} ${lastName}`;
};

const generateUniqueUsername = () => {
    const usernameConfig = {
        dictionaries: [adjectives, colors, animals],
        separator: '-',
    }
    const username = uniqueNamesGenerator(usernameConfig);
    return username;
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 6,
        min: 3
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const generateUniqueId = () => {
    const uniqueId = v4();
    return uniqueId
};

const generateRandomDate = (start, end) => {
    const randomTimestamp = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomTimestamp;
}

const generateBlogData = () => {
    const paragraphAmount = Math.floor((Math.random() * 5) + 1);
    const titleAmount = Math.floor((Math.random() * 10) + 1);
    const blogCount = Math.floor(Math.random() * 9 + 1);
    const userBlogs = [];
    const startDate = new Date('2024-01-01T00:00:00');
    const endDate = new Date();

    for (let i = 0; i < Math.max(blogCount, 1); i++) {
        const blogTitle = lorem.generateWords(titleAmount);
        const blogContent = lorem.generateParagraphs(paragraphAmount);
        const timestamp = generateRandomDate(startDate, endDate);

        const blogData = {
            id: i + 1,
            title: blogTitle,
            content: blogContent,
            timestamp: timestamp
        };
        userBlogs.push(blogData);
    };
    return userBlogs;
};

const generateUserData = async () => {
    let maxUsers = 100;
    let userData = [];

    while (maxUsers > 0) {
        const prefix = lorem.generateWords(1);
        const suffix = lorem.generateWords(1);
        const loremPassword = lorem.generateWords(1).concat(Math.floor(Math.random() * 900) + 100);
        const hashedPassword = await bcrypt.hash(loremPassword, 10);

        const data = {
            id: generateUniqueId(),
            name: generateUniqueName(),
            username: generateUniqueUsername(),
            email: `${prefix}@${suffix}.com`,
            password: hashedPassword,
        };
        data['blogs'] = generateBlogData();
        userData.push(data);
        
        if (userData.length === 25) {
            batchWriteUserData(userData);
            userData = [];
        }; 
        maxUsers--;
    };
};

const batchWriteUserData = (data) => {
    const input = {
        RequestItems: {
            "users": data.map((item) => ({
                PutRequest: {
                    Item: {
                        id: item.id,
                        firstName: item.name.split(' ')[0],
                        lastName: item.name.split(' ')[1],
                        username: item.username,
                        email: item.email,
                        password: item.password,
                        blogs: item.blogs.map((blog) => ({
                            id: blog.id.toString(),
                            title: blog.title,
                            content: blog.content,
                            timestamp: blog.timestamp,
                        })),
                    },
                },
            })),
        },
    };
    dynamoDB.batchWrite(input, (err, data) => {
        if (err) console.error('Error:', err);
        else return 'Sucess';
    });
}

// "type": "module" required in package.json to generateUserData
// generateUserData(); // generates user data