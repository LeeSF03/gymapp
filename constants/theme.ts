
import { Platform } from 'react-native';

const tintColorLight = '#ffffff';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: '#ffffff',
    background: '#000000',
    tint: tintColorLight,
    icon: '#ffffff',
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorLight,
    card: '#1C1C1E',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    tint: tintColorDark,
    icon: '#ffffff',
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorDark,
    card: '#1C1C1E',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
