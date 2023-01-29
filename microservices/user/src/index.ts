import amqplib from 'amqplib'
import { CreateUserCommand } from '@elikar/commands'

async function foo(): Promise<void> {
  const connection = await amqplib.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(CreateUserCommand.name)

  channel.consume(CreateUserCommand.name, (msg) => {
    if (!msg) return
    console.log(JSON.parse(msg.content.toString()))
    channel.ack(msg)
  })
  console.log('started')
}

foo()
