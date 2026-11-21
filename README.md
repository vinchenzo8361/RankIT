# RankIt — Personal Product-Ranking, Cataloguing & Caffeine Tracking Application

> **Version 1.0 Release** — Built strictly according to the complete Version 1 Development Specification.
> 100% Local Browser Storage • Zero Cloud Dependencies • High-Contrast Minimalist Aesthetic

---

## ⚡ Core Sections & Feature Highlights

### 1. Rankings
- **Personal Rankings Workspace**: Create and organize custom ranking projects (e.g., *"My Favourite Energy Drinks"*, *"Top Energy Drink Brands"*).
- **Tier List System (7 Tiers)**: Move and re-order products between **S** (#F59E0B), **A** (#16A34A), **B** (#3B82F6), **C** (#EAB308), **D** (#F97316), **F** (#EF4444), and unranked **IDK** (#94A3B8).
- **Two Separate Categories**: Evaluate **Energy Drink Brands** separately from **Energy Drinks** (flavours/products).
- **Ratings Out of 10**: Rate drinks or brands with decimal accuracy (e.g. `9.2`, `8.8`), with ascending/descending sort and search.
- **Personal Tasting Comments**: Add private tasting notes to any item.

### 2. Catalog Database
- **27+ Energy Drink Brands**: Red Bull, Monster, Rockstar, Ghost, C4, Celsius, Reign, Bang, NOS, Full Throttle, AMP, Venom, Rip It, G Fuel, PRIME, Alani Nu, Bucked Up, 3D, Guru, Redline, EBOOST, XYIENCE, Raze, Wired, Spike, Joker, Beaver Buzz.
- **Flavours & Discontinued Formulations**: Filter by active vs. discontinued editions, search by flavour notes, or sort by caffeine payload.
- **Centralized Source of Truth**: User-added or edited products immediately reflect across Rankings and Drink Tracker.
- **Coffee Category Reserved**: Clear placeholder for Version 2 coffee beans and cold brew expansion.

### 3. Drink Tracker
- **Daily Caffeine Calculator**: Automatic intake calculation using exact consumed volume:
  $$\text{Caffeine Consumed} = \left(\frac{\text{Volume Consumed}}{\text{Standard Serving Volume}}\right) \times \text{Caffeine per Standard Serving}$$
- **Serving Controls**: Convenient quick volume presets (100ml, 125ml, 250ml, 355ml, 473ml, 500ml) or custom millilitre inputs with `+` and `-` serving modifiers.
- **Weekly Consumption & 7-Day Bar Chart**: Interactive daily and weekly totals with the FDA 400mg daily guidance line.

### 4. Informational Library & Encyclopedia
- **Brand Histories**: Historical origins, founders, corporate ownership, major milestones, and fun facts.
- **Product Histories**: Direct navigation link to their Catalog database record.
- **Industry Timeline**: Evolution from Japanese/Thai tonics to 16oz can wars and modern nootropics.
- **Ingredients Science**: Breakdown of Caffeine, Taurine, B-vitamins, Alpha-GPC, CarnoSyn, and L-Carnitine.
- **Discontinued Product Archive**: Historical record of retired formulations.

### 5. Local Storage & Data Management
- **100% Client-Side Privacy**: Data is preserved entirely inside browser `localStorage`.
- **Export / Import JSON**: One-click complete database backups.
- **Export CSV**: Export ratings and consumption logs for Excel or Google Sheets.
- **Print-Friendly View**: Clean printable layout without UI distractions.

---

## 🛠️ Development & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```
