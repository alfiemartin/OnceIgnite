import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Button, ProfileCard } from ".."
import { useStores } from "../../models"
import { useEffect, useState } from "react"
import { useSharedValue, withTiming } from "react-native-reanimated"

const CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
}

export interface DualProfileCardLoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const DualProfileCardLoader = observer(function DualProfileCardLoader(
  props: DualProfileCardLoaderProps,
) {
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)

  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore
  const initialCardState = [
    {
      cardId: 0,
      infront: true,
      counter: 0,
      scale: useSharedValue(1),
    },
    {
      cardId: 1,
      infront: false,
      counter: 1,
      scale: useSharedValue(0.9),
    },
  ]
  const [cardData, setCardData] = useState(initialCardState)

  useEffect(() => {
    ;(async () => {
      await profileCardStore.getProfileCards()
    })()
  }, [])

  const updateCardUi = (cardId: number) => {
    setCardData((oldData) => {
      const noMoreProfiles = oldData.some(({ counter }) => {
        return counter >= profiles.length - 2
      })

      if (noMoreProfiles) {
        return initialCardState
      }

      return oldData.map((card) => {
        return {
          ...card,
          infront: !card.infront,
          counter: card.infront ? card.counter + 2 : card.counter,
        }
      })
    })
  }

  return (
    <View style={styles}>
      {cardData.map((card) => {
        return (
          <ProfileCard
            key={card.cardId}
            data={profiles[card.counter]}
            cardId={card.cardId}
            inFront={card.infront}
            updateCardsUi={updateCardUi}
            scale={card.scale}
          />
        )
      })}
    </View>
  )
})
