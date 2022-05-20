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
        "lib": [
          "dom",
          "esnext"
        ],
        "moduleResolution": "node",
        "noEmit": true,
        "skipLibCheck": true,
        "resolveJsonModule": true
      }
    }
    ```

- Create `prettier.config.js`

  - ```js
    