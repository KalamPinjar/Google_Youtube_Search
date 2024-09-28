# Google_Youtube_Scholar_API_Search

## Description

This project is a full-stack application built using a client-server architecture. The client is built with React.js , and the server is built with Node.js & Express.js . The application allows users to search the web using google custom search ,youtube data api and google scholar api for research work.

## Tools Used

- **Client:** - React.js
- **Server:** Node.js with Express
- **Styling:** Tailwind CSS
- **Development Tools:** Axios for API requests, Nodemon for automatic server restarts during development
- **Package Manager:** npm

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/KalamPinjar/Google_Youtube_Search.git]
   cd [GOOGLE_YOUTUBE_SEARCHAPI]
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Project

To run the project, open two terminal windows:

1. In the first terminal, start the server:

   ```bash
   npm run start
   ```

   This will run the server on port **3000**.

2. In the second terminal, start the client:
   ```bash
   cd client
   npm run dev
   ```
   This will run the client on port **5173**.

Alternatively, you can run both the client and server using a single command:

```bash
npm run start
```

This will use `concurrently` to run both the server and client simultaneously.

## Troubleshooting

### Common Issues

- **Axios Requests Fail:** If you encounter errors when the client makes requests to the server, ensure that both the client and server are running and that the correct API endpoints are configured.
- **CORS Issues:** If you face Cross-Origin Resource Sharing (CORS) issues, make sure to configure your server to allow requests from your client’s origin. You can use the `cors` middleware in Express.

### TanStack Usage
In this project, we utilized TanStack for efficient data fetching and state management. TanStack allows us to handle asynchronous queries seamlessly, providing features such as caching and automatic refetching. This helped improve the user experience by ensuring that the search results were always up-to-date while minimizing unnecessary network requests. The integration of TanStack has significantly simplified the process of managing the application's state and fetching data from the server.

### Difficulties Faced
While developing this project, we encountered several challenges:

1. **Debouncing Implementation**: We needed to implement a custom `useDebounce` hook to prevent excessive API calls during user input. This was essential for enhancing performance and avoiding rate-limiting issues with the search API.

2. **Pagination Optimization**: Handling pagination efficiently required careful management of the state to ensure that the correct results were fetched and displayed based on the user's interactions. We implemented a custom pagination component to facilitate smooth navigation through search results.

3. **CORS Issues**: During development, we faced Cross-Origin Resource Sharing (CORS) issues when making requests from the client to the server. Configuring CORS properly on the server was necessary to allow the client to communicate with it.

4. **Concurrent Execution**: Running both the client and server simultaneously with a single command using `concurrently` required precise script management. We had to ensure that the server was fully started before the client could send requests, which sometimes caused timing issues.

These challenges helped us learn more about React's state management, performance optimization, and best practices for building responsive applications.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the sections according to your specific project details, and let me know if you'd like any changes!
