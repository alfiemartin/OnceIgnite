import * as React from "react"
import { ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const BG_GRADIENT: ViewStyle = { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }

export interface GradientBackgroundProps {
  colors: string[]
}

export function GradientBackground(props: GradientBackgroundProps) {
  return (
    <LinearGradient
      locations={[0, 0.05]}
      start={[0, 0]}
      end={[1, 0]}
      colors={props.colors}
      style={BG_GRADIENT}
    />
  )
}
