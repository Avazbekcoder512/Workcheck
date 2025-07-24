-- CreateTable
CREATE TABLE "rate_limiter" (
    "key" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "consumed_points" INTEGER NOT NULL,
    "ms_before_next" BIGINT NOT NULL,
    "blocked_until" BIGINT,

    CONSTRAINT "rate_limiter_pkey" PRIMARY KEY ("key")
);
