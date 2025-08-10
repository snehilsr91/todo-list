const allowedOrigins = [
  "http://localhost:3000", // React dev
  "http://localhost:5000",
  // Add other allowed origins here (e.g., production domain)
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
