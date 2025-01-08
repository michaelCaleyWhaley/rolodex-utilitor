const urls = {
  prod: {
    login: 'https://d12si818kne643.cloudfront.net/login',
    api: 'https://d12si818kne643.cloudfront.net/api',
  },
  dev: {
    login: 'http://localhost:3000/login',
    api: 'http://localhost:4000/api',
  },
};

// @ts-expect-error undefined line
export const loginUrl = urls[process.env.NEXT_PUBLIC_ENV].login;
// @ts-expect-error undefined line
export const apiUrl = urls[process.env.NEXT_PUBLIC_ENV].api;
