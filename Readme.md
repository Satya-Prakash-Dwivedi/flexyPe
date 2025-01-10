# Failed POST Request Alerting System

## Project Overview

The **Failed POST Request Alerting System** is designed to monitor the `/api/submit` endpoint for failed POST requests. This application helps in tracking failed attempts by recording failures associated with each IP address and notifying administrators once a threshold is reached. This system enhances the observability of API interactions and helps in identifying potential issues with incoming requests.

## Tech Stack Used

- **Backend Framework**: Express.js (with TypeScript)
- **Database**: MongoDB Atlas (cloud-hosted)
- **Email Service**: Google SMTP for sending alert emails
- **Environment Configuration**: dotenv (for managing environment variables)

## Features

- **Failure Monitoring**: Continuously tracks failed POST requests to the `/api/submit` endpoint caused by invalid headers or incorrect access tokens.
- **IP-based Tracking**: Monitors failed requests from each IP address within a configurable time window (e.g., 10 minutes).
- **Threshold Alerts**: Triggers email alerts when a configured threshold (e.g., 5 failed attempts) from the same IP address is exceeded.
- **Logging and Metrics Storage**: Logs failed requests with details such as source IP, timestamp, and reason for failure in a MongoDB database for analysis.
- **Metrics Endpoint**: Exposes `/api/metrics` to retrieve stored failure logs and metrics.

## Prerequisites

Before setting up the application, ensure you have the following:

- Node.js and npm/yarn installed.
- MongoDB Atlas account for managing the database.
- Gmail account with App-Specific Password enabled for email alerts.
- Ngrok (for testing the APIs over the internet instead of localhost).

## Environment Variables

The following environment variables must be configured in a `.env` file:

| Variable               | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `MONGO_URI`            | MongoDB Atlas connection string                  |
| `SMTP_EMAIL`           | Your Gmail address (for sending alerts)         |
| `SMTP_PASSWORD`        | Your Gmail app-specific password                 |
| `ALERT_EMAIL`          | The recipient email for failure alerts          |
| `ACCESS_TOKEN`         | Secure access token to authenticate requests    |

## Setup Instructions

1. **Clone the Repository**  
   Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Satya-Prakash-Dwivedi/flexyPe.git
    ```

2. **Install Dependencies**  
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Create and Configure `.env` File**  
   In the project root directory, create a `.env` file and populate it with the required environment variables.

4. **Start the Application**  
   Start the server using:
   - For development:  
     ```bash
     npm run dev
     ```
   - For production:  
     ```bash
     npm start
     ```

## Testing the Application

- **Postman**: Use Postman to test the `/api/submit` endpoint with different headers to simulate success and failure conditions.

- **Failure Simulation**: Try sending invalid or missing data in the POST request to trigger a failure and observe the email alert.

- **Metrics Endpoint**: Use the `/api/metrics` endpoint to fetch and verify stored failure logs.

## Exposing the API with Ngrok

To facilitate testing with external systems and avoid issues that arise when testing locally, this application uses [Ngrok](https://ngrok.com/) to expose the APIs over the internet. Ngrok generates a secure URL, allowing you to easily test and interact with the APIs externally.

## Scalability Notes

The application dynamically queries MongoDB for storing and retrieving failure logs, ensuring that the system can scale without relying on in-memory data storage. Potential future enhancements include:

- **Rate Limiting**: Implementing rate limiting for better control over the number of requests.
- **Caching**: Introducing caching mechanisms to improve the performance of failure logging.

---

Feel free to reach out to the me for any questions or suggestions.
