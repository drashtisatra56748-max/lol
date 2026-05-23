import { Product, StateItem, Review } from "./types";

export const STATES_DATA: StateItem[] = [
  {
    name: "Andhra Pradesh",
    code: "AP",
    artForm: "Kondapalli Toys",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCC-75dbv6F1ZE6-cMyjRwINlwacTs16iAW2r087QoTlrlhHB3vdktFBv-JexHNR1NpP9lTRt1G3jDg1BWwiXU4edjj_CWPXMpXWN50MkFuFMh3mBw9c7w7YH_muSdcJ9BBoVLqobYXxty45m8_u9p7iVtHLd2cmRzCTH8vH_0YluMFQY62anXsND641XsQVTDqjFzdkP4S4br-2fmtyenDigO97v8m6NPwozn6Zg3keFEaDvHLRx4UPwsBh9PgghpLbtt2Y0VQDI"
  },
  {
    name: "Punjab",
    code: "PB",
    artForm: "Phulkari Work",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-FRONwWggcpOqZ5uCsWW6DuSIOcRWMi5FSRMYzZ_xV_NsaAZXmtILCexbhS3UU3IJVL0RSs1igfSDqg0gkM-pO_Ie1_t0gPvPqyT0FO1yST2gd3S1GPJzwCkdHePuZhBIGrjf8YKpTOVq2Sxffs2RStbgyQ5f3_i9T6rgmrxUJP5Yf3Lim93hEhROSvR41Fz28YFS1Wpi6MwopGN6xs-gqZ4-HSrR2Gm43LvtNIaW8W2_HkU2qyWKfzFLfYbtPxgW5EIwzBSEats"
  },
  {
    name: "Rajasthan",
    code: "RJ",
    artForm: "Blue Pottery",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTEj-GWQGUjTMMFvBg3TUcPFS0LB6vAV6L6mHnG28giHTeoPFBlGvD2xZ7v99rj-4As_CivopxMqkX_Oc3YsT9b9fDrhRv6L-AWJJh3HW6eYei9Vfj1cnrSaKuwM0qEiHw20jX0kDK5-8y-35gn6Wyvq0HqduUVmEzQ8bzAl-cxkNcosJHoKy-tEwllOazGh3HbUuk6V3EqGQVQESckgC_IMxQpP3QS2-CjLoJT2gk8cruRzo1BldIS18St9zD9sR0-wHBTIWJs74"
  },
  {
    name: "Odisha",
    code: "OD",
    artForm: "Pattachitra Art",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBxwjEi5qIMcpUFUs_8EdxpO6xa0j718LK4ATnt_gBgbHEcyDdRjArTmCS1m7drJcL1CH1TWbg9UlyPSn_F6cx3SJmUbd8bospNK6kNp7c1TypG0DWwBCrdjlOGu9aj1_3umi38AjRFbCgI0O6qqP05jEjGzFXRa44IuPfD-cZSYD_o2_w1bZmkdg2WpdXpzJSy2y8CWTfBMmpQFi_r3DSBtAuESBs2vqhLqcCcxjw1ZLXzGqsx6QZ0w4oelWPEKHGW7lvspIup_E"
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "madhubani-peacock",
    title: "Traditional Madhubani Peacock Art",
    state: "Bihar",
    stateCode: "BR",
    description: "Hand-painted using natural vegetable dyes on handmade paper. Each piece is unique and carries the signature of the master artisan. Symbols like the peacock represent beauty, rebirth, and courtship, woven into the cultural fabric of Bihar for over 2,500 years.",
    price: 12450,
    originalPrice: 15000,
    category: "Decor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB67vr1eG49RjT6pe8UCBrMe5Z-vb978dCPEckUYvx0WJeum2AIbIClsOmh7b47v5T92wKeKNSw8kGobUsmoTsyuuYctqK87M8_8Oc_fof-kiyX6oa-Y8d1PPuOmcjprMMKkl43lX0-vnO2niO0w_5oPiPvbjXZrW5OXoIcqfC0KhcCO6RR6rBfh4ZulKH2Jxo0-IzKyj_GzexCy0cyIG8J2rgo0m1Bkm6dn-VwXi9ZvGLhOM4fEu2OC1rdgle5jXh7fgKwSE-bVHA",
    detailsImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB67vr1eG49RjT6pe8UCBrMe5Z-vb978dCPEckUYvx0WJeum2AIbIClsOmh7b47v5T92wKeKNSw8kGobUsmoTsyuuYctqK87M8_8Oc_fof-kiyX6oa-Y8d1PPuOmcjprMMKkl43lX0-vnO2niO0w_5oPiPvbjXZrW5OXoIcqfC0KhcCO6RR6rBfh4ZulKH2Jxo0-IzKyj_GzexCy0cyIG8J2rgo0m1Bkm6dn-VwXi9ZvGLhOM4fEu2OC1rdgle5jXh7fgKwSE-bVHA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1BIwRGXChYq9K-7NkT-3N6IHQ_m9R7dQnslt3iSRJyk_Jvm9rfVvAMCrtGTpjkTPu1UXQdP-Yvn8dqr13-fpzTVVTOtJW5tqj5m5uZqx5UWfkD3KpeEmyVCwKVx2mezfNPTQuxax662WJ3mvhXGDu23K9C1mepY-0H-jrmK0JbFBTYtIcPfreP2CAOrakosVStxxrcM2eyNY2yOXlYg2rZJuWWlnBYROUsCZwniRf0FgvItNX4opom7064ACRBdmigOts3MSJLo0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuOn2T9lJnqKz1rikIMfJGhm1UTLY5r16DsGSv4kymixsMp_E7WHFy8JoFOp7AI6uwM5Cw4RHk9QnKI-5W-v2eeCcqIhwaxgNZjyCd9duPLZC00-FQcmcP4KGbiUV2FBCY7SO_gzhMXtf-q_qCm-mKlutH6OjH61IdcS_iwio6EPNIeBqRiCt4rj9vvTCLmhpz51P1hSLiL_b2p3xMp-ldc7r3AYA2FIiYA1R50h0xlMMs1SWiVqCbv7ft8dffyEUNzZKNRRNLdcxg"
    ],
    rating: 4.8,
    reviewsCount: 48,
    isHandmade: true,
    region: "Mithila, Bihar",
    storyTitle: "The Heritage Story of Madhubani Painting",
    storyParagraphs: [
      "Madhubani art, also known as Mithila painting, originates from the Mithila region of the Indian subcontinent. Traditionally created by the women of the community, these paintings were originally done on freshly plastered mud walls and floors of huts during festivals and marriage ceremonies.",
      "The art form is characterized by its eye-catching geometrical patterns and the use of natural dyes and pigments extracted from leaves, flowers, and earth. Double-line outlines filled with delicate hatching or stippling are key stylistic markers.",
      "By bringing this authentic hand-painted masterpiece into your home, you are directly preserving an ancient lineage of narrative storytelling and helping sustain traditional craft clusters in rural Bihar."
    ],
    artisanName: "Smt. Dulari Devi",
    artisanImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmgvXayBeKJy08d1l9UkBs14UTLhaLkpAm_K8iFIvMLEoWYCC3dwSQx6E98nrcKbZadBHpGRf4EagbfAploCs9kACeqF9DLripWNPbNOizaxJdQIa_7XKsLGphiZ-0E9XpUhCaYhba1L7ij88yeSbb9t8zEUX2opXep_uX3z96KZpu_fij_aCeOwohb9Ol03rORwOMG2OY5vmWPPchNCbIvJiyls8Svr_BHCIPY9Ney0FrAb5_VY17I48aWN1TrhcrVzD6Vikq5eM",
    artisanQuote: "Our paintings are not just designs; they are prayers, stories, and the breath of our ancestors written onto a canvas."
  },
  {
    id: "ikat-cotton-throw",
    title: "Indigo Ikat Cotton Throw",
    state: "Andhra Pradesh",
    stateCode: "AP",
    description: "Heavyweight hand-loomed indigo cotton throw blanket featuring intricate, double-sided traditional ikat motifs. It is dyed with pure organic indigo leaves and provides a incredibly rich tactile drape.",
    price: 4250,
    category: "Home Textile",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLZl-spF_qqGKnz3oBsNuWSL2LvnMWlH5Jb5WB6fFBJOtEzdy3ORRtb-ezSEAYhYiK6rCCSVPp9jqrLNlH7Z-FKFkMLOobMx-7GUZJUs67nYgpl1EcewfYC_T4WAQ4_W6wUeLq_d-vPgUhzBbiFV3lJAsOg24VCgLQP4Z1GnafKG2Nd-cz4jlc-ZAG-scOVIl9Qgc5he0v9zFGi6S-1o4LaDqXZkiNVQ9nkBRMLkA9DmRZ189M5hNrG-2ZIKvisM0lN_HtQH3Xi5A",
    rating: 4.8,
    reviewsCount: 32,
    isBestSeller: true,
    region: "Pochampally, Andhra Pradesh"
  },
  {
    id: "terracotta-vase",
    title: "Terracotta Hand-Etched Vase",
    state: "West Bengal",
    stateCode: "WB",
    description: "An elegant, matte-finished earthen clay vase with organic rounded silhouettes. Decorated with sophisticated, hand-etched geometric lines reflecting the organic simplicity of rural Bengali pottery.",
    price: 2100,
    category: "Pottery",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt4-FGCDbg8OQN1Jr-1oc0AuyyIf2m2gl648Ija45WFjPlo_hUKHDNjl3E4DDvkW9ANOpiZdsfeXElzPZY31UR2YaQ86QBOwRYtPc3F9hw9tLlqDJGlWYlNCNHm2ImI3ZwZp6onz0rxxzw6GRNzntWVPAxCUBDxvnvC1FpDJNEa8pNIzD5K7p9OR6s2g3Zn8T0S82f-TBp5t0eWJDkCt-4jIfW1ZEHa1gUqPgA9lwCqhIzE3rGnlTc7TewrAjyo-VrYhYfRt3TE9U",
    rating: 4.6,
    reviewsCount: 15,
    region: "Bishnupur, West Bengal"
  },
  {
    id: "brass-inlay-box",
    title: "Brass Inlay Walnut Box",
    state: "Uttar Pradesh",
    stateCode: "UP",
    description: "Handcrafted jewelry and keepsake box made from exquisite seasoned walnut wood from Uttar Pradesh, featuring delicate, hand-beaten brass wire floral inlay (Tarkashi work). Rested on polished surfaces.",
    price: 4250,
    category: "Crafts",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoUIFw30KV7yoWZPCG33W2ZrXM6Kz6RI6Mpr174B2OsblOSxvLqu1X2hdWA-v5ivZDFZ-fohjie9S9FHDBJmLLv4rdi6whGXB-s2nFCxz3Tzjitc-IHZiD7SaQZaSyPCGZNZgVeoudSAIYwVdSXET82fQyfEznqcc9gaR7UIZ7huXKBpI1djTDdxcbtte6jW2SQtyjaUk7YbbWxNLocDoL96Kgf7kzswYYbszIRV_ju6DchpMWiNdXBcWP2jSQOtoYj4h3vzujSSc",
    rating: 4.7,
    reviewsCount: 28,
    isTrending: true,
    region: "Saharanpur, Uttar Pradesh"
  },
  {
    id: "pochampally-stole",
    title: "Pochampally Ikat Stole",
    state: "Telangana",
    stateCode: "TG",
    description: "Luxurious, pure silk stole woven by master weavers using the renowned Pochampally double-ikat tie-and-dye method. Showcases blurred edge geometric motifs in royal indigo and crimson accents.",
    price: 2800,
    category: "Apparel",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ3uMX_RVMGA-1zz3GeS5PlBunwZycKqcTXfIAILGsIo_hg3S3NFoi0tEDLkYVTiavEzYK7HTnhqe84sw_vDaibC8LxgGZ7Pb6uh0A2Ip1zl1HUP74yM8QuDLuw60-ogEhYWn4aMVsNeVQGA76y0jY3T53MG-WZ5na_2BkKTmTQMRUZH-SQ9sTJwVK7CwpdcsC9ch3fCGY1d2bYn94IChz1QNFA6RQ-K_Yehmserrpldn6YvQxjMcYOfEWynaqgP0KiT-8IN4-aio",
    rating: 4.9,
    reviewsCount: 19,
    region: "Nalgonda, Telangana"
  },
  {
    id: "dhokra-musician",
    title: "Dhokra Metal Art Piece",
    state: "Chhattisgarh",
    stateCode: "CG",
    description: "An authentic hand-cast Dhokra metal sculpture depicting a traditional tribal musician. Crafted using the ancient non-ferrous lost-wax casting technique that boasts a 4,000-year ancestry in India.",
    price: 8500,
    category: "Decor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS9CUCzrhxmkBJ2elVA41bSiQa5VddmuVa6S_sK8cFKLoHTVZIPnHyt-Fn-WagbUuCdG2pJGTSqbO7066-IZMll5xa7PeDmMdUg8hbbJzEcMaSZsNcEtVNF2gj3AXAbro8-_VMiKRhQscgllPCK0Q61FrQYdowY94t-n063rLMZMaHuH7Q1-dEDljXaGx_ScLkKp3l8l2L1a1KLdUGH9SJxbmOZeSYAwO2cQ-nIjGvPo9lLNSG3fzW3oduFiIRrmZpUNxusX3Hlhs",
    rating: 4.8,
    reviewsCount: 22,
    isLimited: true,
    region: "Bastar, Chhattisgarh"
  },
  {
    id: "mithila-kulhads",
    title: "Mithila Painted Kulhads",
    state: "Bihar",
    stateCode: "BR",
    description: "Set of four beautifully detailed, hand-painted terracotta tea cups displaying auspicious Madhubani fish and leaf clusters in earthy natural mineral tones.",
    price: 1200,
    category: "Pottery",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP8HzaBWUIJuGkmrcvLHWQh3F0JpsixPgbQzYHwU0mo02-WHI1liEWTSU_yEqm11oVpcT9N65BMrkR3vYgBJUyq_cePhOz5npnX-n46vOsxUqFz2uZtynFf3y3HmtaOYienYd8q2sxpALFoM16hyIOtBcdeNPSDOhEUOyU__sKW5kJsTb4xT-0zDoitFZZRhD48AW8b6KxIaT9dNfIhgnPm7XH_gWDUph5DTj8TeRvIt4Kk-QnDOb5rjZEjczq_DTQa6jjae_04BU",
    rating: 4.4,
    reviewsCount: 14,
    region: "Darbhanga, Bihar"
  },
  {
    id: "pashmina-shawl",
    title: "Floral Pashmina Shawl",
    state: "Jammu and Kashmir",
    stateCode: "JK",
    description: "Exquisite hand-spun, hand-woven Pashmina cashmere shawl from Srinagar, featuring masterfully embroidered fine floral motifs using vibrant silk threads. Soft as summer skies.",
    price: 8500,
    category: "Apparel",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaIICrivNFJfI9JW6XOz1JMzl3MkHLYSf2y53hh0beVuMZPsHoKDMIE_cSExbBAuE0Ec2aXGfiI4MzFW5059oUPOVT7waSjJXxCqAQpErvZAyVf2jsAz_GOEKfOqWsg2lUD_hC_8xJSzIV4bhuZ7wa1dpZUBLSOXYv5MFBFYa7uzK8kNff6jmsrMa8g0_pdcJn4jJy8x0evqsajn8YhjQfMW57-v-1PfxsxSJSlhUifv0H9QImHbfcArm3u-1kZbl8vuZMICJZE8M",
    rating: 4.9,
    reviewsCount: 40,
    isHandmade: true,
    region: "Srinagar, Jammu & Kashmir"
  },
  {
    id: "dhokra-figure",
    title: "Ancient Dhokra Figure",
    state: "Odisha",
    stateCode: "OD",
    description: "Cast metal figure of a deity made in Odisha, presenting the typical rustic wire-work patterns and historical weathered bronze patina characteristic of East Indian lost-wax castings.",
    price: 4200,
    category: "Decor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW0_M65GE9ZC8vMrIWFU-SheApmcqLnUHx48JM9By35AHhkUogK0tjQT3L5tsJ_YaESFqO3CMnXzw9KJckYvHLBtTXHrqDwp_oNrz8n9CwC2M_IH8xOvFZHBcoRDEgUZR9ecH-HA_7AaTmi3OMoyGHMaMZYYWKJ_fOAeLWQoTQvSVvnrODOxgGzRDe67QRnREVppjuorz3bB3-AwYKIZReVDPp0gUvpK4vSBqKQEt5NwVm5PMLoBSgQMNIX_M1QUtMAD65BRZEMwM",
    rating: 4.7,
    reviewsCount: 18,
    region: "Mayurbhanj, Odisha"
  },
  {
    id: "blue-pottery-vase",
    title: "Jaipur Blue Pottery Vase",
    state: "Rajasthan",
    stateCode: "RJ",
    description: "Classic hand-thrown Blue Pottery vase from Jaipur adorned with iconic cobalt blue and copper turquoise floral hand-paintings, glazed to a splendid high-glass gloss finish.",
    price: 2800,
    category: "Pottery",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3_084slerOaTMNiaJqB3GxnQM_bs6mXMM76b_E_irmT6y3bsW_Vf3C_t51sNpyoRws47JHXCDEGKycwiGDcYVfk8RPw_I_ObUmfAb-Bd1XgYm4Q1Q-32RyJvcdT02VdTvimUd6ahP3wGJj-adZOSWesKfw9Sxo4sfJEvftYvJRashYBwCel09m_tILw6y5U1_kpWlwupJe8JdwGD_2_ufO4f_RY6NxPrvNRFrrHYBCu9gsPZ2I5KIeEp0LtggV2x91bN_o3leW3s",
    rating: 4.8,
    reviewsCount: 30,
    isTrending: true,
    region: "Jaipur, Rajasthan"
  },
  {
    id: "wall-reliefs",
    title: "Earthy Wall Reliefs",
    state: "Madhya Pradesh",
    stateCode: "MP",
    description: "Gorgeously shaped decorative clay medallions showing traditional folk legends, fired to a deep terracotta color. Ready to add ancient warmth to any wall grid.",
    price: 5900,
    category: "Decor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpgiGeEhaKMoYATqnDzpXVkbqN7LG64hMpT23Nx-kRCGOzinCfUSAE2BbrUz8W7fRCUkllojj8SX6aCKngJ6bhv5rGwVxNZpbju0C4Y1x2TRJy_4Wi4mJco44dTv7EiASBH3s51wOVUOM286SKrAXMYwNxQdLlDzrXuPFFwhXk_ixelcZJFThO8zsz03PsDsw50xFBcu-_JQgAq4xsk-kpgA_ExZoFQ-5Def_uSQG79Hz3_G2hijDYDLlTJ9ZvE0ELWCsuwpnBoxE",
    rating: 4.6,
    reviewsCount: 12,
    region: "Bhopal, Madhya Pradesh"
  },
  {
    id: "handloom-pashmina-terracotta",
    title: "Handloom Pashmina Shawl (Terracotta)",
    state: "Jammu and Kashmir",
    stateCode: "JK",
    description: "Sustainably sheared, exquisitely fine cashmere wool weave, dyed to a gorgeous terracotta shade. Perfectly folded and capturing the heritage of Himalayan villages.",
    price: 12800,
    category: "Apparel",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXPEM6HsCPOsJr-C4sCHUsZ-j1V-8pOPD14KXd5Itv2_iCW4J3OdAANg2nXMOWg6rMNM-ka6W3VG9idjYE_UPAfa0q66A9YBY6EmMFn_97n11VyJmJFJRO5E2GL_K1bHLJaBZLC_aminJOIwzGMsyv3MKF4ZG_VuvWZYa4Hby1ms7J6dTa9qEhtybZ8zSDceUi4BwMut4kbtEX7wKuj4Me0C0GqpZ5B8irLS3MW0On5XsgwN_vQMHJcjcMZ0EdAKGKipe3n0rXoXE",
    rating: 4.9,
    reviewsCount: 35,
    region: "Srinagar, Jammu & Kashmir"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Ananya R.",
    rating: 5,
    text: "The detail is even more breathtaking in person. You can see the texture of the natural pigments. Truly a museum-quality piece.",
    date: "14 May 2026",
    verified: true,
    avatarLetter: "A",
    avatarBg: "bg-secondary-container text-on-secondary-container"
  },
  {
    id: "rev-2",
    author: "Mark S.",
    rating: 5,
    text: "Beautiful storytelling. The packaging was eco-friendly and kept the art safe. A perfect addition to my study.",
    date: "03 April 2026",
    verified: true,
    avatarLetter: "M",
    avatarBg: "bg-tertiary-container text-on-tertiary-container"
  },
  {
    id: "rev-3",
    author: "Priya K.",
    rating: 5,
    text: "Supporting Indian artisans feels rewarding. The authenticity certificate included was a wonderful touch.",
    date: "28 Feb 2026",
    verified: true,
    avatarLetter: "P",
    avatarBg: "bg-primary-container/20 text-primary"
  }
];
