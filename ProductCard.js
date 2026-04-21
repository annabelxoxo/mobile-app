import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({
  name,
  latinName,
  description,
  price,
  imageUri,
  tag,
  onQuantityChange, 
}) => {

  const [quantity, setQuantity] = useState(0);

  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate('ProductDetails', {
      plant: { name, latinName, description, price, imageUri, tag },
    });
  };


  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange && onQuantityChange(name, newQty, price);
  };


  const decrease = () => {
    const newQty = Math.max(0, quantity - 1);
    setQuantity(newQty);
    onQuantityChange && onQuantityChange(name, newQty, price);
  };

  return (
    <TouchableOpacity onPress={goToDetails} activeOpacity={0.9}>
      <View style={styles.card}>


        {tag && tag !== 'null' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tag}</Text>
          </View>
        )}


        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>

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
              onPress={goToDetails}
            >
              <Text style={styles.detailButtonText}>Bekijk →</Text>
            </Pressable>

            <View style={styles.counter}>
              <Pressable
                style={({ pressed }) => [styles.counterBtn, pressed && styles.counterBtnPressed]}
                onPress={decrease}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </Pressable>

              <Text style={styles.counterValue}>{quantity}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.counterBtn,
                  styles.counterBtnAdd,
                  pressed && styles.counterBtnPressed,
                ]}
                onPress={increase}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </Pressable>
            </View>

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
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: 18, fontWeight: '800', color: '#1B4332' },
  latinName: { fontSize: 12, fontStyle: 'italic', color: '#52B788' },
  price: { fontSize: 20, fontWeight: '900', color: '#E07A5F' },
  description: { fontSize: 13, color: '#5C6B5E', lineHeight: 19 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 8, alignItems: 'center' },
  detailButton: {
    flex: 1, backgroundColor: '#F2F7F4', borderRadius: 12,
    paddingVertical: 12, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#1B4332',
  },
  detailButtonPressed: { backgroundColor: '#D8F3DC' },
  detailButtonText: { color: '#1B4332', fontWeight: '700', fontSize: 13 },
  counter: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F2F7F4', borderRadius: 12,
    overflow: 'hidden', borderWidth: 1.5, borderColor: '#1B4332',
  },
  counterBtn: {
    width: 36, height: 44, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F2F7F4',
  },
  counterBtnAdd: { backgroundColor: '#1B4332' },
  counterBtnPressed: { opacity: 0.6 },
  counterBtnText: { fontSize: 18, fontWeight: '900', color: '#1B4332' },
  counterValue: {
    width: 32, textAlign: 'center',
    fontSize: 15, fontWeight: '800', color: '#1B4332',
  },
});

export default ProductCard;