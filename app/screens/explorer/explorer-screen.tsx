import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { ProfileCard, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CARD_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.deepPurple,
  flex: 1,
}

export const ExplorerScreen = observer(function ExplorerScreen() {
  // Pull in one of our MST stores
  const { profileCardStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen style={ROOT}>
      <Text preset="header" text="Explorer" />
      <View style={CARD_CONTAINER}>
        <ProfileCard />
      </View>
    </Screen>
  )
})
