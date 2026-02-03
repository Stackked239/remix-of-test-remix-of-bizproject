-- BIG Pipeline Test Job: Comfort Zone HVAC Services
-- Run this in Supabase SQL Editor to create a fresh test job
-- Last updated: 2026-02-03

INSERT INTO pipeline_queue (
  user_id,
  questionnaire_id,
  pipeline_type,
  status,
  payload,
  created_at
)
VALUES (
  '5fe6a15b-1839-4ef3-868b-bb9c63a7982a',
  '74a2fae6-7720-4a27-bc1c-135e648477d4',
  'BIG',
  'pending',
  '{
    "event": "questionnaire.submitted",
    "timestamp": "2026-02-03T12:00:00Z",
    "submission_id": "comfort-zone-hvac-big-test",
    "created_at": "2026-02-03T12:00:00Z",
    "business_overview": {
      "company_name": "Comfort Zone HVAC Services",
      "location": "Atlanta, GA",
      "country": "United States",
      "company_website": "https://comfortzonehvac.example.com",
      "industry": "HVAC / Mechanical Services",
      "industry_other_details": "Residential and commercial HVAC installation, maintenance, and repair",
      "corporate_structure": "S-Corporation",
      "year_started": 2012,
      "multiple_locations": true,
      "number_of_locations": 3,
      "executive_leadership_roles": 5,
      "support_admin_staff": 8,
      "full_time_employees": 52,
      "part_time_employees": 8,
      "contract_temp_personnel": 12,
      "seasonal_employees": 0,
      "last_year_revenue": 4800000,
      "projected_revenue": 5500000,
      "highest_sales_year": 2024,
      "highest_annual_sales": 4800000,
      "products_services": [
        {"name": "HVAC Installation", "percentage": 45, "type": "service"},
        {"name": "Maintenance Contracts", "percentage": 30, "type": "service"},
        {"name": "Emergency Repairs", "percentage": 20, "type": "service"},
        {"name": "Equipment Sales", "percentage": 5, "type": "product"}
      ],
      "current_challenges": [
        "Seasonal demand fluctuations",
        "Technician recruitment and retention",
        "Managing growth across multiple locations",
        "Pricing competitiveness"
      ],
      "competitors": [
        {"direct_competitor": true, "name": "Atlanta Air Pros", "website": "https://atlantaairpros.example.com"},
        {"direct_competitor": true, "name": "Southern Comfort HVAC", "website": "https://southerncomfort.example.com"},
        {"direct_competitor": false, "name": "Big Box Retailer HVAC", "website": "https://bigbox.example.com"}
      ]
    },
    "strategy": {
      "competitive_differentiators_understanding": 7,
      "local_market_share": 12,
      "sales_growth_past_year": 15,
      "sales_growth_past_year_estimate": false,
      "target_sales_growth": 18,
      "business_goals_plan": 6,
      "goals_barriers": "Difficulty scaling operations while maintaining service quality",
      "business_plan_review": 5,
      "growth_exit_plan": 4
    },
    "sales": {
      "b2b_percentage": 35,
      "b2c_percentage": 65,
      "wholesale_percentage": 0,
      "retail_percentage": 100,
      "online_percentage": 5,
      "sales_targets_alignment": 6,
      "sales_pipeline_management": 5,
      "average_sales_cycle_days": 14,
      "no_sales_cycle": false,
      "close_rate": 45,
      "no_customer_interaction": false,
      "average_sale_size": 3500,
      "repeat_sales_percentage": 40,
      "upselling_focus": 5,
      "upselling_obstacles": "Technicians not trained on consultative selling"
    },
    "marketing": {
      "brand_awareness": 6,
      "marketing_methods_count": 5,
      "current_marketing_channels": "Google Ads, Local SEO, Truck wraps, Direct mail, Referral program",
      "future_marketing_channels": "Social media advertising, Video marketing, Email automation",
      "customer_targeting": 6,
      "customer_acquisition_cost": 285,
      "cac_unknown": false,
      "customer_lifetime_value": 4200,
      "ltv_unknown": false,
      "awareness_conversion_rate": 8,
      "marketing_roi": 3.2,
      "marketing_roi_unknown": false,
      "monthly_marketing_spend": 12000
    },
    "customer_experience": {
      "customer_feedback_tracking": 5,
      "feedback_challenges": "Inconsistent follow-up process after service calls",
      "customer_satisfaction": 78,
      "no_feedback_method": false,
      "net_promoter_score": 42,
      "customer_effort_score": 6,
      "competitive_strength": 7,
      "issue_resolution": 6,
      "response_time_hours": 4
    },
    "operations": {
      "operational_efficiency": 6,
      "operational_challenges": "Scheduling optimization across multiple service areas",
      "workflow_documentation": 5,
      "inventory_turnover_rate": 8,
      "no_inventory": false,
      "operational_reliability": 7,
      "lean_principles": 4,
      "space_utilization": 7,
      "equipment_utilization": 75,
      "personnel_utilization": 72
    },
    "financials": {
      "total_debt_liabilities": 450000,
      "total_working_capital": 380000,
      "debt_monitoring": 6,
      "current_cash_available": 210000,
      "near_term_expenses": 165000,
      "cash_runway_months": 4,
      "gross_profit_margin": 38,
      "monthly_profit_estimate": 45000,
      "profit_is_estimate": false,
      "burn_rate": 52000,
      "cash_flow_forecasting": 5,
      "budgeting_financial_planning": 5,
      "financial_readiness_growth": 5,
      "financial_concerns": "Seasonal cash flow fluctuations during slow winter months"
    },
    "human_resources": {
      "hr_infrastructure": 4,
      "company_culture": 7,
      "recruiting_onboarding": 5,
      "training_development": 5,
      "training_resources_needed": "Technical certification programs, leadership development for team leads",
      "employee_turnover_rate": 22,
      "employee_engagement": 6,
      "performance_management": 5
    },
    "leadership": {
      "leadership_effectiveness": 6,
      "decision_making_structure": 6,
      "leadership_board_oversight": 4,
      "has_advisory_board": false,
      "decision_making_effectiveness": 6,
      "leadership_culture_effectiveness": 7,
      "development_mentorship": 5
    },
    "technology": {
      "technology_investment": 85000,
      "tech_investment_estimate": false,
      "innovation_pipeline_percentage": 3,
      "innovation_culture": 5,
      "emerging_technologies": 4,
      "technology_adoption": 5,
      "automation_utilization": 4,
      "innovation_impact": 5
    },
    "it_infrastructure": {
      "it_infrastructure": 5,
      "network_effectiveness": 6,
      "cybersecurity": 5,
      "data_management": 5,
      "data_governance": 4,
      "it_scalability": 5,
      "it_support_maintenance": 6
    },
    "risk_management": {
      "overall_risk_outlook": 6,
      "specific_risks_concern": "Liability exposure from field operations, key technician departure risk",
      "risk_identification_review": 5,
      "risk_mitigation": 5,
      "contingency_plans": 4,
      "financial_resilience": 5,
      "operational_continuity": 6,
      "succession_leadership_stability": 4,
      "strategic_adaptability": 6,
      "disruption_impact": "Equipment supply chain issues could delay installations by 2-4 weeks"
    },
    "compliance": {
      "compliance_awareness": 7,
      "policy_adherence": 7,
      "training_completion": 6,
      "compliance_monitoring": 6,
      "regulatory_updates": 6,
      "compliance_documentation": 6,
      "incident_reporting": 7,
      "compliance_costs": 28000,
      "compliance_cost_estimate": false
    }
  }'::jsonb,
  NOW()
)
RETURNING id, created_at, status;
