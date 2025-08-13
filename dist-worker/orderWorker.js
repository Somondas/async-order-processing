"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const connection = new ioredis_1.default({
    maxRetriesPerRequest: null,
});
const worker = new bullmq_1.Worker("orderQueue", async (job) => {
    console.log(`Processing order ${job.data.orderId}`);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate processing
    console.log(`Order ${job.data.orderId} processed`);
}, { connection });
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});
worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed: ${err.message}`);
});
