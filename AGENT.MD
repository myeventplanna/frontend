# EventPlanna Frontend - AI Agent Guide

> **Last Updated**: February 1, 2026  
> **Project**: EventPlanna Frontend  
> **Repository**: myeventplanna/frontend

## 🎯 Project Overview

EventPlanna is a Next.js-based event planning application with a modern TypeScript stack. This document provides comprehensive guidance for AI coding agents working on this codebase.

---

## 🚫 Critical Constraints

### **DO NOT:**
- ❌ Generate test files (no unit, integration, or e2e tests)
- ❌ Run linting checks during code generation
- ❌ Execute builds to verify compilation
- ❌ Use Docker commands for any purpose (build, test, or run)
- ❌ Create test specs, `.test.ts`, `.spec.ts`, or any testing files

### **DO:**
- ✅ Fix TypeScript errors when detected
- ✅ Use npm with package.json scripts
- ✅ Follow existing code patterns and conventions
- ✅ Respect import ordering and formatting rules
- ✅ Use path aliases consistently

### **User Responsibilities:**
- The user will manually fix linting errors
- The user will manually run builds and check compilation
- The user will handle test creation when needed

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.5+ (App Router) |
| **Language** | TypeScript 5+ (Strict mode) |
| **Styling** | Tailwind CSS 4+ |
| **UI Library** | Shadcn UI (New York style) |
| **State Management** | Zustand 5+ |
| **Data Fetching** | TanStack Query (React Query) 5+ |
| **Forms** | React Hook Form 7+ |
| **Validation** | Zod 4+ |
| **Authentication** | NextAuth.js 5 (beta) |
| **HTTP Client** | Axios 1.12+ |
| **Icons** | Lucide React |
| **Formatting** | Prettier 3.6+ |
| **Linting** | ESLint 9 (Flat Config) |

### Dev Tools
- **Package Manager**: npm
- **Turbopack**: Enabled for faster dev builds
- **Husky**: Git hooks for pre-commit linting
- **Storybook**: Component development
- **SVGR**: SVG to React component conversion

---

## 📁 Project Structure

```
eventplanna-frontend/
├── public/                    # Static assets
│   └── images/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── api/               # API routes
│   │   └── auth/              # Auth pages
│   │
│   ├── components/            # React components
│   │   ├── atoms/             # Smallest reusable components
│   │   ├── molecules/         # Simple component groups
│   │   ├── organisms/         # Complex components (forms, etc.)
│   │   ├── features/          # Feature-specific components
│   │   ├── widgets/           # Standalone UI widgets
│   │   ├── shared/            # Shared layouts (Header, Footer)
│   │   ├── ui/                # Shadcn UI components
│   │   ├── icons/             # SVG icon components
│   │   └── skeletons/         # Loading skeletons
│   │
│   ├── lib/                   # Core utilities
│   │   ├── http/              # HTTP client setup
│   │   ├── utils/             # Utility functions
│   │   └── auth-actions/      # Auth helper functions
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── mutations/         # TanStack Query mutations
│   │   └── queries/           # TanStack Query queries
│   │
│   ├── stores/                # Zustand state stores
│   ├── schemas/               # Zod validation schemas
│   ├── services/              # API service layer
│   ├── types/                 # TypeScript types/interfaces
│   │   └── generated/         # Auto-generated types (OpenAPI)
│   ├── constants/             # App constants
│   ├── data/                  # Static data
│   ├── helpers/               # Helper functions
│   ├── providers/             # React context providers
│   └── middleware.ts          # Next.js middleware
│
├── auth.ts                    # NextAuth configuration
├── components.json            # Shadcn UI config
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.mjs          # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies & scripts
```

---

## 🎨 Component Architecture

### Component Hierarchy (Atomic Design)

1. **Atoms** (`src/components/atoms/`)
   - Basic building blocks (logo, simple icons)
   - No dependencies on other components
   - Example: `LivwellLogo.tsx`

2. **Molecules** (`src/components/molecules/`)
   - Simple combinations of atoms
   - Example: `PageHeader.tsx`

3. **Organisms** (`src/components/organisms/`)
   - Complex, feature-rich components
   - Forms, complex layouts
   - Example: `LoginForm.tsx`

4. **Features** (`src/components/features/`)
   - Feature-specific component collections
   - Business logic heavy

5. **Widgets** (`src/components/widgets/`)
   - Standalone, reusable UI elements
   - Examples: `ThemeToggle.tsx`, `Actions.tsx`

6. **Shared** (`src/components/shared/`)
   - Global layout components
   - Examples: `Header.tsx`, `Footer.tsx`

7. **UI** (`src/components/ui/`)
   - Shadcn UI components
   - Base components from shadcn/ui library
   - Do not modify manually (use `npx shadcn@latest add` for new components)

---

## 🛣️ Path Aliases

Always use path aliases for imports. **Never use relative imports** beyond the current directory.

```typescript
// TypeScript Path Aliases (from tsconfig.json)
"@/*"           → "./src/*"           // Base src directory
"@/ui"          → "./src/components/ui"
"@/features"    → "./src/components/features"
"@/widgets"     → "./src/components/widgets"
"@/shared"      → "./src/components/shared"
"@/icons"       → "./src/components/icons"
"@/skeletons"   → "./src/components/skeletons"
"@/providers"   → "./src/providers"
"@/config"      → "./src/config"
"@/constants"   → "./src/constants"
"@/data"        → "./src/data"
"@/schemas"     → "./src/schemas"
"@/helpers"     → "./src/helpers"
"@/hooks"       → "./src/hooks"
"@/stores"      → "./src/stores"
"@/services"    → "./src/services"
"@/utils"       → "./src/lib/utils"
"@/types"       → "./src/types"
"@/public/*"    → "./public/*"
```

### Import Examples

```typescript
// ✅ CORRECT
import { Button } from "@/ui"
import loginSchema from "@/schemas/login-schema"
import usePasswordSignIn from "@/hooks/mutations/use-password-signin"
import { CustomAuthUser } from "@/types/next-auth"
import { http } from "@/lib/http"

// ❌ INCORRECT
import { Button } from "../../components/ui/button"
import loginSchema from "../../../schemas/login-schema"
```

---

## 📋 Import Order (Prettier)

**Strictly enforced by Prettier**. Follow this exact order:

```typescript
// 1. React imports
import { useState, useEffect } from "react"

// 2. Next.js imports
import { useRouter } from "next/navigation"
import Link from "next/link"

// 3. @next imports
import { NextRequest } from "@next/server"

// 4. Radix UI imports
import { Avatar } from "@radix-ui/react-avatar"

// 5. TanStack imports
import { useQuery } from "@tanstack/react-query"

// 6. Zustand imports
import { create } from "zustand"

// 7. Third-party libraries
import axios from "axios"
import { clsx } from "clsx"
import z from "zod"

// 8. Types
import type { User } from "@/types"

// 9. Config & Constants
import { API_URL } from "@/config"
import { PASSWORD_SIGN_IN_ROUTE } from "@/constants"

// 10. Providers & Layouts
import { ThemeProvider } from "@/providers"

// 11. Stores, Schemas, Services
import { useCountStore } from "@/stores"
import loginSchema from "@/schemas/login-schema"
import { usersService } from "@/services/users-service"

// 12. Hooks, Lib, Utils
import { useMobile } from "@/hooks"
import { http } from "@/lib/http"
import { cn } from "@/utils"

// 13. Components
import { LoginForm } from "@/components/organisms/LoginForm"
import { Header } from "@/shared"
import { Button } from "@/ui"
import { ThemeToggle } from "@/widgets"
import { UserCard } from "@/features"
import { QuerySkeleton } from "@/skeletons"

// 14. Icons & Images
import { Github } from "@/icons"

// 15. Data
import { stackData } from "@/data/stack-data"

// 16. Relative imports (same directory only)
import "./styles.css"
```

---

## ✨ Code Style & Conventions

### TypeScript Configuration

```json
{
  "strict": true,                    // Strict type checking
  "noUncheckedIndexedAccess": true,  // Array access returns T | undefined
  "noEmit": true,                    // Next.js handles compilation
  "target": "ES2017"
}
```

### Prettier Rules

```json
{
  "semi": false,                     // No semicolons
  "singleQuote": false,              // Use double quotes
  "useTabs": true,                   // Tabs for indentation
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "none",           // No trailing commas
  "arrowParens": "always",           // Always wrap arrow params
  "bracketSpacing": true,
  "endOfLine": "auto"
}
```

### Component Patterns

#### Client Components
```typescript
"use client"

import { useState } from "react"

export function MyComponent() {
  const [state, setState] = useState("")
  return <div>{state}</div>
}
```

#### Server Components (Default)
```typescript
// No "use client" directive
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

#### Form Components (React Hook Form + Zod)
```typescript
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import mySchema from "@/schemas/my-schema"

type FormFields = z.infer<typeof mySchema>

export function MyForm() {
  const form = useForm<FormFields>({
    resolver: zodResolver(mySchema),
    defaultValues: { /* ... */ }
  })

  const onSubmit = async (values: FormFields) => {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  )
}
```

#### TanStack Query Hooks

**Query Hook** (`src/hooks/queries/`)
```typescript
import { useQuery } from "@tanstack/react-query"

import { usersService } from "@/services/users-service"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getAll()
  })
}
```

**Mutation Hook** (`src/hooks/mutations/`)
```typescript
import { useMutation } from "@tanstack/react-query"

import { authService } from "@/services/auth-service"

export function usePasswordSignIn() {
  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    }
  })
}
```

#### Zustand Store Pattern
```typescript
import { create } from "zustand"

type CountStore = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))
```

---

## 🔐 Authentication (NextAuth)

**Configuration**: `auth.ts`

```typescript
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      // Credentials configuration
    })
  ]
})
```

**Usage in Server Components**:
```typescript
import { auth } from "@/../../auth"

export default async function Page() {
  const session = await auth()
  return <div>{session?.user?.email}</div>
}
```

**Usage in API Routes**:
```typescript
import { auth } from "@/../../auth"

export async function GET() {
  const session = await auth()
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...
}
```

---

## 🌐 API Integration

### HTTP Client Setup

**Location**: `src/lib/http/`

```typescript
import axios from "axios"

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
```

### Service Layer Pattern

**Location**: `src/services/`

```typescript
// users-service.ts
import { http } from "@/lib/http"
import type { User } from "@/types"

export const usersService = {
  getAll: async () => {
    const { data } = await http.get<User[]>("/users")
    return data
  },
  
  getById: async (id: string) => {
    const { data } = await http.get<User>(`/users/${id}`)
    return data
  },
  
  create: async (user: Partial<User>) => {
    const { data } = await http.post<User>("/users", user)
    return data
  }
}
```

### Type Generation (OpenAPI)

```bash
npm run types:generate
```

Updates: `src/types/generated/openapi-schema.d.ts`

---

## 📦 Package Scripts

```json
{
  "dev": "next dev --turbopack",           // Start dev server with Turbopack
  "build": "next build",                   // Build for production
  "start": "next start",                   // Start production server
  "lint": "next lint",                     // Run ESLint
  "format": "prettier --write .",          // Format all files
  "storybook": "storybook dev -p 6006",    // Start Storybook
  "types:generate": "openapi-typescript <url> -o src/types/generated/openapi-schema.d.ts"
}
```

**Run commands with npm:**
```bash
npm run dev
npm run build
npm run format
```

---

## 🎨 Styling Guidelines

### Tailwind CSS 4

```typescript
// Example component with Tailwind classes
export function Card() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Title</h2>
      <p className="mt-2 text-muted-foreground">Description</p>
    </div>
  )
}
```

### Using `cn` Utility (Tailwind Merge + clsx)

```typescript
import { cn } from "@/utils"

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "rounded-md bg-primary px-4 py-2 text-white",
        className
      )}
      {...props}
    />
  )
}
```

### Dark Mode

```typescript
// Variant-based dark mode (preferred)
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">Content</p>
</div>
```

---

## 📝 Validation Schemas (Zod)

**Location**: `src/schemas/`

```typescript
// login-schema.ts
import z from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
})

export default loginSchema
export type LoginFormData = z.infer<typeof loginSchema>
```

---

## 🗂️ File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase.tsx | `LoginForm.tsx`, `UserCard.tsx` |
| **Hooks** | kebab-case.ts | `use-users.ts`, `use-mobile.ts` |
| **Services** | kebab-case.ts | `users-service.ts` |
| **Schemas** | kebab-case.ts | `login-schema.ts` |
| **Stores** | kebab-case.ts | `count-store.ts` |
| **Utils** | kebab-case.ts | `format-date.ts` |
| **Types** | kebab-case.ts | `api-types.ts`, `next-auth.ts` |
| **Constants** | kebab-case.ts | `api-routes.ts` |
| **Pages (App Router)** | lowercase | `page.tsx`, `layout.tsx` |

---

## 🚀 Common Development Tasks

### Adding a New Page

1. Create directory in `src/app/`
2. Add `page.tsx`:
   ```typescript
   export default function MyPage() {
     return <div>My Page</div>
   }
   ```

### Adding a New Component

1. Determine component type (atom, molecule, organism, etc.)
2. Create in appropriate directory
3. Export from `index.ts` if applicable
4. Use path alias for imports

### Adding a Shadcn UI Component

```bash
npx shadcn@latest add button
npx shadcn@latest add form
```

Components are added to `src/components/ui/`

### Creating a New API Route

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ data: body })
}
```

### Adding Environment Variables

1. Add to `.env.local` (not committed)
2. Add to `.env.example` (committed)
3. Prefix with `NEXT_PUBLIC_` for client-side access

```env
# Server-side only
DATABASE_URL=...

# Client-side accessible
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 🔍 Common Patterns

### Conditional Rendering

```typescript
// Simple condition
{isLoading && <Spinner />}

// With fallback
{isLoading ? <Spinner /> : <Content />}

// Multiple conditions
{isLoading ? (
  <Spinner />
) : error ? (
  <Error message={error.message} />
) : (
  <Content data={data} />
)}
```

### List Rendering

```typescript
// Always include key prop
{items.map((item) => (
  <Card key={item.id} {...item} />
))}
```

### Client/Server Boundary

```typescript
// Server Component (can fetch data directly)
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// Client Component (for interactivity)
"use client"

export function ClientComponent({ data }) {
  const [state, setState] = useState(data)
  return <div onClick={() => setState("new")}>{state}</div>
}
```

---

## ⚠️ Common Pitfalls to Avoid

1. **Don't use relative imports** beyond current directory
   - ❌ `../../components/ui/button`
   - ✅ `@/ui/button`

2. **Don't skip "use client"** for interactive components
   - Components using hooks, event handlers, or browser APIs need `"use client"`

3. **Don't access environment variables incorrectly**
   - ❌ `process.env.API_URL` in client components
   - ✅ `process.env.NEXT_PUBLIC_API_URL` in client components

4. **Don't modify shadcn/ui components directly**
   - Create wrapper components instead

5. **Don't ignore TypeScript errors**
   - Always fix TypeScript errors (as per agent constraints)

6. **Don't create test files**
   - No `.test.ts`, `.spec.ts`, or test utilities

7. **Don't use semicolons**
   - Prettier is configured to remove them

8. **Don't use single quotes**
   - Always use double quotes for strings

---

## 📚 Additional Resources

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Internal Documentation
- `README.md` - Project setup and getting started
- `components.json` - Shadcn UI configuration
- `tsconfig.json` - TypeScript configuration
- `.prettierrc` - Code formatting rules

---

## 🤖 Agent-Specific Guidelines

### When Creating New Features:

1. **Analyze existing patterns** first
   - Look at similar components/features
   - Follow established conventions

2. **Structure imports correctly**
   - Use path aliases
   - Follow Prettier import order

3. **Maintain type safety**
   - Fix all TypeScript errors
   - Use proper type annotations
   - Infer types from Zod schemas with `z.infer`

4. **Follow component hierarchy**
   - Place components in the correct directory
   - Use appropriate naming conventions

5. **No testing artifacts**
   - Never generate test files
   - Skip test setup entirely

6. **Handle state appropriately**
   - Server components: Direct data fetching
   - Client components: Hooks and interactivity
   - Global state: Zustand stores
   - Server state: TanStack Query

### When Refactoring:

1. **Preserve functionality**
   - Don't change behavior unless requested

2. **Improve type safety**
   - Add missing types
   - Fix TypeScript errors

3. **Follow conventions**
   - Ensure imports use path aliases
   - Match existing code style

4. **Don't introduce testing**
   - Even when refactoring, no tests

### When Debugging:

1. **Focus on TypeScript errors only**
   - Fix type errors
   - Ignore linting warnings
   - Skip build verification

2. **Check common issues**
   - Missing "use client" directives
   - Incorrect path aliases
   - Type mismatches

3. **Respect user autonomy**
   - User handles lint fixes
   - User runs builds
   - User tests manually

---

## 📞 Questions & Support

If you encounter scenarios not covered in this guide:
1. Analyze existing similar implementations
2. Follow established patterns
3. Maintain consistency with codebase conventions
4. Ask the user for clarification only when absolutely necessary

---

**Remember**: This is a living document. Code with confidence following these guidelines, and the user will handle linting, building, and testing independently.
