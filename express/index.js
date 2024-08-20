// const express = require("express");
import express from "express";
import ejs from "ejs";
// const ejs = require("ejs"); make "type": "module" in package.json
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const jsDocConfig = {
  definition: {
    info: {
      title: "Hello Swagger UI",
      version: "0.0.1",
    },
  },
  apis: ["./*.js"],
};

const openapiSpecification = swaggerJsDoc(jsDocConfig);
console.log(openapiSpecification);

const app = express();

// Middleware - sits in the middle of the request and the response
app.use(express.json());

function logRequestURLAndMethod(req, res, next) {
  console.log(req.method, req.url);
  next();
}
function logRequestTime(req, res, next) {
  console.log("Time", Date.now());
  next();
}
function logRequestBody(req, res, next) {
  console.log(JSON.stringify(req.body));
  next();
}
function logRequestQueryParams(req, res, next) {
  console.log(req.query);
  next();
}
function logRequestRouteParams(req, res, next) {
  console.log(req.params);
  next();
}

// logger middleware
// app.use((req, resp, next) => {
//   console.log("Time", Date.now());
//   console.log(req.method, req.url);
//   console.log(req.query);
//   console.log(JSON.stringify(req.body));
//   next();
// });

/*
Logging at different verbosity levels using a process flag

switch (process.env.LOG_LEVEL) {
  case 'verbose':
    middleware.push(logRequestTime);
    middleware.push(logRequestURLAndMethod);
    middleware.push(logRequestBody);
    middleware.push(logRequestQueryParams);
    middleware.push(logRequestRouteParams);
    break;
  default:
    middleware.push(logRequestTime);
    middleware.push(logRequestURLAndMethod)
}

app.use(middleware) */

app.use([
  logRequestTime,
  logRequestURLAndMethod,
  logRequestBody,
  logRequestQueryParams,
  logRequestRouteParams,
]);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

/**
 * @openapi
 * /:
 *   get:
 *     description: Sends back a "hello world" with a link to the template endpoint
 *     responses:
 *       200:
 *         description: All good
 *       500:
 *         description: Bad things have happened to server
 */

app.get("/", (req, resp) => {
  console.log(req.query);
  if (req.query?.name) {
    resp.send(`Hello, ${req.query.name}`);
  } else {
    resp.send("Hello");
  }
});

/**
 * @openapi
 * /users
 *   get:
 *     summary: Lists Users
 *     description: Returns a list of all users
 *     tags:
 *      - /user
 *      - todo
 *     responses:
 *       200:
 *         description: The users were successfully returned.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  contribution:
 *                    $ref: "#/components/schemas/Contribution"
 *       500:
 *         description: Bad things have happened to server
 */
app.get("/users", (req, resp) => {
  resp.send([]);
});

app.get(
  "/users/:id",
  (req, resp, next) => {
    console.log("======================================", req.params.id);
    next();
  },
  (req, resp, next) => {
    logRequestTime(req, resp, next),
      (req, resp) => {
        console.log(req.params.id);
        resp.send({ name: "bob" });
      };
  }
);
// Render HTML given a name
app.get("/template/:name", (req, resp) => {
  const templateString = `<% 
  if (name) { %>
      <h1><%= name %></h1>
      <% } %>`;

  resp.send(ejs.render(templateString, { name: req.params.name }));
});
app.get("/users/:id", (req, resp) => {
  resp.send({ name: "bob" });
});

app.post("/", (req, resp) => {
  // console.log(req);
  if (req.body) {
    resp.send(`Message received: ` + JSON.stringify(req.body));
  }
});

app.listen(3000, () => {
  console.log("Express server is running....");
});

// http://127.0.0.1:3000/?name=Tana

// app level middleware runs first, then route level, then we respond
