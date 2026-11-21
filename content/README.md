# Contenuto dispense

I file `.md` in questa cartella sono le dispense caricate nell’app.

Per aggiornare il contenuto dalla store del progetto:

```bash
# dalla root del workspace
cp /cursor/stores/self/docs/*.md studio-acconciatori/content/
rm -f studio-acconciatori/content/project-context.md
```

Oppure, se la store è montata come `bc-1c203567-ec5c-4598-b6dd-8d87fab5eff3`:

```bash
cp /cursor/stores/bc-1c203567-ec5c-4598-b6dd-8d87fab5eff3/docs/*.md studio-acconciatori/content/
rm -f studio-acconciatori/content/project-context.md
```

Poi ricostruisci / ripubblica l’app. L’indice in app elenca automaticamente tutti i `.md` presenti (eccetto `README.md` e `project-context.md`).
