import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				'serif': ['Cormorant Garamond', 'serif'],
				'sans': ['DM Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				/* Brand Colors */
				'biz-navy': 'hsl(var(--biz-navy))',
				'biz-navy-deep': 'hsl(var(--biz-navy-deep))',
				'biz-navy-light': 'hsl(var(--biz-navy-light))',
				'biz-green': 'hsl(var(--biz-green))',
				'biz-green-light': 'hsl(var(--biz-green-light))',
				'biz-grey': 'hsl(var(--biz-grey))',
				'biz-white': 'hsl(var(--biz-white))',
				'biz-cream': 'hsl(var(--biz-cream))',
				'biz-warm': 'hsl(var(--biz-warm))',
				'biz-blue-faint': 'hsl(var(--biz-blue-faint))',
				
				/* Hub Colors (Framework v2) */
				'biz-teal': 'hsl(var(--biz-teal))',           /* GuideTeal - BizGuides */
				'biz-copper': 'hsl(var(--biz-copper))',       /* ToolsCopper - BizTools */
				'biz-magenta': 'hsl(var(--biz-magenta))',     /* LeaderMagenta - BizLeaDeR */
				'biz-gold': 'hsl(var(--biz-gold))',           /* GrowthGold - BizGrowth */
				'biz-blue': 'hsl(var(--biz-blue))',           /* BizBlue - Primary */
				
				/* Legacy Hub Colors */
				'biz-lime': 'hsl(var(--biz-lime))',
				'biz-citrine': 'hsl(var(--biz-citrine))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				growth: {
					DEFAULT: 'hsl(var(--growth))',
					foreground: 'hsl(var(--growth-foreground))',
					hover: 'hsl(var(--growth-hover))'
				},
				trust: {
					DEFAULT: 'hsl(var(--trust))',
					foreground: 'hsl(var(--trust-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'solid-hero': 'hsl(var(--solid-hero))',
				'solid-card': 'hsl(var(--solid-card))',
				'solid-subtle': 'hsl(var(--solid-subtle))',
				'solid-teal': 'hsl(var(--solid-teal))',
				'solid-copper': 'hsl(var(--solid-copper))',
				'solid-lime': 'hsl(var(--solid-lime))',
				'solid-citrine': 'hsl(var(--solid-citrine))'
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'card': 'var(--shadow-card)',
				'feature': 'var(--shadow-feature)',
				'hub-teal': 'var(--shadow-hub-teal)',
				'hub-copper': 'var(--shadow-hub-copper)',
				'hub-lime': 'var(--shadow-hub-lime)',
				'hub-citrine': 'var(--shadow-hub-citrine)',
				'hub-gold': 'var(--shadow-hub-gold)',
				'hub-magenta': 'var(--shadow-hub-magenta)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-15%) scale(1.05)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'glow-pulse': {
					'0%': {
						opacity: '0.7',
						transform: 'scale(0.98)',
						textShadow: '0 0 0px hsl(81 61% 47% / 0)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.02)',
						textShadow: '0 0 12px hsl(81 61% 47% / 0.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
						textShadow: '0 0 0px hsl(81 61% 47% / 0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
