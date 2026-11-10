import type { AppId } from "../store"
import { Finder } from "./Finder"
import { Mail, Preview, Trash } from "./Misc"
import { Music } from "./Music"
import { Notes } from "./Notes"
import { ProjectView } from "./ProjectView"
import { Terminal } from "./Terminal"
import { Trophies } from "./Trophies"

export const APPS: Record<AppId, () => React.ReactElement> = {
  finder: Finder,
  terminal: Terminal,
  music: Music,
  trophies: Trophies,
  notes: Notes,
  mail: Mail,
  preview: Preview,
  trash: Trash,
  project: ProjectView,
}
