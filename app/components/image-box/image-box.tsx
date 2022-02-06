import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { color, SHADOW, spacing, typography } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { GradientBackground } from ".."

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  marginBottom: spacing[5],
  height: 200,
  // ...SHADOW,
  // shadowColor: "#000",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  color: color.primary,
}

const IMAGE_BACKGROUND: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  padding: spacing[2],
}

export interface ImageBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: string
  text?: string
}

const BORDER_RADIUS = 10

/**
 * A fixed height box with a background image
 */
export const ImageBox = observer(function ImageBox(props: ImageBoxProps) {
  const { style, image, text } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={[styles]}>
      <TouchableOpacity style={{ flex: 1 }} containerStyle={{ flex: 1 }}>
        <ImageBackground
          style={IMAGE_BACKGROUND}
          imageStyle={{ borderRadius: BORDER_RADIUS }}
          source={{ uri: image }}
        >
          <GradientBackground
            style={{ borderRadius: BORDER_RADIUS, transform: [{ scale: 1.1 }] }}
            colors={["transparent", color.palette.transBlack]}
            start={[0, 0.6]}
            end={[0, 1]}
          />
          {text && <Text style={TEXT}>{text}</Text>}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
})
