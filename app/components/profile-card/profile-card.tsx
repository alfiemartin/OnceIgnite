import * as React from "react"
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
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

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

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
    <View style={styles}>
      <PanGestureHandler onGestureEvent={data && gestureHandler}>
        <Animated.View style={[viewStyles ?? stylesOld.container, aSwipeStyles]}>
          <View style={[stylesOld.cardContainer, viewStyles]}>
            <ImageBackground
              onLoad={bringNewCard}
              source={{ uri: data && data.image }}
              style={[stylesOld.mainImage]}
              imageStyle={stylesOld.mainImageInner}
            >
              <Animated.View style={[stylesOld.swipeIndicatorContainer]}>
                <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❤️</Text>
              </Animated.View>
              <Animated.View style={[stylesOld.swipeIndicatorContainer]}>
                <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❌</Text>
              </Animated.View>
            </ImageBackground>
            {data && (
              <View style={[stylesOld.choicesContainer]}>
                {/* <SwipeIcon name='ios-close-circle' onPress={() => swipeInDirection("left")} />
              <SwipeIcon name='ios-heart-half' />
              <SwipeIcon name='heart' onPress={() => swipeInDirection("right")} /> */}
              </View>
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
})

const stylesOld = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    padding: 20,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainImage: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fbcfe8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mainImageInner: {
    margin: 2,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fce7f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fce7f3",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  swipeIndicatorContainer: {
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
  },
})
