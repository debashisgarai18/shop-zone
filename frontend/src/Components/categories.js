// this is global dummy array
// TODO : To be eliminated when data comes from the API
// import fashion from "../assets/categories/fashion.png"
// import elec from "../assets/categories/elec.png"
// import groc from "../assets/categories/groc.png"
// import footwear from "../assets/categories/footwear.png"
// import beauty from "../assets/categories/beauty.png"
// import wellness from "../assets/categories/wellness.png"

export const categories = [
  {
    cat: "Home",
    expand: false,
  },
  {
    cat: "Fashion",
    expand: true,
    sub: ["Men", "Women", "Boys", "Girls"],
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728900060/1728900057426_fash.png",
    bgColor: "#ECFFEC",
  },
  {
    cat: "Electronics",
    expand: true,
    sub: [
      "Mobiles",
      "TV",
      "Computers and Accessories",
      "Smart Watches and Accessories",
      "Cameras",
    ],
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728900039/1728900036105_ele.png",
    bgColor: "#FEEFEA",
  },
  {
    cat: "Groceries",
    expand: true,
    sub: ["Cooking Essentials", "Homecare"],
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728900007/1728900003940_gro.png",
    bgColor: "#E7E7E7",
  },
  {
    cat: "Footwear",
    expand: true,
    sub: ["Men's Footwear", "Women's Footwear", "Children Footwear"],
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728899963/1728899960293_foot.png",
    bgColor: "#DEF3FF",
  },
  {
    cat: "Beauty",
    expand: false,
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728899932/1728899929510_beauty.png",
    bgColor: "#FFE8F8",
  },
  {
    cat: "Wellness",
    expand: false,
    logo: "https://res.cloudinary.com/dy2p0n2xc/image/upload/v1728899902/1728899898804_well.png",
    bgColor: "#C9FFD0",
  },
  {
    cat: "Shop",
    expand: true,
    sub: [
      {
        main: "Fashion",
        under: ["Men", "Women", "Boys", "Girls"],
      },
      {
        main: "Electronics",
        under: [
          "Mobiles",
          "TV",
          "Computers and Accessories",
          "Cameras",
          "Smart Watches and Accessories",
          "Cameras",
        ],
      },
      {
        main: "Groceries",
        under: ["Cooking Essentials", "Homecare"],
      },
      {
        main: "Footwear",
        under: ["Men's Footwear", "Women's Footwear", "Children Footwear"],
      },
      {
        main: "Beauty",
        under: [],
      },
      {
        main: "Wellness",
        under: [],
      },
    ],
  },
];
