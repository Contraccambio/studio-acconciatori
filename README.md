# Studio Acconciatori — Dispense

App web semplice per consultare le dispense di teoria della scuola acconciatori (italiano).

## Uso locale

```bash
npm install
npm run dev
```

## Aggiornare i contenuti

Le dispense sono in `content/*.md` (copia dalla store del progetto).

```bash
./scripts/sync-content.sh
```

L’app elenca automaticamente tutti i file `.md` in `content/` (eccetto `README.md` e `project-context.md`).
