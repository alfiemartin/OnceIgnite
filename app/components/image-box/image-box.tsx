import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { GradientBackground } from ".."

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  marginBottom: spacing[5],
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  color: color.primary,
}

export interface ImageBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: string
  text?: string
}

/**
 * A fixed height box with a background image
 */
export const ImageBox = observer(function ImageBox(props: ImageBoxProps) {
  const { style, image, text } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={[styles, { height: 200 }]}>
      <TouchableOpacity style={{ flex: 1 }} containerStyle={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "flex-end", padding: spacing[2] }}
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: image }}
        >
          <GradientBackground
            colors={["transparent", color.palette.black]}
            start={[0, 0.6]}
            end={[0, 1]}
          />
          {text && <Text style={TEXT}>{text}</Text>}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
})
