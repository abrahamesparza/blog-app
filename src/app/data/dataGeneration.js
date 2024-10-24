// generate unique data below and tie them together to store into the database
import { uniqueNamesGenerator, names } from "unique-names-generator";
import { LoremIpsum } from "lorem-ipsum";

const generateUniqueName = () => {
    const config = {
        dictionaries: [names]
    }
    const name = uniqueNamesGenerator(config);
    return name;
};

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

const generateBlogData = () => {
    const paragraphAmount = Math.floor((Math.random() * 5) + 1);
    const blogData = lorem.generateParagraphs(paragraphAmount);
    return blogData;
};

const generateUserData = () => {
    const prefix = lorem.generateWords(1);
    const suffix = lorem.generateWords(1);
    const loremPassword = lorem.generateWords(1).concat(Math.floor(Math.random() * 900) + 100);
    const data = {
        user: generateUniqueName(),
        email: `${prefix}@${suffix}.com`,
        password: loremPassword
    }
    return data;
};

// todo: write below scripts and connect them through a unique id
// on the server (will research best approach) so each user has 2 random blogs

// write function to generate 1000 blogs for seeding database

//write function to generate 500 users and seed to database


module.exports = {
    generateUserData,
};