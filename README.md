# CampusHire – A Smart Solution for Campus Recruitment

CampusHire is an intelligent placement platform designed to streamline recruitment workflows for students, recruiters, and administrators. It simplifies the hiring process by integrating key features like role-based access control, video interviews via Zoom API, secure authentication, and automated email notifications.

## Features
- **Role-Based Access Control:** Secure and efficient management of placement activities for different user roles.
- **Zoom API Integration:** Seamless video interviews for remote hiring.
- **JWT Authentication & Bcrypt Encryption:** Ensuring secure access control and data protection.
- **Optimized Backend:** Built with Node.js and Express.js for high performance and scalability.
- **Modern UI:** Developed using React.js and TailwindCSS for an intuitive user experience.
- **Automated Email Notifications:** Implemented using Nodemailer for interview scheduling and recruitment updates.

## Technologies Used
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Bcrypt
- **APIs & Libraries:** Zoom API, Nodemailer

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CampusHire.git
   cd CampusHire
   ```

2. Install dependencies:
   ```sh
   npm install
   cd client && npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ZOOM_API_KEY=your_zoom_api_key
   ZOOM_API_SECRET=your_zoom_api_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the backend server:
   ```sh
   npm run server
   ```

5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## Usage
- **Students:** Apply for jobs, schedule interviews, and track application status.
- **Recruiters:** Post job listings, shortlist candidates, and conduct interviews.
- **Administrators:** Manage users, monitor placements, and oversee recruitment processes.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.


## Contact
For any inquiries, reach out via [siddhantborhade18.7@gmail.com].
