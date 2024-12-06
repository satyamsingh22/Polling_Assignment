


Polling System with Kafka, Zookeeper, and Real-Time Features
Project Overview
This project is a high-performance polling system built with Node.js, Kafka, Zookeeper, PostgreSQL, and WebSockets. It allows users to create polls, cast votes, and see real-time updates and leaderboards dynamically. The architecture ensures scalability, fault tolerance, and no data loss even under high-concurrency scenarios.

Features
Poll Creation:

Users can create polls with multiple options, which are stored in a PostgreSQL database.
Voting System:

Votes are sent asynchronously to Kafka for processing, ensuring resiliency.
Real-Time Updates:

Dynamic poll standings and leaderboard updates using WebSockets.
Global Leaderboard:

Tracks the most popular poll options across all active polls and updates live.
Concurrency Handling:

Kafka partitions ensure scalability for high-concurrency voting.
Prerequisites
Before starting, ensure the following tools are installed:

Node.js (v18 or later)
PostgreSQL
Kafka and Zookeeper
Project Setup
Step 1: Clone the Repository
bash
Copy code
git clone <repository-url>
cd <repository-folder>
Step 2: Configure Environment Variables
Update the .env file or modify db.js directly for your setup.

PostgreSQL Configuration:
Username: postgres
Password: satyam2203
Database Name: Pollying
Kafka and Zookeeper:
Broker: localhost:9092
Step 3: Start Services
PostgreSQL
Start PostgreSQL and create a database named Pollying.
Ensure the credentials match the configuration in db.js.
Kafka and Zookeeper
Start Zookeeper:
bash
Copy code
zookeeper-server-start.sh /path-to/zookeeper.properties
Start Kafka:
bash
Copy code
kafka-server-start.sh /path-to/server.properties
Starting the Application
1. Install Dependencies
bash
Copy code
npm install
2. Run the Backend Server
bash
Copy code
npm run server
This will start:

REST API services on http://localhost:3000
WebSocket services on ws://localhost:3001
3. Kafka Producer and Consumer
Kafka setup automatically initializes:

Producer: Sends votes to the votes topic.
Consumer: Processes messages and updates poll standings in the database.
API Endpoints
Poll Management
Create Poll: POST /api/v1/poll/polls

Request Body:
json
Copy code
{
  "title": "Favorite Programming Language?",
  "options": ["JavaScript", "Python", "Java"]
}
View Poll Results: GET /api/v1/poll/polls/:id

Voting
Vote for a Poll: POST /api/v1/poll/polls/:id/vote
Request Body:
json
Copy code
{
  "option": "JavaScript"
}
Leaderboard
Global Leaderboard: GET /api/v1/leaderboard/leaderboard
Real-Time Updates
WebSocket Features
Join Poll Room:

Clients can subscribe to a specific poll room using:
javascript
Copy code
socket.emit('join-poll', pollId);
Receive Updates:

Updates are pushed live when new votes are processed.
Kafka Instructions
Testing Kafka Producer
Create a topic:
bash
Copy code
kafka-topics --create --topic votes --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
Produce test messages:
bash
Copy code
kafka-console-producer --topic votes --bootstrap-server localhost:9092
Testing Kafka Consumer
Consume messages from the votes topic:
bash
Copy code
kafka-console-consumer --topic votes --bootstrap-server localhost:9092 --from-beginning
Troubleshooting
Database Connection Issues:

Verify PostgreSQL is running.
Check credentials in db.js.
Kafka/Zookeeper Errors:

Ensure both services are running:
bash
Copy code
ps aux | grep kafka
ps aux | grep zookeeper
WebSocket Not Responding:

Ensure WebSocket server is running and logs show no errors.
Testing Checklist
Real-Time Updates:

Use WebSocket clients to verify dynamic poll and leaderboard updates.
Kafka Message Flow:

Produce and consume test messages to ensure proper communication.
API Functionality:

Validate all API endpoints using Postman or similar tools.
Future Enhancements
Add retry logic for Kafka message failures.
Extend WebSocket features for user notifications.
Include stress tests for high-concurrency scenarios.
Contributors
Developed by [Your Name].
