import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BlogCard = ({
  title,
  description,
  imageUri,
  category,
  onCardPress,
}) => {
  return (
    <TouchableOpacity onPress={onCardPress} activeOpacity={0.9}>
      <View style={styles.card}>


        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />


        {category && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{category}</Text>
          </View>
        )}

        <View style={styles.info}>

          <Text style={styles.title} numberOfLines={2}>{title}</Text>


          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>

          <View style={styles.readMore}>
            <Text style={styles.readMoreText}>Lees meer →</Text>
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
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#D8F3DC',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#52B788',
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
  info: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 13,
    color: '#5C6B5E',
    lineHeight: 19,
  },
  readMore: {
    marginTop: 4,
  },
  readMoreText: {
    color: '#52B788',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default BlogCard;