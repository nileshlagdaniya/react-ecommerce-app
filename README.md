# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

```
src/
├─ assets/                      # images, fonts, icons (static)
├─ components/                  # reusable UI components (small)
│  ├─ ui/                       # small common UI atoms (Button, Input, Icon)
│  ├─ layout/                   # Header, Footer, Sidebar, AdminShell
│  └─ product/                  # product Card, ProductList, ProductForm
├─ features/                    # Redux + feature logic (domain driven)
│  ├─ auth/                     # authSlice, hooks, auth-related API helpers
│  │  ├─ components/            # login form, register form
│  │  ├─ authSlice.ts
│  │  └─ authAPI.ts
│  ├─ products/
│  │  ├─ productSlice.ts
│  │  ├─ productsAPI.ts
│  │  └─ components/            # ProductAdminList, ProductCard
│  ├─ cart/
│  │  ├─ cartSlice.ts
│  │  └─ components/
│  └─ orders/
│     ├─ ordersSlice.ts
│     └─ components/
├─ pages/                       # Route pages
│  ├─ Home/
│  ├─ Shop/
│  ├─ ProductDetail/
│  ├─ Cart/
│  ├─ Checkout/
│  ├─ Orders/
│  ├─ Admin/
│  │  ├─ Dashboard.tsx
│  │  ├─ Users.tsx
│  │  ├─ Products.tsx
│  │  └─ Orders.tsx
│  └─ Auth/                     # Login, Register, ForgotPassword
├─ routes/                      # route definitions, protected route wrappers
│  ├─ AppRoutes.tsx
│  ├─ ProtectedRoute.tsx
│  └─ AdminRoute.tsx
├─ services/                    # axios instances, external API wrappers
│  └─ axios.ts
├─ hooks/                       # custom hooks (useAuth, useTheme, useFirestore)
├─ theme/                       # MUI theme files, theme provider & utils
│  ├─ index.tsx
│  └─ theme.ts
├─ store/                       # redux store configuration
│  └─ store.ts
├─ types/                       # TS types and interfaces (Product, User, Order)
│  └─ index.d.ts
├─ utils/                       # helpers (date, currency formatter, validators)
├─ constants/                   # constants (routes, roles, regex)
├─ firebase/                    # firebase wrapper functions (auth helpers, firestore helpers)
│  ├─ firebase.ts               # firebase initialized (same as earlier)
│  ├─ userService.ts            # user CRUD, role updates, getUserById
│  └─ productService.ts         # product CRUD using firestore + storage
├─ App.tsx
└─ main.tsx (or index.tsx)      # app bootstrap
```
