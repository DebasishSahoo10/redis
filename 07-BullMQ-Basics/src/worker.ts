import {Worker} from 'bullmq';
import { connection, EMAIL_QUEUE_NAME } from './queue';

const worker = new Worker(
    EMAIL_QUEUE_NAME, 
    async (job: {data: {id: string, to: string, subject: string, body: string}}) => {
        const {id, to, subject, body} = job.data;
        console.log("Job to: ", to);
        console.log("Job subject: ", subject);
        console.log("Job text: ", body);
    },
    {connection}
)

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
})

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed with error: `, err.message);
})