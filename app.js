const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'test_queue';
const RABBITMQ_URL = 'amqp://127.0.0.1';

amqp.connect(RABBITMQ_URL, (err, connection) => {
  if (err) {
    console.error(`Failed to connect to RabbitMQ: ${err.message}`);
    process.exit(1);
  }

  connection.createChannel((err, channel) => {
    if (err) {
      console.error(`Failed to create channel: ${err.message}`);
      process.exit(1);
    }

    channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        console.log(`Message received: ${msg.content.toString()}`);
      },
      { noAck: true }
    );
  });
});

