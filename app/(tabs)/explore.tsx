import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const workoutCategories = ['Strength', 'Cardio', 'Yoga', 'Pilates'];

const featuredWorkouts = [
  {
    title: 'Full Body Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
  },
  {
    title: 'Morning Yoga Flow',
    duration: '30 min',
    difficulty: 'Beginner',
  },
  {
    title: 'HIIT Cardio Blast',
    duration: '20 min',
    difficulty: 'Advanced',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Search Input, Title, and Categories should be near the top */}
      <ThemedView style={styles.topContainer}>
        <ThemedText style={styles.title}>Explore Workouts</ThemedText>

        <Input
          placeholder="Search for workouts..."
          className="mb-4"
          style={styles.searchInput} // Apply the search input style
        />
      </ThemedView>

      {/* Horizontal ScrollView for Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryContentContainer}
      >
        {/* We'll loop through the categories */}
        {workoutCategories.map((category) => (
          <Button
            key={category}
            // Apply conditional styling for the selected button (e.g., Strength)
            // Assuming 'Strength' is the active/selected category
            variant={category === 'Strength' ? 'default' : 'outline'}
            style={[
              styles.categoryButton,
              category === 'Strength' && styles.activeCategoryButton
            ]}
          >
            <ThemedText
              style={category === 'Strength' ? styles.activeCategoryText : styles.categoryText}
            >
              {category}
            </ThemedText>
          </Button>
        ))}
      </ScrollView>

      {/* Main content scrollable area for Featured Workouts */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <ThemedText style={styles.sectionTitle}>Featured Workouts</ThemedText>

        {featuredWorkouts.map((workout, index) => (
          <Card key={index} style={styles.workoutCard}>
            <ThemedView style={styles.workoutCardContent}>
              <ThemedText style={styles.workoutTitle}>{workout.title}</ThemedText>
              <ThemedText style={styles.workoutDetails}>
                {workout.duration} | {workout.difficulty}
              </ThemedText>
            </ThemedView>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} const styles = StyleSheet.create({
  // Use a separate container for top elements to keep them fixed, but here 
  // we just use padding for the top elements.
  topContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, // Add some top padding below SafeAreaView
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Ensure title text is white
  },
  searchInput: {
    backgroundColor: '#333', // Darker background for the search bar
    borderColor: 'transparent',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  // New Styles for Horizontal Categories
  categoryScrollView: {
    maxHeight: 50, // Limit the height of the horizontal scroll view
    marginBottom: 24,
    paddingLeft: 16, // Match the horizontal padding of the main container
  },
  categoryContentContainer: {
    alignItems: 'center', // Align buttons vertically within the ScrollView
  },
  categoryButton: {
    // Buttons will now only take the width of their content
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 12, // Space between buttons
    backgroundColor: 'transparent', // Default non-selected background
    borderColor: 'white',
    borderRadius: 20, // Rounded corners for chip look
  },
  categoryText: {
    color: 'white', // Default text color
    fontWeight: '500',
  },
  // Styles for the Active/Selected Category ('Strength')
  activeCategoryButton: {
    backgroundColor: '#FFD700', // Gold/Yellow background for selected state
    borderColor: '#FFD700',
  },
  activeCategoryText: {
    color: 'black', // Black text for selected state
    fontWeight: 'bold',
  },
  // Main Content Styles
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Ensure section title text is white
  },
  workoutCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#222', // Dark card background
    borderRadius: 8,
  },
  workoutCardContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#AAA', // Lighter color for details
  },
});