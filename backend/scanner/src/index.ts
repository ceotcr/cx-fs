import { startScanConsumer } from './utils/queue.consumer';

process.on('SIGTERM', async () => {
    console.log('Worker shutting down...');
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Worker interrupted...');
    process.exit(0);
});

startScanConsumer().catch(console.error);