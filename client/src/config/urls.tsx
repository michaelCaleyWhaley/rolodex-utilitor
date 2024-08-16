const urls = {
  prod: {
    login: "https://d12si818kne643.cloudfront.net/login",
    api: "https://d12si818kne643.cloudfront.net/api",
  },
  dev: {
    login: "http://localhost:3000/login",
    api: "http://localhost:4000/api",
  },
};

// @ts-ignore
export const loginUrl = urls[process.env.NEXT_PUBLIC_ENV].login;
// @ts-ignore
export const apiUrl = urls[process.env.NEXT_PUBLIC_ENV].api;
