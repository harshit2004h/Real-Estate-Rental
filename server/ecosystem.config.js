module.exports = {
  apps: [
    {
      name: "real-estate-rental",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};