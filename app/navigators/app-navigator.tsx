/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, ViewStyle } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { ChatScreen, ExplorerScreen, MatchesScreen, ProfileScreen, TestScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { color } from "../theme"
import { TabIcon } from "../components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  profile: undefined
  explorer: undefined
  matches: undefined
  tabBar: undefined
  chat: undefined
  test: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<NavigatorParamList>()
const Tab = createMaterialTopTabNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "vertical",
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
      initialRouteName="tabBar"
    >
      <Stack.Screen name="tabBar" component={AppTabBar} />
      <Stack.Screen name="chat" options={{}} component={ChatScreen} />
    </Stack.Navigator>
  )
}

const AppTabBar = () => {
  const inset = useSafeAreaInsets()

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarItemStyle: { marginBottom: inset.bottom },
    tabBarIndicator: () => null,
    tabBarContentContainerStyle: {
      backgroundColor: color.palette.black, //tab bar background
    },
    tabBarLabel: () => null,
    tabBarInactiveTintColor: color.palette.offWhite,
    tabBarActiveTintColor: color.palette.orange,
  }

  const parentStyles: ViewStyle = {
    backgroundColor: color.palette.black,
  }

  return (
    <Tab.Navigator tabBarPosition="bottom" style={parentStyles} screenOptions={screenOptions}>
      <Tab.Screen
        name="explorer"
        component={ExplorerScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="ios-disc-outline" /> }}
      />
      <Tab.Screen
        name="matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} icon="chatbox-ellipses-outline" />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="person-outline" /> }}
      />
      <Tab.Screen
        name="test"
        component={TestScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="build-outline" /> }}
      />
    </Tab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["matches", "explorer", "profile"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
