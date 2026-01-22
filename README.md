# EventPlanna Frontend

## Tech Stack

Modern **Next.js 15.3**, **TypeScript**, **Tailwind CSS**, Zustand, TanStack Query, shadcn/ui

## Repo Features

- 📂 Advanced Folder Structures
- ⚡ [Next.js](https://nextjs.org/) with App Router support
- 💎 Type checking [TypeScript](https://www.typescriptlang.org/)
- 🎨 Styled using [Tailwind CSS](https://tailwindcss.com/)
- 📦 State management with [Zustand](https://zustand-demo.pmnd.rs/)
- 🧩 UI Components built with [shadcn/ui](https://ui.shadcn.com/)
- 🔄 Data Fetching, Caching and Mutation with [TanStack Query](https://tanstack.com/query/latest)
- ⌨️ Form handling with [React Hook Form](https://react-hook-form.com/)
- 🔴 Validation library with [Zod](https://zod.dev/)
- 🌸 Smart masking and validation with [@omergulcicek/forms](https://www.npmjs.com/package/@omergulcicek/forms)
- 🧹 Linter with [ESLint](https://eslint.org/)
- 💖 Code Formatter with [Prettier](https://prettier.io/)
- ⏳ Loading UI using [Skeleton Components](https://ui.shadcn.com/docs/components/skeleton)
- 🌓 Dark theme with [next-themes](https://npmjs.com/package/next-themes)
- 💡 [Absolute Imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases) with `@` prefix
- ✨ Beautiful and consistent icons from [Lucide](https://lucide.dev/)
- 🐶 [Husky](https://typicode.github.io/husky/) for Git Hooks
- 🤖 Sitemap.xml and robots.txt
- ⚙️ Metadata files optimized for SEO
- 🍪 Storage helpers for Local, Session, Cookies
- 💯 Maximize lighthouse score

## Project structure

```shell
│
├── .husky                          # Husky git hook scripts
├── public                          # Public assets folder
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── assets                      # Static assets (images, fonts, etc.)
│   ├── components                  # React components
│   │   ├── icons                   # svg icons
│   │   ├── features                # Components with hooks and calculations
│   │   ├── shared                  # Header, footer, aside components
│   │   ├── skeletons               # Loading components
│   │   ├── ui                      # Atomic components
│   │   └── widgets                 # Advanced UI components
│   ├── constants                   # Project-wide constants
│   ├── data                        # Static or mock data
│   ├── helpers                     # Reusable utility functions (e.g., API, formatting, storage)
│   ├── hooks                       # Reusable custom React hooks
│   ├── lib                         # Common utility functions
│   ├── providers                   # Global context providers (theme, data fetching, notifications)
│   ├── schemas                     # Validation schemas
│   ├── services                    # API request functions
│   ├── stores                      # Global state
│   ├── types                       # TypeScript type definitions
│   └── .middleware                 # Middleware for Next.js
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier config
├── components.json                 # shadcn/ui config
├── eslint.config.mjs               # ESLint config
├── next.config.mjs                 # Next.js config
├── package.json                    # Project dependencies and scripts
├── postcss.config.js               # PostCSS config
├── README.md                       # README file
├── tailwind.config.js              # Tailwind CSS config
└── tsconfig.json                   # TypeScript config
```

## File Naming Conventions

The project follows consistent file naming conventions:

| File Type      | Example          | Style      |
| -------------- | ---------------- | ---------- |
| Component      | `LoginForm.tsx`  | PascalCase |
| Hook           | `useLogin.ts`    | camelCase  |
| Helper, Schema | `form-schema.ts` | kebab-case |
| Folder         | `login-form/`    | kebab-case |
| Constants      | `ALPHA_REGEX`    | SNAKE_CASE |

### Orignal Creator

- [@omergulcicek](https://github.com/omergulcicek)
