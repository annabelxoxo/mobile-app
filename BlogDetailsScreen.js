import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BlogDetailsScreen({ route }) {
  const blog = route.params?.blog;

  if (!blog) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Blog niet gevonden 🌿</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>


        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: blog.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          {blog.category && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{blog.category}</Text>
            </View>
          )}
        </View>


        <View style={styles.content}>

          <Text style={styles.title}>{blog.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Over dit artikel</Text>
          <Text style={styles.description}>{blog.description}</Text>


          {blog.content ? (
            <>
              <Text style={styles.sectionLabel}>Inhoud</Text>
              <Text style={styles.bodyText}>{blog.content}</Text>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F7F4' },
  scroll: { paddingBottom: 40 },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 280 },
  badge: {
    position: 'absolute', bottom: 16, left: 16,
    backgroundColor: '#52B788', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  content: { padding: 20, gap: 12 },
  title: {
    fontSize: 24, fontWeight: '900', color: '#1B4332', letterSpacing: -0.5, lineHeight: 30,
  },
  divider: { height: 1.5, backgroundColor: '#D8F3DC', marginVertical: 4 },
  sectionLabel: {
    fontSize: 13, fontWeight: '800', color: '#52B788',
    letterSpacing: 1, textTransform: 'uppercase', marginTop: 8,
  },
  description: { fontSize: 15, color: '#3D5A45', lineHeight: 23 },
  bodyText: { fontSize: 14, color: '#5C6B5E', lineHeight: 22 },
});