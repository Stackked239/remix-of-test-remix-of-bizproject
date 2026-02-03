export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      // Dennis's new tables for frontend features
      bizguides_inquiries: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          industry: string
          primary_challenge: string
          referral_source: string | null
          revenue_stage: string
          session_length: string
          status: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          industry: string
          primary_challenge: string
          referral_source?: string | null
          revenue_stage: string
          session_length: string
          status?: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          industry?: string
          primary_challenge?: string
          referral_source?: string | null
          revenue_stage?: string
          session_length?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          email: string
          id: string
          metadata: Json | null
          source: string | null
          subscribed_at: string
          user_id: string | null
        }
        Insert: {
          email: string
          id?: string
          metadata?: Json | null
          source?: string | null
          subscribed_at?: string
          user_id?: string | null
        }
        Update: {
          email?: string
          id?: string
          metadata?: Json | null
          source?: string | null
          subscribed_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      idea_submissions: {
        Row: {
          beta_testing: string | null
          category: string
          company: string | null
          created_at: string
          description: string
          email: string
          full_name: string
          id: string
          idea_number: number
          idea_title: string
          privacy_consent: boolean
          problems_solved: string[] | null
          status: string
          updated_at: string
          urgency: string | null
        }
        Insert: {
          beta_testing?: string | null
          category: string
          company?: string | null
          created_at?: string
          description: string
          email: string
          full_name: string
          id?: string
          idea_number: number
          idea_title: string
          privacy_consent?: boolean
          problems_solved?: string[] | null
          status?: string
          updated_at?: string
          urgency?: string | null
        }
        Update: {
          beta_testing?: string | null
          category?: string
          company?: string | null
          created_at?: string
          description?: string
          email?: string
          full_name?: string
          id?: string
          idea_number?: number
          idea_title?: string
          privacy_consent?: boolean
          problems_solved?: string[] | null
          status?: string
          updated_at?: string
          urgency?: string | null
        }
        Relationships: []
      }
      // HEAD's working orders table with Stripe fields
      orders: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          customer_email: string | null
          id: string
          product_id: string
          promo_code: string | null
          refunded_at: string | null
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          id?: string
          product_id?: string
          promo_code?: string | null
          refunded_at?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          id?: string
          product_id?: string
          promo_code?: string | null
          refunded_at?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      page_not_found_logs: {
        Row: {
          attempted_url: string
          created_at: string | null
          id: string
          ip_address: string | null
          referrer: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempted_url: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempted_url?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      // HEAD's working pipeline_queue table
      pipeline_queue: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string | null
          id: string
          last_error: string | null
          payload: Json
          questionnaire_id: string | null
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_error?: string | null
          payload: Json
          questionnaire_id?: string | null
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_error?: string | null
          payload?: Json
          questionnaire_id?: string | null
          started_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_queue_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      // HEAD's working profiles table
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      // HEAD's working questionnaires table with company_profile and pipeline_payload
      questionnaires: {
        Row: {
          company_profile: Json | null
          completed_at: string | null
          created_at: string | null
          current_section: number | null
          id: string
          pipeline_payload: Json | null
          responses: Json | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_profile?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_section?: number | null
          id?: string
          pipeline_payload?: Json | null
          responses?: Json | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_profile?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_section?: number | null
          id?: string
          pipeline_payload?: Json | null
          responses?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      // HEAD's working reports table with html_content, file_url, summary, status
      reports: {
        Row: {
          created_at: string | null
          file_url: string | null
          generated_at: string | null
          html_content: string | null
          id: string
          questionnaire_id: string | null
          report_type: string
          status: string
          summary: Json | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          generated_at?: string | null
          html_content?: string | null
          id?: string
          questionnaire_id?: string | null
          report_type: string
          status?: string
          summary?: Json | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          generated_at?: string | null
          html_content?: string | null
          id?: string
          questionnaire_id?: string | null
          report_type?: string
          status?: string
          summary?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
