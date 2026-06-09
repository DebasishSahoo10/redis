import {Queue} from 'bullmq';

export const connection = {
    host: "localhost",
    port: 6379
}

export const EMAIL_QUEUE_NAME = "email_queue";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {connection});