module.exports = {
  ci: {
    collect: {
      startServerCommand: "bun start",
      url: ["http://localhost:3000/", "http://localhost:4000/saku-1101"],
      numberOfRuns: 1,
      settings: { chromeFlags: "--no-sandbox", preset: "desktop" },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
