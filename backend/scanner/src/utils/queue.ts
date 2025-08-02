import { connect, Channel } from 'amqplib';

let channel: Channel;

export async function initRabbit() {
    const conn = await connect(process.env.RABBITMQ_URI || 'amqp://127.0.0.1');
    channel = await conn.createChannel();
    await channel.assertQueue('scanning_queue', {
        durable: true,
        arguments: { 'x-message-ttl': 86400000 }
    });
}

export async function getRabbitMQChannel(): Promise<Channel> {
    if (!channel) throw new Error('Channel not initialized. Call initRabbit first.');
    return channel;
}

export async function closeRabbitMQConnection() {
    if (channel) {
        await channel.close();
        console.log('RabbitMQ channel closed.');
    }
}