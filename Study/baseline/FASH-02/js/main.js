/* Linden Vael (invented house) - FASH-02 replica. Vanilla JS, inline sample data, no network. */
(function(){'use strict';
var DATA={
 "GARMENTS": [
  {
   "id": "g01",
   "name": "Quayside Overcoat",
   "cat": "outerwear",
   "line": "house",
   "material": "wool",
   "colours": [
    {
     "n": "Slate",
     "h": "#4a5a68"
    },
    {
     "n": "Oat",
     "h": "#d8cfb8"
    }
   ],
   "desc": "A long, quiet overcoat with a deep back vent and a collar that stands or folds. Cut for layering over knitwear.",
   "details": [
    "Single-breasted, five buttons",
    "Two welt pockets, one inside pocket",
    "Half-lined in a plain cotton twill"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g02",
   "name": "Harbour Cord Jacket",
   "cat": "outerwear",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Tar",
     "h": "#2f2f33"
    },
    {
     "n": "Rust",
     "h": "#8a3a24"
    }
   ],
   "desc": "A short work jacket in a heavy cord with patch pockets sized for a notebook and a pencil.",
   "details": [
    "Four patch pockets",
    "Corozo-style buttons",
    "Unlined for easy layering"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g03",
   "name": "Reedbed Mac",
   "cat": "outerwear",
   "line": "house",
   "material": "cotton",
   "colours": [
    {
     "n": "Stone",
     "h": "#c9c0aa"
    },
    {
     "n": "Moss",
     "h": "#5d6b4a"
    }
   ],
   "desc": "A showerproof raincoat in a tightly woven cotton, with a storm flap and a generous hem.",
   "details": [
    "Raglan sleeve",
    "Storm flap at the back",
    "Bound inner seams"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g04",
   "name": "Lantern Chore Coat",
   "cat": "outerwear",
   "line": "field",
   "material": "linen",
   "colours": [
    {
     "n": "Sand",
     "h": "#d6c7a1"
    },
    {
     "n": "Ink",
     "h": "#26324a"
    }
   ],
   "desc": "A boxy chore coat in washed linen. It softens quickly and is meant to be worn hard.",
   "details": [
    "Three patch pockets",
    "Open collar",
    "Washed for a soft hand"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g05",
   "name": "Tallow Shirt",
   "cat": "shirts",
   "line": "house",
   "material": "cotton",
   "colours": [
    {
     "n": "Chalk",
     "h": "#efeadd"
    },
    {
     "n": "Pale blue",
     "h": "#aebfd0"
    }
   ],
   "desc": "The house shirt: a smooth poplin, a modest collar, and a placket stitched with extra care.",
   "details": [
    "Curved hem",
    "Mother-of-pearl-look buttons (resin)",
    "Single-needle seams"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g06",
   "name": "Fennel Stripe Shirt",
   "cat": "shirts",
   "line": "house",
   "material": "linen",
   "colours": [
    {
     "n": "Green stripe",
     "h": "#7c8a5b"
    },
    {
     "n": "Blue stripe",
     "h": "#566b8c"
    }
   ],
   "desc": "A fine-striped linen shirt with a relaxed shoulder. The stripe is printed on the weave, not dyed into it.",
   "details": [
    "Relaxed fit",
    "Stripe matched at the pocket",
    "Garment washed"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g07",
   "name": "Ferry Office Overshirt",
   "cat": "shirts",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Brick",
     "h": "#9a4a35"
    },
    {
     "n": "Ash",
     "h": "#8f918d"
    }
   ],
   "desc": "A brushed-cotton overshirt, warm enough for an October morning on a breakwater.",
   "details": [
    "Brushed face",
    "Chest pockets with flaps",
    "Roll-up sleeve tab"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g08",
   "name": "Moth Grey Popover",
   "cat": "shirts",
   "line": "house",
   "material": "cotton",
   "colours": [
    {
     "n": "Moth grey",
     "h": "#8c8a85"
    },
    {
     "n": "Chalk",
     "h": "#efeadd"
    }
   ],
   "desc": "A short-placket popover shirt with a collar band and a gently rounded hem.",
   "details": [
    "Three-button placket",
    "Rounded hem",
    "Light handle"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g09",
   "name": "Brackwater Crew",
   "cat": "knitwear",
   "line": "house",
   "material": "wool",
   "colours": [
    {
     "n": "Navy",
     "h": "#26324a"
    },
    {
     "n": "Heather",
     "h": "#9a8f9f"
    }
   ],
   "desc": "A close-gauge crew-neck sweater with a ribbed hem that sits where you left it.",
   "details": [
    "Close gauge knit",
    "Ribbed collar, cuffs and hem",
    "Fully fashioned shoulders"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g10",
   "name": "Cairn Roll Neck",
   "cat": "knitwear",
   "line": "house",
   "material": "wool",
   "colours": [
    {
     "n": "Oat",
     "h": "#d8cfb8"
    },
    {
     "n": "Charcoal",
     "h": "#3a3a3c"
    }
   ],
   "desc": "A roll neck in a soft, rounded yarn. The neck folds once and stays folded.",
   "details": [
    "Folded roll neck",
    "Soft rounded yarn",
    "Plain ribbed edges"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g11",
   "name": "Pebble Cardigan",
   "cat": "knitwear",
   "line": "field",
   "material": "wool",
   "colours": [
    {
     "n": "Pebble",
     "h": "#a39e92"
    },
    {
     "n": "Forest",
     "h": "#344a3a"
    }
   ],
   "desc": "A chunky cardigan with horn-look toggles, built as an outer layer for cold workshops.",
   "details": [
    "Chunky rib stitch",
    "Toggle fastening",
    "Deep patch pockets"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g12",
   "name": "Driftline Vest",
   "cat": "knitwear",
   "line": "field",
   "material": "wool",
   "colours": [
    {
     "n": "Driftwood",
     "h": "#b7a98f"
    },
    {
     "n": "Slate",
     "h": "#4a5a68"
    }
   ],
   "desc": "A sleeveless knit with a V neck, meant to be worn over a shirt or on its own.",
   "details": [
    "V neck",
    "Ribbed armholes",
    "Light weight"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Across chest",
     "Length",
     "Sleeve"
    ],
    "rows": [
     [
      "1",
      "54",
      "70",
      "61"
     ],
     [
      "2",
      "57",
      "73",
      "63"
     ],
     [
      "3",
      "60",
      "76",
      "65"
     ]
    ]
   }
  },
  {
   "id": "g13",
   "name": "Gantry Trouser",
   "cat": "trousers",
   "line": "house",
   "material": "wool",
   "colours": [
    {
     "n": "Charcoal",
     "h": "#3a3a3c"
    },
    {
     "n": "Mid grey",
     "h": "#7b7d80"
    }
   ],
   "desc": "A pleated trouser in a worsted flannel, with a high rise and a straight leg.",
   "details": [
    "Single pleat",
    "Side adjusters",
    "Straight leg"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Waist",
     "Inside leg",
     "Hem"
    ],
    "rows": [
     [
      "1",
      "37",
      "76",
      "20"
     ],
     [
      "2",
      "40",
      "78",
      "21"
     ],
     [
      "3",
      "43",
      "80",
      "22"
     ]
    ]
   }
  },
  {
   "id": "g14",
   "name": "Sedge Pleat Trouser",
   "cat": "trousers",
   "line": "house",
   "material": "linen",
   "colours": [
    {
     "n": "Sedge",
     "h": "#9b9a6a"
    },
    {
     "n": "Natural",
     "h": "#e2d9c3"
    }
   ],
   "desc": "A wide linen trouser with a double pleat, light enough for the warmer weeks of the year.",
   "details": [
    "Double pleat",
    "Wide leg",
    "Garment washed"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Waist",
     "Inside leg",
     "Hem"
    ],
    "rows": [
     [
      "1",
      "37",
      "76",
      "20"
     ],
     [
      "2",
      "40",
      "78",
      "21"
     ],
     [
      "3",
      "43",
      "80",
      "22"
     ]
    ]
   }
  },
  {
   "id": "g15",
   "name": "Foreshore Work Pant",
   "cat": "trousers",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Tar",
     "h": "#2f2f33"
    },
    {
     "n": "Khaki",
     "h": "#a79b72"
    }
   ],
   "desc": "A straight-cut work pant in a dense drill, with a hammer loop and reinforced knees.",
   "details": [
    "Hammer loop",
    "Double knee",
    "Straight leg"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Waist",
     "Inside leg",
     "Hem"
    ],
    "rows": [
     [
      "1",
      "37",
      "76",
      "20"
     ],
     [
      "2",
      "40",
      "78",
      "21"
     ],
     [
      "3",
      "43",
      "80",
      "22"
     ]
    ]
   }
  },
  {
   "id": "g16",
   "name": "Marl Drawcord Trouser",
   "cat": "trousers",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Marl",
     "h": "#a6a6a1"
    },
    {
     "n": "Navy",
     "h": "#26324a"
    }
   ],
   "desc": "A relaxed drawcord trouser in a cotton jersey with a brushed back.",
   "details": [
    "Drawcord waist",
    "Brushed back",
    "Tapered leg"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Waist",
     "Inside leg",
     "Hem"
    ],
    "rows": [
     [
      "1",
      "37",
      "76",
      "20"
     ],
     [
      "2",
      "40",
      "78",
      "21"
     ],
     [
      "3",
      "43",
      "80",
      "22"
     ]
    ]
   }
  },
  {
   "id": "g17",
   "name": "Tidemark Derby",
   "cat": "footwear",
   "line": "house",
   "material": "leather",
   "colours": [
    {
     "n": "Conker",
     "h": "#5a3a28"
    },
    {
     "n": "Black",
     "h": "#1c1b19"
    }
   ],
   "desc": "A plain-toe lace-up shoe on a stacked sole, built to look better each year.",
   "details": [
    "Stacked sole",
    "Plain toe",
    "Waxed laces"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Sole length",
     "Width"
    ],
    "rows": [
     [
      "1",
      "28",
      "9"
     ],
     [
      "2",
      "29",
      "9.5"
     ],
     [
      "3",
      "30",
      "10"
     ]
    ]
   }
  },
  {
   "id": "g18",
   "name": "Cinder Plimsoll",
   "cat": "footwear",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Cinder",
     "h": "#4b4b4d"
    },
    {
     "n": "Bone",
     "h": "#e5ddcb"
    }
   ],
   "desc": "A canvas plimsoll with a thick rubber foxing and an unlined, airy upper.",
   "details": [
    "Canvas upper",
    "Rubber foxing",
    "Flat lace"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Sole length",
     "Width"
    ],
    "rows": [
     [
      "1",
      "28",
      "9"
     ],
     [
      "2",
      "29",
      "9.5"
     ],
     [
      "3",
      "30",
      "10"
     ]
    ]
   }
  },
  {
   "id": "g19",
   "name": "Ropewalk Tote",
   "cat": "accessories",
   "line": "field",
   "material": "cotton",
   "colours": [
    {
     "n": "Natural",
     "h": "#e2d9c3"
    },
    {
     "n": "Tar",
     "h": "#2f2f33"
    }
   ],
   "desc": "A deep tote in heavy cotton canvas with rope-look handles and a single inside pocket.",
   "details": [
    "Open top",
    "Inside pocket",
    "Reinforced base"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Length"
    ],
    "rows": [
     [
      "One size",
      "34",
      "40"
     ]
    ]
   }
  },
  {
   "id": "g20",
   "name": "Long Wharf Scarf",
   "cat": "accessories",
   "line": "house",
   "material": "wool",
   "colours": [
    {
     "n": "Heather",
     "h": "#9a8f9f"
    },
    {
     "n": "Oat",
     "h": "#d8cfb8"
    }
   ],
   "desc": "A long, light scarf in a brushed wool, finished with a plain hand-rolled hem.",
   "details": [
    "Brushed finish",
    "Hand-rolled hem",
    "Generous length"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Length"
    ],
    "rows": [
     [
      "One size",
      "34",
      "40"
     ]
    ]
   }
  },
  {
   "id": "g21",
   "name": "Bellbuoy Cap",
   "cat": "accessories",
   "line": "field",
   "material": "wool",
   "colours": [
    {
     "n": "Navy",
     "h": "#26324a"
    },
    {
     "n": "Rust",
     "h": "#8a3a24"
    }
   ],
   "desc": "A six-panel cap in a felted wool, with a short peak and a woven back strap.",
   "details": [
    "Six panels",
    "Short peak",
    "Adjustable strap"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Length"
    ],
    "rows": [
     [
      "One size",
      "34",
      "40"
     ]
    ]
   }
  },
  {
   "id": "g22",
   "name": "Salt-Glaze Jug",
   "cat": "home",
   "line": "house",
   "material": "ceramic",
   "colours": [
    {
     "n": "Salt white",
     "h": "#ece6d6"
    },
    {
     "n": "Smoke",
     "h": "#7c8083"
    }
   ],
   "desc": "A hand-sized jug with a pinched lip and a thick, uneven glaze. Each one is slightly different.",
   "details": [
    "Wheel thrown",
    "Pinched lip",
    "Not dishwasher safe"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Height"
    ],
    "rows": [
     [
      "One size",
      "14",
      "18"
     ]
    ]
   }
  },
  {
   "id": "g23",
   "name": "Slipware Bowl Set",
   "cat": "home",
   "line": "house",
   "material": "ceramic",
   "colours": [
    {
     "n": "Ochre",
     "h": "#b78a3c"
    },
    {
     "n": "Cream",
     "h": "#efe6cf"
    }
   ],
   "desc": "A nesting set of three bowls with a brushed slip decoration on the inside.",
   "details": [
    "Set of three",
    "Brushed slip",
    "Stackable"
   ],
   "edit": "Edit 09",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Height"
    ],
    "rows": [
     [
      "One size",
      "14",
      "18"
     ]
    ]
   }
  },
  {
   "id": "g24",
   "name": "Ledger Notebook",
   "cat": "home",
   "line": "house",
   "material": "paper",
   "colours": [
    {
     "n": "Cloth blue",
     "h": "#33496b"
    },
    {
     "n": "Cloth red",
     "h": "#8a3a24"
    }
   ],
   "desc": "A cloth-bound notebook with ruled pages and a sewn spine that lies flat.",
   "details": [
    "Sewn binding",
    "Ruled pages",
    "Cloth cover"
   ],
   "edit": "Edit 08",
   "dims": {
    "cols": [
     "Size",
     "Width",
     "Height"
    ],
    "rows": [
     [
      "One size",
      "14",
      "18"
     ]
    ]
   }
  }
 ],
 "CATS": [
  [
   "outerwear",
   "Outerwear"
  ],
  [
   "shirts",
   "Shirts"
  ],
  [
   "knitwear",
   "Knitwear"
  ],
  [
   "trousers",
   "Trousers"
  ],
  [
   "footwear",
   "Footwear"
  ],
  [
   "accessories",
   "Accessories"
  ],
  [
   "home",
   "Home"
  ]
 ],
 "ARTICLES": [
  {
   "slug": "a-coat-in-three-afternoons",
   "title": "A coat drawn in three afternoons",
   "tag": "making",
   "date": "Sample date 4 March 2031",
   "lede": "The Quayside Overcoat began as a paper pattern pinned to the wall of the Fennimere studio. The first afternoon was spent on the collar alone: how high it should stand, and whether it should fold without being asked.",
   "body": [
    "The second afternoon belonged to the sleeve. Our imaginary pattern cutters like a sleeve that hangs slightly forward, as if the wearer were always about to reach for something. They cut it three times before the pitch felt right.",
    "On the third afternoon the coat was finally hung on the stand. Nothing about it is dramatic, which was the aim. This journal entry belongs to an invented house and describes an invented process."
   ],
   "garments": [
    "g01"
   ]
  },
  {
   "slug": "a-tarn-hollow-shed",
   "title": "Notes from the Tarn Hollow weaving shed",
   "tag": "materials",
   "date": "Sample date 19 February 2031",
   "lede": "Tarn Hollow Mill is an invented place. In this story it sits beside a reservoir that nobody has ever drawn on a map, and its looms are loud enough that visitors learn to read lips.",
   "body": [
    "The mill weaves our imaginary flannel in a plain two-by-two twist, then lets it rest for a week before finishing. We invented the rest because rest is a pleasing idea, not because any real mill does it.",
    "Everything here, from the mill to the reservoir to the weaver we describe as 'the quiet one', is fictional, and no sourcing claim on this page should be read as fact."
   ],
   "garments": [
    "g13",
    "g20"
   ]
  },
  {
   "slug": "a-slate-water-colour-notes",
   "title": "Slate Water: colour notes",
   "tag": "collections",
   "date": "Sample date 8 January 2031",
   "lede": "Edit 09 is built around a colour we call slate water: the grey-blue of a harbour under cloud. We paired it with oat, tar and a single rust accent.",
   "body": [
    "We tested swatches under the studio's north window at three times of day. A colour that survived all three went into the edit. Each swatch carries a written name because a name is easier to remember than a hex code.",
    "The full palette is listed on the campaign page, with names beside every chip so no colour has to be guessed."
   ],
   "garments": [
    "g01",
    "g09"
   ]
  },
  {
   "slug": "a-mending-afternoon",
   "title": "A mending afternoon at the Ropewalk studio",
   "tag": "care",
   "date": "Sample date 22 April 2031",
   "lede": "Twice a year the imagined Ropewalk studio clears its tables and invites anyone with a worn elbow or a loose button to bring a garment in. We have invented this tradition for the demo.",
   "body": [
    "The repair table has a basket of darning mushrooms, a jar of spare toggles and a tin of waxed thread. Nobody is rushed, and the tea is imaginary too.",
    "If you want to see a care routine rather than an event, the care and repair page describes the steps we would suggest for each fabric in the invented range."
   ],
   "garments": [
    "g11",
    "g19"
   ]
  },
  {
   "slug": "a-folded-paper-exhibition",
   "title": "An exhibition of folded paper, imagined",
   "tag": "exhibitions",
   "date": "Sample date 2 June 2031",
   "lede": "The Hall of Small Rooms in Fennimere is an invented gallery. Its imagined spring show was made entirely of folded paper, arranged to resemble the plan of a house with no front door.",
   "body": [
    "Our fictional studio lent the show a few swatches and a long table. Visitors were invited to fold a sample of cloth and compare it with the paper beside it.",
    "None of this happened, and the gallery, the show and the visitors are all part of the replica's invented world."
   ],
   "garments": []
  },
  {
   "slug": "a-deep-pockets",
   "title": "Why the Field line has deep pockets",
   "tag": "collections",
   "date": "Sample date 11 May 2031",
   "lede": "Linden Field is the second, more practical line of the house. Its first rule is that a pocket should hold a notebook, a pencil and something to eat.",
   "body": [
    "We measure pockets against a notebook, a pencil and a sandwich (all invented standards). If any of the three slides out, the pocket is cut again.",
    "You can see the result in the Harbour Cord Jacket and the Ferry Office Overshirt."
   ],
   "garments": [
    "g02",
    "g07"
   ]
  },
  {
   "slug": "a-ceramics-for-the-table",
   "title": "The ceramics we imagined for the table",
   "tag": "home",
   "date": "Sample date 30 July 2031",
   "lede": "The home range began as a joke about dinner. Someone said the studio needed a jug, then a bowl, and then a notebook to write down the dinner menu.",
   "body": [
    "The Salt-Glaze Jug is wheel thrown in our imaginary pottery. The glaze pools in the lower third and no two jugs look the same.",
    "The Slipware Bowl Set is a nest of three, stacked so the brushed decoration on each one is visible from above."
   ],
   "garments": [
    "g22",
    "g23"
   ]
  },
  {
   "slug": "a-reading-the-label",
   "title": "Reading the label: a guide to our stitch marks",
   "tag": "making",
   "date": "Sample date 14 September 2031",
   "lede": "Every garment from the invented house carries a small stitched mark inside the collar or the waistband. This entry explains what the marks mean in our story.",
   "body": [
    "One short stitch means the piece was finished by hand at the end of the line. Two means it was washed after finishing. A cross means it was inspected twice. We made these conventions up.",
    "None of these marks refers to any real standard, scheme or certificate."
   ],
   "garments": [
    "g05",
    "g06"
   ]
  }
 ],
 "TAGS": [
  [
   "making",
   "Making"
  ],
  [
   "materials",
   "Materials"
  ],
  [
   "collections",
   "Collections"
  ],
  [
   "care",
   "Care"
  ],
  [
   "exhibitions",
   "Exhibitions"
  ],
  [
   "home",
   "Home"
  ]
 ],
 "STOCKISTS": [
  {
   "id": "s01",
   "name": "Linden Vael Fennimere Atelier",
   "type": "own",
   "city": "Fennimere",
   "region": "Quarterdeck Region",
   "address": "14 Ferry Lane, Fennimere FQ1 0AA (invented)",
   "phone": "555-0101",
   "hours": "Studio hours, sample data: Tue to Sat, 10:00 to 17:00"
  },
  {
   "id": "s02",
   "name": "Linden Vael Marlow Quay",
   "type": "own",
   "city": "Marlow Quay",
   "region": "Quarterdeck Region",
   "address": "3 Cooper's Stair, Marlow Quay MQ2 0BB (invented)",
   "phone": "555-0102",
   "hours": "Sample hours: Mon to Sat, 10:00 to 18:00"
  },
  {
   "id": "s03",
   "name": "Quillfeather Mercantile",
   "type": "partner",
   "city": "Halden Row",
   "region": "Northmere Province",
   "address": "27 Spindle Street, Halden Row HR3 0CC (invented)",
   "phone": "555-0103",
   "hours": "Sample hours: Wed to Sun, 11:00 to 17:00"
  },
  {
   "id": "s04",
   "name": "Brindle Lane Supply",
   "type": "partner",
   "city": "Tessel Bay",
   "region": "Northmere Province",
   "address": "9 Brindle Lane, Tessel Bay TB4 0DD (invented)",
   "phone": "555-0104",
   "hours": "Sample hours: Mon to Fri, 09:30 to 17:30"
  },
  {
   "id": "s05",
   "name": "Nocturne Haberdash",
   "type": "partner",
   "city": "Orrin Vale",
   "region": "Southreach Province",
   "address": "61 Lamp Court, Orrin Vale OV5 0EE (invented)",
   "phone": "555-0105",
   "hours": "Sample hours: Tue to Sat, 10:30 to 18:00"
  },
  {
   "id": "s06",
   "name": "The Small Rooms Shop",
   "type": "partner",
   "city": "Fennimere",
   "region": "Quarterdeck Region",
   "address": "Hall of Small Rooms, Fennimere FQ1 0FF (invented)",
   "phone": "555-0106",
   "hours": "Sample hours: Thu to Sun, 11:00 to 16:00"
  },
  {
   "id": "s07",
   "name": "Cobble & Crest Outfitters",
   "type": "partner",
   "city": "Wexling",
   "region": "Southreach Province",
   "address": "18 Tannery Walk, Wexling WX6 0GG (invented)",
   "phone": "555-0107",
   "hours": "Sample hours: Mon to Sat, 10:00 to 17:30"
  },
  {
   "id": "s08",
   "name": "Linden Vael Pop-up Reading Room",
   "type": "own",
   "city": "Tessel Bay",
   "region": "Northmere Province",
   "address": "2 Lighthouse Steps, Tessel Bay TB4 0HH (invented)",
   "phone": "555-0108",
   "hours": "Imaginary season only. Sample hours: Fri to Sun, 12:00 to 17:00"
  }
 ],
 "PAGES": [
  [
   "index.html",
   "Home",
   "The invented house of Linden Vael: edits, lookbooks and journal."
  ],
  [
   "collections.html",
   "Collections",
   "Browse all garments, filter by category, line and material."
  ],
  [
   "lookbook.html",
   "House lookbook, Edit 09",
   "Eight plates from the house line."
  ],
  [
   "lookbook-field.html",
   "Field line lookbook, Edit 09",
   "Six plates from the practical second line."
  ],
  [
   "campaign.html",
   "Campaign: Slate Water",
   "The colour story behind Edit 09."
  ],
  [
   "plates.html",
   "Studio plates",
   "Abstract colour studies."
  ],
  [
   "journal.html",
   "Journal",
   "Stories from the invented studio."
  ],
  [
   "about.html",
   "About the house",
   "History of the invented house of Linden Vael."
  ],
  [
   "materials.html",
   "Making and materials",
   "Invented mills, cloth and craft."
  ],
  [
   "care.html",
   "Care and repair",
   "How to care for a garment, in fictional detail."
  ],
  [
   "stockists.html",
   "Stockists",
   "Invented stores and partners."
  ],
  [
   "contact.html",
   "Contact",
   "Contact form demo."
  ],
  [
   "accessibility.html",
   "Accessibility statement",
   "How this demo was built."
  ]
 ],
 "JIMG": [
  {
   "f": "assets/journal-1.svg",
   "alt": "Abstract colour study: a chalk field, a oat curved band, a thin navy vertical line, a sand curved band and a oat circle. Not a photograph."
  },
  {
   "f": "assets/journal-2.svg",
   "alt": "Abstract colour study: a chalk field, a oat curved band, a navy curved band, a heather curved band and a oat circle. Not a photograph."
  },
  {
   "f": "assets/journal-3.svg",
   "alt": "Abstract colour study: a rust field, a thin heather vertical line, a moss circle and a slate curved band. Not a photograph."
  },
  {
   "f": "assets/journal-4.svg",
   "alt": "Abstract colour study: a oat field, a navy rectangle, a slate rectangle and a ochre circle. Not a photograph."
  },
  {
   "f": "assets/journal-5.svg",
   "alt": "Abstract colour study: a slate field, a tar curved band, a thin chalk vertical line and a oat circle. Not a photograph."
  },
  {
   "f": "assets/journal-6.svg",
   "alt": "Abstract colour study: a navy field, a brick circle, a thin stone vertical line and a sand curved band. Not a photograph."
  },
  {
   "f": "assets/journal-7.svg",
   "alt": "Abstract colour study: a stone field, a thin oat vertical line, a sand curved band, a ochre rectangle and a oat rectangle. Not a photograph."
  },
  {
   "f": "assets/journal-8.svg",
   "alt": "Abstract colour study: a brick field, a chalk rectangle, a sand curved band and a ochre rectangle. Not a photograph."
  }
 ]
};
var doc=document, root=doc.documentElement; root.classList.add('js');
function $(s,c){return (c||doc).querySelector(s);} function $$(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s));}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var params=new URLSearchParams(location.search);
var CATN={}; DATA.CATS.forEach(function(c){CATN[c[0]]=c[1];});
var TAGN={}; DATA.TAGS.forEach(function(c){TAGN[c[0]]=c[1];});

/* ---------- navigation: mobile disclosure + dropdowns ---------- */
var toggle=$('#menu-toggle'), menu=$('#site-menu');
function setMenu(open){ if(!toggle)return; toggle.setAttribute('aria-expanded',open); menu.classList.toggle('is-open',open); toggle.textContent=open?'Close menu':'Menu'; }
if(toggle){ toggle.addEventListener('click',function(){setMenu(toggle.getAttribute('aria-expanded')!=='true');}); }
var drops=$$('.drop-btn');
function closeDrops(except){ drops.forEach(function(b){ if(b!==except) b.setAttribute('aria-expanded','false'); }); }
drops.forEach(function(b){ b.addEventListener('click',function(){ var o=b.getAttribute('aria-expanded')==='true'; closeDrops(b); b.setAttribute('aria-expanded',!o); }); });
doc.addEventListener('click',function(e){ if(!e.target.closest('.has-drop')) closeDrops(); });
doc.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  var open=drops.filter(function(b){return b.getAttribute('aria-expanded')==='true';});
  if(open.length){ var b=open[0]; closeDrops(); b.focus(); return; }
  if(toggle && toggle.getAttribute('aria-expanded')==='true' && getComputedStyle(toggle).display!=='none'){ setMenu(false); toggle.focus(); }
});
doc.addEventListener('focusin',function(e){ if(!e.target.closest('.has-drop')) closeDrops(); });

/* ---------- garment visuals (abstract silhouettes, inline SVG) ---------- */
var SIL={outerwear:'M30 10L45 6H55L70 10L92 30L84 42L72 34V112H28V34L16 42L8 30Z',
 shirts:'M32 10L44 8Q50 16 56 8L68 10L92 28L84 44L72 38V100H28V38L16 44L8 28Z',
 knitwear:'M32 10L44 8Q50 14 56 8L68 10L92 30L84 46L72 40V104H28V40L16 46L8 30Z',
 trousers:'M30 8H70L76 112H54L50 40L46 112H24Z',
 footwear:'M8 82V58L40 54L56 70L92 76V94H8Z',
 accessories:'M20 42H80V108H20Z M34 42V30Q50 8 66 30V42',
 home:'M34 20H66Q74 30 74 60Q74 100 62 108H38Q26 100 26 60Q26 30 34 20Z'};
function silhouette(cat,hex,label){
  var attrs=label?'role="img" aria-label="'+esc(label)+'"':'aria-hidden="true" focusable="false"';
  return '<svg class="sil" viewBox="0 0 100 120" '+attrs+'><rect width="100" height="120" fill="#efeadd"/><path d="'+SIL[cat]+'" fill="'+hex+'" stroke="#1c1b19" stroke-width="2" stroke-linejoin="round" fill-rule="evenodd"/></svg>';
}
function card(g){
  return '<li class="card" data-component="garment-card" data-id="'+g.id+'"><a class="card-media" href="garment.html?id='+g.id+'" tabindex="-1" aria-hidden="true">'+silhouette(g.cat,g.colours[0].h)+'</a><div class="card-body"><p class="eyebrow">'+esc(CATN[g.cat])+' / '+(g.line==='house'?'House line':'Field line')+'</p><h3><a href="garment.html?id='+g.id+'">'+esc(g.name)+'</a></h3><p>'+g.colours.map(function(c){return esc(c.n);}).join(', ')+' / '+esc(g.material)+'</p></div></li>';
}

/* ---------- home: featured ---------- */
var feat=$('[data-render="featured"]');
if(feat) feat.innerHTML=['g01','g09','g05','g22'].map(function(id){return card(DATA.GARMENTS.filter(function(g){return g.id===id;})[0]);}).join('');

/* ---------- collections filter ---------- */
var gl=$('#garment-list');
if(gl){
  var ff=$('#filter-form');
  var pre=params.get('cat'); if(pre){ $$('input[name=cat]',ff).forEach(function(i){ if(i.value===pre) i.checked=true; }); }
  var run=function(){
    var q=$('#f-q').value.trim().toLowerCase();
    var vals=function(n){return $$('input[name='+n+']:checked',ff).map(function(i){return i.value;});};
    var cat=vals('cat'), line=vals('line'), mat=vals('mat'), sort=$('#f-sort').value;
    var r=DATA.GARMENTS.filter(function(g){
      return (!cat.length||cat.indexOf(g.cat)>-1)&&(!line.length||line.indexOf(g.line)>-1)&&(!mat.length||mat.indexOf(g.material)>-1)&&(!q||g.name.toLowerCase().indexOf(q)>-1);
    });
    r.sort(function(a,b){ if(sort==='edit'){ return b.edit.localeCompare(a.edit)||a.name.localeCompare(b.name);} var c=a.name.localeCompare(b.name); return sort==='name-desc'?-c:c; });
    gl.innerHTML=r.map(card).join('');
    $('#empty-state').hidden=r.length>0; gl.hidden=r.length===0;
    $('#result-count').textContent=r.length+' of '+DATA.GARMENTS.length+' garments shown';
  };
  ff.addEventListener('input',run); ff.addEventListener('change',run); ff.addEventListener('submit',function(e){e.preventDefault();});
  var reset=function(focusEl){ ff.reset(); run(); focusEl.focus(); };
  $('#filter-reset').addEventListener('click',function(){reset($('#f-q'));});
  $('#empty-reset').addEventListener('click',function(){reset($('#f-q'));});
  run();
}

/* ---------- garment detail ---------- */
var gr=$('#garment-root');
if(gr){
  var g=DATA.GARMENTS.filter(function(x){return x.id===params.get('id');})[0];
  if(!g){
    doc.title='Garment not found | Linden Vael (invented house)';
    gr.innerHTML='<h1 id="g-title">Garment not found</h1><p>No garment in the sample data has that reference.</p><p><a class="btn" href="collections.html">Back to collections</a></p>';
  } else {
    doc.title=g.name+' | Linden Vael (invented house)';
    var bc=$('.breadcrumb li[aria-current]'); if(bc) bc.textContent=g.name;
    var sw=g.colours.map(function(c,i){return '<label class="swatch-opt"><input type="radio" name="colour" value="'+i+'"'+(i===0?' checked':'')+'><span class="chip" style="background:'+c.h+'" aria-hidden="true"></span><span class="swatch-name">'+esc(c.n)+'</span></label>';}).join('');
    var rows=g.dims.rows.map(function(r){return '<tr><th scope="row">'+esc(r[0])+'</th>'+r.slice(1).map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';}).join('');
    var heads=g.dims.cols.slice(1).map(function(c){return '<th scope="col">'+esc(c)+'</th>';}).join('');
    var rel=DATA.GARMENTS.filter(function(x){return x.cat===g.cat&&x.id!==g.id;}).slice(0,3);
    var arts=DATA.ARTICLES.filter(function(a){return a.garments.indexOf(g.id)>-1;});
    gr.innerHTML='<div class="split garment-split"><div class="garment-visual" data-section="garment-image" data-component="product-visual"><div id="g-visual"></div></div><div data-section="garment-info" data-component="product-info"><p class="eyebrow">'+esc(CATN[g.cat])+' / '+(g.line==='house'?'House line':'Field line')+' / '+esc(g.edit)+'</p><h1 id="g-title">'+esc(g.name)+'</h1><p class="lead">'+esc(g.desc)+'</p>'
      +'<fieldset class="swatch-set" data-component="swatch-picker"><legend>Colourway</legend>'+sw+'</fieldset><p id="colour-status" class="hint" role="status" aria-live="polite"></p>'
      +'<h2 class="h-small">Details</h2><ul>'+g.details.map(function(d){return '<li>'+esc(d)+'</li>';}).join('')+'<li>Main material: '+esc(g.material)+'</li></ul>'
      +'<div class="demo-note" data-component="demo-notice"><p><strong>Catalogue only.</strong> There is no price, cart, wishlist or checkout in this demo. See <a href="stockists.html">stockists</a> for the invented places that carry the house.</p></div></div></div>'
      +'<section aria-labelledby="dim-t" data-section="garment-dimensions" data-component="size-table"><h2 id="dim-t">Garment dimensions</h2><p class="hint">Fictional flat dimensions of the garment in centimetres. This is sample data and gives no advice about any person.</p><div class="table-wrap" tabindex="0" role="region" aria-labelledby="dim-t"><table><caption class="vh">Flat dimensions of '+esc(g.name)+' in centimetres</caption><thead><tr><th scope="col">'+esc(g.dims.cols[0])+'</th>'+heads+'</tr></thead><tbody>'+rows+'</tbody></table></div></section>'
      +(arts.length?'<section aria-labelledby="ja-t" data-section="related-journal" data-component="link-list"><h2 id="ja-t">In the journal</h2><ul class="plain-list">'+arts.map(function(a){return '<li><a href="article.html?slug='+a.slug+'">'+esc(a.title)+'</a></li>';}).join('')+'</ul></section>':'')
      +'<section aria-labelledby="rel-t" data-section="related-garments" data-component="card-grid"><h2 id="rel-t">More in '+esc(CATN[g.cat])+'</h2><ul class="card-grid cols-3" role="list">'+rel.map(card).join('')+'</ul></section>';
    var show=function(i){ var c=g.colours[i]; $('#g-visual').innerHTML=silhouette(g.cat,c.h,'Abstract flat silhouette of the '+g.name+' in the '+c.n+' colourway'); $('#colour-status').textContent='Showing colourway: '+c.n+'.'; };
    $$('input[name=colour]',gr).forEach(function(r){ r.addEventListener('change',function(){show(+r.value);}); });
    show(0); $('#colour-status').textContent='';
  }
}

/* ---------- journal list + article ---------- */
var jl=$('#journal-list');
function jcard(a,i){ var im=DATA.JIMG[DATA.ARTICLES.indexOf(a)]; return '<li class="card" data-component="story-card"><a href="article.html?slug='+a.slug+'" tabindex="-1" aria-hidden="true"><img src="'+im.f+'" alt="" width="1200" height="800" loading="lazy"></a><div class="card-body"><p class="eyebrow">'+esc(TAGN[a.tag])+' / '+esc(a.date)+'</p><h2 class="h-card"><a href="article.html?slug='+a.slug+'">'+esc(a.title)+'</a></h2><p>'+esc(a.lede)+'</p></div></li>'; }
if(jl){
  var jr=function(){ var q=$('#j-q').value.trim().toLowerCase(); var t=($('input[name=tag]:checked')||{}).value||'';
    var r=DATA.ARTICLES.filter(function(a){return (!t||a.tag===t)&&(!q||(a.title+' '+a.lede+' '+a.body.join(' ')).toLowerCase().indexOf(q)>-1);});
    jl.innerHTML=r.map(jcard).join(''); jl.hidden=!r.length; $('#j-empty').hidden=r.length>0; $('#j-count').textContent=r.length+' of '+DATA.ARTICLES.length+' entries shown'; };
  var jf=$('#journal-filter'); jf.addEventListener('input',jr); jf.addEventListener('change',jr); jf.addEventListener('submit',function(e){e.preventDefault();});
  $('#j-reset').addEventListener('click',function(){jf.reset();jr();$('#j-q').focus();});
  var pt=params.get('tag'); if(pt){ $$('input[name=tag]',jf).forEach(function(i){if(i.value===pt)i.checked=true;}); }
  jr();
}
var ar=$('#article-root');
if(ar){
  var a=DATA.ARTICLES.filter(function(x){return x.slug===params.get('slug');})[0];
  if(!a){ doc.title='Entry not found | Linden Vael (invented house)'; ar.innerHTML='<h1 id="a-title">Entry not found</h1><p>No journal entry in the sample data has that address.</p><p><a class="btn" href="journal.html">Back to the journal</a></p>'; }
  else { doc.title=a.title+' | Linden Vael (invented house)'; var bc2=$('.breadcrumb li[aria-current]'); if(bc2) bc2.textContent=a.title;
    var im2=DATA.JIMG[DATA.ARTICLES.indexOf(a)], gs=a.garments.map(function(id){var x=DATA.GARMENTS.filter(function(g){return g.id===id;})[0];return '<li><a href="garment.html?id='+id+'">'+esc(x.name)+'</a></li>';}).join('');
    ar.innerHTML='<p class="eyebrow">'+esc(TAGN[a.tag])+' / '+esc(a.date)+'</p><h1 id="a-title">'+esc(a.title)+'</h1><p class="lead">'+esc(a.lede)+'</p><img class="wide" src="'+im2.f+'" alt="'+esc(im2.alt)+'" width="1200" height="800">'+a.body.map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+(gs?'<h2>Garments mentioned</h2><ul class="plain-list">'+gs+'</ul>':'')+'<p class="hint">This entry is invented. Dates, places and people described here are fiction.</p><p><a href="journal.html">Back to all entries</a></p>'; }
}

/* ---------- stockists ---------- */
var sl=$('#stock-list');
if(sl){
  var sr=function(){ var q=$('#st-q').value.trim().toLowerCase(), t=$('#st-t').value;
    var r=DATA.STOCKISTS.filter(function(s){return (!t||s.type===t)&&(!q||(s.name+' '+s.city+' '+s.region).toLowerCase().indexOf(q)>-1);});
    sl.innerHTML=r.map(function(s){return '<li class="stock" data-component="store-card"><h2 class="h-card">'+esc(s.name)+'</h2><p class="eyebrow">'+(s.type==='own'?'House space':'Partner shop')+' / '+esc(s.city)+', '+esc(s.region)+'</p><p>'+esc(s.address)+'<br>Phone '+esc(s.phone)+'<br>'+esc(s.hours)+'</p></li>';}).join('');
    sl.hidden=!r.length; $('#st-empty').hidden=r.length>0; $('#st-count').textContent=r.length+' of '+DATA.STOCKISTS.length+' places shown'; };
  var sf=$('#stock-filter'); sf.addEventListener('input',sr); sf.addEventListener('change',sr); sf.addEventListener('submit',function(e){e.preventDefault();});
  $('#st-reset').addEventListener('click',function(){sf.reset();sr();$('#st-q').focus();});
  sr();
}

/* ---------- search ---------- */
var sli=$('#s-list');
if(sli){
  var q=(params.get('q')||'').trim(); $('#sq').value=q;
  var terms=q.toLowerCase().split(/\s+/).filter(Boolean), res=[];
  if(terms.length){
    var add=function(type,title,href,text){ var hay=(title+' '+text).toLowerCase(); if(terms.every(function(t){return hay.indexOf(t)>-1;})) res.push({type:type,title:title,href:href,text:text}); };
    DATA.GARMENTS.forEach(function(g){add('Garment',g.name,'garment.html?id='+g.id,g.desc+' '+g.material+' '+CATN[g.cat]+' '+g.colours.map(function(c){return c.n;}).join(' '));});
    DATA.ARTICLES.forEach(function(a){add('Journal',a.title,'article.html?slug='+a.slug,a.lede+' '+a.body.join(' '));});
    DATA.STOCKISTS.forEach(function(s){add('Stockist',s.name,'stockists.html',s.city+' '+s.region+' '+s.address);});
    DATA.PAGES.forEach(function(p){add('Page',p[1],p[0],p[2]);});
  }
  sli.innerHTML=res.map(function(r){return '<li class="result" data-component="result-item"><p class="eyebrow">'+r.type+'</p><h2 class="h-card"><a href="'+r.href+'">'+esc(r.title)+'</a></h2><p>'+esc(r.text.slice(0,140))+(r.text.length>140?'...':'')+'</p></li>';}).join('');
  $('#s-empty').hidden=!terms.length||res.length>0;
  $('#s-count').textContent=terms.length?(res.length+' result'+(res.length===1?'':'s')+' for "'+q+'"'):'Enter a term to search.';
}

/* ---------- carousel + lightbox ---------- */
var lb=$('#lightbox'), lbOpener=null;
function openLB(src,alt,cap,opener){ if(!lb)return; lbOpener=opener; $('#lb-img').src=src; $('#lb-img').alt=alt; $('#lb-cap').textContent=cap; if(lb.showModal) lb.showModal(); else lb.setAttribute('open',''); }
if(lb){
  lb.addEventListener('close',function(){ if(lbOpener){ lbOpener.focus(); lbOpener=null; } });
  lb.addEventListener('click',function(e){ if(e.target===lb) lb.close(); });
  $$('[data-lb]').forEach(function(b){ b.addEventListener('click',function(){ openLB(b.dataset.src,b.dataset.alt,b.dataset.cap,b); }); });
}
$$('.carousel').forEach(function(c){
  var slides=$$('.slide',c), thumbs=$$('.thumb',c), cur=0, status=$('[data-status]',c);
  function go(i){ cur=(i+slides.length)%slides.length; slides.forEach(function(s,k){s.hidden=k!==cur;}); thumbs.forEach(function(t,k){ if(k===cur) t.setAttribute('aria-current','true'); else t.removeAttribute('aria-current'); });
    status.textContent='Plate '+(cur+1)+' of '+slides.length; }
  $('[data-prev]',c).addEventListener('click',function(){go(cur-1);});
  $('[data-next]',c).addEventListener('click',function(){go(cur+1);});
  thumbs.forEach(function(t){ t.addEventListener('click',function(){ go(+t.dataset.i); }); });
  $('[data-enlarge]',c).addEventListener('click',function(e){ var im=$('img',slides[cur]); openLB(im.getAttribute('src'),im.alt,$('figcaption',slides[cur]).textContent,e.currentTarget); });
  c.addEventListener('keydown',function(e){ if(e.target.closest('input,select,textarea')) return; if(e.key==='ArrowRight'){e.preventDefault();go(cur+1);} else if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1);} });
  go(0);
});

/* ---------- forms: validation, error summary, focus, simulated success ---------- */
$$('form[data-validate]').forEach(function(f){
  var sum=$('.error-summary',f), ok=$('.form-success',f);
  function msg(el){
    var v=el.value.trim();
    if(el.required&&!v) return 'Enter '+(el.tagName==='SELECT'?'a choice for ':'')+ $('label[for='+el.id+']').firstChild.textContent.trim().toLowerCase()+'.';
    if(el.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address in the form name@example.com.';
    if(el.id==='ct-msg'&&v.length<10) return 'Write at least 10 characters in the message.';
    return '';
  }
  function setErr(el,m){ var p=$('#'+el.id+'-error'); p.hidden=!m; p.textContent=m?('Error: '+m):''; if(m) el.setAttribute('aria-invalid','true'); else el.removeAttribute('aria-invalid'); el.closest('.field').classList.toggle('has-error',!!m); }
  $$('input,select,textarea',f).forEach(function(el){ el.addEventListener('blur',function(){ if(el.getAttribute('aria-invalid')) setErr(el,msg(el)); }); el.addEventListener('input',function(){ if(el.getAttribute('aria-invalid')) setErr(el,msg(el)); }); });
  f.addEventListener('submit',function(e){
    e.preventDefault(); ok.hidden=true; var errs=[];
    $$('input,select,textarea',f).forEach(function(el){ var m=msg(el); setErr(el,m); if(m) errs.push({el:el,m:m}); });
    if(errs.length){
      $('ul',sum).innerHTML=errs.map(function(x){return '<li><a href="#'+x.el.id+'">'+esc(x.m)+'</a></li>';}).join(''); sum.hidden=false; sum.focus();
      $$('a',sum).forEach(function(a,i){ a.addEventListener('click',function(ev){ ev.preventDefault(); errs[i].el.focus(); }); });
    } else {
      sum.hidden=true; f.reset();
      ok.textContent=f.dataset.demo==='newsletter'?'Demo only: this was a simulation. Your address was not stored and no email will be sent.':'Demo only: this was a simulation. Your message was not sent and nobody will reply.';
      ok.hidden=false; ok.focus();
    }
  });
});

})();
