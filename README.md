# Issue Tracker REST API

This project is a simple Issue Tracker REST API built with Express.js and Firebase Firestore. It allows users to create, read, update, and delete issues.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [npm](https://www.npmjs.com/) (Node Package Manager) - Comes with Node.js
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Required for Firestore integration
- [Git](https://git-scm.com/) - Optional for version control

### Installation

1. Clone the repository to your local machine (if you haven't already):

   ```bash
   git clone https://github.com/your-username/issue-tracker-api.git


2. Install project dependencies:

```
npm install
```
cd issue-tracker-api
npm install



Start the server:

```

npm start
```

The server should now be running at http://localhost:3000.

API Endpoints
1. Create a New Issue
```
URL: /api/issues
Method: POST
Request Body:
title (string, required): Title of the issue.
description (string, required): Description of the issue.
```

2. Read All Issues
```
URL: /api/issues
Method: GET
```

3. 
Update an Issue
```
URL: /api/issues/:id
Method: PUT
Request Parameters:
id (string, required): ID of the issue to update.
Request Body:
title (string): New title for the issue (optional).
description (string): New description for the issue (optional).
```

4. Delete an Issue
```
URL: /api/issues/:id
Method: DELETE
Request Parameters:
id (string, required): ID of the issue to delete.
Usage

```



To use the CLI client, run the following command:

```
node client.js
```

Follow the on-screen prompts to perform CRUD operations on issues.