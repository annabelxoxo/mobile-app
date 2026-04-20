import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProductDetails({ route }) {
  const plant = route.params?.plant;
  const [added, setAdded] = useState(false);

  if (!plant) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Plant niet gevonden 🪴</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>


        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: plant.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          {plant.tag && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{plant.tag}</Text>
            </View>
          )}
        </View>


        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{plant.name}</Text>
              <Text style={styles.latinName}>{plant.latinName}</Text>
            </View>
            <Text style={styles.price}>€{plant.price}</Text>
          </View>


          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Over deze plant</Text>
          <Text style={styles.description}>{plant.description}</Text>


          <Text style={styles.sectionLabel}>Verzorging</Text>
          <View style={styles.careRow}>
            <View style={styles.careItem}>
              <Text style={styles.careIcon}>💧</Text>
              <Text style={styles.careLabel}>Water</Text>
              <Text style={styles.careValue}>1x per week</Text>
            </View>
            <View style={styles.careItem}>
              <Text style={styles.careIcon}>☀️</Text>
              <Text style={styles.careLabel}>Licht</Text>
              <Text style={styles.careValue}>Indirect</Text>
            </View>
            <View style={styles.careItem}>
              <Text style={styles.careIcon}>🌡️</Text>
              <Text style={styles.careLabel}>Temp.</Text>
              <Text style={styles.careValue}>15–25°C</Text>
            </View>
          </View>


          <View style={[
            styles.petBanner,
            { backgroundColor: plant.petFriendly ? '#D8F3DC' : '#FFE8E0' }
          ]}>
            <Text style={styles.petText}>
              {plant.petFriendly
                ? 'Veilig voor huisdieren'
                : 'Giftig voor huisdieren'}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              added && styles.buttonAdded,
            ]}
            onPress={() => setAdded(!added)}
          >
            <Text style={styles.buttonText}>
              {added ? '✓ Toegevoegd aan winkelwagen' : '+ Voeg toe aan winkelwagen'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F7F4' },
  scroll: { paddingBottom: 40 },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 300 },
  badge: {
    position: 'absolute', bottom: 16, left: 16,
    backgroundColor: '#E07A5F', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  content: { padding: 20, gap: 12 },
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: { fontSize: 26, fontWeight: '900', color: '#1B4332', letterSpacing: -0.5 },
  latinName: { fontSize: 14, fontStyle: 'italic', color: '#52B788', marginTop: 2 },
  price: { fontSize: 28, fontWeight: '900', color: '#E07A5F' },
  divider: { height: 1.5, backgroundColor: '#D8F3DC', marginVertical: 4 },
  sectionLabel: {
    fontSize: 13, fontWeight: '800', color: '#52B788',
    letterSpacing: 1, textTransform: 'uppercase', marginTop: 8,
  },
  description: { fontSize: 15, color: '#3D5A45', lineHeight: 23 },
  careRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  careItem: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    padding: 14, alignItems: 'center', gap: 4,
    shadowColor: '#1B4332', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  careIcon: { fontSize: 22 },
  careLabel: { fontSize: 11, color: '#8FAD99', fontWeight: '600' },
  careValue: { fontSize: 13, color: '#1B4332', fontWeight: '700', textAlign: 'center' },
  petBanner: {
    borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 4,
  },
  petText: { fontSize: 14, fontWeight: '700', color: '#1B4332' },
  button: {
    backgroundColor: '#1B4332', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  buttonPressed: { backgroundColor: '#2D6A4F', transform: [{ scale: 0.97 }] },
  buttonAdded: { backgroundColor: '#52B788' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15, letterSpacing: 0.5 },
});