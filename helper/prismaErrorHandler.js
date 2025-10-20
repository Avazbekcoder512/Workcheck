// const { Prisma } = require("@prisma/client");
const prisma = require('../generated/prisma/index.js')

function prismaErrorHandler(err, req, res, next) {
  if (!err) return next();

  let status = 500;
  let body = { error: "Server xatosi" };

  if (err instanceof prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P1001":
        status = 503;
        body = {
          error: "Maʼlumotlar bazasiga ulanish mumkin emas (DB unreachable).",
        };
        break;
      case "P2002":
        status = 409;
        body = {
          error: "Unique constraint violated.",
          meta: { code: err.code, target: err.meta?.target },
        };
        break;
      case "P2025": 
        status = 404;
        body = { error: "Talab qilingan yozuv topilmadi." };
        break;
      default:
        status = 400;
        body = {
          error: "So'rovda xato (Prisma error).",
          meta: { code: err.code },
        };
        break;
    }
  }
  else if (err instanceof prisma.PrismaClientInitializationError) {
    status = 500;
    body = {
      error:
        "Prisma client initialization error — konfiguratsiyani tekshiring.",
    };
  }
  else if (err instanceof prisma.PrismaClientRustPanicError) {
    status = 500;
    body = { error: "Prisma ichki xatosi (Rust panic)." };
  }
  else {
    if (
      err.code &&
      typeof err.code === "string" &&
      /^P\d{4}$/i.test(err.code)
    ) {
      status = 400;
      body = { error: "Prisma error", meta: { code: err.code } };
    } else {
      status = err.status || 500;
      body = { error: err.error || "Server xatosi" };
    }
  }

  console.error("Prisma/ErrorHandler:", {
    error: err.error,
  });

  return res.status(status).json(body);
}

module.exports = prismaErrorHandler;
