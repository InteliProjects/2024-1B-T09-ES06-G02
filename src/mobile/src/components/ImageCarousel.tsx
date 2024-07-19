import React from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ImageCarouselProps {
  images: any[];
  onImageClick: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImageClick }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
    {images.map((imgObj, index) => (
      <TouchableOpacity key={index} onPress={() => onImageClick(index)}>
        <Image source={imgObj} style={styles.image} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
  },
  image: {
    width: 80,
    height: 100,
    marginLeft: 16,
    borderRadius: 10,
  },
});

export default ImageCarousel;
