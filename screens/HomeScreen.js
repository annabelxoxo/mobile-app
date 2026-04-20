// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Webflow API configuratie ─────────────────────────────────────────────────
const WEBFLOW_API_TOKEN = '9888014e5b2bf77af6f68ed4e698bc207690d096e725e25a4ef4409de1b821c7';
const WEBFLOW_COLLECTION_ID = '69e6a7ef54314a229028f5c9';


const mapWebflowItem = (item) => ({
  id: item._id,
  name: item.fieldData['naam'] ?? item.fieldData['name'] ?? 'Onbekend',
  latinName: item.fieldData['latijnse-naam'] ?? '',
  category: item.fieldData['categorie'] ?? 'Andere',
  description: item.fieldData['beschrijving'] ?? item.fieldData['description'] ?? '',
  price: item.fieldData['prijs'] ?? item.fieldData['price'] ?? '0,00',
  imageUri:
      typeof rawImage === 'string' && rawImage.trim() !== ''
        ? rawImage
        : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80', 
  tag: item.fieldData['tag'] ?? null,
  petFriendly: item.fieldData['diervriendelijk'] ?? false,
});

export default function HomeScreen({ navigation }) {
  // ─── State ──────────────────────────────────────────────────────────────────
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [selectedChip, setSelectedChip] = useState('Alle');
  const [cart, setCart] = useState({});

  // ─── Fetch bij laden van het scherm ──────────────────────────────────────────
  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.webflow.com/v2/collections/${WEBFLOW_COLLECTION_ID}/items`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
            'accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API fout: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      const mappedPlants = json.items.map(mapWebflowItem);
      setPlants(mappedPlants);

    } catch (err) {
      console.error('Fout bij ophalen planten:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Winkelmandje ─────────────────────────────────────────────────────────
  const handleQuantityChange = (name, quantity, price) => {
    setCart((prevCart) => ({
      ...prevCart,
      [name]: { quantity, price },
    }));
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(',', '.'));
    return sum + priceNum * item.quantity;
  }, 0);

  // ─── Filter ───────────────────────────────────────────────────────────────
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesPet = petFriendlyOnly ? plant.petFriendly : true;
    const matchesChip = selectedChip === 'Alle' ? true : plant.category === selectedChip;
    return matchesSearch && matchesPet && matchesChip;
  });

  const bg = isDarkMode ? '#0d1f15' : '#f2f7f4';
  const cardBg = isDarkMode ? '#1a2e22' : '#ffffff';
  const textColor = isDarkMode ? '#d8f3dc' : '#1b4332';

  // ─── Laadscherm ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#52B788" />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Planten ophalen... 🌱
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Foutscherm ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
        <View style={styles.centered}>
          <Text style={styles.errorEmoji}>🪴</Text>
          <Text style={[styles.errorTitle, { color: textColor }]}>Oeps, er ging iets mis!</Text>
          <Text style={styles.errorMsg}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchPlants}>
            <Text style={styles.retryText}>Opnieuw proberen</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Hoofdscherm ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>KamerPlant Club</Text>
            <Text style={styles.heroSub}>Jouw groene thuis begint hier</Text>
          </View>
        </View>


        {totalItems > 0 && (
          <View style={styles.cartBanner}>
            <Text style={styles.cartEmoji}>🛒</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cartTitle}>
                {totalItems} plant{totalItems !== 1 ? 'en' : ''} in je mandje
              </Text>
              <Text style={styles.cartTotal}>
                Totaal: €{totalPrice.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        )}


        <View style={[styles.controlBar, { backgroundColor: cardBg }]}>
          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: textColor }]}>
              {isDarkMode ? 'Nachtmodus' : 'Dagmodus'}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#B7E4C7', true: '#2D6A4F' }}
              thumbColor={isDarkMode ? '#52B788' : '#1B4332'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: textColor }]}>
              Alleen diervriendelijk
            </Text>
            <Switch
              value={petFriendlyOnly}
              onValueChange={setPetFriendlyOnly}
              trackColor={{ false: '#B7E4C7', true: '#2D6A4F' }}
              thumbColor={petFriendlyOnly ? '#52B788' : '#1B4332'}
            />
          </View>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: cardBg, color: textColor }]}
            placeholder="Zoek jouw perfecte plant..."
            placeholderTextColor={isDarkMode ? '#95D5B2' : '#6c757d'}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="while-editing"
          />
        </View>


        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {['Alle', 'Tropisch', 'Cactus', 'Hangplanten', 'Luchtzuiverend', 'Groot'].map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, selectedChip === chip && styles.chipActive]}
              onPress={() => setSelectedChip(chip)}
            >
              <Text style={[styles.chipText, selectedChip === chip && styles.chipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {filteredPlants.length} plant{filteredPlants.length !== 1 ? 'en' : ''} gevonden
          </Text>
          <TouchableOpacity onPress={fetchPlants}>
            <Text style={styles.sortLink}>↻ Vernieuwen</Text>
          </TouchableOpacity>
        </View>


        {filteredPlants.length > 0 ? (
          <>
            {filteredPlants.map((plant) => (
              <ProductCard
                key={plant.id}
                name={plant.name}
                latinName={plant.latinName}
                description={plant.description}
                price={plant.price}
                imageUri={plant.imageUri}
                tag={plant.tag}
                onDetailsPress={() => navigation.navigate('ProductDetails', { plant })}
                onCardPress={() => navigation.navigate('ProductDetails', { plant })}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: textColor }]}>
              Geen planten gevonden...
            </Text>
            <Text style={styles.emptySubText}>Probeer een andere zoekterm</Text>
          </View>
        )}


        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Word lid van de club!</Text>
          <Text style={styles.bannerSub}>
            Ontvang wekelijkse plantentips & exclusieve deals.
          </Text>
          <TextInput
            style={styles.emailInput}
            placeholder="jouw@email.be"
            placeholderTextColor="#B7E4C7"
            keyboardType="email-address"
          />
          <View style={styles.buttonWrapper}>
            <Button
              title="Inschrijven"
              color="#E07A5F"
              onPress={() => alert('Bedankt! Je bent ingeschreven!')}
            />
          </View>
        </View>

        <Text style={styles.footer}>
          🌿 KamerPlant Club — Made with love in België
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  errorEmoji: { fontSize: 48 },
  errorTitle: { fontSize: 20, fontWeight: '800' },
  errorMsg: { color: '#E07A5F', fontSize: 13, textAlign: 'center', paddingHorizontal: 32 },
  retryBtn: {
    backgroundColor: '#1B4332', borderRadius: 12,
    paddingHorizontal: 24, paddingVertical: 12, marginTop: 8,
  },
  retryText: { color: '#fff', fontWeight: '700' },
  header: { borderRadius: 24, overflow: 'hidden', marginBottom: 16, height: 220 },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: {
    flex: 1, backgroundColor: 'rgba(27, 67, 50, 0.55)',
    justifyContent: 'flex-end', padding: 20,
  },
  heroTitle: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },
  heroSub: { fontSize: 14, color: '#B7E4C7', marginTop: 2 },
  cartBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#1B4332', borderRadius: 16,
    padding: 16, marginBottom: 12,
  },
  cartEmoji: { fontSize: 28 },
  cartTitle: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cartTotal: { color: '#52B788', fontWeight: '800', fontSize: 16, marginTop: 2 },
  controlBar: {
    borderRadius: 16, padding: 14, marginBottom: 12, gap: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { fontSize: 14, fontWeight: '600' },
  searchWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 14, paddingHorizontal: 14, marginBottom: 14,
    borderWidth: 1.5, borderColor: '#B7E4C7',
    shadowColor: '#1B4332', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15 },
  chips: { marginBottom: 16 },
  chip: {
    backgroundColor: '#1B4332', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8, marginRight: 8,
  },
  chipActive: { backgroundColor: '#E07A5F' },
  chipText: { color: '#B7E4C7', fontWeight: '700', fontSize: 13 },
  chipTextActive: { color: '#fff' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  sortLink: { color: '#52B788', fontWeight: '700', fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 50, gap: 8 },
  emptyText: { fontSize: 18, fontWeight: '700' },
  emptySubText: { color: '#8FAD99', fontSize: 14 },
  banner: {
    backgroundColor: '#1B4332', borderRadius: 20,
    padding: 22, marginTop: 10, gap: 8,
  },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bannerSub: { color: '#B7E4C7', fontSize: 13, lineHeight: 18 },
  emailInput: {
    backgroundColor: '#2D6A4F', borderRadius: 10,
    padding: 12, color: '#fff', fontSize: 14, marginTop: 4,
  },
  buttonWrapper: { marginTop: 4, borderRadius: 10, overflow: 'hidden' },
  footer: { textAlign: 'center', color: '#8FAD99', fontSize: 12, marginTop: 24 },
});