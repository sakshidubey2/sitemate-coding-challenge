const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const issuesCollection = db.collection('issues');


// Create a new issue
router.post('/issues', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newIssueRef = await issuesCollection.add({
      title,
      description,
    });

    res.json({ id: newIssueRef.id });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all issues
router.get('/issues', async (req, res) => {
  try {
    const snapshot = await issuesCollection.get();
    const issues = [];
    snapshot.forEach((doc) => {
      issues.push({ id: doc.id, ...doc.data() });
    });
    res.json(issues);
  } catch (error) {
    console.error('Error retrieving issues:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an issue by ID
router.put('/issues/:id', async (req, res) => {
  const issueId = req.params.id;
  const { title, description } = req.body;

  try {
    const issueRef = issuesCollection.doc(issueId);
    const issueSnapshot = await issueRef.get();

    if (!issueSnapshot.exists) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    await issueRef.update({
      title: title || issueSnapshot.data().title,
      description: description || issueSnapshot.data().description,
    });

    res.json({ message: 'Issue updated successfully' });
  } catch (error) {
    // console.error('Error updating issue:', error);
    res.status(500).json({ "error": 'Server error' });
  }
});

// Delete an issue by ID
router.delete('/issues/:id', async (req, res) => {
  const issueId = req.params.id;

  try {
    const issueRef = issuesCollection.doc(issueId);
    const issueSnapshot = await issueRef.get();

    if (!issueSnapshot.exists) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    await issueRef.delete();

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;