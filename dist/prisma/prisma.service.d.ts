import { PrismaClient } from '.prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<[import(".prisma/client").Prisma.BatchPayload]>;
}
