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
