import express from "express";
import httpProxy from "http-proxy";
const app = express();
const apiProxy = httpProxy.createProxyServer();

const gitAppServer = "http://localhost:4000";
const blogServer = "http://localhost:3000";
const meServer = "http://localhost:5173";

app.get("/me*", (req, res) => {
  apiProxy.web(req, res, { target: meServer });
});

app.post("/me*", (req, res) => {
  apiProxy.web(req, res, { target: meServer });
});

app.get("/blog*", (req, res) => {
  apiProxy.web(req, res, { target: blogServer });
});

app.post("/blog*", (req, res) => {
  apiProxy.web(req, res, { target: blogServer });
});

app.get("/git-app*", (req, res) => {
  apiProxy.web(req, res, { target: gitAppServer });
});

app.post("/git-app*", (req, res) => {
  apiProxy.web(req, res, { target: gitAppServer });
});

app.listen(8080);
