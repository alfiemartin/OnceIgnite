import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Button, ProfileCard } from ".."
import { useStores } from "../../models"
import { useEffect, useState } from "react"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
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

  const [localProfileData, setLocalProfileData] = useState(profiles)
  const [cardData, setCardData] = useState([
    {
      infront: false,
      counter: 1,
    },
    {
      infront: true,
      counter: 0,
    },
  ])

  useEffect(() => {
    ;(async () => {
      await profileCardStore.getProfileCards()
      setLocalProfileData(profiles)
    })()
  }, [])

  // const updateZIndex = (infront, cardId) => {
  //   if()
  // }

  const updateCardUi = (cardId) => {
    const { infront, counter } = cardData[cardId]

    if (infront) {
      //update to next in data
    } else {
      //do not update simply bring to front
    }

    // const newCardData = cardData.map(({ infront, counter }) => {
    //   return {
    //     infront: !infront,
    //     counter,
    //   }
    // })
  }

  return (
    <View style={styles}>
      <ProfileCard data={localProfileData[1]} cardId={0} />
      <ProfileCard data={localProfileData[0]} cardId={1} />
      <Button onPress={() => updateCardUi(0)} />
    </View>
  )
})

//need to alternate which card is shown each swipe
//when a swipe occures, that card goes to the back, new data loaded into it
