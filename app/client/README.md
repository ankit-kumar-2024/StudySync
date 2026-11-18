## Before running the servers, make sure you have these 4 items ready:

### Node.js (v18 or higher): Installed locally so you can run npm commands for both server and client.

### _MongoDB Atlas Cluster (MONGO_URI):_

Create a free M0 cluster in MongoDB Atlas.

Under Database Access, create a database user with a username and password.

Under Network Access, add IP 0.0.0.0/0 (Allow Access From Anywhere) so your Express server can connect without timeout errors.

Copy the Drivers (Node.js) connection string and replace <password> with your database user's password.

### _Google Gemini API Key (GEMINI_API_KEY):_

Go to Google AI Studio, click Get API Key, and generate a key. This powers test generation, courses, flashcards, video summaries, and the AI tutor.

### _YouTube Data API v3 Key (YOUTUBE_API_KEY):_

Go to Google Cloud Console, create a project, search for YouTube Data API v3, click Enable, and go to Credentials → Create Credentials → API Key. This fetches embeddable videos for every topic and course module without opening YouTube.

## Complete Project Structure

Place server/ and client/ side by side inside your StudySync/ root folder:
StudySync/
├── server/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Schemas.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   └── RouteGuards.jsx
    │   │   ├── layout/
    │   │   │   ├── AppLayout.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── LeftSidebar.jsx
    │   │   │   └── RightSidebar.jsx
    │   │   └── video/
    │   │       └── WatchingPage.jsx
    │   ├── pages/
    │   │   ├── AnalyticsPage.jsx
    │   │   ├── AssignmentsPage.jsx
    │   │   ├── BooksPage.jsx
    │   │   ├── ChatPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   ├── HelpPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── NotFoundPage.jsx
    │   │   ├── ProfileSettingsPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── StudyPlannerPage.jsx
    │   │   ├── TasksPage.jsx
    │   │   ├── TestsPage.jsx
    │   │   ├── VideoLessonPage.jsx
    │   │   └── Welcome.jsx
    │   ├── store/
    │   │   ├── slices/
    │   │   │   ├── assignmentsSlice.js
    │   │   │   ├── authSlice.js
    │   │   │   ├── notificationsSlice.js
    │   │   │   ├── plannerSlice.js
    │   │   │   ├── resourcesSlice.js
    │   │   │   ├── tasksSlice.js
    │   │   │   └── testsSlice.js
    │   │   └── index.js
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── router.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js