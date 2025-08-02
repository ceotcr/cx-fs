import { closeRabbitMQConnection, getRabbitMQChannel, initRabbit } from './queue';

export async function enqueueScanJob(fileData: {
    fileId: string;
    path: string;
}): Promise<void> {
    try {
        await initRabbit();
        const channel = await getRabbitMQChannel();
        await channel.sendToQueue(
            'scanning_queue',
            Buffer.from(JSON.stringify(fileData)),
            { persistent: true }
        );
    } catch (error) {
        console.error('Error enqueuing scan job:', error);
        throw error;
    }
    finally {
        await closeRabbitMQConnection();
    }
}