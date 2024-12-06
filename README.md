# Polling_Assignment




## **Overview**

This backend is a **polling system** that allows users to create polls, vote on options, and view results. It uses **PostgreSQL** for the database and **Kafka** for asynchronous vote processing. It also integrates **WebSockets** for real-time updates.

## **Features**
- **Create Polls**: Create a new poll with a title and options.
- **Vote on Polls**: Users can vote for one of the options in a poll.
- **View Poll Results**: See the results of a poll, showing the number of votes for each option.
- **Leaderboard**: Displays the top options with the highest votes from all polls.
- **Kafka Integration**: Votes are sent to Kafka for asynchronous processing.

---

------------- **Project Setup**------------------

### **1. Prerequisites**

- **Node.js** (v18 or above)
- **PostgreSQL** (Locally or via Docker)
- **Kafka & Zookeeper** (Locally or via Docker)
- **Docker** (For containerized setup)

------------------------------------------------------

----------- **2. Installation**-------------------------

1. **Clone the repository**:

   ```bash
   git clone https://github.com/satyamsingh22/Polling_Assignment.git
   cd backend
   ```

2. **Install dependencies**:

   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

---

### **3. Configuration**

#### **Environment Variables**

The project requires the following environment variables for database connection and Kafka configuration:

1. **Database Configuration**:
   - **DB_HOST**: Hostname for PostgreSQL (use `localhost` or Docker container name).
   - **DB_PORT**: PostgreSQL port (default: `5432`).
   - **DB_USER**: PostgreSQL username.
   - **DB_PASS**: PostgreSQL password.
   - **DB_NAME**: Database name.

   Create a `.env` file in the root directory of the project and add these variables:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   ```

2. **Kafka Configuration**:
   - **KAFKA_BROKER**: Kafka broker address (default: `localhost:9092`).
   - **KAFKA_TOPIC**: Kafka topic (default: `votes`).

---

### **4. Running the Application**

#### **Using Docker**

1. **Docker Compose**:
   This project uses **Docker Compose** for running PostgreSQL and Kafka services. Before running the application, make sure that Docker is installed on your machine.

   **To build and run with Docker**:

   1. Make sure you have a `docker-compose.yml` file that includes configurations for both Kafka and PostgreSQL.

   Example `docker-compose.yml`:
   ```yaml
   version: '3.8'
   
   services:
     zookeeper:
       image: wurstmeister/zookeeper:3.4.6
       ports:
         - "2181:2181"
   
     kafka:
       image: wurstmeister/kafka
       environment:
         KAFKA_ADVERTISED_LISTENERS: INSIDE://kafka:9093
         KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INSIDE:PLAINTEXT
         KAFKA_LISTENER_NAME_INSIDE: INSIDE
         KAFKA_LISTENER_INTERNAL: INSIDE://kafka:9093
         KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
         KAFKA_LISTENER_PORT: 9092
         KAFKA_LISTENER_MODE: EMBEDDED
       ports:
         - "9092:9092"
       depends_on:
         - zookeeper
   ```

   2. Start the services with Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will start the **PostgreSQL**, **Kafka**, and **Zookeeper** services.

#### **Without Docker (Local Setup)**

1. **Start PostgreSQL**:
   - You can use **PostgreSQL** either locally or through Docker. If running locally, make sure the PostgreSQL service is running on `localhost:5432` or use a custom configuration.

2. **Start Kafka**:
   - Similarly, ensure Kafka is running. If running locally, you can start it using the command:
   
   ```bash
   bin/kafka-server-start.sh config/server.properties
   ```

---

### **5. Running the Backend Server**

After setting up the database and Kafka, you can start the backend server.

1. **Run the server**:

   ```bash
   npm run server
   ```

   This will start the backend server on **port 3000** and WebSocket server on **port 3001**.

2. **Access the API**: The API will be available at `http://localhost:3000/api/v1`.

---

## **6. Endpoints**

### **1. Create Poll**
- **Endpoint**: `POST /api/v1/poll/polls`
- **Body**:
   ```json
   {
     "title": "Favorite Programming Language",
     "options": ["JavaScript", "Python", "Java", "C++"]
   }
   ```

### **2. Vote on Poll**
- **Endpoint**: `POST /api/v1/poll/polls/:id/vote`
- **Body**:
   ```json
   {
     "option": "JavaScript"
   }
   ```

### **3. Get Poll Results**
- **Endpoint**: `GET /api/v1/poll/polls/:id`

### **4. Get Leaderboard**
- **Endpoint**: `GET /api/v1/leaderboard`

---

## **7. Testing the Application**

### **Test in Thunder Client**:

1. **Poll Creation**: Create a poll with a title and options.
2. **Vote Submission**: Vote for one of the options in the created poll.
3. **Check Results**: Retrieve the poll results to see the vote count.
4. **Leaderboard**: Get the leaderboard to see the top voted options across all polls.

---

## **8. Known Issues & Limitations**

- **Docker Setup Not Tested**: Although the Docker setup is configured, it hasn't been tested thoroughly in different environments. You may need to troubleshoot if any issues arise with Docker.
  
- **PostgreSQL**: If the database connection is not working correctly or if the server is down, make sure your PostgreSQL server is running.

---

## **9. Important Notes**

- **Database Usage**: You are expected to **use your own PostgreSQL database** for the project. Ensure your database is up and running before interacting with the API. You can check the status of your database by connecting to it directly using a database tool (e.g., **pgAdmin** or **psql**).
- **Kafka Testing**: While the Kafka setup is included, **testing is not completed**. You may need to configure Kafka correctly for vote processing. Use Kafka tools to check if messages are being sent and consumed properly.

---

**Happy Coding!**

](https://github.com/satyamsingh22/Polling_Assignment.git)
