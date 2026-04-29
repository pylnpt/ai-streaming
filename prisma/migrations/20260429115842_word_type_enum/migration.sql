-- CreateEnum
CREATE TYPE "WordType" AS ENUM ('WHITELIST', 'BLACKLIST');

-- Drop indexes that reference the old text column
DROP INDEX IF EXISTS "CustomWord_type_idx";
DROP INDEX IF EXISTS "CustomWord_userId_word_type_key";

-- Normalize existing values to match enum labels
UPDATE "CustomWord" SET "type" = UPPER("type");

-- Convert column to enum type, preserving data
ALTER TABLE "CustomWord"
  ALTER COLUMN "type" SET DATA TYPE "WordType" USING ("type"::"WordType");

-- Recreate indexes against the new column type
CREATE INDEX "CustomWord_type_idx" ON "CustomWord"("type");
CREATE UNIQUE INDEX "CustomWord_userId_word_type_key" ON "CustomWord"("userId", "word", "type");
