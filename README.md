# MERN Stack Blog Application
A dynamic blog website using the MERN Stack (MongoDB, Express.js, React.js, Node.js), enabling users to create, update, and delete blogs with a seamless user interface. The application includes user management and authorization features using JWT, ensuring secure access and operations for authenticated users. It also supports user interactions by allowing users to comment on blogs, enhancing engagement within the platform.

## Table of Contents
- Features
- Technologies Used
- Setup
- Backend Structure
- Frontend Structure
- API Endpoints
- Running the Application
- Postman Documentation
- License

## Features
- **User Authentication and Authorization:** Secure user login and registration using JWT.
- **Blog Management:** Create, update, delete, and view blog posts.
- **User Interaction:** Comment on blog posts to enhance engagement.
- **Responsive Design:** Seamless user interface built with React.js and Bootstrap.
- **Admin Panel:** Manage users and moderate content.
- **Search Functionality:** Search through blog posts.
- **Notification System:** Users receive notifications about their activities.

## Technologies Used
### Frontend:

- React.js
- Bootstrap
- JavaScript

### Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Setup

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas account or local MongoDB setup.

### Backend Setup

#### Clone the repository:

- git clone https://github.com/yourusername/mern-blog-app.git
- cd mern-blog-app/backend

#### Install backend dependencies:


- npm install

#### Start the backend server:

- npm start
- The server will start on http://localhost:3000.

### Frontend Setup

#### Navigate to the frontend directory:

- cd ../frontend

#### Install frontend dependencies:

- npm install

#### Start the frontend server:

- npm start
- The frontend application will start on http://localhost:3001.

## Backend Structure
The backend is structured as follows:

- **app.js:** Entry point of the application.

### controllers/: Contains the logic for different functionalities.

- **authorization.js:** Handles user authentication and authorization.

- **user.js:** Manages user-related operations.

- **blogpost.js:** Manages blog post operations.

- **interaction.js:** Manages comments and interactions on blog posts.

- **search.js:** Handles search functionality.

- **admin.js:** Admin-specific operations.

### models/: Contains the Mongoose schemas for MongoDB.

- **User.js:** User schema.
- **BlogPost.js:** Blog post schema.
- **Comment.js:** Comment schema.

## Frontend Structure
The frontend is structured with React components:

### src/:
- **App.js:** Main component.
- **BlogList.js:** Displays a list of blog posts.
- **BlogPostDetail.js:** Shows the details of a single blog post.
- **AddBlog.js:** Form for adding a new blog post.
- **EditBlog.js:** Form for editing an existing blog post.
- **DeleteBlog.js:** Component to delete a blog post.
- **Login.js:** User login form.
- **Logout.js:** Logs the user out.
- **Navbar.js:** Navigation bar.
- **Notification.js:** Displays notifications to the user.


## Running the Application
### Start the backend server:

- cd backend
- npm start

### Start the frontend server:

- cd frontend
- npm start

## Access the application:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## Postman Documentation
For detailed API documentation, please refer to the Postman Documentation 
- https://documenter.getpostman.com/view/30930193/2s9YeEbsF3


## License
This project is licensed under the MIT License. See the LICENSE file for details.
