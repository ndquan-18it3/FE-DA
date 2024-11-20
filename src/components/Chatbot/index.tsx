import { GoogleGenerativeAI } from '@google/generative-ai'
import React, { useEffect } from 'react'
import Chatbot, { createChatBotMessage as createChatBotMessageCustom } from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig'
import { IMessage } from 'react-chatbot-kit/build/src/interfaces/IMessages'
import './index.css'
import Markdown from 'react-markdown'

const apiKey = import.meta.env.VITE_CHAT_BOT_API_KEY?.toString()
const genAI = new GoogleGenerativeAI(apiKey)
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain'
}
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const helloMessage: IMessage = createChatBotMessageCustom(`Xin chào!`, { loading: true })
const config: IConfig = {
  initialMessages: [helloMessage],
  customComponents: {
    botAvatar: () => <i className='bi bi-robot bot-avatar' />,
    botChatMessage(props) {
      const markdown = props.message
      return <Markdown className='chatbot-markdown'>{markdown}</Markdown>
    }
  }
}

interface IActions {
  handleReply: (message: string) => void
}

export const ChatBot = () => {
  const [visible, setVisible] = React.useState<boolean>(false)

  return (
    <div className='chatbot'>
      {visible && (
        <div className='chatbot-box'>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText='Nhắn tin cần tư vấn...'
            headerText='ENT Bot'
            validator={(input) => !!input}
          />
        </div>
      )}
      <div className='chatbot-icon' onClick={() => setVisible((prev) => !prev)}>
        <i className='bi bi-chat-dots-fill' />
      </div>
    </div>
  )
}

const MessageParser = ({ children, actions }: { children: React.ReactElement; actions: IActions }) => {
  const parse = (message: string) => {
    if (!message) return
    actions.handleReply(message)
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions
        })
      })}
    </div>
  )
}

const ActionProvider = (props: any) => {
  const { createChatBotMessage, setState, children } = props
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    const form = document.querySelectorAll(
      '.react-chatbot-kit-chat-input-form button ,.react-chatbot-kit-chat-input-form input'
    )
    form.forEach((e: any) => (e.disabled = isLoading))
  }, [isLoading])

  const handleReply = async (message: string) => {
    let text = 'Đang phản hồi ...'
    const loadingMessage: IMessage = createChatBotMessage(text, { loading: true })
    setIsLoading(true)
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, loadingMessage]
    }))

    const response = await genMessage(message)
    const botMessage = createChatBotMessage(response, { loading: true })
    setIsLoading(false)
    setState((prev: any) => {
      const newMessages = [...prev.messages].map((m) => (m.id === loadingMessage.id ? botMessage : m))
      return {
        ...prev,
        messages: newMessages
      }
    })
  }
  const parse = (message: string) => {
    console.log(message)
  }

  const genMessage = async (prompt: string) => {
    try {
      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      return 'Có lỗi xảy ra, vui lòng thử lại sau!'
    }
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: { handleReply }
        })
      })}
    </div>
  )
}

export default MessageParser
