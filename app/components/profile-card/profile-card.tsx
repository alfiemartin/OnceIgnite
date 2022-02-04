import * as React from "react"
import { Dimensions, ImageBackground, StyleProp, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated"
import { EasyIcon } from "../easy-icon/easy-icon"
import { useEffect } from "react"

export interface IUpdateCardUI {
  cardId: number
  onlyScale: boolean
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
  updateCardsUi?: (cardId?: number) => void
  cardId: number
  inFront: boolean
  scale: number
  scaleBackCard?: (scale: number) => void
  scaleFrontCard?: (scale: number) => void
}

type TSwipeDirection = "left" | "right"

const aSwipeConfig: WithTimingConfig = {
  duration: 300,
}
const instantTiming: WithTimingConfig = {
  duration: 0,
}

export const ProfileCard = observer(function ProfileCard(props: ProfileCardProps) {
  const {
    style,
    data,
    updateCardsUi,
    cardId,
    inFront,
    scale,
    scaleBackCard,
    scaleFrontCard,
  } = props
  const styles = Object.assign({}, CONTAINER, style)

  const screenWidth = Dimensions.get("screen").width

  const swipeTranslationX = useSharedValue(0)
  const swipeOpacity = useSharedValue(1)
  const swipeRotation = useSharedValue(0)

  const finishSwipeAnimation = () => {
    "worklet"
    const right = swipeTranslationX.value > 0

    swipeTranslationX.value = withSequence(
      withTiming(
        right ? screenWidth * 1.5 : -screenWidth * 1.5,
        {
          duration: 200,
        },
        () => runOnJS(scaleFrontCard)(0.9),
      ),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) runOnJS(updateCardsUi)()
      }),
    )

    swipeOpacity.value = withDelay(200, withTiming(0, instantTiming))

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 200 }),
      withTiming(0, instantTiming),
    )
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      swipeTranslationX.value = event.translationX
      swipeRotation.value = interpolate(event.translationX, [0, screenWidth], [0, 45])

      runOnJS(scaleBackCard)(interpolate(event.translationX, [0, screenWidth], [0.9, 1]))
    },
    onEnd: () => {
      if (Math.abs(swipeTranslationX.value) > screenWidth * 0.5) {
        finishSwipeAnimation()
        runOnJS(scaleBackCard)(1)
        return
      }

      runOnJS(scaleBackCard)(0.9)
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
          rotate: `${swipeRotation.value}deg`,
        },
        {
          scale: withTiming(scale, { duration: 150, easing: Easing.out(Easing.ease) }),
        },
      ],
      opacity: swipeOpacity.value,
    }
  })

  const swipeInDirection = (direction: TSwipeDirection) => {
    const right = direction === "right"

    swipeTranslationX.value = withSequence(
      withTiming((right ? screenWidth : -screenWidth) * 1.3, { duration: 300 }, () =>
        runOnJS(scaleFrontCard)(0.9),
      ),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) {
          runOnJS(updateCardsUi)(cardId)
        }
      }),
    )

    scaleBackCard(1)

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 300 }),
      withTiming(0, instantTiming),
    )

    swipeOpacity.value = withDelay(300, withTiming(0, instantTiming))
  }

  const bringNewCard = () => {
    swipeOpacity.value = withTiming(1, instantTiming)
  }

  return (
    <PanGestureHandler onGestureEvent={data && gestureHandler}>
      <Animated.View style={[CONTAINER, styles, aSwipeStyles, { zIndex: inFront ? 10 : 5 }]}>
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
