import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: (process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET)
    ? {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER || 'nestorcyber',
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || 'nestor-anyanwu',
        },
      }
    : {
        kind: 'local',
      },

  ui: {
    brand: { 
      name: 'Nestor Anyanwu CMS',
    },
    navigation: {
      Content: ['journal', 'portfolio', 'community'],
      Settings: ['siteSettings'],
    },
  },

  singletons: {
    // ─── SITE SETTINGS SINGLETON ──────────────────────────────────────────────
    siteSettings: singleton({
      label: 'Site Settings & Information',
      path: 'content/settings/site',
      schema: {
        siteName: fields.text({ label: 'Site Name', defaultValue: 'Nestor Cyber' }),
        authorName: fields.text({ label: 'Author Name', defaultValue: 'Nestor Anyanwu' }),
        tagline: fields.text({ label: 'Tagline / Headline', defaultValue: 'Tech Advocate, Designer & Community Leader' }),
        heroTitle: fields.text({ label: 'Homepage Hero Title', defaultValue: 'BUILDING DIGITAL FUTURE WITH PURPOSE' }),
        heroSubtitle: fields.text({
          label: 'Homepage Hero Subtitle',
          multiline: true,
          defaultValue: 'Director of ICT at NACOS FUTO, Data Privacy Ambassador, Software Engineer, and Community Leader.',
        }),
        contactEmail: fields.text({ label: 'Contact Email', defaultValue: 'nestoranyanwu@gmail.com' }),
        location: fields.text({ label: 'Location', defaultValue: 'Owerri, Imo State, Nigeria' }),
        availabilityStatus: fields.text({ label: 'Availability Status', defaultValue: 'Available for Work' }),
        socialLinks: fields.object({
          github: fields.text({ label: 'GitHub URL', defaultValue: 'https://github.com/nestorcyber' }),
          linkedin: fields.text({ label: 'LinkedIn URL', defaultValue: 'https://linkedin.com/in/nestoranyanwu' }),
          twitter: fields.text({ label: 'Twitter / X URL', defaultValue: 'https://twitter.com/nestorcyber' }),
          behance: fields.text({ label: 'Behance URL', defaultValue: 'https://behance.net/nestorcyber' }),
          whatsapp: fields.text({ label: 'WhatsApp URL', defaultValue: 'https://wa.me/message/GJIXLHQQPYDIE1' }),
        }),
        analytics: fields.object({
          googleAnalyticsId: fields.text({ label: 'Google Analytics ID (e.g. G-XXXXXXXXXX)' }),
        }),
      },
    }),
  },

  collections: {
    // ─── JOURNAL COLLECTION ──────────────────────────────────────────────────
    journal: collection({
      label: 'Journal Articles',
      slugField: 'title',
      path: 'content/journal/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Article Title' } }),
        excerpt: fields.text({
          label: 'Excerpt / Summary',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/journal',
          publicPath: '/images/journal/',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Technology', value: 'Technology' },
            { label: 'Leadership', value: 'Leadership' },
            { label: 'Community', value: 'Community' },
            { label: 'AI & Data Privacy', value: 'AI & Data Privacy' },
            { label: 'Design & Engineering', value: 'Design & Engineering' },
          ],
          defaultValue: 'Technology',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: 'Feature on Homepage',
          defaultValue: false,
        }),
        pinned: fields.checkbox({
          label: 'Pin to Top of Journal Page',
          defaultValue: false,
        }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        lastUpdated: fields.date({
          label: 'Last Updated Date',
        }),
        author: fields.text({
          label: 'Author Name',
          defaultValue: 'Nestor Anyanwu',
        }),
        seoTitle: fields.text({
          label: 'SEO Title (Optional)',
        }),
        seoDescription: fields.text({
          label: 'SEO Meta Description (Optional)',
          multiline: true,
        }),
        draft: fields.checkbox({
          label: 'Draft Status (Hide from live site)',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Article Content',
          options: {
            image: {
              directory: 'public/images/journal/content',
              publicPath: '/images/journal/content/',
            },
          },
        }),
      },
    }),

    // ─── PORTFOLIO COLLECTION ────────────────────────────────────────────────
    portfolio: collection({
      label: 'Portfolio Projects',
      slugField: 'title',
      path: 'content/portfolio/*',
      format: { contentField: 'fullDescription' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Project Name' } }),
        shortDescription: fields.text({
          label: 'Short Description',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/images/portfolio/gallery',
            publicPath: '/images/portfolio/gallery/',
          }),
          {
            label: 'Project Showcase Gallery',
            itemLabel: () => 'Gallery Image',
          }
        ),
        category: fields.select({
          label: 'Primary Category',
          options: [
            { label: 'Software', value: 'Software' },
            { label: 'Web', value: 'Web' },
            { label: 'Design', value: 'Design' },
            { label: 'Branding', value: 'Branding' },
            { label: 'Automation', value: 'Automation' },
            { label: 'Open Source', value: 'Open Source' },
          ],
          defaultValue: 'Software',
        }),
        technologies: fields.array(fields.text({ label: 'Technology / Tool' }), {
          label: 'Technologies Used',
          itemLabel: (props) => props.value,
        }),
        status: fields.select({
          label: 'Project Status',
          options: [
            { label: 'Completed', value: 'Completed' },
            { label: 'Active', value: 'Active' },
            { label: 'Production', value: 'Production' },
            { label: 'In Development', value: 'In Development' },
          ],
          defaultValue: 'Completed',
        }),
        client: fields.text({
          label: 'Client / Organization',
        }),
        role: fields.text({
          label: 'My Role in Project',
          defaultValue: 'Lead Developer & Designer',
        }),
        githubUrl: fields.text({
          label: 'GitHub Repository URL',
        }),
        liveUrl: fields.text({
          label: 'Live / Demo URL',
        }),
        featured: fields.checkbox({
          label: 'Feature on Homepage (Selected Work)',
          defaultValue: false,
        }),
        completionDate: fields.date({
          label: 'Completion Date',
        }),
        fullDescription: fields.mdx({
          label: 'Full Case Study & Description',
          options: {
            image: {
              directory: 'public/images/portfolio/content',
              publicPath: '/images/portfolio/content/',
            },
          },
        }),
      },
    }),

    // ─── COMMUNITY COLLECTION ────────────────────────────────────────────────
    community: collection({
      label: 'Community & Leadership',
      slugField: 'organization',
      path: 'content/community/*',
      format: { contentField: 'description' },
      entryLayout: 'content',
      schema: {
        organization: fields.slug({ name: { label: 'Organization / Event' } }),
        role: fields.text({
          label: 'Role / Title',
        }),
        duration: fields.text({
          label: 'Duration / Date (e.g. Dec 2025 - Present)',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/community',
          publicPath: '/images/community/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Event / Community Image',
            directory: 'public/images/community/gallery',
            publicPath: '/images/community/gallery/',
          }),
          {
            label: 'Event Gallery',
            itemLabel: () => 'Gallery Image',
          }
        ),
        achievements: fields.array(fields.text({ label: 'Key Achievement / Responsibility' }), {
          label: 'Key Achievements & Deliverables',
          itemLabel: (props) => props.value,
        }),
        impactStats: fields.array(
          fields.object({
            value: fields.text({ label: 'Stat Value (e.g. 5000+)' }),
            label: fields.text({ label: 'Stat Metric (e.g. Students Reached)' }),
          }),
          {
            label: 'Impact Numbers',
            itemLabel: (props) => `${props.fields.value.value || ''} ${props.fields.label.value || ''}`.trim() || 'Impact Stat',
          }
        ),
        featured: fields.checkbox({
          label: 'Feature on Homepage',
          defaultValue: false,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        description: fields.mdx({
          label: 'Full Overview & Community Writeup',
          options: {
            image: {
              directory: 'public/images/community/content',
              publicPath: '/images/community/content/',
            },
          },
        }),
      },
    }),
  },
})
