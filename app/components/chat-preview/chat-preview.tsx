import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  backgroundColor: color.background,
  marginBottom: spacing[1],
  padding: spacing[1],
}

const PROFILE_IMAGE: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 5,
}

const NAME: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 18,
  fontWeight: "bold",
  color: color.primary,
}

const PREVIEW_TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const TEXT_CONTAINER: ViewStyle = {
  flex: 1,
  marginLeft: spacing[1],
  justifyContent: "space-between",
  paddingVertical: spacing[1],
}

export interface ChatPreviewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
  image: string
}

/**
 * Describe your component here
 */
export const ChatPreview = observer(function ChatPreview(props: ChatPreviewProps) {
  const { style, image, name } = props
  const styles = Object.assign({}, CONTAINER, style)

  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("chat" as any)}>
      <View style={styles}>
        <Image source={{ uri: image }} style={PROFILE_IMAGE} />
        <View style={TEXT_CONTAINER}>
          <Text style={NAME}>{name}</Text>
          <Text style={PREVIEW_TEXT}>Hey wys g</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})
