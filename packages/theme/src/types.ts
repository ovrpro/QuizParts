/** Design system token layers for @quizparts/theme */

/** Raw design primitives (palette, scale). */
export interface FoundationTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  typography: {
    fontFamily: string;
    fontSizeBase: string;
    fontSizeSm: string;
    fontSizeLg: string;
    fontWeightNormal: number;
    fontWeightBold: number;
    lineHeight: number;
  };
}

/** Semantic roles (meaningful naming for theming). */
export interface SemanticTokens {
  color: {
    background: string;
    surface: string;
    primary: string;
    primaryContrast: string;
    secondary: string;
    text: string;
    textMuted: string;
    success: string;
    successSoft: string;
    danger: string;
    dangerSoft: string;
    warning: string;
    border: string;
  };
}

/** Component-level styling (overridable per component). */
export interface ComponentTokens {
  choice: {
    padding: string;
    radius: string;
    borderWidth: string;
    minHeight: string;
  };
  button: {
    height: string;
    radius: string;
    paddingX: string;
  };
  card: {
    padding: string;
    radius: string;
    shadow: string;
  };
  progress: {
    height: string;
    radius: string;
  };
  feedback: {
    padding: string;
    radius: string;
  };
}

/** Standardized choice/feedback states. */
export interface StateTokens {
  correct: {
    background: string;
    border: string;
    text: string;
  };
  incorrect: {
    background: string;
    border: string;
    text: string;
  };
  selected: {
    background: string;
    border: string;
  };
}

/** Motion and animation. */
export interface MotionTokens {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easingStandard: string;
  easingBouncy: string;
  successAnimation: 'bounce' | 'none';
  errorAnimation: 'shake' | 'none';
}

/** Interaction feedback (scale, bounce, shake). */
export interface InteractionTokens {
  hoverScale: number;
  pressScale: number;
  correctBounce: boolean;
  incorrectShake: boolean;
}

/** Layout and responsive. */
export interface LayoutTokens {
  maxContentWidth: string;
  mobileSpacing: string;
  desktopSpacing: string;
}

/** Accessibility constraints. */
export interface A11yTokens {
  minTapTarget: string;
  minContrast: number;
}

/** Decoration (icons, emoji). */
export interface DecorationTokens {
  showIcons: boolean;
  correctIcon: string;
  incorrectIcon: string;
}

/** Full theme: foundation → semantic → components → states + motion/interaction/layout/a11y/decoration. */
export interface ThemeTokens {
  foundation: FoundationTokens;
  semantic: SemanticTokens;
  components: ComponentTokens;
  states: StateTokens;
  motion: MotionTokens;
  interaction: InteractionTokens;
  layout: LayoutTokens;
  a11y: A11yTokens;
  decoration: DecorationTokens;
}

/** Partial theme overrides; deep-merged with a base theme by createTheme/mergeTheme. */
export type ThemeOverrides = Partial<{
  foundation: Partial<FoundationTokens>;
  semantic: Partial<SemanticTokens>;
  components: Partial<ComponentTokens>;
  states: Partial<StateTokens>;
  motion: Partial<MotionTokens>;
  interaction: Partial<InteractionTokens>;
  layout: Partial<LayoutTokens>;
  a11y: Partial<A11yTokens>;
  decoration: Partial<DecorationTokens>;
}>;

/** Legacy flat shape (deprecated): use ThemeTokens. Kept for type compatibility during migration. */
export interface LegacyThemeTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  typography: Record<string, string | number>;
  motion: Record<string, string>;
  shadow: Record<string, string>;
}
