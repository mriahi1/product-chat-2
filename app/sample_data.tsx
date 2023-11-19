export const productDetails = {
    id: 1,
    title: "Featured Product Title",
    description: "This is a description of the featured product. It is very interesting and you should buy it!",
    images: [
      "https://via.placeholder.com/640x480?text=Product+Image+1",
      "https://via.placeholder.com/640x480?text=Product+Image+2",
      "https://via.placeholder.com/640x480?text=Product+Image+3",
    ],
    price: 33.0,
    rating: 4.6,
    distributor: "Amazon Inc",
    countryOfOrigin: "Romania",
    manufacturer: "XYZ Inc.",
  };
  
  export const similarProductsData = [
    {
      id: 1,
      title: "Similar Product 1 Title",
      description: "",
      images: ["https://via.placeholder.com/150"],
      rating: 4.8,
      price: 35.0,
      distributor: "Other Distributor 1",
      countryOfOrigin: "Italy",
      manufacturer: "Manufacturer A",
    },
    {
      id: 2,
      title: "Similar Product 2 Title",
      description: "",
      images: ["https://via.placeholder.com/150"],
      rating: 4.7,
      price: 32.0,
      distributor: "Other Distributor 2",
      countryOfOrigin: "France",
      manufacturer: "Manufacturer B",
    },
    {
      id: 3,
      title: "Similar Product 3 Title",
      description: "",
      images: ["https://via.placeholder.com/150"],
      rating: 4.9,
      price: 38.0,
      distributor: "Other Distributor 3",
      countryOfOrigin: "Germany",
      manufacturer: "Manufacturer C",
    },
  ];
  
  export const alternativeProductsData = [
    {
      id: 101,
      title: "Alt Product 1 Title",
      description: "",
      images: ["https://via.placeholder.com/150"],
      rating: 4.5,
      price: 30.0,
      distributor: "Alt Distributor 1",
      countryOfOrigin: "Spain",
      manufacturer: "Manufacturer X",
    },
    {
      id: 102,
      title: "Alt Product 2 Title",
      description: "",
      images: ["https://via.placeholder.com/150"],
      rating: 4.4,
      price: 29.0,
      distributor: "Alt Distributor 2",
      countryOfOrigin: "Portugal",
      manufacturer: "Manufacturer Y",
    },
    // Add more products with distinct values as needed
  ];
  
  export const combinedProducts = [...similarProductsData, ...alternativeProductsData, productDetails];
