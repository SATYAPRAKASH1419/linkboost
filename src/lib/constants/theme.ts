/**
 * LinkBoost Brand Identity & Design Tokens
 * Cranberry & Obsidian Editorial System
 */

export const THEME = {
  colors: {
    // Primary Identity: Cranberry Performance Action
    brand: {
      DEFAULT: '#E23744',
      hover: '#CB202D',
      muted: 'rgba(226, 55, 68, 0.08)',
      glow: 'rgba(226, 55, 68, 0.22)',
    },

    // Surfaces: Pure White Base + Tyrolean Warm Gray Stage
    surface: {
      app: '#FFFFFF',
      panel: '#F7F7F5',       // Tyrolean warm architectural tint
      card: '#FFFFFF',
      input: '#FFFFFF',
      subtle: '#EEEEEC',
    },

    // Borders & Dividers
    border: {
      subtle: '#E8E8E5',
      DEFAULT: '#D8D8D4',
      focus: '#E23744',
    },

    // Text & Typographic Hierarchy
    text: {
      primary: '#18181B',     // Deep obsidian black
      secondary: '#3F3F46',   // High-emphasis body
      muted: '#71717A',       // Secondary hints & descriptions
      subtle: '#A1A1AA',      // Slugs, placeholders & metadata
    },

    // Badges & States
    badge: {
      bg: '#FEF2F2',
      border: '#FECACA',
      text: '#991B1B',
    },
    state: {
      success: '#059669',
      successBg: '#ECFDF5',
      error: '#E23744',
      errorBg: '#FEF2F2',
    },
  },
} as const
