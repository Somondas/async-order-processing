import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "orderQueue",
  async (job) => {
    console.log(`Processing order ${job.data.orderId}`);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate processing
    console.log(`Order ${job.data.orderId} processed`);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});
