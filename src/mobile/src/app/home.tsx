import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import ImageCarousel from "@/components/ImageCarousel";
import NavBarCEO from "@/components/NavBarCEO";
import api from "@/services/api";
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [projectsByTheme, setProjectsByTheme] = useState({});
  const [randomImages, setRandomImages] = useState([]);
  const navigation = useNavigation();

  const handleProjectClick = (projectId) => {
    navigation.navigate('Projects', { project_id: projectId });
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchText("");
  };

  const fetchRandomImages = () => {
    const images = [
      "https://escolainfantilflorescer.com.br/site/wp-content/uploads/2020/06/WhatsApp-Image-2020-06-05-at-10.48.17.jpeg",
      "https://i0.wp.com/vitalatman.com.br/blog/wp-content/uploads/2022/02/como-a-amizade-influencia-na-saude.jpg?resize=620%2C413&ssl=1",
      "https://lunetas.com.br/wp-content/uploads/2021/07/amizade-na-infancia-portal-lunetas.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqeJPcyCOPu7uyJEnmpHc9iFgsJmIAA3SyQ&s",
      "https://st3.depositphotos.com/29384342/33535/i/450/depositphotos_335357560-stock-photo-girl-surrounded-rapeseed-flowers.jpg",
      "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_z27lxy2CS5cIWgFGX7P-OPfmUiVHjJ4dQ&s",
      "https://img.freepik.com/fotos-gratis/menina-asiatica-despreocupada-rindo-e-dancando-no-parque-aproveitando-o-dia-ensolarado-de-verao-levantando-as-maos-e-brea_1258-123788.jpg"
    ];
    setRandomImages(images);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/Project/projects-with-theme");
        const projects = response.data;

        const groupedProjects = projects.reduce((acc, project) => {
          if (!acc[project.theme_id]) {
            acc[project.theme_id] = {
              theme_name: project.theme_name,
              projects: []
            };
          }
          acc[project.theme_id].projects.push({
            project_id: project.project_id,
            project_name: project.project_name,
            project_photo_path: project.project_photo_path
          });
          return acc;
        }, {});

        setProjectsByTheme(groupedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
    fetchRandomImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <NavBar toggleSearch={toggleSearch} name={"Home"} />
          {searchVisible && (
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          )}
          <View style={styles.centeredContainer}>
            <Image
              source={{ uri: randomImages[0] }}
              style={styles.mainImage}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Para você</Text>
            <Image
              source={require("@/assets/images/line.png")}
              style={styles.sectionLine}
            />
            <ImageCarousel images={randomImages.map(img => ({ uri: img }))} 
              onImageClick={(index) => handleProjectClick(1)}/>
          </View>
          {Object.values(projectsByTheme).map((theme) => (
            <View key={theme.theme_name} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{theme.theme_name}</Text>
              <Image
                source={require("@/assets/images/line.png")}
                style={styles.sectionLine}
              />
              <ImageCarousel
                images={theme.projects.map((project) => ({
                  uri: project.project_photo_path
                }))}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <NavBarCEO />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  mainImage: {
    width: "90%",
    height: 200,
    borderRadius: 10
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  sectionLine: {
    width: 50,
    height: 2,
    backgroundColor: "#000",
    marginBottom: 10
  }
});

export default Home;
