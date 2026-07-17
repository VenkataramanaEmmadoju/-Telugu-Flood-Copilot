"use strict";

/**
 * Shelter seed data covering all 33 districts of Telangana.
 * 2 shelters per district = 66 shelters total.
 * Field names match the frontend Shelter TypeScript type exactly.
 */
const shelters = [
  // ── 1. Adilabad ─────────────────────────────────────────────────────────
  {
    id: "s-adilabad-1", name: "Government Degree College Adilabad", type: "College",
    district: "Adilabad", village: "Adilabad",
    distanceKm: 1.2, capacity: 400, occupied: 180, phone: "+91 8732 222 101",
    status: "open", coordinates: { lat: 19.6647, lng: 78.5321 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-adilabad-2", name: "Mandal Parishad High School Utnoor", type: "Government School",
    district: "Adilabad", village: "Utnoor",
    distanceKm: 14.5, capacity: 250, occupied: 90, phone: "+91 8731 245 302",
    status: "open", coordinates: { lat: 19.3681, lng: 78.1432 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 2. Bhadradri Kothagudem ─────────────────────────────────────────────
  {
    id: "s-bk-1", name: "Zilla Parishad High School", type: "Government School",
    district: "Bhadradri Kothagudem", village: "Bhadrachalam",
    distanceKm: 2.4, capacity: 350, occupied: 170, phone: "+91 8743 232 118",
    status: "open", coordinates: { lat: 17.6686, lng: 80.8945 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-bk-2", name: "Sri Rama Community Hall", type: "Community Hall",
    district: "Bhadradri Kothagudem", village: "Burgampadu",
    distanceKm: 5.8, capacity: 220, occupied: 92, phone: "+91 8744 220 341",
    status: "open", coordinates: { lat: 17.5823, lng: 80.9765 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 3. Hanamkonda ────────────────────────────────────────────────────────
  {
    id: "s-hanamkonda-1", name: "Government Junior College Hanamkonda", type: "College",
    district: "Hanamkonda", village: "Hanamkonda",
    distanceKm: 3.1, capacity: 480, occupied: 410, phone: "+91 870 245 6712",
    status: "filling", coordinates: { lat: 17.9784, lng: 79.5941 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-hanamkonda-2", name: "Kasturba Gandhi Residential School", type: "Residential School",
    district: "Hanamkonda", village: "Subedari",
    distanceKm: 7.6, capacity: 300, occupied: 120, phone: "+91 870 255 1234",
    status: "open", coordinates: { lat: 18.0024, lng: 79.5689 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 4. Hyderabad ─────────────────────────────────────────────────────────
  {
    id: "s-hyderabad-1", name: "GHMC Community Hall Secunderabad", type: "Community Hall",
    district: "Hyderabad", village: "Secunderabad",
    distanceKm: 4.0, capacity: 600, occupied: 210, phone: "+91 40 2345 6789",
    status: "open", coordinates: { lat: 17.4399, lng: 78.4983 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-hyderabad-2", name: "Zilla Parishad School Musheerabad", type: "Government School",
    district: "Hyderabad", village: "Musheerabad",
    distanceKm: 6.3, capacity: 350, occupied: 140, phone: "+91 40 2789 0123",
    status: "open", coordinates: { lat: 17.4126, lng: 78.4772 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 5. Jagtial ───────────────────────────────────────────────────────────
  {
    id: "s-jagtial-1", name: "Government Polytechnic Jagtial", type: "College",
    district: "Jagtial", village: "Jagtial",
    distanceKm: 2.0, capacity: 320, occupied: 130, phone: "+91 8724 222 450",
    status: "open", coordinates: { lat: 18.7948, lng: 78.9161 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-jagtial-2", name: "MPPS Metpalli", type: "Government School",
    district: "Jagtial", village: "Metpalli",
    distanceKm: 18.5, capacity: 200, occupied: 60, phone: "+91 8724 252 111",
    status: "open", coordinates: { lat: 18.8272, lng: 79.0641 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 6. Jangaon ───────────────────────────────────────────────────────────
  {
    id: "s-jangaon-1", name: "Govt High School Jangaon", type: "Government School",
    district: "Jangaon", village: "Jangaon",
    distanceKm: 1.5, capacity: 280, occupied: 95, phone: "+91 8703 222 312",
    status: "open", coordinates: { lat: 17.7284, lng: 79.1521 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-jangaon-2", name: "Panchayat Bhavan Kodakandla", type: "Panchayat Office",
    district: "Jangaon", village: "Kodakandla",
    distanceKm: 12.8, capacity: 150, occupied: 40, phone: "+91 8703 255 443",
    status: "open", coordinates: { lat: 17.8012, lng: 79.2341 },
    facilities: ["drinking_water", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 7. Jayashankar Bhupalpally ───────────────────────────────────────────
  {
    id: "s-jsb-1", name: "Govt Degree College Bhupalpally", type: "College",
    district: "Jayashankar Bhupalpally", village: "Bhupalpally",
    distanceKm: 2.8, capacity: 310, occupied: 190, phone: "+91 8716 222 567",
    status: "filling", coordinates: { lat: 18.4375, lng: 79.8531 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-jsb-2", name: "MPPS Mahadevpur", type: "Government School",
    district: "Jayashankar Bhupalpally", village: "Mahadevpur",
    distanceKm: 22.1, capacity: 180, occupied: 55, phone: "+91 8716 245 223",
    status: "open", coordinates: { lat: 18.5412, lng: 80.0123 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 8. Jogulamba Gadwal ──────────────────────────────────────────────────
  {
    id: "s-gadwal-1", name: "Govt Junior College Gadwal", type: "College",
    district: "Jogulamba Gadwal", village: "Gadwal",
    distanceKm: 1.8, capacity: 300, occupied: 110, phone: "+91 8546 222 789",
    status: "open", coordinates: { lat: 16.2321, lng: 77.7982 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-gadwal-2", name: "Alampur Community Hall", type: "Community Hall",
    district: "Jogulamba Gadwal", village: "Alampur",
    distanceKm: 9.4, capacity: 200, occupied: 70, phone: "+91 8546 234 100",
    status: "open", coordinates: { lat: 15.8900, lng: 78.1323 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 9. Kamareddy ─────────────────────────────────────────────────────────
  {
    id: "s-kamareddy-1", name: "Govt Degree College Kamareddy", type: "College",
    district: "Kamareddy", village: "Kamareddy",
    distanceKm: 2.1, capacity: 380, occupied: 160, phone: "+91 8468 222 341",
    status: "open", coordinates: { lat: 18.3199, lng: 78.3395 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-kamareddy-2", name: "ZPHS Banswada", type: "Government School",
    district: "Kamareddy", village: "Banswada",
    distanceKm: 16.7, capacity: 240, occupied: 80, phone: "+91 8468 255 212",
    status: "open", coordinates: { lat: 18.3776, lng: 77.8832 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 10. Karimnagar ───────────────────────────────────────────────────────
  {
    id: "s-karimnagar-1", name: "IIIT Karimnagar Campus Hall", type: "College",
    district: "Karimnagar", village: "Karimnagar",
    distanceKm: 3.5, capacity: 500, occupied: 280, phone: "+91 878 222 3456",
    status: "filling", coordinates: { lat: 18.4392, lng: 79.1288 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-karimnagar-2", name: "MPPS Huzurabad", type: "Government School",
    district: "Karimnagar", village: "Huzurabad",
    distanceKm: 14.3, capacity: 220, occupied: 85, phone: "+91 8716 272 334",
    status: "open", coordinates: { lat: 18.2072, lng: 79.4105 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 11. Khammam ──────────────────────────────────────────────────────────
  {
    id: "s-khammam-1", name: "Palair Panchayat Bhavan", type: "Panchayat Office",
    district: "Khammam", village: "Palair",
    distanceKm: 13.6, capacity: 140, occupied: 140, phone: "+91 8742 288 550",
    status: "full", coordinates: { lat: 17.0846, lng: 80.5323 },
    facilities: ["drinking_water", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-khammam-2", name: "Government Model School Kusumanchi", type: "Government School",
    district: "Khammam", village: "Kusumanchi",
    distanceKm: 17.2, capacity: 260, occupied: 90, phone: "+91 8742 244 118",
    status: "open", coordinates: { lat: 17.1637, lng: 80.6421 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 12. Kumuram Bheem Asifabad ───────────────────────────────────────────
  {
    id: "s-kba-1", name: "Govt High School Asifabad", type: "Government School",
    district: "Kumuram Bheem Asifabad", village: "Asifabad",
    distanceKm: 1.6, capacity: 280, occupied: 105, phone: "+91 8734 222 890",
    status: "open", coordinates: { lat: 19.3691, lng: 79.2863 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-kba-2", name: "MPPS Sirpur Kaghaznagar", type: "Government School",
    district: "Kumuram Bheem Asifabad", village: "Sirpur Kaghaznagar",
    distanceKm: 28.4, capacity: 220, occupied: 60, phone: "+91 8734 252 443",
    status: "open", coordinates: { lat: 19.4852, lng: 79.5691 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 13. Mahabubabad ──────────────────────────────────────────────────────
  {
    id: "s-mahabubabad-1", name: "Govt Junior College Mahabubabad", type: "College",
    district: "Mahabubabad", village: "Mahabubabad",
    distanceKm: 2.3, capacity: 320, occupied: 140, phone: "+91 8719 222 678",
    status: "open", coordinates: { lat: 17.5980, lng: 80.0018 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-mahabubabad-2", name: "ZPHS Kesamudram", type: "Government School",
    district: "Mahabubabad", village: "Kesamudram",
    distanceKm: 28.7, capacity: 320, occupied: 118, phone: "+91 8719 233 442",
    status: "open", coordinates: { lat: 17.6104, lng: 80.0423 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 14. Mahabubnagar ─────────────────────────────────────────────────────
  {
    id: "s-mahabubnagar-1", name: "Govt Degree College Mahabubnagar", type: "College",
    district: "Mahabubnagar", village: "Mahabubnagar",
    distanceKm: 2.9, capacity: 450, occupied: 200, phone: "+91 8542 222 345",
    status: "open", coordinates: { lat: 16.7373, lng: 77.9836 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-mahabubnagar-2", name: "MPPS Jadcherla", type: "Government School",
    district: "Mahabubnagar", village: "Jadcherla",
    distanceKm: 18.1, capacity: 240, occupied: 90, phone: "+91 8542 255 671",
    status: "open", coordinates: { lat: 16.7632, lng: 78.1421 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 15. Mancherial ───────────────────────────────────────────────────────
  {
    id: "s-mancherial-1", name: "Govt Polytechnic Mancherial", type: "College",
    district: "Mancherial", village: "Mancherial",
    distanceKm: 1.9, capacity: 350, occupied: 175, phone: "+91 8736 222 567",
    status: "filling", coordinates: { lat: 18.8719, lng: 79.4582 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-mancherial-2", name: "Community Hall Bellampally", type: "Community Hall",
    district: "Mancherial", village: "Bellampally",
    distanceKm: 12.6, capacity: 200, occupied: 55, phone: "+91 8736 245 223",
    status: "open", coordinates: { lat: 19.0514, lng: 79.4921 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 16. Medak ────────────────────────────────────────────────────────────
  {
    id: "s-medak-1", name: "Govt High School Medak", type: "Government School",
    district: "Medak", village: "Medak",
    distanceKm: 2.2, capacity: 300, occupied: 120, phone: "+91 8452 222 789",
    status: "open", coordinates: { lat: 17.9991, lng: 78.2637 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-medak-2", name: "MPPS Toopran", type: "Government School",
    district: "Medak", village: "Toopran",
    distanceKm: 15.3, capacity: 200, occupied: 70, phone: "+91 8452 255 441",
    status: "open", coordinates: { lat: 17.9201, lng: 78.4637 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 17. Medchal-Malkajgiri ───────────────────────────────────────────────
  {
    id: "s-medchal-1", name: "Govt High School Medchal", type: "Government School",
    district: "Medchal-Malkajgiri", village: "Medchal",
    distanceKm: 3.8, capacity: 400, occupied: 180, phone: "+91 40 2789 1234",
    status: "open", coordinates: { lat: 17.6279, lng: 78.4870 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-medchal-2", name: "Community Hall Kompally", type: "Community Hall",
    district: "Medchal-Malkajgiri", village: "Kompally",
    distanceKm: 11.2, capacity: 280, occupied: 110, phone: "+91 40 2711 5678",
    status: "open", coordinates: { lat: 17.5424, lng: 78.4879 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 18. Mulugu ───────────────────────────────────────────────────────────
  {
    id: "s-mulugu-1", name: "TTD Kalyana Mandapam Eturnagaram", type: "Community Hall",
    district: "Mulugu", village: "Eturnagaram",
    distanceKm: 21.8, capacity: 300, occupied: 210, phone: "+91 8717 232 001",
    status: "filling", coordinates: { lat: 18.3497, lng: 80.2861 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-mulugu-2", name: "Rural Dev Training Centre Mangapet", type: "Training Centre",
    district: "Mulugu", village: "Mangapet",
    distanceKm: 25.4, capacity: 200, occupied: 55, phone: "+91 8717 245 776",
    status: "open", coordinates: { lat: 18.2341, lng: 80.4127 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },

  // ── 19. Nagarkurnool ─────────────────────────────────────────────────────
  {
    id: "s-nagarkurnool-1", name: "Govt Degree College Nagarkurnool", type: "College",
    district: "Nagarkurnool", village: "Nagarkurnool",
    distanceKm: 2.7, capacity: 360, occupied: 130, phone: "+91 8548 222 345",
    status: "open", coordinates: { lat: 16.4841, lng: 78.3219 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-nagarkurnool-2", name: "ZPHS Achampet", type: "Government School",
    district: "Nagarkurnool", village: "Achampet",
    distanceKm: 22.4, capacity: 220, occupied: 75, phone: "+91 8548 245 678",
    status: "open", coordinates: { lat: 16.5319, lng: 78.6943 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 20. Nalgonda ─────────────────────────────────────────────────────────
  {
    id: "s-nalgonda-1", name: "Govt Degree College Nalgonda", type: "College",
    district: "Nalgonda", village: "Nalgonda",
    distanceKm: 2.0, capacity: 450, occupied: 220, phone: "+91 8682 222 890",
    status: "open", coordinates: { lat: 17.0582, lng: 79.2676 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-nalgonda-2", name: "Community Hall Miryalaguda", type: "Community Hall",
    district: "Nalgonda", village: "Miryalaguda",
    distanceKm: 16.8, capacity: 280, occupied: 100, phone: "+91 8682 255 123",
    status: "open", coordinates: { lat: 16.8752, lng: 79.5638 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 21. Narayanpet ───────────────────────────────────────────────────────
  {
    id: "s-narayanpet-1", name: "Govt High School Narayanpet", type: "Government School",
    district: "Narayanpet", village: "Narayanpet",
    distanceKm: 1.4, capacity: 260, occupied: 95, phone: "+91 8543 222 456",
    status: "open", coordinates: { lat: 16.7449, lng: 77.4957 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-narayanpet-2", name: "MPPS Makthal", type: "Government School",
    district: "Narayanpet", village: "Makthal",
    distanceKm: 13.6, capacity: 180, occupied: 50, phone: "+91 8543 245 789",
    status: "open", coordinates: { lat: 16.5312, lng: 77.6231 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 22. Nirmal ───────────────────────────────────────────────────────────
  {
    id: "s-nirmal-1", name: "Govt Degree College Nirmal", type: "College",
    district: "Nirmal", village: "Nirmal",
    distanceKm: 2.5, capacity: 350, occupied: 155, phone: "+91 8734 332 112",
    status: "open", coordinates: { lat: 19.0960, lng: 78.3469 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-nirmal-2", name: "Community Hall Bhainsa", type: "Community Hall",
    district: "Nirmal", village: "Bhainsa",
    distanceKm: 14.9, capacity: 200, occupied: 65, phone: "+91 8734 345 223",
    status: "open", coordinates: { lat: 19.0994, lng: 77.9631 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 23. Nizamabad ────────────────────────────────────────────────────────
  {
    id: "s-nizamabad-1", name: "Govt Degree College Nizamabad", type: "College",
    district: "Nizamabad", village: "Nizamabad",
    distanceKm: 2.6, capacity: 500, occupied: 230, phone: "+91 8462 222 567",
    status: "open", coordinates: { lat: 18.6725, lng: 78.0941 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-nizamabad-2", name: "ZPHS Armoor", type: "Government School",
    district: "Nizamabad", village: "Armoor",
    distanceKm: 19.3, capacity: 250, occupied: 85, phone: "+91 8462 254 334",
    status: "open", coordinates: { lat: 18.7952, lng: 78.2891 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 24. Peddapalli ───────────────────────────────────────────────────────
  {
    id: "s-peddapalli-1", name: "Govt Junior College Peddapalli", type: "College",
    district: "Peddapalli", village: "Peddapalli",
    distanceKm: 2.1, capacity: 310, occupied: 140, phone: "+91 8728 222 890",
    status: "open", coordinates: { lat: 18.6135, lng: 79.3772 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-peddapalli-2", name: "MPPS Ramagundam", type: "Government School",
    district: "Peddapalli", village: "Ramagundam",
    distanceKm: 10.4, capacity: 280, occupied: 110, phone: "+91 8728 245 567",
    status: "open", coordinates: { lat: 18.7531, lng: 79.4752 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 25. Rajanna Sircilla ────────────────────────────────────────────────
  {
    id: "s-sircilla-1", name: "Govt High School Sircilla", type: "Government School",
    district: "Rajanna Sircilla", village: "Sircilla",
    distanceKm: 1.8, capacity: 300, occupied: 115, phone: "+91 8718 222 341",
    status: "open", coordinates: { lat: 18.3853, lng: 78.8276 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-sircilla-2", name: "Vemulawada Community Hall", type: "Community Hall",
    district: "Rajanna Sircilla", village: "Vemulawada",
    distanceKm: 9.7, capacity: 220, occupied: 80, phone: "+91 8718 255 789",
    status: "open", coordinates: { lat: 18.4692, lng: 78.8931 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 26. Rangareddy ───────────────────────────────────────────────────────
  {
    id: "s-rangareddy-1", name: "Govt High School Shadnagar", type: "Government School",
    district: "Rangareddy", village: "Shadnagar",
    distanceKm: 5.2, capacity: 400, occupied: 180, phone: "+91 8413 222 678",
    status: "open", coordinates: { lat: 17.0640, lng: 78.2020 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-rangareddy-2", name: "MPPS Ibrahimpatnam", type: "Government School",
    district: "Rangareddy", village: "Ibrahimpatnam",
    distanceKm: 13.7, capacity: 260, occupied: 95, phone: "+91 8413 245 123",
    status: "open", coordinates: { lat: 17.1108, lng: 78.6261 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 27. Sangareddy ───────────────────────────────────────────────────────
  {
    id: "s-sangareddy-1", name: "Govt Degree College Sangareddy", type: "College",
    district: "Sangareddy", village: "Sangareddy",
    distanceKm: 2.4, capacity: 420, occupied: 190, phone: "+91 8455 222 901",
    status: "open", coordinates: { lat: 17.6269, lng: 78.0854 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-sangareddy-2", name: "Community Hall Zaheerabad", type: "Community Hall",
    district: "Sangareddy", village: "Zaheerabad",
    distanceKm: 21.5, capacity: 280, occupied: 95, phone: "+91 8455 256 234",
    status: "open", coordinates: { lat: 17.6801, lng: 77.6049 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 28. Siddipet ─────────────────────────────────────────────────────────
  {
    id: "s-siddipet-1", name: "Govt Junior College Siddipet", type: "College",
    district: "Siddipet", village: "Siddipet",
    distanceKm: 2.0, capacity: 360, occupied: 150, phone: "+91 8457 222 345",
    status: "open", coordinates: { lat: 18.1022, lng: 78.8521 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-siddipet-2", name: "MPPS Gajwel", type: "Government School",
    district: "Siddipet", village: "Gajwel",
    distanceKm: 17.6, capacity: 220, occupied: 70, phone: "+91 8457 255 678",
    status: "open", coordinates: { lat: 17.8539, lng: 78.6715 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 29. Suryapet ─────────────────────────────────────────────────────────
  {
    id: "s-suryapet-1", name: "Govt Degree College Suryapet", type: "College",
    district: "Suryapet", village: "Suryapet",
    distanceKm: 2.3, capacity: 400, occupied: 175, phone: "+91 8684 222 567",
    status: "open", coordinates: { lat: 17.1415, lng: 79.6238 },
    facilities: ["drinking_water", "food", "medical", "toilets", "electricity"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-suryapet-2", name: "Community Hall Kodad", type: "Community Hall",
    district: "Suryapet", village: "Kodad",
    distanceKm: 14.8, capacity: 250, occupied: 90, phone: "+91 8684 245 890",
    status: "open", coordinates: { lat: 16.9982, lng: 79.9750 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 30. Vikarabad ────────────────────────────────────────────────────────
  {
    id: "s-vikarabad-1", name: "Govt High School Vikarabad", type: "Government School",
    district: "Vikarabad", village: "Vikarabad",
    distanceKm: 1.9, capacity: 300, occupied: 110, phone: "+91 8411 222 678",
    status: "open", coordinates: { lat: 17.3325, lng: 77.9023 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-vikarabad-2", name: "MPPS Tandur", type: "Government School",
    district: "Vikarabad", village: "Tandur",
    distanceKm: 18.3, capacity: 200, occupied: 60, phone: "+91 8411 255 901",
    status: "open", coordinates: { lat: 17.2490, lng: 77.5729 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 31. Wanaparthy ───────────────────────────────────────────────────────
  {
    id: "s-wanaparthy-1", name: "Govt Degree College Wanaparthy", type: "College",
    district: "Wanaparthy", village: "Wanaparthy",
    distanceKm: 2.6, capacity: 320, occupied: 130, phone: "+91 8545 222 234",
    status: "open", coordinates: { lat: 16.3621, lng: 78.0593 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-wanaparthy-2", name: "Community Hall Pebbair", type: "Community Hall",
    district: "Wanaparthy", village: "Pebbair",
    distanceKm: 12.1, capacity: 180, occupied: 55, phone: "+91 8545 245 567",
    status: "open", coordinates: { lat: 16.1743, lng: 77.8741 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 32. Warangal ─────────────────────────────────────────────────────────
  {
    id: "s-warangal-1", name: "Mandal Parishad Primary School Parkal", type: "Government School",
    district: "Warangal", village: "Parkal",
    distanceKm: 11.3, capacity: 180, occupied: 40, phone: "+91 8712 234 908",
    status: "open", coordinates: { lat: 18.1967, lng: 79.6827 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-warangal-2", name: "Community Hall Narsampet", type: "Community Hall",
    district: "Warangal", village: "Narsampet",
    distanceKm: 19.2, capacity: 240, occupied: 88, phone: "+91 8712 255 001",
    status: "open", coordinates: { lat: 17.9269, lng: 79.8971 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },

  // ── 33. Yadadri Bhuvanagiri ─────────────────────────────────────────────
  {
    id: "s-yadadri-1", name: "Govt Degree College Bhongir", type: "College",
    district: "Yadadri Bhuvanagiri", village: "Bhongir",
    distanceKm: 3.4, capacity: 360, occupied: 155, phone: "+91 8686 222 341",
    status: "open", coordinates: { lat: 17.5071, lng: 78.8874 },
    facilities: ["drinking_water", "food", "medical", "toilets"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s-yadadri-2", name: "MPPS Aler", type: "Government School",
    district: "Yadadri Bhuvanagiri", village: "Aler",
    distanceKm: 14.2, capacity: 200, occupied: 65, phone: "+91 8686 245 678",
    status: "open", coordinates: { lat: 17.4213, lng: 78.9512 },
    facilities: ["drinking_water", "food", "toilets"],
    updatedAt: new Date().toISOString(),
  },
];

module.exports = shelters;
