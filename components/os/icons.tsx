"use client"

import { useId } from "react"
import type { AppId } from "./store"

export function XLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.3 22H3.2l7.3-8.3L1 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
    </svg>
  )
}

export function GithubLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.6 4.8 18.6 5 18.6 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

// the "A" mark used in the menu bar and boot screen
export function Mark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2.5 3 21.5h4.2L12 11l4.8 10.5H21L12 2.5Z" fill="currentColor" />
      <path d="M9.4 16.6h5.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// app icons are drawn as quiet, physical desk objects rather than glossy app tiles
const lift = { filter: "drop-shadow(0 1px 1px rgba(0,0,0,.18)) drop-shadow(0 8px 10px rgba(0,0,0,.22))" }

export function AppIcon({ app, size = 52 }: { app: AppId; size?: number }) {
  const uid = useId().replace(/:/g, "")
  const id = (name: string) => `${uid}-${name}`
  const url = (name: string) => `url(#${id(name)})`
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={lift} aria-hidden>
      {children}
    </svg>
  )

  switch (app) {
    case "finder":
      // paper folder
      return svg(
        <>
          <defs>
            <linearGradient id={id("back")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dedcd6" />
              <stop offset="1" stopColor="#c9c6bf" />
            </linearGradient>
            <linearGradient id={id("front")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbfaf7" />
              <stop offset="1" stopColor="#e6e4de" />
            </linearGradient>
          </defs>
          <path d="M9 27a5 5 0 0 1 5-5h22l6 6h44a5 5 0 0 1 5 5v47H9Z" fill={url("back")} />
          <rect x="16" y="29" width="66" height="40" rx="1.5" fill="#fffdf8" transform="rotate(-2.5 50 50)" />
          <rect x="7" y="37" width="86" height="48" rx="5" fill={url("front")} />
          <path d="M12 37.6h76" stroke="#fff" strokeWidth="1.2" opacity=".9" />
          <circle cx="50" cy="61" r="6" fill="#2a2a2d" />
          <path d="M47.6 63.4 52.4 58.6M48.5 58.6h3.9v3.9" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </>,
      )
    case "notes":
      // sticky notes with a paperclip
      return svg(
        <>
          <rect x="21" y="22" width="60" height="60" rx="1.5" fill="#e3dac6" transform="rotate(7 51 52)" />
          <rect x="18" y="19" width="60" height="60" rx="1.5" fill="#efe7d5" transform="rotate(-4 48 49)" />
          <path d="M22 70c14 3 34 3 52-1" stroke="#000" strokeOpacity=".05" strokeWidth="6" fill="none" />
          <path d="M39 10v27a5.5 5.5 0 0 0 11 0V15a3.4 3.4 0 0 0-6.8 0v20" stroke="#9c9c9c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>,
      )
    case "terminal":
      // small beige computer with a prompt on screen
      return svg(
        <>
          <defs>
            <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#efe9dc" />
              <stop offset="1" stopColor="#d6cdb9" />
            </linearGradient>
          </defs>
          <rect x="24" y="78" width="52" height="9" rx="2" fill="#cbc1ab" />
          <rect x="20" y="10" width="60" height="70" rx="6" fill={url("body")} />
          <rect x="27" y="17" width="46" height="35" rx="3.5" fill="#3e3c37" />
          <rect x="29.5" y="19.5" width="41" height="30" rx="2.5" fill="#141714" />
          <text x="33" y="38" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#9fe07c">
            {">_"}
          </text>
          <rect x="50" y="63" width="20" height="2.2" rx="1.1" fill="#b4aa93" />
          <circle cx="31" cy="64" r="2" fill="#c9bfa8" />
        </>,
      )
    case "music":
      // vinyl sliding out of its sleeve
      return svg(
        <>
          <defs>
            <linearGradient id={id("sleeve")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e9e5da" />
              <stop offset="1" stopColor="#d3cebf" />
            </linearGradient>
          </defs>
          <circle cx="62" cy="50" r="31" fill="#161616" />
          {[27, 23, 19, 15].map((r) => (
            <circle key={r} cx="62" cy="50" r={r} fill="none" stroke="#2c2c2c" strokeWidth=".7" />
          ))}
          <path d="M62 19a31 31 0 0 1 27 16" stroke="#fff" strokeOpacity=".16" strokeWidth="3" fill="none" />
          <circle cx="62" cy="50" r="9" fill="#1ed760" />
          <circle cx="62" cy="50" r="1.5" fill="#111" />
          <rect x="10" y="20" width="58" height="60" rx="1.5" fill={url("sleeve")} />
          <circle cx="39" cy="50" r="13" fill="none" stroke="#1ed760" strokeWidth="2.4" opacity=".85" />
          <path d="M32 46c5-2 10-1.5 14 1M33 50.5c4-1.4 8-1 11 .8M34 54.6c3-1 6-.7 8.4.5" stroke="#1ed760" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".85" />
        </>,
      )
    case "trophies":
      // gold cup on a dark plinth
      return svg(
        <>
          <defs>
            <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b8862a" />
              <stop offset=".35" stopColor="#f6dc8e" />
              <stop offset=".6" stopColor="#d9aa45" />
              <stop offset="1" stopColor="#9a6c17" />
            </linearGradient>
          </defs>
          <path d="M31 24c-11 0-11 16 2 17M69 24c11 0 11 16-2 17" stroke={url("gold")} strokeWidth="4" fill="none" />
          <path d="M29 15h42v13c0 16-9 25-21 26-12-1-21-10-21-26Z" fill={url("gold")} />
          <path d="M36 19v10c0 9 3 15 8 19" stroke="#fff" strokeOpacity=".45" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <rect x="46" y="54" width="8" height="11" fill="#b98a2c" />
          <rect x="37" y="64" width="26" height="5" rx="1.2" fill={url("gold")} />
          <rect x="31" y="69" width="38" height="16" rx="2" fill="#2f2a25" />
          <rect x="42" y="73.5" width="16" height="6" rx="1" fill="#d6b25e" />
        </>,
      )
    case "mail":
      // cream envelope with a stamp
      return svg(
        <>
          <rect x="10" y="26" width="80" height="52" rx="3" fill="#efe8d8" />
          <path d="M11 28 50 55l39-27" fill="#e5dcc8" />
          <path d="M11 28 50 55l39-27" stroke="#d3c7ad" strokeWidth="1" fill="none" />
          <path d="M11 77 40 52M89 77 60 52" stroke="#000" strokeOpacity=".06" strokeWidth="1.2" />
          <rect x="68" y="32" width="15" height="18" fill="#fff" stroke="#cfc6b3" strokeWidth=".8" strokeDasharray="1.6 1.2" />
          <rect x="70.5" y="34.5" width="10" height="13" fill="#d8673e" opacity=".85" />
          <circle cx="62" cy="44" r="6.5" fill="none" stroke="#8d8270" strokeWidth=".8" opacity=".6" />
        </>,
      )
    case "preview":
      // the actual first page of the resume
      return (
        <div className="grid place-items-center" style={{ width: size, height: size }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/os/resume-thumb.png"
            alt=""
            draggable={false}
            className="rotate-[-3deg] border border-black/10 bg-white object-cover object-top"
            style={{ ...lift, height: size * 0.9, width: size * 0.64 }}
          />
        </div>
      )
    case "trash":
      // wire mesh bin
      return svg(
        <>
          <defs>
            <clipPath id={id("bin")}>
              <path d="M24 22h52l-6 64H30Z" />
            </clipPath>
          </defs>
          <path d="M24 22h52l-6 64H30Z" fill="#000" fillOpacity=".06" />
          <g clipPath={url("bin")} stroke="#8b8b8b" strokeWidth=".9" opacity=".8">
            {Array.from({ length: 14 }, (_, i) => (
              <path key={`a${i}`} d={`M${8 + i * 7} 20l20 70`} />
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <path key={`b${i}`} d={`M${20 + i * 7} 20l-20 70`} />
            ))}
          </g>
          <path d="M30 86h40" stroke="#7d7d7d" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="21" y="18" width="58" height="6" rx="3" fill="#b9b9b9" />
          <rect x="21" y="18" width="58" height="2.4" rx="1.2" fill="#e2e2e2" />
        </>,
      )
    default:
      return svg(<rect x="20" y="20" width="60" height="60" rx="10" fill="#999" />)
  }
}
