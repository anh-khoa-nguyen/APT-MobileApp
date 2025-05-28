export default PackageDetail = ({ route }) => {
  const { packageId } = route.params;
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPackageDetails = async () => {
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_package_details']}${packageId}/`;
    try {
      let res = await authAPI(token).get(url);
      setPackageDetails(res.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPackageDetails();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{packageDetails.name}</Text>
      <Text style={styles.description}>{packageDetails.description}</Text>
      <Text style={styles.price}>Price: {packageDetails.price}</Text>
    </View>
  );
}