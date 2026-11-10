"use client"

import { Check, Copy, Download, ExternalLink, Send, Trash2 } from "lucide-react"
import { useState } from "react"
import { profile } from "@/lib/data"
import { GithubLogo, XLogo } from "../icons"
import { useWin } from "../store"

export function Mail() {
  const { compact } = useWin()
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [copied, setCopied] = useState(false)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || "Hello Apurva")}&body=${encodeURIComponent(body)}`
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard can be blocked; the address is visible anyway
    }
  }

  const row = "flex items-center gap-3 border-b border-os-line px-5 py-2.5 text-[13px]"
  return (
    <div className={`flex h-full ${compact ? "flex-col" : ""}`}>
      <form onSubmit={send} className="flex min-w-0 flex-1 flex-col">
        <div className={row}>
          <span className="w-16 text-os-muted">To:</span>
          <span className="rounded-full bg-os-accent-soft px-2.5 py-0.5 font-medium text-os-accent">{profile.name}</span>
          <button type="button" onClick={copy} aria-label="Copy email address" className="ml-auto text-os-muted hover:text-os-text">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <label className={row}>
          <span className="w-16 text-os-muted">Subject:</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Let's build something" className="flex-1 bg-transparent outline-none placeholder:text-os-muted" />
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Hi Apurva, …"
          aria-label="Message"
          className="min-h-[160px] flex-1 resize-none bg-transparent px-5 py-4 text-[14px] leading-relaxed outline-none placeholder:text-os-muted"
        />
        <div className="flex items-center justify-between border-t border-os-line px-5 py-3">
          <span className="text-[11.5px] text-os-muted">Opens in your mail app</span>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-os-accent px-4 py-2 text-[13px] font-medium text-white hover:brightness-110">
            <Send className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </form>
      <aside className={`shrink-0 bg-os-side p-4 text-[13px] ${compact ? "border-t border-os-line" : "w-[200px] border-l border-os-line"}`}>
        <p className="mb-2 text-[11px] font-semibold text-os-muted">Elsewhere</p>
        <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-os-hover">
          <GithubLogo /> GitHub
        </a>
        <a href={profile.x} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-os-hover">
          <XLogo /> @apurvcodes
        </a>
        <p className="mt-4 break-all px-2 font-mono text-[11px] text-os-muted">{profile.email}</p>
      </aside>
    </div>
  )
}

export function Preview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end gap-2 border-b border-os-line px-3 py-2">
        <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] hover:bg-os-hover">
          <ExternalLink className="h-3.5 w-3.5" /> Open
        </a>
        <a href={profile.resume} download="Apurva-Borhade-Resume.pdf" className="inline-flex items-center gap-1.5 rounded-md bg-os-accent px-2.5 py-1 text-[12.5px] font-medium text-white">
          <Download className="h-3.5 w-3.5" /> Download
        </a>
      </div>
      <iframe title="Resume" src={`${profile.resume}#view=FitH`} className="min-h-0 flex-1 bg-[#525659]" />
    </div>
  )
}

export function Trash() {
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <div>
        <Trash2 className="mx-auto h-10 w-10 text-os-muted" strokeWidth={1.4} />
        <p className="mt-3 text-[15px] font-semibold">Trash is empty</p>
        <p className="mt-1 text-[13px] text-os-muted">Everything I build ends up on the desktop instead.</p>
      </div>
    </div>
  )
}
