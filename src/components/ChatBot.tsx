import React, { useState, useEffect } from 'react'
import { Button } from '../../@/components/ui/button'
import { Input } from '../../@/components/ui/input'
import api from 'api/api'
import colors from 'app/colors'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export interface Message {
  text: string
  isUser: boolean
}

// export interface IChatBot {
//   text: string
// }

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Autoscroll to bottom when new messages are added

  const scrollToBottom = () => {
    const container = document.getElementById('message-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatMessageText = (text: string) => {
    const pattern = /(\d+\.\s[^\d]+|.+?(?=\d+\.\s|$))/g // Pattern will check for numbers followed by a period
    const formattedText = text.split(pattern)
    const filteredText = formattedText.filter((item) => item.trim() !== '')

    for (let i = 0; i < filteredText.length; i++) {
      // It'll loop the whole thing
      const currentItem = filteredText[i]

      // Check if the current item ends with a period. This is so that
      if (/^\d+\.\s/.test(currentItem)) {
        // Find the positions of all periods in the current item
        const periodPositions: number[] = []
        for (let j = 0; j < currentItem.length; j++) {
          if (currentItem[j] === '.') {
            periodPositions.push(j)
          }
        }

        // Check if there are at least two periods. First period is ignored because it's the number followed by a period.
        if (periodPositions.length >= 2) {
          // Insert a line break at the position of the second period
          const indexOfSecondPeriod = periodPositions[1]
          filteredText[i] =
            currentItem.slice(0, indexOfSecondPeriod + 1) +
            '<br /> <br />' +
            currentItem.slice(indexOfSecondPeriod + 1)
        }
      }
    }

    const joinedText = filteredText.join('<br />')
    return joinedText
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const keyPress = (e: any) => {
    if (e.keyCode === 13 && !loading) {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (inputText.trim() === '') return
    const newUserMessage: Message = { text: inputText, isUser: true }
    setLoading(true)
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputText('')
    botResponse()
  }

  const handleBotMessage = (response: string) => {
    const formattedResponse = formatMessageText(response)
    const newBotMessage: Message = { text: formattedResponse, isUser: false }
    setMessages((prevMessages) => [...prevMessages, newBotMessage])
    setLoading(false)
  }

  const handleClearMessages = () => {
    setMessages([])
  }

  //uncomment the part below and comment the 'chatTest'
  //Go to the api.ts file and uncomment the correct line
  const botResponse = async () => {
    try {
      const response = await api.post('chatTest')
      // const response = await api.post('chat', {
      //   "user_message": inputText
      // });
      if (response) {
        handleBotMessage(response.data.bot_message)
      }
    } catch (error) {
      console.error('API error:', error)
      // handleBotMessage("Something went wrong!. Try again later.")
      handleBotMessage(
        'this is just an example paragraph, so you will need 5 ingredients to make this product. 1. rice 2. eggs 3. meet 4. milk 5. apples. this is just an example paragraph, so you will need 5 ingredients to make this product. 1. rice 2. eggs 3. meet 4. milk 5. apples. so with these you can make a good meal. this is just an example paragraph, so you will need 5 ingredients to make this product. 1. rice 2. eggs 3. meet 4. milk 5. apples. so with these you can make a good meal.',
      )
    }
  }

  return (
    <div
      className={` mt-6 xl:mt-0 w-full sm:w-[400px] border ${colors.normalText} border-gray-200 pt-2 ${colors.backgroundBox} rounded-lg overflow-hidden`}
    >
      <div id="message-container" className="h-96 pl-6 pr-6 pb-1 rounded-md overflow-auto">
        <div className="">
          {messages.length ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex pt-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser ? (
                  <Avatar className="mr-2">
                    {/* <AvatarImage src={botIsmage} alt="@shadcn" /> */}
                    <AvatarFallback className="bg-gray-200">B</AvatarFallback>
                  </Avatar>
                ) : (
                  ''
                )}
                <div
                  className={`w-10/12 p-4 mb-2 ${
                    message.isUser
                      ? `rounded-tl-xl break-words rounded-br-xl rounded-bl-xl ${colors.primary} text-left text-white`
                      : `rounded-tr-xl rounded-br-xl rounded-bl-xl ${colors.dropDownBg} text-left`
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                >
                  {/* {message.text} */}
                </div>
                {message.isUser ? (
                  <Avatar className="ml-2">
                    {/* <AvatarImage src={userImage} alt="@shadcn" /> */}
                    <AvatarFallback className={`${colors.primary}`}>U</AvatarFallback>
                  </Avatar>
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <div className="pt-6 text-center">
              <div className="text-3xl pb-4">
                Welcome to <span className={`font-bold ${colors.colorHeading}`}>Converse</span>{' '}
              </div>
              Hi, How can I help you?
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex">
            <Avatar className="mr-2">
              {/* <AvatarImage src={botIsmage} alt="@shadcn" /> */}
              <AvatarFallback className="bg-gray-200">B</AvatarFallback>
            </Avatar>
            Typing...
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex w-full p-2 rounded-lg">
        <div className="flex w-full items-center space-x-2">
          <Input
            value={inputText}
            onChange={handleInputTextChange}
            type="textarea"
            placeholder="Type something"
            className={`w-100% mr-4 ${colors.inputFeild} ${colors.normalText}`}
            // onKeyPress={keyPress}
            onKeyDown={keyPress}
          />
        </div>
        <Button
          className={`m-1 ml-1 ${colors.noButton}`}
          onClick={handleClearMessages}
          disabled={loading}
        >
          Erase
        </Button>
        <Button
          className={`m-1 ${colors.okButton}`}
          type="submit"
          onClick={handleSendMessage}
          disabled={loading}
        >
          Ask
        </Button>
      </div>
    </div>
  )
}
