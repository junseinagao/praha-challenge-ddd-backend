-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_REVIEW', 'DONE');

-- CreateTable
CREATE TABLE "Particient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "membershipStatus" "MembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "pairId" TEXT,

    CONSTRAINT "Particient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Pair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "particientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Particient_email_key" ON "Particient"("email");

-- AddForeignKey
ALTER TABLE "Particient" ADD CONSTRAINT "Particient_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD CONSTRAINT "Pair_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_particientId_fkey" FOREIGN KEY ("particientId") REFERENCES "Particient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
