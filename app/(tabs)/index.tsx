
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLogoText}>Xfitness</Text>
        <Text style={styles.headerSubtitle}>Johor Bahru</Text>
      </View>

      <View style={styles.verification}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/lock.png' }} style={styles.lockIcon} />
        <View style={styles.verificationTextContainer}>
          <Text style={styles.verificationText}>You are required to verify your account first.</Text>
          <Text style={styles.verificationLink}>Click to proceed now</Text>
        </View>
        <Text style={styles.arrow}>〉</Text>
      </View>

      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.welcomeBack}>Welcome back,</Text>
          <Text style={styles.userName}>Zafran Bin Muhamad Sakowi</Text>
          <Text style={styles.subscribe}>Click to subscribe membership</Text>
        </View>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.avatar} />
      </View>

      <View style={styles.todaysWorkoutSection}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <View style={styles.workoutCard}>
          <Text style={styles.workoutTitle}>Full Body Strength</Text>
          <Text style={styles.workoutDescription}>A complete workout to build strength and endurance.</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressCardsContainer}>
          <View style={styles.progressCard}>
            <Text style={styles.progressValue}>5</Text>
            <Text style={styles.progressLabel}>Day Streak</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressValue}>1200</Text>
            <Text style={styles.progressLabel}>Calories Burned</Text>
          </View>
        </View>
      </View>

      <View style={styles.challengesSection}>
        <Text style={styles.sectionTitle}>Challenges</Text>
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>30-Day Fitness Challenge</Text>
          <Text style={styles.challengeDescription}>Complete daily workouts for 30 days to win a prize.</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.referralSection}>
        <Text style={styles.sectionTitle}>Referral Program</Text>
        <Text style={styles.referralDescription}>Invite your friend and family to join as KG Member to train together.</Text>
        <Text style={styles.referralCode}>Your Referral Code: vbvkp3na</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Group Classes</Text>
          <Text style={styles.cardDescription}>Checkout upcoming group class</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Trainer</Text>
          <Text style={styles.cardDescription}>Get yourself trained by professional</Text>
        </View>
      </View>

      {/* <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  headerLogoText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 10,
  },
  header: {
    flexDirection: 'column',
  },
  headerSubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  verification: {
    backgroundColor: '#ffd700',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  verificationTextContainer: {
    flex: 1,
  },
  verificationText: {
    color: '#000',
  },
  verificationLink: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  arrow: {
    color: '#000',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeBack: {
    color: '#aaa',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subscribe: {
    color: '#ffd700',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  todaysWorkoutSection: {
    marginTop: 20,
  },
  workoutCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDescription: {
    color: '#aaa',
    marginTop: 5,
  },
  startButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  progressSection: {
    marginTop: 20,
  },
  progressCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  progressValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressLabel: {
    color: '#aaa',
    marginTop: 5,
  },
  challengesSection: {
    marginTop: 20,
  },
  challengeCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  challengeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  challengeDescription: {
    color: '#aaa',
    marginTop: 5,
  },
  joinButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  referralSection: {
    marginTop: 20,
  },
  referralDescription: {
    color: '#aaa',
    marginTop: 5,
  },
  referralCode: {
    color: '#fff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  inviteButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  inviteButtonText: {
    color: '#000',
  },
  learnMoreButton: {
    borderColor: '#ffd700',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  learnMoreButtonText: {
    color: '#ffd700',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    width: '48%',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
  },
  cardDescription: {
    color: '#aaa',
    marginTop: 5,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#111',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#aaa',
  },
});

export default App;
