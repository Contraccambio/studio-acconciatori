import { useMemo, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { loadTopics, type Topic } from './topics'
import './App.css'

type View = 'home' | 'topic'

function App() {
  const topics = useMemo(() => loadTopics(), [])
  const [view, setView] = useState<View>('home')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return topics
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    )
  }, [topics, query])

  const activeIndex = topics.findIndex((t) => t.id === activeId)
  const active: Topic | null = activeIndex >= 0 ? topics[activeIndex] : null
  const prev = activeIndex > 0 ? topics[activeIndex - 1] : null
  const next =
    activeIndex >= 0 && activeIndex < topics.length - 1
      ? topics[activeIndex + 1]
      : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view, activeId])

  function openTopic(id: string) {
    setActiveId(id)
    setView('topic')
  }

  function goHome() {
    setView('home')
    setActiveId(null)
  }

  return (
    <div className="app-shell">
      <div className="bg-atmosphere" aria-hidden="true" />

      {view === 'home' ? (
        <main className="home">
          <header className="home-header">
            <p className="brand">Studio Acconciatori</p>
            <h1>Dispense di studio</h1>
            <p className="lede">
              Scegli un argomento e passa da uno all’altro senza frizioni.
            </p>
            <label className="search">
              <span className="sr-only">Cerca argomento</span>
              <input
                type="search"
                placeholder="Cerca per titolo…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </label>
          </header>

          <nav className="topic-list" aria-label="Elenco argomenti">
            {filtered.length === 0 ? (
              <p className="empty">Nessun argomento corrisponde alla ricerca.</p>
            ) : (
              filtered.map((topic, i) => (
                <button
                  key={topic.id}
                  type="button"
                  className="topic-item"
                  onClick={() => openTopic(topic.id)}
                  style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
                >
                  <span className="topic-index">
                    {String(topics.indexOf(topic) + 1).padStart(2, '0')}
                  </span>
                  <span className="topic-text">
                    <span className="topic-title">{topic.title}</span>
                    <span className="topic-sub">{topic.subtitle}</span>
                  </span>
                  <span className="topic-chevron" aria-hidden="true">
                    →
                  </span>
                </button>
              ))
            )}
          </nav>

          <p className="home-meta">
            {topics.length} argoment{topics.length === 1 ? 'o' : 'i'} disponibili
          </p>
        </main>
      ) : active ? (
        <div className="topic-view">
          <header className="topic-bar">
            <button type="button" className="bar-btn" onClick={goHome}>
              ← Indice
            </button>
            <p className="bar-brand">Studio Acconciatori</p>
            <div className="bar-nav">
              <button
                type="button"
                className="bar-btn"
                disabled={!prev}
                onClick={() => prev && openTopic(prev.id)}
              >
                Prec.
              </button>
              <button
                type="button"
                className="bar-btn"
                disabled={!next}
                onClick={() => next && openTopic(next.id)}
              >
                Succ.
              </button>
            </div>
          </header>

          <article className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {active.body}
            </ReactMarkdown>
          </article>

          <footer className="topic-footer">
            <button
              type="button"
              className="footer-link"
              disabled={!prev}
              onClick={() => prev && openTopic(prev.id)}
            >
              {prev ? `← ${prev.title}` : '—'}
            </button>
            <button type="button" className="footer-home" onClick={goHome}>
              Torna all’indice
            </button>
            <button
              type="button"
              className="footer-link footer-link-next"
              disabled={!next}
              onClick={() => next && openTopic(next.id)}
            >
              {next ? `${next.title} →` : '—'}
            </button>
          </footer>
        </div>
      ) : (
        <main className="home">
          <p className="empty">Argomento non trovato.</p>
          <button type="button" className="bar-btn" onClick={goHome}>
            Torna all’indice
          </button>
        </main>
      )}
    </div>
  )
}

export default App
