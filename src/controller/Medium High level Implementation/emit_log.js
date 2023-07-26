var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});


/***
 * Exchanges

In previous parts of the tutorial we sent and received messages to and from a queue. Now it's time to introduce the full messaging model in Rabbit.

Let's quickly go over what we covered in the previous tutorials:

    A producer is a user application that sends messages.
    A queue is a buffer that stores messages.
    A consumer is a user application that receives messages.

The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue. Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.

Instead, the producer can only send messages to an exchange. An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues. The exchange must know exactly what to do with a message it receives. Should it be appended to a particular queue? Should it be appended to many queues? Or should it get discarded. The rules for that are defined by the exchange type.

There are a few exchange types available: direct, topic, headers and fanout. We'll focus on the last one -- the fanout. Let's create an exchange of this type, and call it logs:

The fanout exchange is very simple. As you can probably guess from the name, it just broadcasts all the messages it receives to all the queues it knows. And that's exactly what we need for our logger.
 */