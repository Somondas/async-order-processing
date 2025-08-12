import { Worker } from "bullmq";

import IORedis from "ioredis";

const connection = new IORedis();

const worker = new Worker(
  "orderQueue",
  async (job) => {
    console.log(`Processing order ${job.data.orderId}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Order ${job.data.orderId} processed`);
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`JOb ${job?.id} failed: ${err.message}`);
});
