var amqp = require('amqplib/callback_api');



const rabbitReceive = () => {
    try{
        amqp.connect('amqp://localhost', function(error0, connection) {
            if(error0){
                throw error0;
            }

            connection.createChannel( (error1, channel) => {
                if(error1){
                    throw error1;
                }

                var queue = 'Hello';

                channel.assertQueue(queue,{
                    durable : false
                })

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

                channel.consume(queue, (msg) => {
                    console.log(" [x] Received %s", msg.content.toString())
                },{
                    noAck : true
                })
            })
        })
    }
    catch(error){
        console.error("I am the error from rabbit receive" +error);
        throw error;
    }
}

module.exports = rabbitReceive();


// Notes:
// 1. durable: true: This indicates that the queue is durable. If you declare a durable queue, RabbitMQ will save the queue to disk so that it can be restored after a server restart.
// durable: false: This indicates that the queue is non-durable. If you declare a non-durable queue, RabbitMQ will keep the queue in memory, and it will be lost if the server restarts or crashes.