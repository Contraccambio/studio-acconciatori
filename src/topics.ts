export type Topic = {
  id: string
  title: string
  subtitle: string
  body: string
}

const PREFERRED_ORDER = [
  'indice',
  'capello',
  'tricologia-diagnosi',
  'shampoo',
  'balsamo',
  'tinta',
  'trattamenti-avanzati',
  'taglio-acconciatura',
  'piega',
  'consulenza-immagine',
  'anatomia-dermatologia',
  'chimica-cosmetologia',
  'igiene-sicurezza',
  'gestione-normativa',
]

const modules = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function extractTitle(body: string, fallback: string): string {
  const match = body.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() || fallback
}

function extractSubtitle(body: string): string {
  const lines = body.split('\n').map((l) => l.trim())
  for (const line of lines) {
    if (!line || line.startsWith('#') || line === '---') continue
    return line.replace(/\*\*/g, '').slice(0, 120)
  }
  return 'Dispensa di studio'
}

function titleFromId(id: string): string {
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function loadTopics(): Topic[] {
  const topics: Topic[] = []

  for (const [path, body] of Object.entries(modules)) {
    const file = path.split('/').pop() ?? ''
    if (!file.endsWith('.md')) continue
    const id = file.replace(/\.md$/, '')
    if (id === 'README' || id === 'project-context') continue

    topics.push({
      id,
      title: extractTitle(body, titleFromId(id)),
      subtitle: extractSubtitle(body),
      body,
    })
  }

  topics.sort((a, b) => {
    const ai = PREFERRED_ORDER.indexOf(a.id)
    const bi = PREFERRED_ORDER.indexOf(b.id)
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title, 'it')
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return topics
}
