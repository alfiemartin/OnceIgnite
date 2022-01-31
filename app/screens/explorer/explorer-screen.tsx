import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, ViewStyle } from "react-native"
import { ProfileCard, Screen } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CARD_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.deepPurple,
  flex: 1,
}

export const ExplorerScreen = observer(function ExplorerScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  const [data, setData] = useState(profiles)

  useEffect(() => {
    ;(async () => {
      await profileCardStore.getProfileCards()
      setData(profiles)
    })()
  }, [])

  const updateCardsUi = () => {
    Image.prefetch(data[1].image)

    setData((old) => {
      let currentData = old.filter((_, i) => i != 0)

      if (currentData.length == 1) currentData = profiles

      return currentData as typeof profiles
    })
  }

  return (
    <Screen style={ROOT}>
      <View style={CARD_CONTAINER}>
        <ProfileCard data={data[0]} updateCardsUi={updateCardsUi} />
      </View>
    </Screen>
  )
})
