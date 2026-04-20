import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';




const ProductCard = ({ name, latinName, description, price, imageUri, tag }) => {
  const [added, setAdded] = useState(false);

  return (
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


        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            added && styles.buttonAdded,
          ]}
          onPress={() => setAdded(!added)}
        >
          <Text style={styles.buttonText}>
            {added ? '✓ Toegevoegd' : '+ Winkelwagen'}
          </Text>
        </Pressable>
      </View>
    </View>
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
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    backgroundColor: '#E07A5F',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#D8F3DC',
  },
  info: {
    padding: 16,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.3,
  },
  latinName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#52B788',
    marginTop: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E07A5F',
  },
  description: {
    fontSize: 13,
    color: '#5C6B5E',
    lineHeight: 19,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: '#2D6A4F',
    transform: [{ scale: 0.97 }],
  },
  buttonAdded: {
    backgroundColor: '#52B788',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default ProductCard;