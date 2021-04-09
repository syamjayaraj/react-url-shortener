let apiUrl;
let siteUrl;
if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  console.log("Development backend");
  apiUrl = "http://localhost:3021";
  siteUrl = "http://localhost:3002";
} else {
  console.log("Production backend");
  apiUrl = "https://url-shortener-api.nilav.in";
  siteUrl = "https://shrt.nilav.in";
}

export { apiUrl, siteUrl };
