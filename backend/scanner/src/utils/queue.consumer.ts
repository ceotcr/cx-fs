import { getRabbitMQChannel, initRabbit } from './queue';
import { processScanJob } from './scan.processor';

export async function startScanConsumer() {
    try {
        await initRabbit();
        const channel = await getRabbitMQChannel();

        channel.prefetch(5);

        console.log('Worker connected to RabbitMQ. Waiting for messages...');

        await channel.consume('scanning_queue', async (msg) => {
            if (!msg) return;

            try {
                const jobData = JSON.parse(msg.content.toString());
                await processScanJob(jobData);
                channel.ack(msg);
            } catch (error) {
                console.error('Job processing failed:', error);
                channel.nack(msg, false, false);
            }
        });
    } catch (error) {
        console.error('Consumer error:', error);
        process.exit(1);
    }
}