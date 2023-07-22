var amqp = require('amqplib/callback_api');


const rabbitSend = () => {
    try{
        amqp.connect('amqp://localhost', function(error0, connection) {
            if(error0){
                throw error0;
            }

            connection.createChannel(function(error1, channel) {   // Channel creation
                if(error1){
                    throw error1;
                }

                var queue = 'Hello';
                var msg = 'Hello world';

                channel.assertQueue(queue, {
                    durable : false
                })

                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent is %s", msg);
            });

            setTimeout(function() {       // Connection close
                connection.close();
                process.exit(0);
            }, 500);
        });
    }
    catch(error){
        console.error("I am the error from rabbit send" +error);
        throw error;
    }
}

module.exports = rabbitSend();