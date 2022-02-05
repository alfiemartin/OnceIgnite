import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ScrollView, ScrollViewProps, View, ViewStyle } from "react-native"
import { EasyIcon, ImageBox, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  paddingHorizontal: spacing[3],
}

const SCROLL_VIEW: ViewStyle = {
  flex: 1,
}

export const ProfileScreen = observer(function ProfileScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  return (
    <Screen style={ROOT}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          preset="default"
          text="Alfie"
          style={{ textAlign: "center", alignSelf: "center", fontSize: 20 }}
        />
        <EasyIcon name="cog" color={color.primary} />
      </View>
      <ScrollView style={SCROLL_VIEW}>
        <ImageBox image={profiles[0].image} text="explorer image" />
        <ImageBox image={profiles[1].image} text="Matches profile" />
      </ScrollView>
    </Screen>
  )
})
