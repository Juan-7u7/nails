import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from 'react-native';

// ✅ Carga de imágenes locales usando require()
const images = [
  require('../fotos/foto_1.jpg'),
  require('../fotos/foto_2.jpg'),
  require('../fotos/foto_3.jpg'),
  require('../fotos/foto_4.jpg'),
  require('../fotos/foto_5.jpg'),
  require('../fotos/foto_6.jpg'),
  require('../fotos/foto_7.jpg'),
  require('../fotos/foto_8.jpg'),
  require('../fotos/foto_9.jpg'),
  require('../fotos/foto_10.jpg'),
  require('../fotos/foto_11.jpg'),
  require('../fotos/foto_12.jpg'),
  require('../fotos/foto_13.jpg'),
  require('../fotos/foto_14.jpg'),
  require('../fotos/foto_15.jpg'),
  require('../fotos/foto_16.jpg'),
  require('../fotos/foto_17.jpg'),
  require('../fotos/foto_18.jpg'),
  require('../fotos/foto_19.jpg'),
  require('../fotos/foto_20.jpg'),
];

export default function PhotoCarousel() {
  const scrollRef = useRef(null);
  const { width } = useWindowDimensions();

  const isDesktop = width >= 800;
  const containerWidth = width * (isDesktop ? 0.3 : 0.6); // 30% en escritorio, 90% en móvil
  const containerHeight = containerWidth * 1.25;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * containerWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, containerWidth]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.carouselContainer,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: images.length * containerWidth }}
          style={{ overflow: 'hidden' }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={img} // ✅ CORRECTO: no uses { uri: img } con imágenes locales
              style={[
                styles.image,
                { width: containerWidth, height: containerHeight },
              ]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  carouselContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: Platform.OS === 'android' ? 3 : 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    borderRadius: 0,
  },
});
