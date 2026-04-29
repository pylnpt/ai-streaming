-- CreateTable
CREATE TABLE "FilteredMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "senderUsername" TEXT,
    "message" TEXT NOT NULL,
    "filteredCategory" TEXT NOT NULL,
    "confidence" DECIMAL(65,30) NOT NULL,
    "wasRestored" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilteredMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomWord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "caseSensitive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FilteredMessage_userId_idx" ON "FilteredMessage"("userId");

-- CreateIndex
CREATE INDEX "FilteredMessage_createdAt_idx" ON "FilteredMessage"("createdAt");

-- CreateIndex
CREATE INDEX "CustomWord_userId_idx" ON "CustomWord"("userId");

-- CreateIndex
CREATE INDEX "CustomWord_type_idx" ON "CustomWord"("type");

-- CreateIndex
CREATE UNIQUE INDEX "CustomWord_userId_word_type_key" ON "CustomWord"("userId", "word", "type");

-- AddForeignKey
ALTER TABLE "FilteredMessage" ADD CONSTRAINT "FilteredMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomWord" ADD CONSTRAINT "CustomWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
