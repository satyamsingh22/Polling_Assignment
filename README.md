
# Polling System Backend with Kafka and WebSockets

This project implements a high-concurrency polling system with real-time updates and a leaderboard feature. 
It leverages Kafka for message handling, PostgreSQL for data storage, and WebSockets for real-time communication.

---

## Features

1. **Poll Creation**
   - Users can create polls with multiple options.
   - Polls are stored in a PostgreSQL database.

2. **Poll Participation**
   - Users can vote on polls using the `/polls/{id}/vote` endpoint.
   - Votes are sent to Kafka for processing and stored in the database.

3. **Real-Time Updates**
   - WebSockets provide real-time updates to connected users when new votes are registered.

4. **Leaderboard**
   - A global leaderboard ranks the most popular poll options in real-time.

5. **Concurrency and Fault Tolerance**
   - Kafka ensures high concurrency handling and reliability.
   - Zookeeper is used to manage Kafka brokers.

---

## Technology Stack

- **Backend Framework**: Node.js
- **Message Broker**: Kafka (with Zookeeper)
- **Database**: PostgreSQL
- **Real-Time Updates**: WebSockets

---

## API Endpoints

### Poll Endpoints

1. **Create Poll**
   - **POST** `/api/v1/poll/polls`
   - **Request Body**:
     ```json
     {
       "title": "Favorite Programming Language",
       "options": ["JavaScript", "Python", "C++"]
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Favorite Programming Language",
       "options": ["JavaScript", "Python", "C++"],
       "votes": {}
     }
     ```

2. **Vote on Poll**
   - **POST** `/api/v1/poll/polls/:id/vote`
   - **Request Body**:
     ```json
     {
       "option": "Python"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Vote sent for processing"
     }
     ```

3. **Get Poll Results**
   - **GET** `/api/v1/poll/polls/:id`
   - **Response**:
     ```json
     {
       "Python": 10,
       "JavaScript": 5
     }
     ```

### Leaderboard Endpoint

- **GET** `/api/v1//api/v1/leaderboard/leaderboard`
- **Response**:
  ```json
  [
    {"option": "Python", "votes": 10},
    {"option": "JavaScript", "votes": 8}
  ]
  ```

---

## Real-Time Updates

- **WebSocket Port**: 3001
  - The WebSocket server listens on port **3001** for client connections.
  - Example WebSocket URL: `ws://localhost:3001`
- **Join a Poll**: 
  - Clients can join a poll using the `join-poll` event, passing the poll ID. 
  - They will receive the current votes and subsequent updates in real time.
- **Vote Updates**: 
  - Whenever a vote is registered, connected clients will receive updates through the `poll-update` event.

---

## Prerequisites

1. **Node.js** (v16 or above)
2. **PostgreSQL** (configured with user credentials)
3. **Kafka** and **Zookeeper** (set up and running on default ports).

---

## Setup Instructions



### **1. Kafka Setup:**
Follow these steps to install Kafka and Zookeeper manually:
1. Download and install [Kafka](https://kafka.apache.org/downloads).
2. Follow the instructions in the [Kafka Quickstart](https://kafka.apache.org/quickstart) to set up Kafka and Zookeeper locally.
3. Ensure Kafka is running on port `9092` and Zookeeper on port `2181`.

### **2. PostgreSQL Setup:**
1. Install [PostgreSQL](https://www.postgresql.org/download/).
2. Create a database named `polling_db` and a user with access to it.
3. Set up the database credentials in the `.env` file or `sequelize` configuration.

### **3. Run the Backend Server:**
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   npm run server
   ```
   The server will run on `http://localhost:3000`.


4. **Clone the Repository**
   ```bash
   git clone https://github.com/satyamsingh22/Polling_Assignment.git
   cd backend
   ```


5. **Environment Variables**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     Db_userName=postgres
     Db_password=your_password
     Db_DatabaseName=Pollying
     ```

4. **Start PostgreSQL**
   - Ensure PostgreSQL is running and the database is created.

5. **Run Kafka and Zookeeper**
   - Start Kafka and Zookeeper services. Default ports:
     - **Kafka**: `9092`
     - **Zookeeper**: `2181`

1. Start the server:

   ```bash
   npm run server
   ```

---

## Testing

1. **Poll Creation**
   - Use tools like Postman to send a POST request to `/api/v1/poll/polls`.

2. **Vote on Poll**
   - Submit a vote via POST `/api/v1/poll/polls/:id/vote`.

3. **Check Real-Time Updates**
   - Open a WebSocket client and connect to `ws://localhost:3001`.
   - Join a poll by emitting the `join-poll` event with the poll ID.

4. **Leaderboard**
   - Retrieve the leaderboard with a GET request to `/api/v1/leaderboard`.

---

## Troubleshooting

1. **Kafka Connection Issues**
   - Ensure Kafka and Zookeeper services are running.
   - Verify Kafka broker configurations in the code.

2. **Database Connectivity**
   - Check PostgreSQL credentials in the `.env` file.
   - Ensure the database server is running.

3. **WebSocket Errors**
   - Verify the WebSocket server is running on port `3001`.
   - Use browser developer tools or tools like Postman to debug WebSocket connections.

4. **Missing Votes**
   - Check Kafka consumer logs for unprocessed messages.
   - Ensure Kafka topics are configured correctly.

---

## Future Enhancements

1. **User Authentication**
   - Add authentication to secure poll creation and voting endpoints.

2. **Poll Expiry**
   - Implement a feature to set expiry times for polls.

3. **Result Analysis**
   - Provide detailed analytics for poll creators.

4. **Scalability**
   - Explore distributed databases for better scalability with high data loads.

---

## Notes

- Ensure Kafka and Zookeeper are set up correctly for message processing.
- Error handling is implemented for invalid poll IDs, options, and missing fields.

---

## Contributors

Developed by Satyam Singh



