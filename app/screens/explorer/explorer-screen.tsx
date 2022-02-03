import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { DualProfileCardLoader, Screen } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CARD_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.deepPurple,
  flex: 1,
}

export const ExplorerScreen = observer(function ExplorerScreen(props) {
  return (
    <Screen style={ROOT}>
      <View style={CARD_CONTAINER}>
        <DualProfileCardLoader />
      </View>
    </Screen>
  )
})
