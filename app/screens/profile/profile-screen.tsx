import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ProfileScreen = observer(function ProfileScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Alfie" style={{ textAlign: "center" }} />
      <View style={{ height: 100 }}>
        <ImageBackground style={{ flex: 1 }} source={{ uri: profiles[0].image }}></ImageBackground>
      </View>
    </Screen>
  )
})
