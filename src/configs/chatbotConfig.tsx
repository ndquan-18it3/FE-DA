import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig'
import { IMessage } from 'react-chatbot-kit/build/src/interfaces/IMessages'

const helloMessage: IMessage = createChatBotMessage(`Xin chào!`, { loading: true, delay: 1000 })
const clientMessage: IMessage = createClientMessage('ABC', { loading: true, delay: 2000 })
const hello2Message: IMessage = createChatBotMessage(`Xin chào!`, { loading: true })

export const chatbotConfig: IConfig = {
  initialMessages: [helloMessage, clientMessage, hello2Message],
  customComponents: {
    botAvatar: () => <i className='bi bi-robot bot-avatar' />
  }
}
