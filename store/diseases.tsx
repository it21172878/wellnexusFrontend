const diseases = [
  {
    name: "Depression",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    description:
      "A mood disorder characterized by persistent feelings of sadness, hopelessness, and loss of interest in daily activities",
    symptoms: [
      "Persistent sadness or emptiness",
      "Loss of interest in hobbies or activities",
      "Changes in appetite and weight",
      "Fatigue or low energy",
      "Difficulty concentrating",
      "Thoughts of death or suicide",
    ],
  },
  {
    name: "Anxiety Disorders",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    description:
      "A group of disorders characterized by excessive fear, worry, or nervousness that interferes with daily life.",
    symptoms: [
      "Excessive worrying or nervousness",
      "Restlessness or feeling on edge",
      "Rapid heartbeat",
      "Difficulty sleeping",
      "Panic attacks (in some cases)",
    ],
  },
  {
    name: "Bipolar Disorder",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    description:
      "A disorder causing extreme mood swings, including manic (high-energy) and depressive episodes.",
    symptoms: [
      "Periods of excessive energy, euphoria, or irritability (mania)",
      "Risky behaviors (during mania)",
      "Periods of sadness and hopelessness (depression)",
      "Trouble sleeping",
      "Difficulty concentrating",
    ],
  },
  {
    name: "Schizophrenia",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    description:
      "A severe mental disorder affecting thought processes, perceptions, and emotions.",
    symptoms: [
      "Hallucinations (hearing or seeing things that aren't real)",
      "Delusions (false beliefs)",
      "Disorganized thinking",
      "Social withdrawal",
      "Lack of emotional expression",
    ],
  },
  {
    name: "Obsessive-Compulsive Disorder (OCD)",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    description:
      "A disorder characterized by unwanted repetitive thoughts (obsessions) and behaviors (compulsions).",
    symptoms: [
      "Repetitive handwashing, checking, or counting",
      "Fear of germs or contamination",
      "Intrusive and distressing thoughts",
      "Difficulty controlling compulsive behaviors",
      "Lack of emotional expression",
    ],
  },
];

const restaurants = [
  {
    name: "Sea Grill of Merrick Park",
    seats: 50,
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    address: `4250 Salzedo Street, Suite 1425Coral Gables, FL 33146`,
    opening: "11:30",
    closing: "23:00",
  },
  {
    address: "123 Ocean Drive, Suite 101, Miami Beach, FL 33139",
    closing: "22:00",
    image:
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Ocean's Edge Bistro",
    opening: "10:00",
    seats: 50,
  },
  {
    address: "789 Sunset Blvd, Suite 202, Los Angeles, CA 90069",
    closing: "00:00",
    image: "https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg",
    name: "Sunset Grill",
    opening: "11:00",
    seats: 75,
  },
  {
    address: "456 River Road, Suite 300, New York, NY 10001",
    closing: "23:30",
    image: "https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg",
    name: "Riverside Diner",
    opening: "09:00",
    seats: 65,
  },
  {
    address: "321 Bay Street, Suite 400, San Francisco, CA 94133",
    closing: "22:30",
    image: "https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg",
    name: "Bayview Café",
    opening: "10:30",
    seats: 80,
  },
  {
    address: "555 Lake Avenue, Suite 120, Chicago, IL 60611",
    closing: "23:00",
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
    name: "Lakeside Eatery",
    opening: "11:00",
    seats: 70,
  },
  {
    address: "789 Fifth Avenue, Suite 201, New York, NY 10022",
    closing: "21:30",
    image: "https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg",
    name: "Central Park Café",
    opening: "08:30",
    seats: 60,
  },
  {
    address: "1000 Broadway, Suite 500, Nashville, TN 37203",
    closing: "00:30",
    image:
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Music City Grill",
    opening: "12:00",
    seats: 100,
  },
  {
    address: "222 Elm Street, Suite 101, Dallas, TX 75201",
    closing: "22:00",
    image:
      "https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Texas BBQ House",
    opening: "10:00",
    seats: 90,
  },
  {
    address: "789 Pine Street, Suite 204, Seattle, WA 98101",
    closing: "23:00",
    image: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg",
    name: "Evergreen Eatery",
    opening: "11:30",
    seats: 85,
  },
  {
    address: "456 King Street, Suite 100, Charleston, SC 29403",
    closing: "22:00",
    image:
      "https://images.pexels.com/photos/1628020/pexels-photo-1628020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Lowcountry Diner",
    opening: "09:30",
    seats: 55,
  },
  {
    address: "789 Bourbon Street, Suite 300, New Orleans, LA 70116",
    closing: "01:00",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
    name: "Bourbon Street Grill",
    opening: "11:00",
    seats: 110,
  },
  {
    address: "123 Main Street, Suite 150, Las Vegas, NV 89109",
    closing: "23:30",
    image: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg",
    name: "Vegas Strip Café",
    opening: "12:00",
    seats: 120,
  },
];
const carouselImages = [
  {
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_1",
  },
  {
    images: [
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_2",
  },
  {
    images: [
      "https://images.pexels.com/photos/914388/pexels-photo-914388.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/15638789/pexels-photo-15638789.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=170.625&fit=crop&h=276.25",
      "https://images.pexels.com/photos/8630151/pexels-photo-8630151.jpeg?auto=compress&cs=tinysrgb&h=138.125&fit=crop&w=154.375&dpr=1",
      "https://images.pexels.com/photos/3656787/pexels-photo-3656787.jpeg?auto=compress&cs=tinysrgb&h=138.125&fit=crop&w=154.375&dpr=1",
      "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_3",
  },
  {
    images: [
      "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_4",
  },
  {
    images: [
      "https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1819669/pexels-photo-1819669.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_5",
  },
  {
    images: [
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_6",
  },
  {
    images: [
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/914388/pexels-photo-914388.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/15638789/pexels-photo-15638789.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=236.25&fit=crop&h=382.5",
    ],
    res_id: "/restaurants/restaurant_7",
  },
  {
    images: [
      "https://images.pexels.com/photos/8630151/pexels-photo-8630151.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/3656787/pexels-photo-3656787.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_8",
  },
  {
    images: [
      "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1819669/pexels-photo-1819669.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_9",
  },
  {
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_10",
  },
  {
    images: [
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_11",
  },
  {
    images: [
      "https://images.pexels.com/photos/914388/pexels-photo-914388.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/15638789/pexels-photo-15638789.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/8630151/pexels-photo-8630151.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/3656787/pexels-photo-3656787.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    res_id: "/restaurants/restaurant_12",
  },
];

const slots = [
  {
    ref_id: "/restaurants/restaurant_1",
    slot: ["11:30", "13:30", "15:30", "17:30", "19:30", "21:30"],
  },
  {
    ref_id: "/restaurants/restaurant_2",
    slot: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    ref_id: "/restaurants/restaurant_3",
    slot: ["11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
  },
  {
    ref_id: "/restaurants/restaurant_4",
    slot: [
      "09:00",
      "11:00",
      "13:00",
      "15:00",
      "17:00",
      "19:00",
      "21:00",
      "23:00",
    ],
  },
  {
    ref_id: "/restaurants/restaurant_5",
    slot: ["10:30", "12:30", "14:30", "16:30", "18:30", "20:30"],
  },
  {
    ref_id: "/restaurants/restaurant_6",
    slot: ["11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
  },
  {
    ref_id: "/restaurants/restaurant_7",
    slot: ["08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30"],
  },
  {
    ref_id: "/restaurants/restaurant_8",
    slot: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  },
  {
    ref_id: "/restaurants/restaurant_9",
    slot: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    ref_id: "/restaurants/restaurant_10",
    slot: ["11:30", "13:30", "15:30", "17:30", "19:30", "21:30"],
  },
  {
    ref_id: "/restaurants/restaurant_11",
    slot: ["09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
  {
    ref_id: "/restaurants/restaurant_12",
    slot: ["11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
  },
  {
    ref_id: "/restaurants/restaurant_13",
    slot: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  },
];

export { restaurants, carouselImages, slots, diseases };
