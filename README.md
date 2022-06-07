# Markdown Note-Taking App

## Create an expo app

- `expo init animated-todo -t expo-template-blank-typescript`

  - App name: animated-todo

  - Template: expo-template-blank-typescript

## Initial Set Up

- `cd animated-todo`

- Modify `tsconfig.json`

  - ```json
    {
      "extends": "expo/tsconfig.base",
      "compilerOptions": {
        "strict": true,
        "allowSyntheticDefaultImports": true,
        "jsx": "react-native",
        "lib": ["dom", "esnext"],
        "moduleResolution": "node",
        "noEmit": true,
        "skipLibCheck": true,
        "resolveJsonModule": true
      }
    }
    ```

- Create `prettier.config.js`

  - ```js
    const options = {
      arrowParens: 'avoid',
      singleQuote: true,
      bracketSpacing: true,
      endOfLine: 'lf',
      semi: false,
      tabWidth: 2,
      trailingComma: 'none'
    }
    module.exports = options
    ```

    - `arrowParens: "<always | avoid>"`: Include parentheses around a sole arrow function parameter

    - `bracketSpacing: <bool>`: Print spaces between brackets in object literals.

    - `endOfLine: "<lf|crlf|cr|auto>"`

      - "lf" – Line Feed only (\n), common on Linux and macOS as well as inside git repos

      - "crlf" - Carriage Return + Line Feed characters (\r\n), common on Windows

      - "cr" - Carriage Return character only (\r), used very rarely

      - "auto" - Maintain existing line endings (mixed values within one file are normalized by looking at what's used after the first line)

    - `trailingComma: "<es5|none|all>"`: Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.)

      - "es5" - Trailing commas where valid in ES5 (objects, arrays, etc.). No trailing commas in type parameters in TypeScript.

      - "none" - No trailing commas.

      - "all" - Trailing commas wherever possible (including function parameters and calls). To run, JavaScript code formatted this way needs an engine that supports ES2017 (Node.js 8+ or a modern browser) or downlevel compilation. This also enables trailing commas in type parameters in TypeScript (supported since TypeScript 2.7 released in January 2018).

- Install dependencies

  - ```bash
    yarn add -D prettier
    yarn add @react-navigation/native @react-navigation/drawer react-native-screens
    yarn add native-base react-native-svg styled-components styled-system
    yarn add moti react-native-reanimated
    yarn add react-native-safe-area-context nanoid expo-linking
    ```

  - Required packages in React Native project

    - `yarn add @react-navigation/native`: React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app.

    - `yarn add react-native-screens react-native-safe-area-context`: install dependencies into a bare React Native project

  - Drawer Navigation

    - `yarn add @react-navigation/drawer`: Common pattern in navigation is to use drawer from left side for navigation between screens.

    - ```js
      import { createDrawerNavigator } from '@react-navigation/drawer'

      const Drawer = createDrawerNavigator()

      return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      )
      ```

  - `native-base`: Universal Components for React and React Native.

  - `react-native-svg`: It provides SVG support to React Native on iOS and Android, and a compatibility layer for the web.

  - `styled-components`: It allows you to write actual CSS code to style your components.

  - `styled-system`: It lets you quickly build custom UI components with constraint-based style props based on scales defined in your theme.

  - `moti`: It is the universal animation package for React Native.

  - `react-native-reanimated`: It provides a more comprehensive, low level abstraction for the Animated library API to be built on top of and hence allow for much greater flexibility especially when it comes to gesture based interactions.

  - ~~`shortid`~~: It is deprecated, because the architecture is unsafe. we instead recommend Nano ID, which has the advantage of also being significantly faster than shortid.

  - `yarn add nanoid`: Nano ID is quite comparable to UUID v4 (random-based).

    - ```tsx
      import { nanoid } from 'nanoid'

      const user_id = nanoid() // "V1StGXR8_Z5jdHi6B-myT"
      ```

  - ~~`@types/shortid`~~

  - ~~`@types/nanoid`~~: nanoid provides its own type definitions, so you don't need @types/nanoid installed!

  - `expo-linking`: to handle deep links

- Test

  - `yarn start`

  - On `App.tsx`, add `<Text>Hello</Text>` inside `<View></View>`

- Troubleshooting the Error

  Error:

  > Failed building JavaScript bundle.
  >
  > App.tsx: [BABEL] D:\study_program\rn-inkdrop\animated-todo\App.tsx: You gave us a visitor for the node type TSInstantiationExpression but it's not a valid type
  >
  > `expo start` returned warning
  > WARNING: expo-cli has not yet been tested against Node.js v16.13.2. If you encounter any issues, please report them to https://github.com/expo/expo-cli/issues

  Checked expo version, `expo --version`

  > returned 4.4.3

  Reinstall expo-cli to the latest version

  - `npm install -g expo-cli`

  - `expo --version`
    > returned 5.4.6

## Prepare to use NativeBase

- Create directories

  - `/src/components`, `/src/screens`, `/src/assets`

- Create `/src/components/app-container.tsx`

  - ```tsx
    import * as React from 'react'
    import { NavigationContainer } from '@react-navigation/native'
    import { NativeBaseProvider } from 'native-base'

    type Props = {
      children: React.ReactNode
    }

    export default function AppContainer(props: Props) {
      return (
        <NavigationContainer>
          <NativeBaseProvider>{props.children}</NativeBaseProvider>
        </NavigationContainer>
      )
    }
    ```

- Create `/src/theme.ts`

  - ```ts
    import { extendTheme } from 'native-base'

    const config = {
      useSystemColorMode: false,
      initialColorMode: 'light'
    }

    const colors = {
      // Add new color
      primary: {
        50: '#eef2f6',
        100: '#cfd9e7',
        200: '#b1c1d8',
        300: '#92a9c9',
        400: '#7491b9',
        500: '#5578aa',
        600: '#446088',
        700: '#334866',
        800: '#223044',
        900: '#111822'
      }
    }

    export default extendTheme({ config, colors })
    ```

- On `/src/components/app-container.tsx`

  - ```tsx
    ...
    import theme from '../theme';
    ...
          <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
        ...
    ```

- On `/App.tsx`

  - ```tsx
    ...
    import AppContainer from './src/components/app-container';

    export default function App() {
    return (
      <AppContainer>
        ...
      </AppContainer>
    ```

## Add dark theme support

- Create `/src/screens/main.tsx`

  - ```tsx
    import * as React from 'react'
    import { Text, Box, Center, VStack } from 'native-base'

    export default function MainScreen() {
      return (
        <Center
          _dark={{ bg: 'blueGray.900' }}
          _light={{ bg: 'blueGray.50' }}
          px={4}
          flex={1}
        >
          <VStack space={5} alignItems="center">
            <Box>
              <Text>Hello</Text>
            </Box>
          </VStack>
        </Center>
      )
    }
    ```

- On `/App.tsx`

  - ```tsx
    ...
    import Main from './src/screens/main';
    ...
        <AppContainer>
          <Main />
        </AppContainer>
        ...
    ```

- Create `/src/components/theme-toggle.tsx`

  - ```tsx
    import React from 'react'
    import { Text, HStack, Switch, useColorMode } from 'native-base'

    export default function ThemeToggle() {
      const { colorMode, toggleColorMode } = useColorMode()
      return (
        <HStack space={2} alignItems="center">
          <Text>Dark</Text>
          <Switch
            isChecked={colorMode === 'light'}
            onToggle={toggleColorMode}
          ></Switch>
          <Text>Light</Text>
        </HStack>
      )
    }
    ```

- On `/src/screens/main.tsx`

  - ```tsx
    ...
    import {..., useColorModeValue} from 'native-base';
    import ThemeToggle from '../components/theme-toggle';
    ...
            <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
              <Text>Hello</Text>
            </Box>
            <ThemeToggle />
          ...
    ```

## Create SVG Checkmark

- Create `/src/components/animated-checkbox.tsx`

  - ```tsx
    import React, { useEffect, memo } from 'react'
    import Animated, {
      Easing,
      useSharedValue,
      useAnimatedProps,
      withTiming,
      interpolateColor
    } from 'react-native-reanimated'
    import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'

    const MARGIN = 10
    const vWidth = 64 + MARGIN
    const vHeight = 64 + MARGIN
    const outlineBoxPath =
      'M 48 63.5 L 16 63.5 C 15.96487045288086 63.49967956542969 12.04551029205322 63.44352722167969 8.194589614868164 61.49388885498047 C 5.95782995223999 60.36145782470703 4.177969932556152 58.81771087646484 2.904439926147461 56.905517578125 C 1.308969974517822 54.50991821289062 0.5 51.51366806030273 0.5 48 L 0.5 15.99999904632568 C 0.5000600218772888 15.9613094329834 0.528439998626709 12.04286861419678 2.463890075683594 8.193099021911621 C 3.58801007270813 5.957129001617432 5.129650115966797 4.177848815917969 7.04596996307373 2.904659032821655 C 9.447609901428223 1.309049010276794 12.46018028259277 0.4999989867210388 16 0.4999989867210388 L 48 0.4999989867210388 L 48.01026153564453 0.4999689757823944 C 48.17554092407227 0.4999689757823944 52.10235977172852 0.5225789546966553 55.94820022583008 2.488668918609619 C 58.14802169799805 3.613269090652466 59.89707183837891 5.155319213867188 61.14677047729492 7.071999073028564 C 62.70825958251953 9.466889381408691 63.5 12.47069931030273 63.5 15.99999904632568 L 63.5 48 C 63.49969100952148 48.03524780273438 63.44451141357422 51.9545783996582 61.495361328125 55.80546951293945 C 60.36322021484375 58.04219818115234 58.81954956054688 59.82204055786133 56.90721130371094 61.09555053710938 C 54.51139831542969 62.6910285949707 51.51457977294922 63.5 48 63.5 Z'

    const checkMarkPath =
      'M9,22.109s18.136,8.363,18.136,29.478C27.136,37.594,35.582,18.633,69.4,0'

    const AnimatedPath = Animated.createAnimatedComponent(Path)

    interface Props {
      checked?: boolean
    }
    const AnimatedCheckbox = (props: Props) => {
      const { checked } = props
      const checkmarkColor = '#000000'
      const highlightColor = '#ff0000'
      const outlineboxColor = '#000000'

      const progress = useSharedValue(0)
      useEffect(() => {
        progress.value = withTiming(checked ? 1 : 0, {
          duration: checked ? 300 : 100,
          easing: Easing.linear
        })
      }, [checked])

      const animatedBoxProps = useAnimatedProps(
        () => ({
          stroke: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1).factory()(progress.value),
            [0, 1],
            [outlineboxColor, highlightColor],
            'RGB'
          ),
          fill: interpolateColor(
            Easing.bezier(0.16, 1, 0.3, 1).factory()(progress.value),
            [0, 1],
            ['rgba(0,0,0,0)', highlightColor],
            'RGB'
          )
        }),
        [highlightColor, outlineboxColor]
      )

      return (
        <Svg
          viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(
            ' '
          )}
        >
          <AnimatedPath
            d={outlineBoxPath}
            strokeWidth={7}
            strokeLinejoin="round"
            strokeLinecap="round"
            animatedProps={animatedBoxProps}
          />
          <Path d={checkMarkPath} stroke={checkmarkColor} />
        </Svg>
      )
    }

    export default AnimatedCheckbox
    ```

- On `/screens/main.tsx`

  - ```tsx
    ...
    import AnimatedCheckbox from '../components/animated-checkbox';
    ...
          <VStack space={5} alignItems="center">
            <Box w="100px" h="100px">
              <AnimatedCheckbox />
            </Box>
    ```

- Error: Reanimated 2 failed to create a worklet, maybe you forgot to add Reanimated's babel plugin?

  - On `babel.config.js`, add `plugins: ['react-native-reanimated/plugin']`

  - `expo r -c`: In order to clear caches associated with the project

## Make the checkbox able to toggle

- On `/src/screens/main.tsx`

  - ```tsx
    import React, {useCallback, useState} from 'react';
    import {Pressable} from 'react-native';
    ...
    export default function MainScreen() {
      const [checked, setChecked]  = useState(false);
      const handlePressCheckbox = useCallback(() => {
        setChecked(prev => !prev)
      }, []);
      return (
        ...
            <Box w="100px" h="100px">
              <Pressable onPress={handlePressCheckbox} >
                <AnimatedCheckbox checked={checked} />
              </Pressable>
            </Box>
            ...
    ```

## Animate the Checkbox

- Create `/src/components/animated-stroke.tsx`

  - ```tsx
    import React, { useRef, useState } from 'react'
    import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated'
    import { Path, PathProps } from 'react-native-svg'

    interface AnimatedStrokeProps extends PathProps {
      progress: Animated.SharedValue<number>
    }

    const AnimatedPath = Animated.createAnimatedComponent(Path)

    const AnimatedStroke = ({
      progress,
      ...pathProps
    }: AnimatedStrokeProps) => {
      const [length, setLength] = useState(0)
      const ref = useRef<typeof AnimatedPath>(null)
      const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: Math.max(
          0,
          length -
            length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value) -
            0.1
        )
      }))

      return (
        <AnimatedPath
          animatedProps={animatedProps}
          // @ts-ignore
          onLayout={() => setLength(ref.current!.getTotalLength())}
          // @ts-ignore
          ref={ref}
          strokeDasharray={length}
          {...pathProps}
        />
      )
    }

    export default AnimatedStroke
    ```

- On `/src/components/animated-checkbox.tsx`

  - ```tsx
    ...
    import AnimatedStroke from './animated-stroke';
    ...
        <Svg viewBox={[-MARGIN, -MARGIN,  vWidth + MARGIN, vHeight + MARGIN].join(' ')}>
          <Defs>
            <ClipPath id="clipPath">
              <Path
                fill="white"
                stroke="gray"
                strokeLinejoin="round"
                strokeLinecap="round"
                d={outlineBoxPath}
              />
            </ClipPath>
          </Defs>
          <AnimatedStroke
            progress={progress}
            d={checkMarkPath}
            stroke={highlightColor}
            strokeWidth={10}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeOpacity={checked || false ? 1 : 0}
          />
          <AnimatedPath
            d={outlineBoxPath}
            strokeWidth={7}
            strokeLinejoin="round"
            strokeLinecap="round"
            animatedProps={animatedBoxProps}
          />
          <G clipPath="url(#clipPath)">
            <AnimatedStroke
              progress={progress}
              d={checkMarkPath}
              stroke={checkmarkColor}
              strokeWidth={10}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeOpacity={checked || false ? 1 : 0}
            />
          </G>
        </Svg>
        ...
    ```

## Create task item component

- Create `/src/components/task-item.tsx`

  - ```tsx
    import React, { useCallback } from 'react'
    import { Pressable } from 'react-native'
    import { Box, useTheme, themeTools, useColorModeValue } from 'native-base'
    import AnimatedCheckbox from './animated-checkbox'

    interface Props {
      isDone: Boolean
      onToggleCheckbox?: () => void
    }

    const TaskItem = (props: Props) => {
      const { isDone, onToggleCheckbox } = props
      const theme = useTheme()
      const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
      )
      const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'muted.500')
      )
      const checkmarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
      )
      const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
      )
      const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600')
      )

      return (
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              outlineboxColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
      )
    }

    export default TaskItem
    ```

- On `src/components/animated-checkbox.tsx`

  - ```tsx
        ...
        interface Props {
          checked?: boolean
          highlightColor: string
          checkmarkColor: string
          outlineboxColor: string
        }
        const AnimatedCheckbox = (props: Props) => {
          const {checked, checkmarkColor, highlightColor, outlineboxColor} = props;
          ...
    ```

- On `src/screens/main.tsx`, put `import TaskItem from './components/task-item';` instead of `import AnimatedCheckbox from '../components/animated-checkbox';`

  - ```tsx
    ...
    import TaskItem from './components/task-item';
    ...
        <VStack space={5} alignItems="center">
          <TaskItem isDone={checked} onToggleCheckbox={handlePressCheckbox} />
          <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
    ```

## Animate Task Label

- Create `/src/components/animated-task-label.tsx`

  - ```tsx
    import React, { useEffect, memo } from 'react'
    import { Pressable } from 'react-native'
    import { Text, HStack, Box } from 'native-base'
    import Animated, {
      Easing,
      useSharedValue,
      useAnimatedStyle,
      withTiming,
      withSequence,
      withDelay,
      interpolateColor
    } from 'react-native-reanimated'

    interface Props {
      strikethrough: boolean
      textColor: string
      inactiveTextColor: string
      onPress?: () => void
      children?: React.ReactNode
    }

    const AnimatedBox = Animated.createAnimatedComponent(Box)
    const AnimatedHStack = Animated.createAnimatedComponent(HStack)
    const AnimatedText = Animated.createAnimatedComponent(Text)

    const AnimatedTaskLabel = memo((props: Props) => {
      const { strikethrough, textColor, inactiveTextColor, onPress, children } =
        props
      const hstackOffset = useSharedValue(0)
      const hstackAnimatedStyles = useAnimatedStyle(
        () => ({
          transform: [{ translateX: hstackOffset.value }]
        }),
        [strikethrough]
      )
      const textColorProgress = useSharedValue(0)
      const textColorAnimatedStyles = useAnimatedStyle(
        () => ({
          color: interpolateColor(
            textColorProgress.value,
            [0, 1],
            [textColor, inactiveTextColor]
          )
        }),
        [strikethrough, textColor, inactiveTextColor]
      )
      const strikethroughWidth = useSharedValue(0)
      const strikethroughAnimatedStyles = useAnimatedStyle(
        () => ({
          width: `${strikethroughWidth.value * 100}%`,
          borderBottomColor: interpolateColor(
            textColorProgress.value,
            [0, 1],
            [textColor, inactiveTextColor]
          )
        }),
        [strikethrough, textColor, inactiveTextColor]
      )
      useEffect(() => {
        const easing = Easing.out(Easing.quad)
        if (strikethrough) {
          hstackOffset.value = withSequence(
            withTiming(4, { duration: 200, easing }),
            withTiming(0, { duration: 200, easing })
          )
          textColorProgress.value = withDelay(
            1000,
            withTiming(1, { duration: 400, easing })
          )
          strikethroughWidth.value = withTiming(1, { duration: 400, easing })
        } else {
          ;(textColorProgress.value = withTiming(0, { duration: 400, easing })),
            (strikethroughWidth.value = withTiming(0, {
              duration: 400,
              easing
            }))
        }
      })
      return (
        <Pressable onPress={onPress}>
          <AnimatedHStack alignItems="center" style={[hstackAnimatedStyles]}>
            <AnimatedText
              fontSize={19}
              noOfLines={1}
              isTruncated
              px={1}
              style={[textColorAnimatedStyles]}
            >
              {children}
            </AnimatedText>
            <AnimatedBox
              position="absolute"
              h={1}
              borderBottomWidth={1}
              style={[strikethroughAnimatedStyles]}
            />
          </AnimatedHStack>
        </Pressable>
      )
    })

    export default AnimatedTaskLabel
    ```

- On `task-item.tsx`

  - ```tsx
    import {..., HStack, Text} from 'native-base';
    import AnimatedTaskLabel from './animated-task-label';
    ...
      return (
        <HStack alignItems="center" w="full" px={4} py={2} bg={useColorModeValue('warmGray.50', 'primary.900')}>
          <Box width={30} height={30} mr={2}>
            ...
          </Box>
          <AnimatedTaskLabel textColor={activeTextColor} inactiveTextColor={doneTextColor} strikethrough={isDone}>Task Item</AnimatedTaskLabel>
        </HStack>
      );
    ```

---

# React Native Reanimated Library

## Fundamentals

- Reanimated v2 only supports react-native 0.62+.

- It allows for crating smooth animations and interactions that runs on the UI thread.

### Installation

- `yarn add react-native-reanimated`

- Add Reanimated's babel plugin to `babel.config.js`

  - ```js
    module.exports = {
      ...
      plugins: [
        ...
        'react-native-reanimated/plugin',
      ],
    };
    ```

### Worklets

- interactions and animations are no longer written using unintuitive declarative API, instead they can be written in pure JS, in a form of so-called "worklets". Worklets are pieces of JS code that we extract from the main react-native code and run in a separate JS context on the main thread. Because of that, worklets have some limitations as to what part of the JS context they can access (we don't want to load the entire JS bundle into the context which runs on the UI thread).

- The only thing that is needed is for that function to have “worklet” directive at the top.

  - ```js
    function someWorklet(greeting) {
      'worklet'
      console.log("Hey I'm running on the UI thread")
    }
    ```

- What you will be using most of the time instead, are worklets that can be constructed by one of the **hooks from Reanimated API**, e.g. `useAnimatedStyle`, `useDerivedValue`, `useAnimatedGestureHandler`, etc. When using one of the hooks listed in the Reanimated API Reference, we automatically detect that the provided method is a worklet and do not require the directive to be specified. The method provided to the hook will be turned into a worklet and executed on the UI thread automatically.

  - ```js
    const style = useAnimatedStyle(() => {
      console.log('Running on the UI thread')
      return {
        opacity: 0.5
      }
    })
    ```

### Shared Values

- Shared Values serve a similar purpose to React Native's `Animated.Value`s. They can **carry data**, **provide a way to react to changes**, and also **drive animation**.

- Carrying data

  - In order to update Shared Value from the React Native thread or from a worklet running on the UI thread, you should set a new value onto the `.value` property.

- Providing a notion of reactiveness to Reanimated framework

  - Updates made to Shared Values can trigger corresponding code execution on the UI thread, that can further result in starting animations, view updates, etc.

  - The reactiveness layer has been designed to be fully transparent from the developer perspective. It is based on the concept of Shared Values being captured by reactive worklets.

  - Currently, there are two ways how you can create a reactive worklet. This can be done either by using `useAnimatedStyle` or `useDerivedValue` hooks. When a Shared Value is captured by a worklet provided to these hooks, the worklet will re-run upon the Shared Value change.

- Driving animations

  - The library comes bundled with a number of utility methods that help you run and customize animations. One of the ways for animation to be launched is by starting an animated transition of a Shared Value. This can be done by wrapping target value with one of the animation utility methods from reanimated library (e.g. `withTiming` or `withSpring`).

- Interrupting animations

  - We can make all animations fully interruptible. This means that you can make updates to the Shared Value even if it is currently running the animation without worrying that this will cause an unexpected and sudden animation glitch.

- Cancelling animations

  - There are cases in which we want to stop the currently running animation without starting a new one. In reanimated, this can be done using `cancelAnimation` method. Animations can be cancelled both from the UI and from React Native's JS thread.

## API Reference

### `useSharedValue(initialValue)`

- initialValue: [number|string|bool|Object|Array|Function]

- To create a reference to a JavaScript Value that can be shared with workets.

- Shared Values are just javascript objects, so you can pass them to children components or define your own hooks that create them.

- The first argument takes the initial value. The value then can be read from the Shared Value reference using `.value` attribute.

- The hook returns a reference to shared value initialized with the provided data. The reference is an object with `.value` property, that can be accessed and modified from worklets, but also updated directly from the main JS thread.

### `useAnimatedProps()`

- It works for a non-style view properties. It allows for defining a set of native view properties that can be updated on the UI thread as a response to a Shared Value change.

- Only "native" properties of "native views" can be set via `useAnimatedProps`. The most common usecase for this hook is when we want to animate properties of some third-party native component, since most of the properties for the core React Native components are a part of the styles anyways (at least the properties for which it makes sense to be animated).

- In order to connect the `useAnimatedProps` hook result to a view, you need to pass it as `animatedProps` property to the `Animated` version of the component (e.g., `Animated.View`). The `animatedProps` property is added when a native component is wrapped with `Animated.createAnimatedComponent`.

### `withTiming(toValue, options, callback)`

- Starts a time based animation.

- toValue: [number | string]

- options: [object]

  - | Options  | Default            | Description                                            |
    | -------- | ------------------ | ------------------------------------------------------ |
    | duration | 300                | How long the animation should last                     |
    | easing   | in-out quad easing | Worklet that drives the easing curve for the animation |

  - For `easing` parameter we recommend using one of the pre-configured worklets defined in `Easing` module.

- callback [function](optional)

  - The provided function will be called when the animation is complete. In case the animation is cancelled, the callback will receive `false` as the argument, otherwise it will receive `true`.

### `Easing`

- If easing property is not provided, it defaults to linear easing function.

### `interpolateColor`

- It allows you to interpolate between colors. Color interpolation is quite a bit harder to reason about than interpolating with number values.
