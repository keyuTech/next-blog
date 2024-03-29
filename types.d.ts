import { PrismaClient } from '@prisma/client';
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
  var prisma: PrismaClient | undefined;
}

interface SnackbarMessage {
  key: number;
  message: string;
}