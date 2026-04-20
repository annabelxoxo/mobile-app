import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ProductCard = ({
  name,
  latinName,
  description,
  price,
  imageUri,
  tag,
  onCardPress,    //  Manier 2: volledige kaart aanklikken
  onDetailsPress, //  Manier 1: via "Bekijk product" knop
}) => {
  const [added, setAdded] = useState(false);

  return (

    <TouchableOpacity onPress={onCardPress} activeOpacity={0.9}>
      <View style={styles.card}>


        {tag && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tag}</Text>
          </View>
        )}


        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />


        <View style={styles.info}>
          <View style={styles.nameRow}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.latinName}>{latinName}</Text>
            </View>
            <Text style={styles.price}>€{price}</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>

          <View style={styles.buttonRow}>


            <Pressable
              style={({ pressed }) => [
                styles.detailButton,
                pressed && styles.detailButtonPressed,
              ]}
              onPress={onDetailsPress}
            >
              <Text style={styles.detailButtonText}>Bekijk product →</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cartButton,
                pressed && styles.cartButtonPressed,
                added && styles.cartButtonAdded,
              ]}
              onPress={() => setAdded(!added)}
            >
              <Text style={styles.cartButtonText}>
                {added ? '✓' : '+'}
              </Text>
            </Pressable>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBF2',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  badge: {
    position: 'absolute', top: 12, left: 12, zIndex: 10,
    backgroundColor: '#E07A5F', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  image: { width: '100%', height: 200, backgroundColor: '#D8F3DC' },
  info: { padding: 16, gap: 8 },
  nameRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  name: { fontSize: 18, fontWeight: '800', color: '#1B4332', letterSpacing: -0.3 },
  latinName: { fontSize: 12, fontStyle: 'italic', color: '#52B788', marginTop: 1 },
  price: { fontSize: 20, fontWeight: '900', color: '#E07A5F' },
  description: { fontSize: 13, color: '#5C6B5E', lineHeight: 19, marginTop: 2 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  detailButton: {
    flex: 1, backgroundColor: '#F2F7F4', borderRadius: 12,
    paddingVertical: 12, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#1B4332',
  },
  detailButtonPressed: { backgroundColor: '#D8F3DC' },
  detailButtonText: { color: '#1B4332', fontWeight: '700', fontSize: 13 },
  cartButton: {
    width: 46, backgroundColor: '#1B4332', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  cartButtonPressed: { backgroundColor: '#2D6A4F' },
  cartButtonAdded: { backgroundColor: '#52B788' },
  cartButtonText: { color: '#fff', fontWeight: '900', fontSize: 20 },
});

export default ProductCard;