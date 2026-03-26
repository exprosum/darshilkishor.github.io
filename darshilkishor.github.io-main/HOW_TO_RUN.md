# How to Run the Portfolio Backend and Admin Dashboard

This project uses a **Node.js** backend connected to a **MongoDB** database. Since this is a Node.js project, the standard way to install dependencies is using `npm` and the `package.json` file.

## Prerequisites
1. **Node.js**: Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Make sure MongoDB is installed and running locally on your computer (typically at mongodb://127.0.0.1:27017) or have a cloud MongoDB URI (like MongoDB Atlas) ready.

## 1. Install Dependencies
Open your terminal in the directory where this project is located and run the following command:

```bash
npm install
```

This will read the `package.json` file and install the necessary dependencies (`express`, `mongoose`, `cors`, `dotenv`) into the `node_modules` folder.

*(Note: Although you asked for a `requirements.txt` file, which is usually used for Python, Node.js uses `package.json` and `npm install` for exactly the same purpose. I have included a text file listing the packages anyway just in case.)*

## 2. Start the Backend Server
Once the dependencies are installed and MongoDB is running, start the server by running:

```bash
node server.js
```

You should see a message saying:
```
Server is running on port 3000
Connected to MongoDB
```

## 3. Test the Website
With the server running:
1. Open your web browser and navigate to [http://localhost:3000/](http://localhost:3000/) to view your main portfolio page.
2. Scroll down to the contact section, fill in some test details, and submit the message.
3. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to open your new Admin Dashboard and view the message you just sent!

---

## 4. Hosting Online (GitHub & Render/Vercel)

Since this project now requires a backend (Node.js) to save database messages, you **cannot** host the backend on standard GitHub Pages anymore (which only supports static HTML/CSS). However, you have great free options:

### A. Deploying the Backend & Frontend Together (Render / Heroku / Zeabur)
The easiest way is to deploy your `server.js` repository so it can run the Node code and serve the HTML files.
1. Commit your code and push it to GitHub.
2. Sign up for a free platform like **Render.com** or **Zeabur.com**.
3. Create a new "Web Service" and link your GitHub repository.
4. Set the Build Command to `npm install` and Start Command to `node server.js`.
5. Under Environment Variables, set your `MONGODB_URI` to your cloud MongoDB connection string (e.g. MongoDB Atlas). Note: Localhost MongoDB will not work on the cloud!

### B. Deploying Frontend to GitHub Pages & Backend to Render
If you still want your main `index.html` on GitHub Pages:
1. Keep your front-end CSS/HTML deployed to GitHub Pages.
2. Deploy *only* your backend Express code to Render/Zeabur.
3. Update the `fetch()` calls in `index.html` and `admin.html` from `http://localhost:3000/api/messages` to your new deployed backend URL (e.g., `https://my-backend.onrender.com/api/messages`).

Don't forget to push your code to your repository:
```bash
git add .
git commit -m "Added Backend & Admin Panel"
git push
```
