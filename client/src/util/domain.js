export default process.env.NODE_ENV === "development"
  ? "http://192.168.86.147:5000"
  : process.env.NODE_ENV === "production" &&
    "http://192.168.86.147:5000";
