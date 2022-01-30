import * as React from "react"
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  ImageStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated"
import { EasyIcon } from "../easy-icon/easy-icon"

export interface ProfileCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: {
    name: string
    image: string
  }
  styles?: StyleProp<ViewStyle>
  updateCardsUi?: () => void
}

const aSwipeConfig: WithTimingConfig = {
  duration: 150,
}
const instantTiming: WithTimingConfig = {
  duration: 0,
}

/**
 * Describe your component here
 */
export const ProfileCard = observer(function ProfileCard(props: ProfileCardProps) {
  const { style, data, styles: viewStyles, updateCardsUi } = props
  const styles = Object.assign({}, CONTAINER, style)

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const swipeTranslationX = useSharedValue(0)
  const swipeTranslationY = useSharedValue(0)
  const swipeScale = useSharedValue(1)
  const swipeRotation = useSharedValue(0)

  const finishSwipeAnimation = () => {
    "worklet"
    const right = swipeTranslationX.value > 0

    swipeTranslationX.value = withSequence(
      withTiming(right ? screenWidth * 1.5 : -screenWidth * 1.5, {
        duration: 50,
      }),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) runOnJS(updateCardsUi)()
      }),
    )

    swipeTranslationY.value = withDelay(50, withTiming(screenHeight, instantTiming))
    swipeScale.value = withDelay(50, withTiming(0.1, instantTiming))

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 50 }),
      withTiming(0, instantTiming),
    )
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      swipeTranslationX.value = event.translationX
      swipeRotation.value = interpolate(event.translationX, [0, screenWidth], [0, 45])
    },
    onEnd: () => {
      if (Math.abs(swipeTranslationX.value) > screenWidth * 0.6) {
        finishSwipeAnimation()
        return
      }

      swipeTranslationX.value = withTiming(0, aSwipeConfig)
      swipeRotation.value = withTiming(0, aSwipeConfig)
    },
  })

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: swipeTranslationX.value,
        },
        {
          translateY: swipeTranslationY.value,
        },
        {
          scale: swipeScale.value,
        },
        {
          rotate: `${swipeRotation.value}deg`,
        },
      ],
    }
  })

  const swipeInDirection = (direction: string) => {
    const right = direction === "right"

    swipeTranslationX.value = withSequence(
      withTiming((right ? screenWidth : -screenWidth) * 1.3, aSwipeConfig),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) runOnJS(updateCardsUi)()
      }),
    )

    swipeTranslationY.value = withDelay(
      aSwipeConfig.duration as number,
      withTiming(screenHeight, instantTiming),
    )

    swipeScale.value = withDelay(aSwipeConfig.duration as number, withTiming(0.8, instantTiming))

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, aSwipeConfig),
      withTiming(0, instantTiming),
    )
  }

  const bringNewCard = () => {
    swipeTranslationY.value = withTiming(0, { duration: 250 })
    swipeScale.value = withTiming(1, { ...aSwipeConfig, easing: Easing.out(Easing.exp) })
  }

  return (
    <PanGestureHandler onGestureEvent={data && gestureHandler}>
      <Animated.View style={[CONTAINER, aSwipeStyles]}>
        <ImageBackground
          onLoad={bringNewCard}
          source={{ uri: data && data.image }}
          style={MAIN_IMAGE_CONTAINER}
          imageStyle={MAIN_IMAGE}
        >
          <Animated.View style={SWIPE_IND_CONTAINER}>
            <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❤️</Text>
          </Animated.View>
          <Animated.View style={SWIPE_IND_CONTAINER}>
            <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❌</Text>
          </Animated.View>
        </ImageBackground>
        {data && (
          <View style={CHOICES_CONTAINER}>
            <EasyIcon name="ios-close-circle" onPress={() => swipeInDirection("left")} />
            <EasyIcon name="ios-heart-half" />
            <EasyIcon name="heart" onPress={() => swipeInDirection("right")} />
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  position: "absolute",
  padding: 20,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: "hidden",
  borderRadius: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}

const MAIN_IMAGE_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: "#fbcfe8",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const MAIN_IMAGE: ImageStyle = {
  margin: 2,
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: "#fce7f3",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const CHOICES_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#fce7f3",
  padding: 10,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const SWIPE_IND_CONTAINER: ViewStyle = {
  position: "absolute",
  display: "none",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
}
