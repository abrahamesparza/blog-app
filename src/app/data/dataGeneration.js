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
    const data = {
        user: generateUniqueName(),
        blogData: generateBlogData(),
    }
    return data;
};

module.exports = {
    generateUserData,
};