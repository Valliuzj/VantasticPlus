# VantasticPlus

**Vantastic+ - An Innovative Learning Platform for Vancouverites and Fans**
## Frontend Setup
1. **Enter the frontend folder**:
   
   cd frontend
   
3. **Create .env.local:**
   
   `NEXT_PUBLIC_API_BASE_URL= https://your-api-base-url.com`
   For example: `http://localhost:8000`. It should be the same with your backend portal.

5. **Install dependencies**:
   
   `npm install`

7. **Start the server**:

   Use `npm run dev` to start the server.

## Backend Setup

To get the backend of Vantastic+ up and running, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Valliuzj/VantasticPlus.git
   cd vantasticplus
   
2. **Create the Firebase connection file:**

    In the backend directory, create a file named firebase.js and add your Firebase configuration

3. **Create the dotenv file**:

    In the backend directory, create a .env file and add your environment variables as shown in .env.example

4. **Install dependencies**:

   Navigate to the `backend` directory and run the command `npm install` to install dependencies.

5. **Start the server**:

   Use `nodemon server.js` to start the server.
