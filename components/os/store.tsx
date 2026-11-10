"use client"

import { createContext, useCallback, useContext, useMemo, useReducer, useState } from "react"

export type AppId = "finder" | "terminal" | "music" | "trophies" | "notes" | "mail" | "preview" | "trash" | "project"

export type Win = {
  id: string
  app: AppId
  title: string
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
  props?: Record<string, string>
}

type State = { windows: Win[]; top: number }

type Action =
  | { type: "open"; win: Omit<Win, "z" | "minimized" | "maximized"> }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "maximize"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; w: number; h: number }
  | { type: "props"; id: string; props: Record<string, string> }
  | { type: "closeAll" }

function reducer(state: State, action: Action): State {
  const update = (id: string, fn: (w: Win) => Win) => ({
    ...state,
    windows: state.windows.map((w) => (w.id === id ? fn(w) : w)),
  })
  switch (action.type) {
    case "open": {
      const top = state.top + 1
      const existing = state.windows.find((w) => w.id === action.win.id)
      if (existing) {
        return {
          top,
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, z: top, minimized: false, props: action.win.props ?? w.props } : w,
          ),
        }
      }
      return { top, windows: [...state.windows, { ...action.win, z: top, minimized: false, maximized: false }] }
    }
    case "close":
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }
    case "focus":
      return { ...update(action.id, (w) => ({ ...w, z: state.top + 1, minimized: false })), top: state.top + 1 }
    case "minimize":
      return update(action.id, (w) => ({ ...w, minimized: true }))
    case "maximize":
      return update(action.id, (w) => ({ ...w, maximized: !w.maximized }))
    case "move":
      return update(action.id, (w) => ({ ...w, x: action.x, y: action.y }))
    case "resize":
      return update(action.id, (w) => ({ ...w, w: action.w, h: action.h }))
    case "props":
      return update(action.id, (w) => ({ ...w, props: { ...w.props, ...action.props } }))
    case "closeAll":
      return { ...state, windows: [] }
  }
}

export type Theme = "light" | "dark"

type OS = {
  windows: Win[]
  focused?: Win
  theme: Theme
  wallpaper: number
  mobile: boolean
  open: (app: AppId, opts?: { id?: string; title?: string; props?: Record<string, string>; x?: number; y?: number; w?: number; h?: number }) => void
  close: (id: string) => void
  focus: (id: string) => void
  minimize: (id: string) => void
  maximize: (id: string) => void
  move: (id: string, x: number, y: number) => void
  resize: (id: string, w: number, h: number) => void
  setProps: (id: string, props: Record<string, string>) => void
  closeAll: () => void
  setTheme: (t: Theme) => void
  nextWallpaper: () => void
  reboot: () => void
  spotlight: boolean
  setSpotlight: (open: boolean) => void
}

const OSContext = createContext<OS | null>(null)

export const useOS = () => {
  const ctx = useContext(OSContext)
  if (!ctx) throw new Error("useOS outside OSProvider")
  return ctx
}

export const MENUBAR_H = 30
export const DOCK_SPACE = 92

export const appMeta: Record<AppId, { name: string; title?: string; w: number; h: number }> = {
  finder: { name: "Projects", w: 960, h: 580 },
  terminal: { name: "Terminal", title: "apurva — -zsh — 80×24", w: 680, h: 440 },
  music: { name: "Spotify", w: 760, h: 520 },
  trophies: { name: "Trophy Case", w: 860, h: 660 },
  notes: { name: "Notes", w: 780, h: 520 },
  mail: { name: "Mail", w: 640, h: 540 },
  preview: { name: "Resume.pdf", w: 720, h: 820 },
  trash: { name: "Trash", w: 520, h: 340 },
  project: { name: "Project", w: 760, h: 640 },
}

export function OSProvider({
  children,
  mobile,
  onReboot,
  initialTheme,
}: {
  children: React.ReactNode
  mobile: boolean
  onReboot: () => void
  initialTheme: Theme
}) {
  const [state, dispatch] = useReducer(reducer, { windows: [], top: 10 })
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [wallpaper, setWallpaper] = useState(0)
  const [spotlight, setSpotlight] = useState(false)

  const open = useCallback<OS["open"]>(
    (app, opts = {}) => {
      const meta = appMeta[app]
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = Math.min(opts.w ?? meta.w, vw - 40)
      const h = Math.min(opts.h ?? meta.h, vh - MENUBAR_H - DOCK_SPACE - 20)
      // cascade new windows so they don't stack exactly on top of each other
      const offset = (state.windows.length % 6) * 28
      const x = opts.x ?? Math.max(20, Math.round((vw - w) / 2 - 80 + offset))
      const y = opts.y ?? Math.max(MENUBAR_H + 12, Math.round((vh - DOCK_SPACE - h) / 2 - 10 + offset))
      dispatch({
        type: "open",
        win: { id: opts.id ?? app, app, title: opts.title ?? meta.title ?? meta.name, x, y, w, h, props: opts.props },
      })
    },
    [state.windows.length],
  )

  const value = useMemo<OS>(() => {
    const visible = state.windows.filter((w) => !w.minimized)
    const focused = visible.reduce<Win | undefined>((a, b) => (!a || b.z > a.z ? b : a), undefined)
    return {
      windows: state.windows,
      focused,
      theme,
      wallpaper,
      mobile,
      open,
      close: (id) => dispatch({ type: "close", id }),
      focus: (id) => dispatch({ type: "focus", id }),
      minimize: (id) => dispatch({ type: "minimize", id }),
      maximize: (id) => dispatch({ type: "maximize", id }),
      move: (id, x, y) => dispatch({ type: "move", id, x, y }),
      resize: (id, w, h) => dispatch({ type: "resize", id, w, h }),
      setProps: (id, props) => dispatch({ type: "props", id, props }),
      closeAll: () => dispatch({ type: "closeAll" }),
      setTheme,
      nextWallpaper: () => setWallpaper((n) => (n + 1) % 3),
      reboot: onReboot,
      spotlight,
      setSpotlight,
    }
  }, [state.windows, theme, wallpaper, mobile, open, onReboot, spotlight])

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>
}

// lets an app know how much room it has, whether in a desktop window or a phone sheet
const WinContext = createContext<{ id: string; width: number; compact: boolean; props?: Record<string, string> }>({
  id: "",
  width: 1000,
  compact: false,
})

export const WinProvider = WinContext.Provider
export const useWin = () => useContext(WinContext)
