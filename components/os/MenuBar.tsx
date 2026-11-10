"use client"

import { Moon, Search, Sun, Wallpaper } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { profile } from "@/lib/data"
import { GithubLogo, Mark } from "./icons"
import { appMeta, MENUBAR_H, useOS, type AppId } from "./store"

type Item = { label: string; hint?: string; action?: () => void; href?: string } | "sep"

export function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(t)
  }, [])
  return now
}

export function MenuBar() {
  const os = useOS()
  const now = useClock()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openMenu) return
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpenMenu(null)
    window.addEventListener("pointerdown", close)
    return () => window.removeEventListener("pointerdown", close)
  }, [openMenu])

  const go = (app: AppId) => () => os.open(app)
  const active = os.focused ? (os.focused.app === "project" ? "Projects" : appMeta[os.focused.app].name) : "Desktop"

  const menus: { id: string; label: React.ReactNode; bold?: boolean; items: Item[] }[] = [
    {
      id: "mark",
      label: <Mark className="h-3.5 w-3.5" />,
      items: [
        { label: "About Apurva", action: go("notes") },
        { label: "Download Resume", href: profile.resume },
        "sep",
        { label: "Change Wallpaper", action: os.nextWallpaper },
        { label: os.theme === "dark" ? "Light Mode" : "Dark Mode", action: () => os.setTheme(os.theme === "dark" ? "light" : "dark") },
        "sep",
        { label: "Close All Windows", action: os.closeAll },
        { label: "Restart…", action: os.reboot },
      ],
    },
    { id: "app", label: active, bold: true, items: [{ label: `About ${active}`, action: go("notes") }, { label: "Quit All", action: os.closeAll }] },
    {
      id: "go",
      label: "Go",
      items: [
        { label: "Projects", action: go("finder") },
        { label: "Terminal", action: go("terminal") },
        { label: "Trophy Case", action: go("trophies") },
        { label: "Notes", action: go("notes") },
        { label: "Spotify", action: go("music") },
        { label: "Mail", action: go("mail") },
        "sep",
        { label: "GitHub ↗", href: profile.github },
      ],
    },
    {
      id: "window",
      label: "Window",
      items: os.windows.length
        ? os.windows.map((w) => ({ label: `${w.minimized ? "◇ " : ""}${w.title}`, action: () => os.focus(w.id) }))
        : [{ label: "No open windows" }],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { label: "Double-click icons to open them" },
        { label: "Drag windows by their title bar" },
        { label: "Search with ⌘K", action: () => os.setSpotlight(true) },
        { label: "Try “help” in Terminal", action: go("terminal") },
      ],
    },
  ]

  return (
    <div
      ref={ref}
      className="glass absolute inset-x-0 top-0 z-[9500] flex select-none items-center justify-between bg-[var(--os-bar)] px-2 text-[13px] text-[var(--os-bar-text)]"
      style={{ height: MENUBAR_H }}
    >
      <div className="flex items-center">
        {menus.map((m) => (
          <div key={m.id} className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
              onMouseEnter={() => openMenu && setOpenMenu(m.id)}
              className={`flex h-[24px] items-center rounded-[5px] px-2.5 ${m.bold ? "font-semibold" : ""} ${openMenu === m.id ? "bg-white/25" : ""}`}
            >
              {m.label}
            </button>
            {openMenu === m.id && (
              <div className="glass absolute left-0 top-[27px] min-w-[220px] rounded-[10px] border border-os-line bg-os-win p-1.5 text-os-text shadow-[var(--os-shadow)]">
                {m.items.map((item, i) =>
                  item === "sep" ? (
                    <div key={i} className="mx-2 my-1 h-px bg-os-line" />
                  ) : item.href ? (
                    <a key={i} href={item.href} target="_blank" rel="noreferrer" onClick={() => setOpenMenu(null)} className="block rounded-[6px] px-2.5 py-1 hover:bg-os-accent hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={i}
                      disabled={!item.action}
                      onClick={() => {
                        item.action?.()
                        setOpenMenu(null)
                      }}
                      className="flex w-full justify-between rounded-[6px] px-2.5 py-1 text-left enabled:hover:bg-os-accent enabled:hover:text-white disabled:opacity-50"
                    >
                      {item.label}
                      {item.hint && <span className="opacity-50">{item.hint}</span>}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-[24px] w-8 place-items-center rounded-[5px] hover:bg-white/20">
          <GithubLogo className="h-3.5 w-3.5" />
        </a>
        <button onClick={() => os.setSpotlight(true)} aria-label="Spotlight Search" title="Spotlight (⌘K)" className="grid h-[24px] w-8 place-items-center rounded-[5px] hover:bg-white/20">
          <Search className="h-3.5 w-3.5" />
        </button>
        <button onClick={os.nextWallpaper} aria-label="Change wallpaper" className="grid h-[24px] w-8 place-items-center rounded-[5px] hover:bg-white/20">
          <Wallpaper className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => os.setTheme(os.theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
          className="grid h-[24px] w-8 place-items-center rounded-[5px] hover:bg-white/20"
        >
          {os.theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
        <span className="ml-2 px-1.5 font-medium tabular-nums">
          {now &&
            now.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false })}
        </span>
      </div>
    </div>
  )
}
