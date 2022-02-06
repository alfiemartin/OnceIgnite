import React from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { EasyIcon, ImageBox, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.almostWhite,
  flex: 1,
  paddingHorizontal: spacing[3],
  marginBottom: 0,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const SCROLL_VIEW: ViewStyle = {
  flex: 1,
}

const TEXT: TextStyle = {
  textAlign: "center",
  alignSelf: "center",
  fontSize: 24,
  fontWeight: "bold",
  marginTop: 2,
}

export const ProfileScreen = observer(function ProfileScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  return (
    <Screen style={ROOT}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text preset="default" text="Alfie" style={TEXT} />
        <EasyIcon name="settings-sharp" size={40} color={color.primary} />
      </View>
      <ScrollView style={SCROLL_VIEW}>
        <ImageBox image={profiles[0].image} text="Explorer Profile" />
        <ImageBox image={profiles[1].image} text="Matches profile" />
      </ScrollView>
    </Screen>
  )
})
