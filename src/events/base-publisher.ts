import { Admin, Kafka, Producer } from "kafkajs";
import { Subjects } from "./subjects";

interface Event{
  subject : Subjects;
  data : any
}

export abstract class Publisher<T extends Event>{
  private client : Admin;
  private producer :Producer;
  abstract topicName : T["subject"];  
  
  constructor(kafka:Kafka){
    this.client = kafka.admin();
    this.producer = kafka.producer();
  }
  
  async connectProducer() {
    await this.producer.connect();
    console.log("Producer connected ");
  }

  setupTopic = async () => {
    await this.client.connect();
    await this.client.createTopics({
      topics: [
        {
          topic: this.topicName,
          numPartitions: 3,         // Number of partitions (adjust as needed)
          replicationFactor: 1,     // Ensure compatibility with a single broker
        },
      ],
    });
    await this.client.disconnect();
  }

  async publishMessage(message: T["data"]) {
    try {
      await this.producer.send({
        topic: this.topicName,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`Published message to ${this.topicName}:`, message);
    } catch (error) {
      console.error("Error in publishing:", error);
    }
  }

  async disconnectProducer() {
    await this.producer.disconnect();
    console.log("Producer disconnected");
  }
} 