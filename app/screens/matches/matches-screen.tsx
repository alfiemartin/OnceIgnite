import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ListRenderItemInfo, ViewStyle } from "react-native"
import { ChatPreview, ProfileCard, Screen, Text } from "../../components"
import { color } from "../../theme"
import { FlatList } from "react-native-gesture-handler"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const MatchesScreen = observer(function MatchesScreen() {
  // Pull in one of our MST stores
  const { profileCardStore } = useStores()
  const profiles = profileCardStore.profiles

  return (
    <Screen style={ROOT}>
      <Text preset="header" text="Matches" />
      <FlatList
        data={profiles}
        renderItem={({ item, index }) => {
          return <ChatPreview key={index} name={item.name} image={item.image} />
        }}
      />
    </Screen>
  )
})
