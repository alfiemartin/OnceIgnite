import * as React from "react"
import { GestureResponderEvent, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/Ionicons"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
}

export interface EasyIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
  size?: number
  onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
}

export interface TabIconProps {
  color: string
  icon: string
}

export const TabIcon = ({ color, icon }: TabIconProps) => {
  return (
    <View style={{ width: 60, height: 60 }}>
      <Icon name={icon} size={30} color={color} style={{ alignSelf: "flex-start" }} />
    </View>
  )
}

export const getTabIcon = (color: string, icon: string) => {
  return <TabIcon color={color} icon={icon} />
}

/**
 * Describe your component here
 */
export const EasyIcon = observer(function EasyIcon(props: EasyIconProps) {
  const { style, name, size = 40, onPress } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={name} size={size} />
      </TouchableOpacity>
    </View>
  )
})
