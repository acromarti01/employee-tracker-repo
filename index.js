const inquirer = require("inquirer");

const { promptQuestions } = require("./src/prompts");

const askUserQuestions = () => {
    promptQuestions().then(res => {})
};

askUserQuestions();