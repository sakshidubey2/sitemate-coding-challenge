const readline = require('readline');
const axios = require('axios');

const SERVER_URL = 'http://localhost:3000'; // Replace with your server's URL

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const displayMenu = () => {
  console.log('\nMenu:');
  console.log('1. Fetch all issues');
  console.log('2. Create a new issue');
  console.log('3. Update an issue');
  console.log('4. Delete an issue');
  console.log('5. Exit');
};

const getAllIssues = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/issues`);
    console.log('All Issues:', response.data);
  } catch (error) {
    console.error('Error fetching issues:', error);
  }
  displayMenu()
};

const createIssue = async () => {
  rl.question('Enter title and description (hyphen seperated): ', async (issue) => {
    const [title, description] = issue.split('-');
    try {
      const inputPayload = {
        "title": title,
        "description": description
      };
      const response = await axios.post(`${SERVER_URL}/api/issues`, inputPayload);
      console.log('New Issue created:', response.data);
    } catch (error) {
      console.error('Error creating issue:', error);
    }
    displayMenu();
  });
};

const updateIssue = async () => {
  rl.question('Enter issue id to update: ', async (issue) => {
    const [issueId, title, description] = issue.split('-');
    try {
      const inputPayload = {
        "title": title,
        "description": description
      };
      const response = await axios.put(`${SERVER_URL}/api/issues/${issueId}`, inputPayload);
      console.log('Issue updated:', response.data);
    } catch (error) {
      console.error('Error updating issue:', error);
    }
    displayMenu();
  });
};

const deleteIssue = async () => {
  rl.question('Enter issue id to delete: ', async (issueId) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/api/issues/${issueId}`);
      console.log('Issue deleted:', response.data);
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
    displayMenu();
  });
};

const handleUserInput = (input) => {
  switch (input) {
    case '1':
      getAllIssues();
      break;
    case '2':
      createIssue();
      break;
    case '3':
      updateIssue();
      break;
    case '4':
      deleteIssue();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid input. Try again.');
      displayMenu();
  }
};

rl.on('close', () => {
  console.log('Exiting CLI client.');
  process.exit(0);
});

console.log('Welcome to the CLI client for interacting with the server.\n');

displayMenu();

rl.on('line', (input) => {
  handleUserInput(input);
});