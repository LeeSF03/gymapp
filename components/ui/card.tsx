
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, type ViewProps } from 'react-native';

export type CardProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function Card({ style, lightColor, darkColor, ...otherProps }: CardProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card');

    return <ThemedView {...otherProps} style={[styles.card, { backgroundColor }, style]} />;
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
