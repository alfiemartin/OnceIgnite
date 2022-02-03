import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Button, ProfileCard } from ".."
import { useStores } from "../../models"
import { useEffect, useState } from "react"

const CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface DualProfileCardLoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const initialCardState = [
  {
    cardId: 0,
    infront: true,
    counter: 0,
  },
  {
    cardId: 1,
    infront: false,
    counter: 1,
  },
]

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
      <ProfileCard
        data={profiles[cardData[0].counter]}
        cardId={0}
        inFront={cardData[0].infront}
        updateCardsUi={updateCardUi}
      />
      <ProfileCard
        data={profiles[cardData[1].counter]}
        cardId={1}
        inFront={cardData[1].infront}
        updateCardsUi={updateCardUi}
      />
    </View>
  )
})

//need to alternate which card is shown each swipe
//when a swipe occures, that card goes to the back, new data loaded into it
