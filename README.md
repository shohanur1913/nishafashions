# Nisha Fashions Wear (NFW)

Official corporate web platform and procurement management system for **Nisha Fashions Wear** — a premier Bangladesh-based apparel manufacturing, sourcing, and export partner for international clothing brands and retail buyers worldwide.

---

## Overview

The platform features:
- **Public B2B Web Storefront**: Comprehensive garment manufacturing showcase, export categories (Knitwear, Woven, Denim, Sweaters), tech packs, compliance certifications, and interactive inquiry workflows.
- **Hot Deals & Export Allocations**: Dedicated clearance and volume allocation center with FOB pricing and direct RFQ channels.
- **Admin Management Portal (`/admin`)**: Real-time management for catalog styles, export surplus, buyer inquiries/RFQs, traffic analytics, and site content.
- **Database-Driven Architecture**: Powered by MySQL with secure server actions and session authentication.

---

## Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React 19 Server Components & Actions |
| **Language** | TypeScript | Fully type-safe codebase |
| **Styling** | Tailwind CSS & CSS Variables | Responsive, modern editorial design |
| **Database** | MySQL | Relational storage for products, inquiries, and site content |
| **UI Components** | Lucide React, Framer Motion, Radix Primitives | Accessible and fluid interactive controls |
| **Data Visuals** | Recharts & Three.js | Performance charts and WebGL visual elements |

---

## Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **MySQL**: `v8.x` or MariaDB `10.x+`

### 2. Installation
Clone the repository and install all project dependencies:

```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nishafashions

# Authentication
JWT_SECRET=your_jwt_secret_key_here
ADMIN_DEFAULT_EMAIL=admin@nishafashions.com
ADMIN_DEFAULT_PASSWORD=admin123
```

### 4. Database Setup
Import the provided `database.sql` schema into your MySQL server:

```bash
mysql -u root -p nishafashions < database.sql
```

### 5. Running the Application

- **Development server**:
  ```bash
  npm run dev
  ```
  Accessible at [http://localhost:3000](http://localhost:3000)

- **Production build**:
  ```bash
  npm run build
  npm run start
  ```

---

## Key Routes

- `/` — Homepage (Company profile, core categories, factory certifications, hot deals CTA)
- `/products` — Full export catalog and garment technical specifications
- `/hot-deals` — Time-limited factory surplus, stock lots, and volume offers
- `/about` — Factory infrastructure, sourcing network, quality standards
- `/services` — Sampling, tech-pack drafting, manufacturing, and logistics
- `/contact` — Global export inquiries, RFQ form, direct factory contact
- `/admin` — Management portal (inquiries, styles, analytics, settings)

---

## Project Structure

```text
├── actions/             # Server actions (inquiries, catalog mutations, admin)
├── app/                 # Next.js App Router (pages, layouts, routes, API)
│   ├── (website)/       # Public storefront routes
│   ├── admin/           # Administrative portal & CMS
│   └── api/             # API endpoints
├── components/          # Reusable UI components & section blocks
├── hooks/               # Custom React hooks
├── lib/                 # Database client, content services, utilities
├── public/              # Static assets, photography, and company media
├── scripts/             # Database backup & deployment utilities
└── database.sql         # Base database schema & seed data
```

---

## Production Deployment

The project can be deployed on any Node.js hosting platform (Vercel, AWS, DigitalOcean, or cPanel Node.js Selector):

1. Set up production MySQL database.
2. Configure environment variables in your hosting environment.
3. Run `npm run build`.
4. Start the service with `npm run start` or via process managers like PM2 (`server.js`).

---

## Copyright & License

Copyright &copy; Nisha Fashions Wear. All rights reserved. Private and confidential commercial property.