# Nisha Fashions Wear (NFW)
# System Architecture

**Document:** `ARCHITECTURE.md`  
**Project:** Nisha Fashions Wear corporate website + Admin CMS  
**Status:** Final Architecture  
**Deployment Model:** Single Next.js application + Vercel + Supabase

---

## 1. Architecture Goals

The system must provide:

1. A premium, fast, buyer-focused public website.
2. A secure Admin CMS at `/admin`.
3. One Next.js repository and one Vercel deployment.
4. Content management without hardcoding website content.
5. Product/category/media management from the Admin CMS.
6. Buyer enquiry management.
7. SEO controls for pages and products.
8. Secure image/file storage.
9. Type-safe database access and migrations.
10. A simple architecture that can scale without unnecessary infrastructure.

The architecture must **not** imply that NFW owns or operates its own garment factory. NFW operates through a selected/trusted factory network with production supervision, quality control, sourcing and export support.

---

# 2. Final Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js App Router | Public website, Admin CMS, server logic |
| Language | TypeScript | Application-wide strict typing |
| UI | Tailwind CSS | Styling |
| Components | shadcn/ui | Accessible UI primitives |
| Icons | Lucide React | Interface icons |
| Database | Supabase PostgreSQL | Primary relational database |
| ORM | Drizzle ORM | Schema, queries, relations and migrations |
| Authentication | Supabase Auth | Admin authentication |
| File Storage | Supabase Storage | Product and website media |
| Backend Logic | Server Actions + Route Handlers | Mutations and controlled API endpoints |
| Hosting | Vercel | Next.js production deployment |
| DB Migrations | Drizzle Kit | Versioned database migrations |
| Image Optimization | `next/image` | Responsive image delivery |
| Validation | Zod | Server/client input validation |

Do not introduce another backend framework unless a real requirement appears.

---

# 3. High-Level Architecture

```text
                         ┌──────────────────────────┐
                         │        Buyer/User        │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │       NFW Website        │
                         │        Next.js            │
                         └────────────┬─────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
          ┌──────────────────┐                ┌──────────────────┐
          │ Public Website   │                │   Admin CMS      │
          │                  │                │     /admin       │
          │ Products         │                │ Products         │
          │ Services         │                │ Categories       │
          │ About            │                │ Media            │
          │ Contact          │                │ Enquiries        │
          └────────┬─────────┘                │ Pages/SEO        │
                   │                          │ Settings         │
                   │                          └────────┬─────────┘
                   │                                   │
                   └─────────────────┬─────────────────┘
                                     │
                                     ▼
                         ┌──────────────────────────┐
                         │   Next.js Server Layer   │
                         │                          │
                         │ Server Components        │
                         │ Server Actions           │
                         │ Route Handlers           │
                         └────────────┬─────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
                ┌──────────────────┐      ┌──────────────────┐
                │   Drizzle ORM   │      │  Supabase Auth   │
                └────────┬─────────┘      └──────────────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Supabase         │
                │ PostgreSQL       │
                └──────────────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Supabase Storage │
                │ Website Media    │
                └──────────────────┘

Deployment:
Next.js → Vercel
Database/Auth/Storage → Supabase
```

---

# 4. Repository Architecture

The application must remain a **single repository**.

Recommended structure:

```text
/
├── app/
│   ├── (website)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── services/
│   │   └── contact/
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── media/
│   │   ├── enquiries/
│   │   ├── pages/
│   │   └── settings/
│   │
│   ├── api/
│   │   └── ...
│   │
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── website/
│   └── admin/
│
├── db/
│   ├── index.ts
│   ├── schema/
│   │   ├── categories.ts
│   │   ├── products.ts
│   │   ├── media.ts
│   │   ├── pages.ts
│   │   ├── enquiries.ts
│   │   ├── settings.ts
│   │   └── index.ts
│   └── relations.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── auth/
│   ├── validations/
│   ├── seo/
│   └── utils/
│
├── actions/
│   ├── products.ts
│   ├── categories.ts
│   ├── pages.ts
│   ├── media.ts
│   ├── enquiries.ts
│   └── settings.ts
│
├── drizzle/
│   └── migrations/
│
├── public/
├── drizzle.config.ts
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

The exact folder structure may be adjusted during implementation, but the architectural separation must remain.

---

# 5. Public Website

The public website is the buyer-facing side of NFW.

Core routes:

```text
/
 /about
 /products
 /products/[slug]
 /services
 /contact
```

Optional future routes:

```text
 /capabilities
 /how-we-work
 /markets
 /insights
```

The public website must use database content wherever the content is intended to be editable from Admin.

Static structural UI can remain in code.

---

# 6. Admin CMS

Admin is part of the same Next.js application:

```text
/admin
```

The Admin CMS must be functional rather than visually identical to the marketing website.

Recommended navigation:

```text
Dashboard

Website
├── Homepage
├── About
├── Services
├── How We Work
├── Contact
└── SEO

Catalog
├── Categories
└── Products

Media

Enquiries

Settings
└── General
```

---

# 7. Admin Authentication

Use **Supabase Auth**.

Do not build custom password authentication.

Admin flow:

```text
Admin
  ↓
/admin/login
  ↓
Supabase Auth
  ↓
Authenticated session
  ↓
Protected /admin routes
```

The application must verify authentication on the server.

Client-side hiding of Admin UI is not a security boundary.

Unauthenticated users must not be able to execute Admin mutations.

---

# 8. Authorization

The initial system can use a simple Admin role.

Recommended profile structure:

```text
auth.users
     │
     └── profiles
           ├── id
           ├── role
           ├── name
           └── created_at
```

Role:

```text
admin
```

Future roles can be added if required:

```text
admin
editor
manager
```

Authorization must be enforced server-side.

---

# 9. Database Architecture

Database:

```text
Supabase PostgreSQL
```

ORM:

```text
Drizzle ORM
```

Drizzle is responsible for:

- Database schema definitions
- Type-safe queries
- Relations
- Migrations
- Database-level application typing

Supabase remains responsible for:

- PostgreSQL infrastructure
- Authentication
- Storage
- RLS/security capabilities

Do not duplicate database logic between multiple ORMs.

---

# 10. Core Database Tables

## 10.1 Profiles

Used for Admin user metadata.

```text
profiles
├── id
├── name
├── role
├── avatar_url
├── created_at
└── updated_at
```

`id` should correspond to the authenticated Supabase user.

---

## 10.2 Categories

```text
categories
├── id
├── name
├── slug
├── short_description
├── description
├── image_url
├── seo_title
├── seo_description
├── sort_order
├── is_published
├── created_at
└── updated_at
```

Initial categories:

```text
Knit
Woven
Denim
Sweater
```

The Admin must be able to add/edit categories later.

---

## 10.3 Products

```text
products
├── id
├── category_id
├── name
├── slug
├── short_description
├── description
├── featured_image
├── specifications
├── seo_title
├── seo_description
├── alt_text
├── is_featured
├── is_published
├── sort_order
├── created_at
└── updated_at
```

`category_id` references `categories.id`.

Products must never depend on hardcoded frontend arrays.

---

## 10.4 Product Images

```text
product_images
├── id
├── product_id
├── media_id
├── alt_text
├── sort_order
└── created_at
```

This allows each product to have a gallery.

---

## 10.5 Media

```text
media
├── id
├── file_name
├── storage_path
├── public_url
├── mime_type
├── file_size
├── width
├── height
├── alt_text
├── created_at
└── uploaded_by
```

Actual binary files are stored in Supabase Storage.

The PostgreSQL database stores metadata and references.

---

## 10.6 Pages

For editable static pages/sections:

```text
pages
├── id
├── slug
├── title
├── content
├── seo_title
├── seo_description
├── is_published
├── created_at
└── updated_at
```

Do not turn every visual component into a database record.

Only genuinely editable content should be CMS-driven.

---

## 10.7 Enquiries

Buyer enquiries:

```text
enquiries
├── id
├── name
├── company
├── email
├── phone
├── whatsapp
├── country
├── product
├── quantity
├── fabric
├── size_range
├── target_price
├── delivery_requirement
├── message
├── status
├── created_at
└── updated_at
```

Suggested status:

```text
new
in_progress
quoted
closed
```

---

## 10.8 Site Settings

Global editable values:

```text
site_settings
├── id
├── key
├── value
├── updated_at
└── updated_by
```

Examples:

```text
site_name
site_email
phone
whatsapp
address
website_url
social_links
footer_text
```

Do not hardcode business contact information throughout the application.

---

# 11. Database Relationships

```text
categories
    │
    └──────< products
                 │
                 └──────< product_images
                                │
                                └────── media

profiles
    │
    └────── uploaded media / updated content

pages
site_settings
enquiries
```

Foreign keys must be enforced at the database level wherever appropriate.

Use indexes on:

```text
categories.slug
products.slug
products.category_id
products.is_published
products.is_featured
enquiries.status
enquiries.created_at
```

Slugs must be unique.

---

# 12. Drizzle ORM Rules

All database access from application server code should use Drizzle.

Example responsibilities:

```text
db/schema/*       → schema
db/relations.ts   → relations
db/index.ts       → connection
drizzle.config.ts → migration configuration
drizzle/          → migrations
```

Use strict TypeScript.

Avoid:

```text
any
```

unless there is a documented reason.

Database writes must validate input before execution.

Use Zod for form/action validation.

Never construct SQL using unsanitized user input.

---

# 13. Supabase Storage Architecture

Use Supabase Storage for website media.

Recommended bucket:

```text
nfw-media
```

Suggested logical paths:

```text
products/
products/{product-id}/
categories/
pages/
general/
```

Example:

```text
nfw-media/products/uuid/product-main.webp
```

The Admin CMS should:

1. Validate file type.
2. Validate file size.
3. Upload to Supabase Storage.
4. Store metadata in `media`.
5. Associate the media record with the relevant product/page.
6. Allow replacement/removal from Admin.

Do not store large binary files directly inside PostgreSQL.

---

# 14. Image Rules

Preferred formats:

```text
WebP
AVIF
```

Use:

```text
next/image
```

Images must have:

- Appropriate dimensions
- Responsive sizing
- Lazy loading where appropriate
- Descriptive ALT text
- Optimized file size

Hero/above-the-fold images may use priority loading when justified.

Do not load full-resolution originals unnecessarily.

---

# 15. Server Actions

Server Actions should be used for controlled CMS mutations such as:

```text
createProduct()
updateProduct()
deleteProduct()
createCategory()
updateCategory()
updatePage()
updateSettings()
updateEnquiryStatus()
uploadMedia()
deleteMedia()
```

Every mutation must:

1. Verify authentication.
2. Verify authorization.
3. Validate input with Zod.
4. Perform the database/storage operation.
5. Revalidate affected routes.
6. Return a controlled result.

Never trust client-side authorization.

---

# 16. Route Handlers

Use Route Handlers only where an HTTP endpoint is genuinely useful.

Examples:

```text
POST /api/enquiries
GET  /api/...
```

Do not create unnecessary REST endpoints for internal Admin operations when a Server Action is sufficient.

---

# 17. Public Data Access

Public users should only receive published content.

For example:

```text
products.is_published = true
categories.is_published = true
pages.is_published = true
```

Draft/unpublished content must never leak through:

- Public pages
- Dynamic routes
- Sitemap
- Metadata
- Search
- API endpoints

---

# 18. RLS and Security

Supabase Row Level Security should be considered part of the defense-in-depth model.

Sensitive tables must not be publicly writable.

Especially:

```text
profiles
site_settings
products
categories
pages
media
enquiries
```

Public visitors must not receive unrestricted database access.

Prefer server-side database access for Admin operations.

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
```

to the browser.

Only `NEXT_PUBLIC_*` variables may be exposed client-side when intentionally designed to be public.

---

# 19. Environment Variables

Production environment should contain values similar to:

```env
NEXT_PUBLIC_SITE_URL=https://www.nishafashions.com

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

DATABASE_URL=...

SUPABASE_SERVICE_ROLE_KEY=...
```

Secrets must:

- Never be committed to Git.
- Never be included in client bundles.
- Never be placed in public configuration.
- Be configured through Vercel Environment Variables.

Use separate development and production credentials where practical.

---

# 20. Vercel Deployment

The Next.js application is deployed to:

```text
Vercel
```

Supabase remains external infrastructure for:

```text
PostgreSQL
Auth
Storage
```

Deployment flow:

```text
Git Repository
      ↓
Vercel
      ↓
Build
      ↓
Next.js Production
      ↓
Supabase
```

A single Vercel project should serve:

```text
nishafashions.com
nishafashions.com/admin
```

No separate frontend deployment is required.

---

# 21. Domain Strategy

Preferred:

```text
https://www.nishafashions.com
```

Public:

```text
https://www.nishafashions.com/
```

Admin:

```text
https://www.nishafashions.com/admin
```

Do not create a separate Admin domain unless a future security/operational requirement justifies it.

HTTPS is mandatory.

---

# 22. SEO Architecture

SEO must be database/content aware.

Implement:

```text
app/sitemap.ts
app/robots.ts
```

Every important public page should have:

- Unique title
- Meta description
- Canonical URL
- Proper H1
- Logical H2/H3 hierarchy
- Open Graph metadata
- Descriptive image ALT text

Product pages should generate metadata from database content.

Example:

```text
/products/t-shirts
/products/polo-shirts
/products/hoodies
```

The sitemap must include published product/category pages.

Unpublished pages must not appear in the sitemap.

---

# 23. SEO Targeting

Primary themes:

```text
Bangladesh apparel supplier
Bangladesh garment supplier
apparel sourcing Bangladesh
garments buying house Bangladesh
clothing manufacturer Bangladesh
knitwear supplier Bangladesh
woven garment supplier Bangladesh
denim supplier Bangladesh
sweater supplier Bangladesh
garment exporter Bangladesh
```

Important markets can be referenced naturally:

```text
Greece
Italy
Spain
Germany
France
Canada
USA
Europe
```

SEO content must remain truthful.

Do not claim:

- Owned factory
- Certifications that do not exist
- Fake client logos
- Fake production statistics
- Fake awards
- Guaranteed Google ranking

---

# 24. Contact / Buyer Enquiry Flow

Primary CTA:

```text
Get a Quote
```

Secondary contact methods:

```text
WhatsApp
Email
Phone
```

Inquiry form should collect:

```text
Name
Company
Email
Phone / WhatsApp
Country
Product
Quantity
Fabric / Composition
Size Range
Target Price
Delivery Requirement
Message
```

Flow:

```text
Buyer
  ↓
Inquiry Form
  ↓
Validation
  ↓
Server Action / API
  ↓
enquiries table
  ↓
Admin notification / Admin CMS
  ↓
Admin processes enquiry
```

The enquiry should be stored even if an optional email notification fails.

---

# 25. Caching and Revalidation

Public pages should be optimized for performance.

Use Next.js caching/revalidation appropriately.

When Admin changes:

```text
Product
Category
Page
Settings
```

the relevant public routes must be revalidated.

Example:

```text
updateProduct()
      ↓
revalidatePath("/products")
revalidatePath("/products/[slug]")
```

Do not require a full Vercel deployment for normal CMS content updates.

---

# 26. Performance Requirements

Target:

- Fast initial page load
- Minimal client-side JavaScript
- Server Components by default
- Client Components only when interaction requires them
- Optimized images
- No unnecessary animation libraries
- No excessive third-party scripts
- No giant UI bundles
- Responsive layouts
- Mobile-first implementation

Avoid turning the entire website into a client component.

---

# 27. Component Architecture

Recommended reusable components:

```text
Header
Footer
Container
SectionHeading
Button
ProductCard
ProductGrid
CategoryCard
ImageGallery
InquiryForm
WhatsAppButton
ProcessTimeline
TrustPoints
CTASection
Breadcrumbs
SEO
```

Components should be reusable and data-driven.

Do not duplicate identical UI across pages.

---

# 28. Content Architecture

Business content must be separated from presentation.

Bad:

```tsx
<p>Nisha Fashions Wear has 20+ years...</p>
```

repeated across multiple components.

Better:

```text
Database / content configuration
        ↓
Reusable component
        ↓
Rendered website
```

However, do not over-CMS the site.

Static structural copy can remain in source code if there is no business reason to edit it from Admin.

---

# 29. What Must Never Be Hardcoded

Do not hardcode these across multiple files:

```text
Company name
Email
Phone
WhatsApp
Address
Website URL
Product list
Category list
Product descriptions
SEO metadata
Social links
Footer contact information
```

These should come from centralized content/database where appropriate.

Brand/design tokens can remain in code.

---

# 30. Admin Product Editor

Each product should support:

```text
Name
Slug
Category
Short Description
Description
Featured Image
Gallery
Specifications
SEO Title
SEO Description
ALT Text
Published / Draft
Featured
Sort Order
```

Admin should support:

```text
Create
Read
Update
Delete
Publish
Unpublish
Reorder
Feature / Unfeature
```

Slug must be unique.

Changing a slug should be treated carefully because it affects SEO URLs.

---

# 31. Admin Media Manager

Media manager should provide:

```text
Upload
Preview
Search
Filter
Copy URL
Edit ALT text
Delete
Associate with content
```

Allowed types should be restricted to appropriate image formats.

File size limits must be enforced server-side.

---

# 32. Admin Dashboard

Dashboard should show useful operational information:

```text
Total Products
Published Products
Categories
New Enquiries
Pending Enquiries
Recent Enquiries
```

Avoid unnecessary analytics unless a real business requirement exists.

---

# 33. Error Handling

Use controlled error handling.

Public website:

```text
app/not-found.tsx
app/error.tsx
```

Admin:

```text
Admin-specific loading states
Admin-specific error states
Form validation messages
Empty states
```

Never expose:

- Database errors
- SQL queries
- Stack traces
- Secrets
- Internal file paths

to public users.

---

# 34. Logging

Production logs must not contain:

```text
Passwords
Auth tokens
Service role keys
Database credentials
Private buyer information unnecessarily
```

Log useful operational errors with enough context to debug.

---

# 35. Backup and Recovery

Supabase PostgreSQL is the primary production database.

The project should maintain:

1. Supabase-managed database backups where available.
2. Version-controlled Drizzle migrations.
3. Export/recovery strategy for critical production data.
4. Storage backup strategy for important media if business continuity requires it.

Database schema must always be reproducible from:

```text
Drizzle schema
+
Drizzle migrations
```

---

# 36. Development Workflow

Recommended workflow:

```text
1. Define/update Drizzle schema
2. Generate migration
3. Apply migration
4. Implement Server Action
5. Implement Admin UI
6. Implement/verify public rendering
7. Test validation/security
8. Test mobile
9. Test SEO
10. Deploy to Vercel
```

Never manually modify production database structure without corresponding migration history.

---

# 37. Git Workflow

Keep these out of Git:

```text
.env
.env.local
.env.production
```

Commit:

```text
drizzle/schema
drizzle/migrations
source code
configuration
documentation
```

Use meaningful commits.

---

# 38. Security Checklist

Before production:

- [ ] Supabase Auth enabled
- [ ] `/admin` protected server-side
- [ ] Admin authorization enforced
- [ ] RLS policies reviewed
- [ ] Service role key server-only
- [ ] Database credentials server-only
- [ ] Zod validation enabled
- [ ] Upload validation enabled
- [ ] File size limits enabled
- [ ] SQL injection protected through Drizzle parameterization
- [ ] CSRF/security behavior reviewed for mutations
- [ ] HTTPS enabled
- [ ] Production error messages sanitized
- [ ] Secrets excluded from Git
- [ ] Draft content excluded from public routes

---

# 39. Production Checklist

### Application

- [ ] Production build passes
- [ ] TypeScript check passes
- [ ] Lint passes
- [ ] No console/debug leftovers
- [ ] No broken routes
- [ ] No broken images

### CMS

- [ ] Admin login works
- [ ] Product CRUD works
- [ ] Category CRUD works
- [ ] Media upload works
- [ ] Page editing works
- [ ] Enquiries are saved
- [ ] Publish/unpublish works
- [ ] Revalidation works

### SEO

- [ ] Title tags
- [ ] Meta descriptions
- [ ] H1/H2 structure
- [ ] Canonicals
- [ ] Sitemap
- [ ] Robots
- [ ] Image ALT text
- [ ] Open Graph
- [ ] Google Search Console verification
- [ ] Initial indexing request

### Performance

- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Images optimized
- [ ] No unnecessary client components
- [ ] No excessive third-party scripts

---

# 40. Architecture Decisions

## Decision 1: Single Next.js Repository

**Decision:** Yes.

Public website and Admin CMS live in the same repository and deployment.

**Reason:** Simpler deployment, shared components, shared types, shared database layer and lower maintenance overhead.

---

## Decision 2: Supabase PostgreSQL

**Decision:** Yes.

**Reason:** Managed PostgreSQL plus Auth and Storage in one platform.

---

## Decision 3: Drizzle ORM

**Decision:** Yes.

**Reason:** Type-safe PostgreSQL schema, queries, relations and migrations while keeping the application code strongly typed.

---

## Decision 4: Supabase Auth

**Decision:** Yes.

**Reason:** Avoid implementing custom authentication and password security.

---

## Decision 5: Supabase Storage

**Decision:** Yes.

**Reason:** Product and website media naturally belongs alongside the Supabase database and authentication system.

---

## Decision 6: Next.js Server Actions

**Decision:** Yes.

**Reason:** Most Admin CRUD operations do not require a separate backend API.

---

## Decision 7: Vercel

**Decision:** Yes.

**Reason:** Native deployment model for Next.js and simple Git-based deployment.

---

# 41. Explicit Non-Goals

Do not build these unless a real requirement appears:

```text
Separate Laravel backend
Separate Admin application
Separate frontend deployment
Custom authentication system
Custom object storage system
Microservices
Redis
Kubernetes
Self-hosted database
Complex real-time infrastructure
Custom analytics platform
```

The initial project does not need this complexity.

---

# 42. Future Scalability

The architecture can later support:

```text
Multiple Admin Roles
Advanced Buyer Accounts
RFQ Management
Quotation Management
Sample Tracking
Order Tracking
Supplier/Factory Management
Internal CRM
Email Notifications
WhatsApp integrations
Analytics
Blog/Insights
Multi-language content
```

These should be added only when business requirements justify them.

---

# 43. Final Architecture Summary

```text
                 NFW
                  │
                  ▼
        ┌───────────────────┐
        │     Next.js       │
        │    App Router     │
        └─────────┬─────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Public Website       /admin CMS
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
       Server Components
       Server Actions
       Route Handlers
                  │
                  ▼
            Drizzle ORM
                  │
                  ▼
       Supabase PostgreSQL
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
  Supabase Auth      Supabase Storage

                  │
                  ▼
                Vercel
```

## Final Stack

**Next.js + TypeScript + Tailwind CSS + shadcn/ui + Lucide + Drizzle ORM + Supabase PostgreSQL + Supabase Auth + Supabase Storage + Vercel**

This architecture is the baseline for implementation. Any deviation should be justified by a concrete technical or business requirement.
