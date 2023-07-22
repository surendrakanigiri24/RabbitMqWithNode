var amqp = require('amqplib/callback_api');



const worker = () => {
    try{
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'task_queue';

                channel.assertQueue(queue, {
                    durable: true
                });

                channel.prefetch(1);
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                channel.consume(queue, function(msg) {
                var secs = msg.content.toString().split('.').length - 1;

                console.log(" [x] Received %s", msg.content.toString());
                setTimeout(function() {
                    console.log(" [x] Done");
                    channel.ack(msg);
                }, secs * 1000);
                }, {
                // manual acknowledgment mode,
                // see ../confirms.html for details
                    noAck: false
                });
            });
        });
    }
    catch(error){
        console.error("I am the error from rabbit receive" +error);
        throw error;
    }
}

worker();

/**channel.prefetch(1);
    * In order to defeat that we can use the prefetch method with the value of 1. This tells RabbitMQ not to give more than one message to a worker at a time. Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one. Instead, it will dispatch it to the next worker that is not still busy.
 */

// Refered url: https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html