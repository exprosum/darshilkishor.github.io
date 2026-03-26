require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_messages')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const path = require('path');
// Serve static files from the same directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Routes
app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// Mark as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update message' });
  }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, error: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

// Chatbot API using Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });
    
    const lowerMessage = message.toLowerCase();
    let replyText = "Arrrgh! I didn't quite catch that, matey! Try asking me about Darshil's skills, projects, or how to contact him!";
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ahoy') || lowerMessage.includes('hey')) {
      replyText = "Ahoy there, nakama! I be Den Den Mushi, the ship's trusted offline AI. What do ye want to know about Captain Darshil?";
    } else if (lowerMessage.includes('who is') || lowerMessage.includes('darshil') || lowerMessage.includes('about')) {
      replyText = "Captain Darshil is a legendary developer sailing the Grand Line of code! He specializes in crafting web applications and exploring the seas of Artificial Intelligence. Shishishi!";
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('know') || lowerMessage.includes('tech')) {
      replyText = "He's mastered many Devil Fruit powers: **Python, JavaScript, Node.js, React, HTML/CSS**, and even the chaotic waters of **Machine Learning**!";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('build')) {
      replyText = "His treasure chest is full of bounties! He's built AI systems, real-time trackers, and this very ship (portfolio). Ye can check the 'Projects' section up deck!";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('message') || lowerMessage.includes('email')) {
      replyText = "Want to add him to yer crew? Send a message through the **Contact Form** below, or cast a line to his email!";
    } else if (lowerMessage.includes('pirate') || lowerMessage.includes('one piece')) {
      replyText = "He is on a journey to become the Pirate King of Developers! The One Piece... I mean, the perfect codebase DOES exist!";
    } else if (lowerMessage.includes('database') || lowerMessage.includes('mongodb') || lowerMessage.includes('sql')) {
      replyText = "He's crafting Databases with CRUD operations like a true shipwright! A solid foundation for any pirate crew.";
    }
    
    // Slight delay to simulate thinking
    setTimeout(() => {
      res.status(200).json({ success: true, reply: replyText });
    }, 600);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate chat response' });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
