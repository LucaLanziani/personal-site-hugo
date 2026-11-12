---
title: "Waterloop: come l'AI potrebbe cambiare l'economia dello sviluppo software"
date: 2026-11-01T12:00:00+01:00
draft: true
category: technology
tags: [AI, Software Engineering, Architecture, Agile]
email: luca@lanziani.com
description: "Waterloop è un'ipotesi su come combinare una visione architetturale iniziale con una riconciliazione continua assistita dall'AI, mentre cambia il costo delle modifiche al software."
---

Vedo sempre più persone liquidare lo sviluppo guidato dalle specifiche come «di nuovo Waterfall».

Capisco il paragone. Si scrivono i requisiti, si definisce l'architettura e poi si chiede a un agente di implementarla. Può sembrare molto simile al processo da cui abbiamo cercato di allontanarci per anni.

Questo però mi ha fatto chiedere se stiamo dando per scontato che tornare indietro abbia sempre lo stesso costo.

Se gli agenti possono aiutarci a rivedere insieme specifiche, progetto, codice e test, potremmo permetterci più struttura iniziale senza considerare definitive quelle decisioni?

È l'idea che ho iniziato a chiamare **Waterloop**.

<!--more-->

Waterloop è un'ipotesi, non una metodologia validata. Combina una pianificazione architetturale esplicita con feedback continui e una riconciliazione assistita dall'AI tra ciò che un team intende costruire e ciò che effettivamente rilascia.

## Il costo di tornare indietro

Waterfall organizza lo sviluppo in fasi sequenziali: requisiti, progettazione, implementazione, test e rilascio. La struttura offre ai team un modo per ragionare su un sistema, ma rendere definitive le decisioni troppo presto diventa costoso quando cambiano le ipotesi iniziali. I clienti potrebbero aver bisogno di vedere software funzionante prima di riuscire a spiegare cosa serve loro; l'implementazione potrebbe far emergere un vincolo trascurato durante la progettazione.

Agile risponde a questa incertezza con rilasci frequenti e feedback. I suoi [principi](https://agilemanifesto.org/principles.html) accolgono esplicitamente i cambiamenti nei requisiti e incoraggiano la consegna regolare di software funzionante. Agile riguarda anche la collaborazione e la scoperta di ciò che genera valore: sarebbe quindi troppo semplice dire che esiste solo perché modificare il codice è costoso.

L'aspetto economico resta comunque importante. Se una modifica richiede settimane, un team ha un buon motivo per limitare il lavoro non ancora validato prima di cercare feedback. Se alcune parti di quella modifica diventano meno costose, l'equilibrio tra pianificazione e iterazione potrebbe cambiare.

## Progettazione iniziale reversibile

Trovo utile l'idea di una *progettazione iniziale reversibile*. Si parte con abbastanza chiarezza architetturale da comprendere il sistema: dominio, confini, interfacce, flussi di dati, vincoli di sicurezza e comportamento atteso. Si registrano le decisioni importanti e le ipotesi su cui si basano. Poi si trattano quelle decisioni come ipotesi da rivedere quando emergono nuove evidenze.

L'AI potrebbe aiutare un team a individuare gli effetti di una modifica proposta su questi artefatti, suggerire alternative, aggiornare codice e test e identificare la documentazione da rivedere. Un progetto architetturale è utile quando aiuta a spiegare le conseguenze di una modifica e rimane abbastanza vicino all'implementazione da essere affidabile.

Quest'ultima condizione è difficile da soddisfare. Un modello può trascurare con sicurezza una dipendenza, aggiornare un documento per farlo corrispondere a un'implementazione errata o generare test che ripetono lo stesso errore del codice. Una specifica viva richiede responsabilità esplicite, tracciabilità, controlli automatici dove possibile e revisione umana. Generare documenti coerenti tra loro non dimostra che il sistema rispetti gli obiettivi previsti.

Alcune decisioni restano inoltre costose da invertire: una migrazione del database con dati di produzione, un'API pubblica usata dai clienti, un confine di sicurezza o una dipendenza condivisa tra team. Modificare il codice più velocemente non elimina la necessità di piani di compatibilità, coordinamento e rollback.

## Un ciclo tra intenzione e implementazione

Waterloop organizza il lavoro attorno a cinque attività collegate:

1. **Definire:** descrivere il risultato desiderato, i requisiti, i vincoli e i criteri di accettazione.
2. **Progettare:** documentare l'architettura, le interfacce e le decisioni pertinenti, comprese le ipotesi su cui si basano.
3. **Costruire:** implementare una modifica abbastanza contenuta da poter essere esaminata e integrata.
4. **Validare:** verificare comportamento, sicurezza, qualità e allineamento con il risultato desiderato.
5. **Riconciliare:** usare il feedback per rivedere insieme requisiti, progetto, codice, test e documentazione.

Queste attività hanno un ordine logico, ma non sono passaggi che si chiudono definitivamente. Un test può mettere in discussione il progetto; un prototipo può far emergere una domanda sul prodotto; il feedback dalla produzione può invalidare un criterio di accettazione. L'AI può aiutare a trovare gli artefatti interessati e proporre modifiche, mentre le persone responsabili del sistema decidono cosa accettare.

Immaginiamo un servizio di gestione degli ordini progettato per un solo indirizzo di consegna per ordine. In seguito, un cliente ha bisogno di inviare gli articoli a indirizzi diversi. Un agente potrebbe individuare lo schema, le API, le regole di validazione, i test e la documentazione che si basano sull'ipotesi originale, quindi proporre una migrazione e un'implementazione. Il team deve comunque stabilire cosa accade agli ordini esistenti, concordare la compatibilità delle API con chi le utilizza, testare la migrazione con dati rappresentativi, valutare le implicazioni per sicurezza e privacy e pianificare deployment e rollback.

L'analisi d'impatto dell'agente è un punto di partenza per la revisione, non una mappa esaustiva delle dipendenze. La modifica è completa solo quando comportamento, documentazione delle decisioni progettuali, test e piano operativo sono coerenti e l'esigenza del cliente è stata verificata.

## Misurare l'intera modifica

L'ipotesi economica può essere espressa così:

```text
Costo della modifica = analisi + riprogettazione + implementazione + test
                     + coordinamento + deployment + rischio
```

L'AI può ridurre lo sforzo necessario per analisi, implementazione, creazione dei test e documentazione, ma può anche aggiungere lavoro di revisione e correzione. Il rischio non è semplicemente un altro numero sul registro delle ore: un raro incidente in produzione può pesare più di molte modifiche rapide.

Non dovremmo dare per scontato un aumento di produttività. Nello [studio randomizzato di METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), sviluppatori open source esperti che lavoravano su repository familiari hanno impiegato in media più tempo quando potevano usare gli strumenti studiati, disponibili all'inizio del 2025. Il risultato descrive un gruppo, un insieme di attività e una generazione di strumenti specifici; non risolve la questione per ogni team o per gli strumenti più recenti. Mostra però perché la velocità percepita non sostituisce una misurazione.

Un esperimento utile su Waterloop confronterebbe modifiche simili con e senza un flusso di riconciliazione assistito dall'AI, oppure misurerebbe una situazione di riferimento prima di adottarlo. Occorrerebbe registrare le condizioni iniziali e includere:

- Il tempo dalla richiesta di modifica al rilascio di un risultato revisionato, compresi coordinamento e migrazione.
- Il tempo dedicato a revisionare e correggere analisi, codice, test e documentazione generati.
- Difetti, deployment falliti e lavoro successivo osservati in un periodo definito.
- Se l'architettura e i criteri di accettazione sono stati aggiornati e revisionati e se corrispondono ancora al comportamento rilasciato.
- La natura di ogni modifica e le sue dipendenze, per evitare di considerare equivalenti attività diverse.

Un piccolo team non otterrà un risultato scientifico netto da poche modifiche. Può comunque capire dove il flusso di lavoro fa risparmiare tempo, dove aggiunge lavoro e quali controlli individuano problemi prima del rilascio. Se le code di revisione si allungano o gli incidenti aumentano mentre l'implementazione accelera, il sistema di delivery ha spostato il costo invece di eliminarlo.

## Anche la pianificazione ha bisogno di feedback

Waterloop non rende Agile obsoleto. Il feedback dei clienti, i rilasci frequenti e la collaborazione restano essenziali, perché produrre più rapidamente un sistema tecnicamente coerente non dimostra che risolva il problema giusto. Anche l'architettura iniziale può diventare uno spreco se un team progetta molto più di quanto possa validare. Il livello di dettaglio appropriato dipende dall'incertezza e dalle conseguenze di una decisione sbagliata.

La proposta è rendere l'intento architetturale abbastanza esplicito da guidare le modifiche, mantenere le decisioni rivedibili dove possibile e usare l'AI per aiutare a riconciliare gli artefatti mentre il sistema evolve. Per riuscirci deve funzionare anche il sistema di delivery che li circonda: test, revisione, controlli sul deployment, osservabilità e responsabilità. Ho approfondito il divario più ampio tra velocità di scrittura del codice e delivery in [AI Engineering](/posts/2026/06/ai-engineering/).

Il prossimo passo è provare questo approccio su modifiche reali e misurare l'intero percorso fino alla produzione. Se il costo totale delle modifiche diminuisce senza compromettere la qualità, potrebbe valere la pena investire di più nella progettazione iniziale. Se non diminuisce, l'esperimento dovrebbe dirci dove sono finiti i risparmi apparenti.
