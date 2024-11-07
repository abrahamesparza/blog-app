import { uniqueNamesGenerator, adjectives, animals, colors, names } from "unique-names-generator";
const { v4: uuidv4 } = require('uuid');
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
    const uniqueId = uuidv4();
    return uniqueId
}

const generateBlogData = async () => {
    const paragraphAmount = Math.floor((Math.random() * 5) + 1);
    const titleAmount = Math.floor((Math.random() * 10) + 1);

    for (let i = 0; i < 1000; i++) {
        const uniqueId = generateUniqueId();
        const blogTitle = lorem.generateWords(titleAmount);
        const blogContent = lorem.generateParagraphs(paragraphAmount);
        const blogData = {
            id: uniqueId,
            title: blogTitle,
            content: blogContent,
        };
        
        try {
            await dynamoDB.put({
                TableName: 'blog-data',
                Item: blogData,
            }).promise();

            console.log(`Successfully wrote item ${i + 1}: ${blogData}`);
        } catch (error) {
            console.error(`Error writing item ${i + 1}: ${error}`)
        }
    };
};

const generateUserData = () => {
    //modify function to generate 500 users and seed to database
    const prefix = lorem.generateWords(1);
    const suffix = lorem.generateWords(1);
    const loremPassword = lorem.generateWords(1).concat(Math.floor(Math.random() * 900) + 100);
    const data = {
        name: generateUniqueName(),
        username: generateUniqueUsername(),
        email: `${prefix}@${suffix}.com`,
        password: loremPassword
    };
    return data;
};

// todo: identify a way to assign two random blogs to each user




module.exports = {
    // generateUserData,
    generateBlogData,
};