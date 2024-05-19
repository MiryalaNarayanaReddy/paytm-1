# creation 

1. react vite

```bash
npm ceate vite@latest
```

2. setting up tailwindcss

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
3. edit tailwind.config.js

```json
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. add following to index.css
    
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


