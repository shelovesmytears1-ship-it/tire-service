# TireForce Pro

Profesjonalny serwis opon i balansowania kół w Warszawie.  
Landing page stworzony jako projekt portfelowy.

## Struktura projektu

```
tire-service/
├── index.html       — główna strona (5 bloków)
├── style.css        — design system + wszystkie style
├── script.js        — timer, formularz, animacje
├── images/          — obrazy (do wygenerowania)
│   ├── hero.jpg
│   ├── services-bg.jpg
│   ├── promo.jpg
│   ├── workshop.jpg
│   └── team.jpg
└── README.md
```

## Funkcjonalności

- **Hero** — split-screen, offfset typografia, statystyki
- **Usługi + Cennik** — lista usług + asymetryczna tabela cennikowa
- **Promocja** — dynamiczny odliczający timer do końca miesiąca + badge rabatowy
- **Rezerwacja** — formularz z 3-etapowym progressive disclosure, walidacją inline, success state z animowanym checkmarkiem
- **Kontakt** — Google Maps embed + dane kontaktowe
- **Footer** — 3-kolumnowy z nawigacją i danymi

## Technologie

- Vanilla HTML5 / CSS3 / JavaScript (ES5 compatible)
- Bez frameworków, bez zależności npm
- Mobile-first, responsywny
- Dostępny (WCAG AA: aria-labels, focus rings, reduced-motion)
- Gotowy do deploy na GitHub Pages

## Obrazy — instrukcja

Wygeneruj 5 obrazów przy użyciu podanych promptów i umieść je w katalogu `images/`:

| Plik | Opis |
|------|------|
| `hero.jpg` | Mechanik przy kole na podnośniku, ciemny garaż, oświetlenie pomarańczowe |
| `services-bg.jpg` | Makro koła aluminiowego z nową oponą, ciemne tło, dramatyczne oświetlenie |
| `promo.jpg` | 4 opony z góry w układzie 2×2, minimalistyczne, ciemne tło |
| `workshop.jpg` | Szerokokątne wnętrze warsztatu, podnośniki, bez ludzi |
| `team.jpg` | Dwóch mechaników w szarych kombinezonach, naturalny klimat |

## Deploy (GitHub Pages)

```bash
git init
git add .
git commit -m "Initial commit: TireForce Pro landing page"
git remote add origin https://github.com/TWOJ-USER/tire-service.git
git push -u origin main
```

W ustawieniach repozytorium → Pages → Source: `main` / `root`.

## Autor

Projekt portfelowy — [Twoje imię]
