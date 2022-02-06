import { ViewStyle } from "react-native"

export * from "./color"
export * from "./spacing"
export * from "./typography"
export * from "./timing"

export const SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.39,
  shadowRadius: 8.3,

  elevation: 13,
}
