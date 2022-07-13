-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "password_digest" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
