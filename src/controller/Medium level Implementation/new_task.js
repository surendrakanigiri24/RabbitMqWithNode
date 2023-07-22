var amqp = require('amqplib/callback_api');


const rabbitTaskOne = () => {
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
                var msg = process.argv.slice(2).join(' ') || "Hello World!";

                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(msg), {
                    persistent: true
                });
                console.log(" [x] Sent '%s'", msg);
            });
                setTimeout(function() {
                    connection.close();
                    process.exit(0)
                }, 500);
            });
    }
    catch(error){
        console.error("I am the error from rabbit send" +error);
        throw error;
    }
}

rabbitTaskOne();


/** Notes
 * persistent : true
    * By default, RabbitMQ messages are transient, which means that they are kept in memory and may be lost if the server restarts or crashes. However, in scenarios where you want to ensure that critical messages are not lost and must be reliably delivered even if RabbitMQ restarts, you can set the persistent option to true.
 */