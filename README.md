# Personalized Horoscope API
This is a backend service that generates and serves personalized daily horoscopes for users based on their zodiac sign.
## Features
1. User signup with name, email, password, and birthdate.
2. User login with email and password.
3. Automatic zodiac sign calculation from birthdate.
4. JWT-based authentication for secure API access.
5. Daily horoscope fetching for the user's zodiac sign.
6. Access to the last 7 days of horoscope history.
7. Rate limiting to prevent API abuse (5 requests per minute).
   
## Tech Stack
Node.js: JavaScript runtime for the backend.
Express.js: Web framework for creating the API.
MongoDB: NoSQL database to store user and horoscope data.
Mongoose: ODM for interacting with MongoDB.
jsonwebtoken: For generating and verifying JSON Web Tokens.
bcryptjs: For hashing passwords before storing them.
express-rate-limit: Middleware for rate limiting.
AI tool : Gemini 2.5 Pro



## Setup and Installation
### Clone the repository
```bash
git clone https://github.com/Rahul2k/astro-backend.git
cd astro-backend
```

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npm start
```
Postman Collection for all apis : https://api.postman.com/collections/23293598-e606dd02-4c4a-46d0-b965-50dc29abc649?access_key=PMAT-01K3NF8YD185QZEE536WG5TJY0 <br />
The server will be running on http://localhost:3000.


## Design Decisions
1. RESTful API: The API is designed following REST principles for predictability and ease of use.
2. MongoDB: A NoSQL database like MongoDB was chosen for its flexibility in storing user data and horoscope history, which can have a variable structure.
3. JWT for Authentication: JWT is a stateless and secure way to handle user authentication, making it suitable for a scalable API, and easier and faster to build and maintain.
4. In-memory Horoscope Data: For this assignment, daily horoscopes are mocked using in-memory data for simplicity. In a real-world scenario, this would be fetched from content service (CDN or a Rest API) or a database.
5. Password Hashing: bcryptjs is used to hash passwords, ensuring that even if the database is compromised, user passwords are not exposed.
   
## Future Improvements
1. Swagger/OpenAPI Specification: With more time, I would add a Swagger or OpenAPI specification for better API documentation
2. More Robust Error Handling: Implement a centralized error handling middleware to manage different types of errors gracefully.
3. Testing: Add unit and integration tests to ensure the reliability and correctness of the API.
4. External Horoscope Provider: Integrate with a third-party API to get real-time, dynamic horoscope data.
5. Caching: Implement a caching layer (like Redis) to reduce database load and improve response times for frequently requested data like daily horoscopes.

## Scalability
If each user were to get a personalized horoscope instead of a zodiac-specific one, the system would need to be designed differently:
1. Horoscope Generation Service: A separate microservice would be responsible for generating personalized horoscopes. This service can use a combination of user data (like birthdate, time of birth, etc.) and astrological data to create unique horoscopes.
2. Asynchronous Generation: Horoscope generation could be done asynchronously. A cron job could trigger the generation for all users at the beginning of the day and results can then be stored in the database.
3. Data Storage: The database schema would need to be updated to store personalized horoscopes for each user for each day. This would significantly increase the amount of data stored. A time-series database might be a good choice for this kind of data.
4. Content Delivery: A Content Delivery Network (CDN) could be used to cache and serve the generated horoscopes, reducing the load on the main application server, especially if there are many users in different geographical locations.
This approach would decouple the horoscope generation from the API, allowing each part to scale independently.
