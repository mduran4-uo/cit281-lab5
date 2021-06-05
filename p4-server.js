//node.js configuration

const fns = require('./p4-module.js');
//const { getQuestion } = require('./p4-module.js');

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/question", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
        error: "",
        statusCode: 200,
        questions: fns.getQuestions()
    });
});

fastify.get("/cit/answer", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
          error: "",
          statusCode: 200,
          answers: fns.getAnswers()
      });
  });

  fastify.get("/cit/questionanswer", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
          error: "",
          statusCode: 200,
          answers: fns.getQuestionsAnswers()
      });
  });

  fastify.get("/cit/question/:number", (request, reply) => {

    const res = fns.getQuestion(Number(request.params.number))
    if (res.error == '') {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            ...res,
            statusCode: 200,
          });
          
        }
    else {
        reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
                ...res,
                statusCode: 404,
              });

    }
  });
  fastify.get("/cit/answer/:number", (request, reply) => {

    const res = fns.getAnswer(Number(request.params.number))
    if (res.error == '') {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            ...res,
            statusCode: 200,
          });
          
        }
    else {
        reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
                ...res,
                statusCode: 404,
              });

    }
  });

  fastify.get("/cit/questionanswer/:number", (request, reply) => {

    const res = fns.getQuestionAnswer(Number(request.params.number))
    if (res.error == '') {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            ...res,
            statusCode: 200,
          });
          
        }
    else {
        reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
                ...res,
                statusCode: 404,
              });

    }
  });

fastify.get("*", (request, reply) => {

    reply
    .code(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
        error: "Route not found",
        statusCode: 404
      });
  });


// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

