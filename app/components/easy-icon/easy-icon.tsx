import * as React from "react"
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/Ionicons"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

export interface EasyIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
  size?: number
  color?: ColorValue | number
  onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
}

export interface TabIconProps {
  color: string
  icon: string
}

export const TabIcon = ({ color, icon }: TabIconProps) => {
  return <Icon name={icon} size={25} color={color} style={{ alignSelf: "flex-start" }} />
}

/**
 * Describe your component here
 */
export const EasyIcon = observer(function EasyIcon(props: EasyIconProps) {
  const { style, name, size = 30, onPress, color = "black" } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
})
