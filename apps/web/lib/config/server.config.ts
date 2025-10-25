// const mode = process.env.mode||"development";

// const { SERVER_URL_TEST, SERVER_URL_LOCAL, SERVER_URL_PROD } = process.env;
// console.log(SERVER_URL_TEST, SERVER_URL_LOCAL, SERVER_URL_PROD )
// if (!mode) {
//   throw new Error(" Environment variable MODE is not defined");
// }

// if (!SERVER_URL_TEST || !SERVER_URL_LOCAL || !SERVER_URL_PROD) {
//   throw new Error("Missing");
// }
// let SERVER_URL: string;
// if (mode === "development") {
//   SERVER_URL = SERVER_URL_LOCAL;
// } else if (mode === "production") {
//   SERVER_URL = SERVER_URL_PROD;
// } else {
//   SERVER_URL = SERVER_URL_TEST;
// }

const SERVER_URL = "http://localhost:8000/api";

export { SERVER_URL };
