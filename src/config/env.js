// You can use this file to validate required environment variables
const requiredEnvVars = ["MONGO_URI"];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

module.exports = { validateEnv };
