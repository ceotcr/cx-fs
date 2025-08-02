There are 2 directories.
- express-be
- scanner

Separated core backend from scanner to promote scalability.

## Setup Instructions

1. change dir - `cd express-be` in one terminal and `cd scanner` in another follow below steps for both dirs
2. Perform `npm i`
3. Requires - MongoDB connection url - [see mongodb atlas](https://www.mongodb.com/atlas), RabbitMQ Server Running - [see docs](https://www.rabbitmq.com/docs/download)
4. Check .env.example and create `.env` file
5. RabbitMQ server has to be running to continue to work. Try dev server via `npm run dev` or build `npm run build` and run `npm start` 
