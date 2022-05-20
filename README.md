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
    yarn add react-native-safe-area-context shortid @types/shortid expo-linking
    ```

- Test

  - `yarn start`

  - On `App.tsx`, add `<Text>Hello</Text>` inside `<View></View>`

- Error: [BABEL] D:\study_program\rn-inkdrop\animated-todo\App.tsx: You gave us a visitor for the node type TSInstantiationExpression but it's not a valid type
