module.exports = {
  ci: {
    collect: {
      startServerCommand: "bun start",
      url: ["http://localhost:3000/"],
      numberOfRuns: 1,
      settings: { chromeFlags: "--no-sandbox", preset: "desktop" },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
