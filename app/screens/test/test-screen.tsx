import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { DualProfileCardLoader, Screen, Text } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const TestScreen = observer(function TestScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT}>
      <Text preset="header" text="Test Screen" />
    </Screen>
  )
})
