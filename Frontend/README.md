# College Placement Management System

A comprehensive system designed to streamline the college placement process. This platform facilitates student application management, interview scheduling, company coordination, placement drive management, and detailed reporting. Built on the **MERN stack** with **TailwindCSS** for styling and integrated tools for video interviews like **Zoom API**.

---

## Demo Login Credentials

### Admin

USER: azardevacc@gmail.com  
 PASS: 123

### Company

USER: microsoft@outlook.com 
 PASS: 123

### Student

USER: 3rdmysteryunknown@gmail.com  
 PASS: 123

### Zoom API

USER: <use your zoom marketplace email> 
 PASS: <use your zoom marketplace password>

login using this account and test payment

## Features

### 1. **Student and Application Management**
- Students can:
  - Submit applications with resumes, cover letters, and personal details.
  - Track application statuses (e.g., submitted, reviewed, shortlisted).
  - View and manage their application statuses and interview schedules.

### 2. **Interview Scheduling**
- companies can:
  - Schedule interviews with options for time slots and formats (e.g., in-person, virtual).
  - Automate notifications for schedules, confirmations, and reminders.

### 3. **Company Coordination**
- Companies can:
  - Post job openings and internship opportunities.
  - Review applications, schedule interviews, and communicate with candidates.
  - Provide feedback and make hiring decisions.

### 4. **Placement Drives Management**
- Tools for:
  - Organizing and managing placement drives.
  - Scheduling events and tracking participation.
  - Generating performance reports (e.g., participants, interviews conducted, offers made).

### 5. **Recruitment Status Tracking**
- Dashboards for:
  - Tracking metrics like students placed, offers accepted, and placement drive success rates.
  - Identifying trends with visual indicators and detailed reports.

### 6. **Integration with Academic Records**
- Seamless synchronization with academic records for:
  - Pulling grades, achievements, and transcripts.
  - Ensuring data accuracy.

### 7. **Company Database Integration**
- Tools for:
  - Managing company profiles, job listings, and contact information.
  - Importing/exporting data for efficient coordination.

### 8. **User Interface**
- Students:
  - Intuitive interface for application submission, progress tracking, and schedule management.
- Companies:
  - User-friendly dashboard for job postings, reviewing applications, and scheduling interviews.
- Admins:
  - Comprehensive interface for managing placements, overseeing recruitment drives, and generating reports.

### 9. **Reports and Analytics**
- Tools for:
  - Detailed placement activity reports (e.g., student applications, interview outcomes, hiring rates).
  - Graphical insights with charts and graphs for placement success and improvement areas.

---

## Tech Stack
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Video Integration**: Zoom API
- **Other Tools**:
  - Framer Motion for animations
  - Axios for API requests
  - HeroIcons Icons for icons

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB instance running locally or on a cloud provider
- Zoom Developer Account for API integration

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ajardeen/College-Placement-Management-FrontEnd
   cd College-Placement-Management-FrontEnd
   ```

### Install Backend Dependencies:

```bash
cd backend
npm install
```

### Set Up Environment Variables:

Create a `.env` file in the `backend` directory with the following:

```env
PORT=your_port_number
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=your_jwt_expiration_time
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=your_smtp_from_email
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
ZOOM_REDIRECT_URI=your_zoom_redirect_uri
```

### Run the Backend:

```bash
npm start
```

### Install Frontend Dependencies:

```bash
cd ../frontend
npm install
```

### Run the Frontend:

```bash
npm start
```

## Integrations

### Video Interviews

- **Zoom API**: Integrated for scheduling and managing virtual interviews.
- **WebRTC**: Enables real-time communication for video interviews.

## Screenshots
 **Student and Admin**: Showcase a clean and intuitive interface for Login and Registration.
   ![Student](/src/assets/colleage_screenshot%208.png)
**Companys**:
   ![Student](/src/assets/colleage_screenshot%207.png)

1. **Student Dashboard**: Showcase a clean and intuitive interface for students.
   ![Student](/src/assets/colleage_screenshot%2010.png)
   ![Student](/src/assets/colleage_screenshot%201.png)
   ![Student](/src/assets/colleage_screenshot%205.png)
   ![Student](/src/assets/colleage_screenshot%2015.png)

2. **Admin Dashboard**: Display admin tools for managing placements and generating reports.
   ![Admin](/src/assets/colleage_screenshot%2012.png)
   ![Admin](/src/assets/colleage_screenshot%203.png)
   ![Admin](/src/assets/colleage_screenshot%2014.png)
   ![Admin](/src/assets/colleage_screenshot%2016.png)
   ![Admin](/src/assets/colleage_screenshot%2017.png)
 ![Admin](/src/assets/colleage_screenshot%209.png)


3. **Company Dashboard**: User-friendly tools for job postings and candidate management.
 ![Company](/src/assets/colleage_screenshot%202.png)
 ![Company](/src/assets/colleage_screenshot%206.png)
 ![Company](/src/assets/colleage_screenshot%204.png)
 ![Company](/src/assets/colleage_screenshot%2013.png)
 ![Company](/src/assets/colleage_screenshot%2011.png)

