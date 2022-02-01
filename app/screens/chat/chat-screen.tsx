import React, { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { GiftedChat, IMessage, User } from "react-native-gifted-chat"
import { mockProfileCardData } from "../../../mockData"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ChatScreen = observer(function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "from another dev",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: mockProfileCardData[0].image,
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: mockProfileCardData[0].image,
        },
      },
    ])
  }, [])

  const user: User = {
    _id: 3,
    avatar: mockProfileCardData[1].image,
    name: "alfie",
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <Screen style={ROOT}>
      {/* <GiftedChat messages={messages} user={user} onSend={onSend} /> */}
    </Screen>
  )
})
