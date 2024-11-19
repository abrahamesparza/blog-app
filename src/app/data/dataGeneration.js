import { uniqueNamesGenerator, adjectives, animals, colors, names } from "unique-names-generator";

import { v4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

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
}

const generateBlogData = () => {
    const paragraphAmount = Math.floor((Math.random() * 5) + 1);
    const titleAmount = Math.floor((Math.random() * 10) + 1);
    const blogCount = Math.floor(Math.random() * 9 + 1);
    const userBlogs = [];

    for (let i = 0; i < Math.max(blogCount, 1); i++) {
        const blogTitle = lorem.generateWords(titleAmount);
        const blogContent = lorem.generateParagraphs(paragraphAmount);
        const blogData = {
            id: i + 1,
            title: blogTitle,
            content: blogContent,
        };
        userBlogs.push(blogData);
    };
    return userBlogs;
};

const generateUserData = () => {
    let maxUsers = 100;
    let count = 0;
    let userData = []

    while (maxUsers > 0) {
        const prefix = lorem.generateWords(1);
        const suffix = lorem.generateWords(1);
        const loremPassword = lorem.generateWords(1).concat(Math.floor(Math.random() * 900) + 100);
        
        const data = {
            id: generateUniqueId(),
            name: generateUniqueName(),
            username: generateUniqueUsername(),
            email: `${prefix}@${suffix}.com`,
            password: loremPassword
        };
        data['blogs'] = generateBlogData();

        if (count < 25) {
            userData.push(data);
        }
        else if (count === 25) {
            batchWriteUserData(userData);
        }
        count++;
        maxUsers--;
    }
};

const batchWriteUserData = (data) => {
    const input = {
        RequestItems: {
            "users": data.map((item) => ({
                PutRequest: {
                    Item: {
                        id: { S: item.id },
                        name: { S: item.name },
                        username: { S: item.username },
                        email: { S: item.email },
                        password: { S: item.password },
                        blogs: {
                            L: item.blogs.map((blog) => ({
                                M: {
                                    id: { S: blog.id.toString() },
                                    title: { S: blog.title },
                                    content: { S: blog.content },
                                },
                            })),
                        },
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

let data = generateUserData();
console.log(`data: ${JSON.stringify(data)}`);

//comment out when running script in terminal
// module.exports = {
//     generateUserData,
// };