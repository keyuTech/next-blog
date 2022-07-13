-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
