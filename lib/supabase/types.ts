export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ImpactStat = { value: string; label: string }

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          site_name: string
          author_name: string
          tagline: string
          hero_title: string
          hero_subtitle: string
          contact_email: string
          location: string
          availability_status: string
          social_github: string
          social_linkedin: string
          social_twitter: string
          social_behance: string
          social_whatsapp: string
          google_analytics_id: string
          about_paragraph: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>
        Relationships: []
      }
      journal_articles: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          cover_image: string | null
          category: string
          tags: string[]
          featured: boolean
          pinned: boolean
          published_date: string | null
          last_updated: string | null
          author: string
          seo_title: string | null
          seo_description: string | null
          draft: boolean
          scheduled_at: string | null
          content: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['journal_articles']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['journal_articles']['Row']>
        Relationships: []
      }
      admin_activity_logs: {
        Row: {
          id: string
          action: string
          resource: string
          resource_id: string | null
          details: string | null
          admin_email: string
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['admin_activity_logs']['Row']> & {
          action: string
          resource: string
        }
        Update: Partial<Database['public']['Tables']['admin_activity_logs']['Row']>
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string
          cover_image: string | null
          gallery: string[]
          category: string
          technologies: string[]
          status: string
          client: string | null
          role: string | null
          github_url: string | null
          live_url: string | null
          case_study_url: string | null
          featured: boolean
          completion_date: string | null
          full_description: string
          draft: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['portfolio_projects']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Row']>
        Relationships: []
      }
      community_entries: {
        Row: {
          id: string
          slug: string
          organization: string
          role: string
          duration: string
          cover_image: string | null
          gallery: string[]
          achievements: string[]
          impact_stats: ImpactStat[]
          featured: boolean
          tags: string[]
          description: string
          draft: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['community_entries']['Row']> & {
          slug: string
          organization: string
        }
        Update: Partial<Database['public']['Tables']['community_entries']['Row']>
        Relationships: []
      }
      journey_items: {
        Row: {
          id: string
          title: string
          organization: string
          role: string | null
          date_label: string
          description: string
          type: 'work' | 'volunteer' | 'membership' | 'milestone'
          details: string[]
          images: string[]
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['journey_items']['Row']> & {
          title: string
        }
        Update: Partial<Database['public']['Tables']['journey_items']['Row']>
        Relationships: []
      }
      portfolio_stats: {
        Row: {
          id: string
          value: string
          label: string
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['portfolio_stats']['Row']> & {
          value: string
          label: string
        }
        Update: Partial<Database['public']['Tables']['portfolio_stats']['Row']>
        Relationships: []
      }
      services: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          icon_name: string
          cta_text: string
          cta_href: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['services']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['services']['Row']>
        Relationships: []
      }
      skill_groups: {
        Row: {
          id: string
          category: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['skill_groups']['Row']> & {
          category: string
        }
        Update: Partial<Database['public']['Tables']['skill_groups']['Row']>
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          group_id: string
          name: string
          experience_level: string | null
          years: string | null
          icon: string | null
          icon_provider: string | null
          icon_name: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['skills']['Row']> & {
          group_id: string
          name: string
        }
        Update: Partial<Database['public']['Tables']['skills']['Row']>
        Relationships: []
      }
      certifications: {
        Row: {
          id: string
          slug: string
          title: string
          provider: string
          description: string | null
          image_url: string | null
          date_label: string
          credential_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['certifications']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['certifications']['Row']>
        Relationships: []
      }
      gallery_images: {
        Row: {
          id: string
          title: string | null
          caption: string | null
          image_url: string
          alt: string | null
          cloudinary_public_id: string | null
          width: number | null
          height: number | null
          category: string | null
          location: string | null
          event_date: string | null
          external_link: string | null
          video_url: string | null
          video_duration: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['gallery_images']['Row']> & {
          image_url: string
        }
        Update: Partial<Database['public']['Tables']['gallery_images']['Row']>
        Relationships: []
      }
      brand_partners: {
        Row: {
          id: string
          name: string
          logo_url: string
          website_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['brand_partners']['Row']> & {
          name: string
          logo_url: string
        }
        Update: Partial<Database['public']['Tables']['brand_partners']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
