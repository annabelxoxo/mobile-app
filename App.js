// ✅ Juist — gewoon toevoegen aan de bestaande react-native import
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
  SafeAreaView,        // 👈 hier toevoegen
  TouchableOpacity,
  StatusBar,
} from 'react-native';


const PLANTS = [
  {
     id: '1',
    name: 'Monstera Deliciosa',
    latinName: 'Monstera deliciosa',
    description:
      'De koningin van het jungle-interieur. Met haar grote, gespleten bladeren zorgt de Monstera voor een tropische sfeer in elke ruimte.',
    price: '24,95',
    imageUri: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
    tag: null,
    petFriendly: false,
  },
  {
    id: '2',
    name: 'Pothos',
    latinName: 'Epipremnum aureum',
    description:
      'Onverwoestbaar en snelgroeiend. De Pothos is perfect voor beginners en hangt prachtig neer vanuit een hangpot of rek.',
    price: '9,95',
    imageUri: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=600&q=80',
    tag: 'Diervriendelijk',
    petFriendly: true,
  },
  {
    id: '3',
    name: 'Vrouwentong',
    latinName: 'Sansevieria trifasciata',
    description:
      'Stoer, strak en supersterk. De Vrouwentong overleeft bijna alles en zuivert bovendien je lucht — ideaal voor de drukke student.',
    price: '14,95',
    imageUri: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=600&q=80',
    tag: 'Bestseller',
    petFriendly: false,
  },
  {
    id: '4',
    name: 'Vredeslelie',
    latinName: 'Spathiphyllum wallisii',
    description:
      'Elegant wit en luchtzuiverend. De Vredeslelie gedijt goed in schaduwrijke kamers en geeft aan wanneer ze water nodig heeft.',
    price: '12,50',
    imageUri: 'https://images.unsplash.com/photo-1593691509543-c55fb32e4de0?w=600&q=80',
    tag: 'Diervriendelijk',
    petFriendly: true,
  },
  {
    id: '5',
    name: 'Vioolbladvijg',
    latinName: 'Ficus lyrata',
    description:
      'De hipste plant van het moment. Met zijn grote, glanzende bladeren is de Vioolbladvijg een echte eyecatcher voor elk interieur.',
    price: '34,95',
    imageUri: 'https://images.unsplash.com/photo-1545165375-0231c3eb2c98?w=600&q=80',
    tag: 'Nieuw',
    petFriendly: false,
  },
];


export default function App()
{
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);

const filteredPlants = PLANTS.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesPet = petFriendlyOnly ? plant.petFriendly : true;
    return matchesSearch && matchesPet;
  });

  const bg = isDarkMode ? '#0d1f15' : '#f2f7f4';
  const cardBg = isDarkMode ? '#1a2e22' : '#ffffff';
  const textColor = isDarkMode ?'#d8f3dc' : '#1b4332';

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor :bg}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
   <ScrollView
   style={{flex:1}}
   contentContainerStyle={styles.scroll}
   showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={{
              uri: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
            }}
        style={styles.heroImage}
        resizeMode="cover"
        />
                  <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>KamerPlant Club</Text>
            <Text style={styles.heroSub}>Jouw groene thuis begint hier</Text>
          </View>
    </View>
  <View style={[styles.controlBar, {backgroundColor: cardBg}]}>
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
        style={[styles.searchInput, {backgroundColor: cardBg, color: textColor}]}
        placeholder="Zoek jouw perfecte plant..."
        placeholderTextColor={isDarkMode ? '#95D5B2' : '#6c757d'}
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
        />
      </View>

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.chips}
      >
      {['Alle', 'Tropisch', 'Cactus', 'Hangplanten', 'Luchtzuiverend', 'Groot'].map(
            (chip) => (
              <TouchableOpacity key={chip} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </TouchableOpacity>
            )
          )}
      </ScrollView>

      <View style={styles.sectionHeader}>

<Text style={[styles.sectionTitle, { color: textColor }]}>
            {filteredPlants.length} plant{filteredPlants.length !== 1 ? 'en' : ''} gevonden
          </Text>
          <TouchableOpacity>
            <Text style={styles.sortLink}>Sorteren ↕</Text>
          </TouchableOpacity>
        </View>


        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <ProductCard
              key={plant.id}
              name={plant.name}
              latinName={plant.latinName}
              description={plant.description}
              price={plant.price}
              imageUri={plant.imageUri}
              tag={plant.tag}
            />
          ))
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },


  header: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    height: 220,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 67, 50, 0.55)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroEmoji: {
    fontSize: 32,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 14,
    color: '#B7E4C7',
    marginTop: 2,
  },


  controlBar: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
  },


  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#B7E4C7',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },


  chips: {
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#1B4332',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipText: {
    color: '#B7E4C7',
    fontWeight: '700',
    fontSize: 13,
  },


  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  sortLink: {
    color: '#52B788',
    fontWeight: '700',
    fontSize: 13,
  },


  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubText: {
    color: '#8FAD99',
    fontSize: 14,
  },


  banner: {
    backgroundColor: '#1B4332',
    borderRadius: 20,
    padding: 22,
    marginTop: 10,
    gap: 8,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSub: {
    color: '#B7E4C7',
    fontSize: 13,
    lineHeight: 18,
  },
  emailInput: {
    backgroundColor: '#2D6A4F',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  buttonWrapper: {
    marginTop: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },


  footer: {
    textAlign: 'center',
    color: '#8FAD99',
    fontSize: 12,
    marginTop: 24,
  },
});

