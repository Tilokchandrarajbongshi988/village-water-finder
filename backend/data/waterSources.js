// Testing center: Bengaluru (MG Road area)
// Coordinates: [longitude, latitude] = [77.5946, 12.9716]

export const TEST_CENTER = {
  name: "MG Road, Bengaluru",
  coordinates: [77.5946, 12.9716],
};

const waterSources = [
  {
    name: "Shivaji Nagar Handpump",
    type: "handpump",
    village: "Shivaji Nagar",
    district: "Bengaluru Urban",
    pincode: "560001",
    address: "Near Shivaji Nagar Bus Stand",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9896],
    },
  },
  {
    name: "Ulsoor Public Tap",
    type: "public_tap",
    village: "Ulsoor",
    district: "Bengaluru Urban",
    pincode: "560008",
    address: "Ulsoor Lake Road",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.6100, 12.9800],
    },
  },
  {
    name: "Richmond Town Well",
    type: "well",
    village: "Richmond Town",
    district: "Bengaluru Urban",
    pincode: "560025",
    address: "Richmond Road Cross",
    status: "unknown",
    location: {
      type: "Point",
      coordinates: [77.5800, 12.9600],
    },
  },
  {
    name: "Indiranagar Water Tank",
    type: "water_tank",
    village: "Indiranagar",
    district: "Bengaluru Urban",
    pincode: "560038",
    address: "100 Feet Road",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.6300, 12.9716],
    },
  },
  {
    name: "Malleswaram Drinking Point",
    type: "drinking_water_point",
    village: "Malleswaram",
    district: "Bengaluru Urban",
    pincode: "560003",
    address: "8th Cross, Malleswaram",
    status: "unavailable",
    location: {
      type: "Point",
      coordinates: [77.5600, 12.9900],
    },
  },
  {
    name: "Lalbagh Handpump",
    type: "handpump",
    village: "Jayanagar",
    district: "Bengaluru Urban",
    pincode: "560027",
    address: "Near Lalbagh West Gate",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9300],
    },
  },
  {
    name: "Whitefield Community Well",
    type: "well",
    village: "Whitefield",
    district: "Bengaluru Urban",
    pincode: "560066",
    address: "Whitefield Main Road",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.6700, 12.9716],
    },
  },
  {
    name: "Yeshwanthpur Public Tap",
    type: "public_tap",
    village: "Yeshwanthpur",
    district: "Bengaluru Urban",
    pincode: "560022",
    address: "Tumkur Road",
    status: "unknown",
    location: {
      type: "Point",
      coordinates: [77.5200, 12.9716],
    },
  },
  {
    name: "Kanakapura Road Handpump",
    type: "handpump",
    village: "Banashankari",
    district: "Bengaluru Urban",
    pincode: "560070",
    address: "Kanakapura Road Junction",
    status: "unavailable",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.8900],
    },
  },
  {
    name: "HSR Layout Water Tank",
    type: "water_tank",
    village: "HSR Layout",
    district: "Bengaluru Urban",
    pincode: "560102",
    address: "27th Main, HSR Layout",
    status: "available",
    location: {
      type: "Point",
      coordinates: [77.6400, 12.9200],
    },
  },
];

export default waterSources;
