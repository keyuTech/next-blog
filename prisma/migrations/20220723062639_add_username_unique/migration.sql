/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comment_author_id_key";

-- DropIndex
DROP INDEX "Comment_post_id_key";

-- DropIndex
DROP INDEX "Post_author_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
