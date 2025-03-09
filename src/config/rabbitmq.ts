import amqp from "amqplib";


const connectRabbitMQ = async () => {
//   const connection = await amqp.connect("amqp://localhost"); // RabbitMQ server
  const  connection = await amqp.connect(process.env.rmq!); // RabbitMQ server

  const channel = await connection.createChannel();

  return channel;
};
const mqServerChannel =  connectRabbitMQ();
// export default mqServerChannel;
export default connectRabbitMQ;
