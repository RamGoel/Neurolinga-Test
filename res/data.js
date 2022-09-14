const fields = [
  ["Operator Id", "input", "numeric"],
  ["Product Serial Number", "input", "numeric"],
  ["Service Order Number", "input", "numeric"],
  ["Product Type", "", ""],
  ["Choose Product", "", ""],
  ["Color", "", ""],
  ["Size", "", ""],
  ["Delivery Mode", "", ""],
  ["Delivery Address", "input", ""],
  ["Customer Contact Number", "input", "numeric"],
];


const formData = [
  {
    "dropName": "Product Type",
    "label": "Mi Phones",
    "value": "Mi Phones"
  },
  {
    "dropName": "Product Type",
    "label": "Mi TV",
    "value": "Mi TV"
  },
  {
    "dropName": "Product Type",
    "label": "Mi Laptops",
    "value": "Mi Laptops"
  },
  {
    "dropName": "Product Type",
    "label": "Mi Speakers",
    "value": "Mi Speakers"
  },
  {
    "dropName": "Product Type",
    "label": "Mi Bands",
    "value": "Mi Bands"
  },
  {
    "dropName": "Delivery Mode",
    "label": "Home Delivery",
    "value": "Home Delivery"
  },
  {
    "dropName": "Delivery Mode",
    "label": "In-Store Delivery",
    "value": "In-Store Delivery"
  }
]



export {formData,fields}
