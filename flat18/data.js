/* FLAT18 — all site content. Menu = the "Our Menu (Flat18)" PDF on the Linktree, word for word. Prices in RM.
   Photos: assets/photos/food|drinks (Linktree Drive "Menu Picture References"),
   the three after-5pm dishes + kids plates come from the PDF itself, assets/photos/space from @flat18my. */
window.FLAT = {
  name: "FLAT18",
  tagline: "A hug for your tastebuds",
  motto: "Bringing classics back",
  hours: { open: 9, close: 22, brunchEnd: 17, dinnerFrom: 17, label: "9am – 10pm, open daily" },
  address: ["G-01, Bangunan Sterling Group", "Jalan PJU 7/7, Mutiara Damansara", "Petaling Jaya, Selangor"],
  maps: "https://www.google.com/maps/search/?api=1&query=Flat+18+Mutiara+Damansara",
  links: {
    reserve: { label: "Reservations & private room", phone: "012-497 5626", wa: "https://wa.me/60124975626" },
    catering: { label: "Catering & corporate events", phone: "017-637 5626", wa: "https://wa.me/60176375626" },
    /* GrabFood store link: paste it here. While empty, every Order button goes straight to Beep;
       once set, Order opens a small chooser (GrabFood first, then Beep). */
    grab: "",
    order: "https://flat18.beepit.com/ordering/?h=U2FsdGVkX1%2BT00%2BNm5IejsCQmU%2BNBaj32GLcsz1juk4LF6y30s3kGtKRxDhuKU3j&type=delivery&source=SharedLink&utm_source=store_link&utm_medium=share",
    instagram: "https://www.instagram.com/flat18my/",
    tiktok: "https://www.tiktok.com/@flat18my",
    breadbar: "https://www.instagram.com/thebreadbarmy/"
  },

  /* menu sections; `when` is the line printed beside each heading in the PDF */
  menu: [
    { id: "light", title: "Light", groups: [
      { head: "To start", when: "available all day", items: [
        { n: "Toasted Sourdough Slices with Salted Butter", p: 17, img: "food/sourdough-slices",
          extra: [["alternate butter — truffle / kombu", "+ 6.5"], ["add-on butter — truffle / kombu", "+ 8.0"]] },
        { n: "Prawn Toast", p: 26, d: "deep-fried sourdough, tiger prawn mix, crispy millet grains, coriander yoghurt", img: "food/prawn-toast" },
        { n: "Smoked Duck & Pineapple Salsa in Zaalouk Sauce", p: 25, d: "zaalouk sauce, homemade sourdough chips", img: "food/smoked-duck-salsa" },
        { n: "Grilled Chicken Garden Salad", p: 30, d: "mesclun salad, grilled chicken, tahini dressing, pomegranate, millet, avocado, 6-minute egg, grana padano", img: "food/chicken-garden-salad" },
        { n: "Spiced Charred Carrots", p: 26, d: "purple cabbage, kombu-infused ricotta cream, herb crumbs", img: "food/charred-carrots" },
        { n: "Spiced Cauliflower Tempura", p: 24, d: "with sriracha mayo", img: "food/cauliflower-tempura" },
        { n: "Truffle Fries", p: 24, d: "with grana padano, sriracha mayo", img: "food/truffle-fries" },
        { n: "Soup du Jour", p: 22, d: "enquire about our soup of the day", img: "food/soup-tomato" }
      ]}
    ]},
    { id: "hearty", title: "Hearty", groups: [
      { head: "Sourdough sandwiches", when: "available all day", items: [
        { n: "Salt Beef Sandwich", p: 36, d: "with aged cheddar cheese, jalapeño cream, homemade pickles, wholegrain mustard", img: "food/salt-beef-sandwich" },
        { n: "Avocado Spiced Chicken Sandwich", p: 33, d: "roasted spiced chicken, fresh avocado, sun-dried tomato salsa, homemade pickles", img: "food/avocado-spiced-chicken-sandwich" },
        { n: "Tuna Melt Sandwich", p: 31, d: "tuna, capers, dill, aioli, mozzarella cheese, aged cheddar cheese, homemade pickles, wholegrain mustard", img: "food/tuna-melt" }
      ]},
      { head: "Brunch", when: "available from 9am to 5pm", items: [
        { n: "FLAT18 Big Breakfast", p: 48, d: "choice of eggs, red pepper hummus, corn salsa, sautéed mushrooms, crispy potatoes, homemade spiced chicken patty, choice of beef bacon or smoked salmon, sourdough", img: "food/big-breakfast" },
        { n: "Salmon and Avocado Eggs Benedict", p: 38, d: "flaked seared salmon, smashed avocado, sautéed spinach, house-made English muffin, poached eggs, topped with smoky tobiko hollandaise", img: "food/salmon-avocado-benedict" },
        { n: "Turkish Eggs", p: 35, d: "yoghurt, herbs, 6-minute eggs, chilli oil spiced minced chicken, sourdough toast", img: "food/turkish-eggs" },
        { n: "Cluck Cluck", p: 27, d: "brioche bun, chicken patty, homemade hash brown, sriracha mayo, cheddar cheese, sunny-side-up egg, served with side salad",
          extra: [["make it a double! add-on chicken patty", "+ 6.0"]] },
        { n: "Moo Moo", p: 28, d: "brioche bun, beef patty, homemade hash brown, sriracha mayo, cheddar cheese, sunny-side-up egg, served with side salad",
          extra: [["make it a double! add-on beef patty", "+ 6.0"]] }
      ]},
      { head: "Mains", when: "available all day", items: [
        { n: "Seared Chicken", p: 37, d: "pan-seared chicken, spiced green onion salad, buttered mash, sauce Diane, kombu", img: "food/seared-chicken" },
        { n: "Salmon Bowl", p: 36, d: "seared salmon fillet, kombu butter rice, 6-minute egg, charred purple cabbage, shredded kyuri, seaweed, zaalouk mayo", img: "food/salmon-bowl" },
        { n: "Kombu Shoyu Cream Cold Noodles (v)", p: 32, d: "cold capellini, gochujang tempura tofu, sautéed mushrooms, shredded cucumber, scallion, 6-minute egg", img: "food/kombu-cold-noodles" },
        { n: "Herb Crusted Seabass", p: 46, d: "crispy potato wedges, roasted cherry tomatoes, lemon caper zaalouk sauce", img: "food/herb-crusted-seabass" },
        { n: "Steak and Eggs", p: 78, d: "Australian Black Angus striploin, two sunny-side-up eggs, rocket salad, kombu pepper sauce", img: "food/steak-and-eggs",
          extra: [["substitute sunny-side-up eggs for fries", "+ 6.0"]] }
      ]},
      { head: "Pasta", when: "available all day", items: [
        { n: "Chicken Meatball Spaghetti", p: 38, d: "homemade pomodoro sauce, fried chicken meatballs, grana padano", img: "food/chicken-meatball-spaghetti" },
        { n: "Mushroom Pesto Rigatoni", p: 37, d: "homemade pine nut pesto, wild mushroom mix, sun-dried tomato, cream, grana padano", img: "food/mushroom-pesto-rigatoni" },
        { n: "Squid Ink Pasta", p: 55, d: "grilled tiger prawns, seared scallops, spicy miso tomato confit sauce, rocket", img: "food/squid-ink-pasta" },
        { n: "Paccheri with Torched Beef Prosciutto", p: 45, d: "red pepper pesto, stracciatella, roasted cherry tomatoes, herb crumbs, grana padano", img: "food/paccheri-beef-prosciutto" },
        { n: "Nori Butter Capellini", p: 35, d: "tiger prawn tartare, tomato salsa, kombu cream, fresh lime", img: "food/nori-butter-capellini" }
      ]}
    ]},
    { id: "night", title: "After 5pm", night: true, groups: [
      { head: "Dinner specials", when: "available from 5pm onwards", items: [
        { n: "Signature Double Cheeseburger", p: 45, d: "homemade beef patties, brioche bun, aged cheddar cheese, provolone, smoked paprika gherkin mayo, fries", img: "food/double-cheeseburger" },
        { n: "Grilled Aussie Lamb Chops", p: 54, d: "with carrot cumin purée, crispy potato wedges, kombu peppercorn sauce", img: "food/lamb-chops" },
        { n: "Miso Smoked Duck Pasta", p: 37, d: "sautéed smoked duck, mushrooms, miso butter, herb crumbs, chilli oil", img: "food/miso-smoked-duck-pasta" }
      ]}
    ]},
    { id: "sweets", title: "Sweets", groups: [
      { head: "The Bread Bar", when: "available all day", items: [
        { n: "Hot Out of the Oven", d: "discover a spread of freshly baked goods at our counter" }
      ]},
      { head: "House desserts", when: "available all day", items: [
        { n: "French Toast Banana Split", p: 28, d: "brioche bread, cinnamon, caramelised banana, vanilla ice cream, caramel sauce", img: "food/french-toast-banana-split" },
        { n: "Classic Homemade Tiramisu", p: 25, d: "coffee-soaked sponge fingers, mascarpone", img: "food/tiramisu" },
        { n: "Biscoff Affogato", p: 23, d: "vanilla bean ice cream, Biscoff paste, crumble, espresso shot", img: "food/biscoff-affogato" }
      ]}
    ]},
    { id: "kids", title: "Kids", groups: [
      { head: "Kid's plates", when: "available all day", photo: "food/kids-plates", items: [
        { n: "Big Baby Breakfast", p: 21, d: "chicken patty, choice of eggs (scrambled / sunny-side-up / poached), mini croissant, side salad with cherry tomatoes" },
        { n: "Chicken Meatball Spaghetti", p: 22, d: "pomodoro sauce, mini croissant, side salad with cherry tomatoes" },
        { n: "Fish and Chips", p: 24, d: "crispy coated seabass, chips, homemade tartar sauce" }
      ]}
    ]},
    { id: "extras", title: "Add-ons", list: true, groups: [
      { head: "Protein add-ons", items: [["Chicken Patty", 7], ["Grilled Chicken", 10], ["Beef Bacon", 11], ["Smoked Salmon", 11], ["Tiger Prawns (3pcs)", 11], ["Scallops (3pcs)", 13]] },
      { head: "Sides", items: [["Sourdough Slices (4pcs)", 5.5], ["Half Avocado", 6.8], ["French Fries", 6], ["Sautéed Mushrooms", 4.5], ["Mixed Side Salad", 4.5]] },
      { head: "Egg add-ons", items: [["Sunny-Side-Up", 3.5], ["Scrambled", 6.5], ["Poached", 3.5], ["6-Minute", 3.5]] },
      { head: "Cheese", items: [["Cheddar Cheese (Slice)", 3], ["Provolone Cheese (Slice)", 3]] }
    ]},
    { id: "drinks", title: "Drinks", drinks: true, groups: [
      { head: "Classic coffee", items: [
        { n: "Double Espresso", t: "H", p: "8.5" }, { n: "Espresso on the Rocks", t: "C", p: "9.0", img: "drinks/espresso-rocks" },
        { n: "Americano", t: "H / C", p: "10.5 / 11.5", img: "drinks/americano-iced" }, { n: "Latte", t: "H / C", p: "13.5 / 14.5", img: "drinks/latte-hot" },
        { n: "Flat White", t: "H", p: "13.5", img: "drinks/flat-white" }, { n: "Cappuccino", t: "H", p: "13.5", img: "drinks/cappuccino" },
        { n: "Piccolo Latte", t: "H", p: "12.0", img: "drinks/piccolo-latte" }, { n: "Mocha", t: "H / C", p: "14.0 / 15.0", img: "drinks/mocha" },
        { n: "Spanish Latte", t: "H / C", p: "15.5 / 16.5", img: "drinks/spanish-latte" }, { n: "Tiramisu Latte", t: "C", p: "18.5", img: "drinks/tiramisu-latte" },
        { n: "Black Sunrise", t: "C", p: "16.5", img: "drinks/black-sunrise" },
        { n: "Filter Coffee", p: "23.0", d: "enquire about our seasonal bean selection" }
      ], note: [["alt milk: oat / seasonal flavour", "+ 2.0"], ["add-on syrup: hazelnut / vanilla", "+ 2.0"]] },
      { head: "Signature coffee", items: [
        { n: "Salted Caramel Macchiato", t: "H / C", p: "16.0 / 17.0", d: "homemade salted caramel sauce, Maldon sea salt", img: "drinks/salted-caramel-macchiato" },
        { n: "Biscoff Hazelnut Macchiato", t: "H / C", p: "17.5 / 18.5", d: "infused Biscoff milk, hazelnut, espresso", img: "drinks/biscoff-hazelnut-macchiato" },
        { n: "Banana Mochaccino", t: "H / C", p: "17.0 / 18.0", d: "espresso, chocolate, banana", img: "drinks/banana-mochaccino" },
        { n: "Rose Latte", t: "H / C", p: "15.5 / 16.5", d: "rose-infused latte, torched marshmallow", img: "drinks/rose-latte" },
        { n: "Pistachio Latte", t: "H / C", p: "17.5 / 18.5", d: "latte, pistachio-flavoured", img: "drinks/pistachio-latte" },
        { n: "Coconut Coffee", t: "C", p: "16.5", d: "coffee cream, coconut water", img: "drinks/coconut-coffee" }
      ]},
      { head: "Matcha", items: [
        { n: "Matcha", t: "H / C", p: "15.5 / 16.5", img: "drinks/matcha-hot" }, { n: "Dirty Matcha", t: "H / C", p: "16.5 / 17.5", img: "drinks/matcha-iced" },
        { n: "Houjicha", t: "H / C", p: "15.5 / 16.5", img: "drinks/houjicha" }, { n: "Dirty Houjicha", t: "H / C", p: "16.5 / 17.5", img: "drinks/dirty-houjicha" },
        { n: "Matcha Strawberry", t: "C", p: "19.5" }, { n: "Matcha Pistachio", t: "C", p: "18.0" },
        { n: "Matcha Vanilla Biscoff", t: "C", p: "18.0", img: "drinks/matcha-vanilla-biscoff" }, { n: "Matcha Rose Lychee", t: "C", p: "18.0", img: "drinks/matcha-rose-lychee" }
      ]},
      { head: "Special coolers", items: [
        { n: "Orange Mango Mint", t: "C", p: "15.5", d: "fresh orange with mango flavour, fresh mint, sparkling water", img: "drinks/orange-mango-mint" },
        { n: "Honey Yuzu Lemonade", t: "C", p: "16.5", d: "lemonade, fresh mint, sparkling water", img: "drinks/honey-yuzu-lemonade" },
        { n: "Green Apple Assamboi", t: "C", p: "16.5", d: "lemonade, fresh mint, sparkling water", img: "drinks/green-apple-assamboi" },
        { n: "Lemon Mousse Long Black", t: "C", p: "18.0", d: "cold brew, sun-dried orange, lemon mousse", img: "drinks/lemon-mousse-long-black" },
        { n: "Butter Beer", t: "C", p: "17.0", d: "100% non-alcoholic, vanilla soda, homemade butter caramel, light cream", img: "drinks/butter-beer" }
      ]},
      { head: "Chocolate", items: [
        { n: "Classic Chocolate", t: "H / C", p: "14.0 / 15.0", img: "drinks/hot-chocolate" },
        { n: "Tiramisu Chocolate", t: "C", p: "17.5", img: "drinks/tiramisu-chocolate" },
        { n: "Nutty Banana", t: "H / C", p: "16.0 / 17.0", d: "hazelnut, banana, chocolate", img: "drinks/nutty-banana" }
      ]},
      { head: "Tea", items: [
        { n: "English Breakfast", t: "H / C", p: "12.0 / 13.0", img: "drinks/hot-teas" }, { n: "French Earl Grey", t: "H / C", p: "12.0 / 13.0" },
        { n: "Chamomile", t: "H / C", p: "12.0 / 13.0" }, { n: "Peppermint", t: "H / C", p: "12.0 / 13.0" }, { n: "Fruits of Eden", t: "H / C", p: "12.0 / 13.0" }
      ]},
      { head: "Others", items: [
        { n: "Babycino", t: "warm / chilled", p: "8.5 / 8.5" }, { n: "Honey Lemon", t: "H / C", p: "10.5 / 11.5" },
        { n: "Orange Juice", t: "C", p: "13.5" }, { n: "Juice of the Week", t: "C", p: "13.5", d: "enquire with the team" }
      ]},
      { head: "Water", items: [
        { n: "Acqua Panna", t: "mineral", p: "16.0" }, { n: "San Pellegrino", t: "sparkling", p: "16.0" }
      ]}
    ]}
  ],

  /* Events — word for word from the user's PDFs "Flat18 x The Bread Bar" (packages, bookouts, terms) and
     "Mini Pastries Canapes" (catering menu). Media: assets/events (user's Google Photos album "Flat 18 events"). */
  events: {
    /* WhatsApp messages preloaded by every events CTA (paste the user's text between the quotes).
       waPrompt -> reservations line (buffets, plated dinners, bookouts, general event CTAs);
       waPromptCatering -> catering line (canapés & catering CTAs).
       Write {package} where the package name should go (e.g. "Hi FLAT18, I'd like to ask about {package}.");
       it becomes "The Gathering", "Canapés & catering" etc. Without {package} the text is sent as is.
       Empty = WhatsApp opens with no message. */
    waPrompt: "",
    waPromptCatering: "",
    tax: "++ Subject to 10% service charge and 6% SST.",
    buffets: [
      { id: "gathering", kicker: "Buffet menu 01", name: "The Gathering", price: 145,
        blurb: "A balanced buffet for relaxed private gatherings: generous, familiar and easy to enjoy.",
        img: "e47",
        courses: [
          { h: "Starters / salads – 2", items: [["Spiced Cauliflower Tempura"], ["Grilled Chicken Garden Salad"]] },
          { h: "Main protein – choose 1", or: true, items: [["Seared Spiced Chicken", "Buttered mashed potatoes, Diane-style sauce"], ["Herb Crusted Seabass", "Crispy potato wedges, zaalouk sauce"]] },
          { h: "Pasta – choose 1", or: true, items: [["Miso Smoked Duck Pasta"], ["Chicken Meatball Spaghetti"]] },
          { h: "Dessert – 1", items: [["Croissant Butter Pudding", "Chocolate buttons, vanilla custard"]] },
          { h: "Beverage – 1", items: [["Passion Fruit Cooler"]] }
        ] },
      { id: "feast", kicker: "Buffet menu 02", name: "The Feast", price: 205,
        blurb: "A fuller event spread with premium proteins, two mains and additional accompaniments.",
        img: "e0",
        courses: [
          { h: "Bread service", items: [["Assorted Bread Bar Sourdough", "Salted Butter + Truffle Butter"]] },
          { h: "Starters / salads – 2", items: [["Wild Truffle Mushroom Soup"], ["Smoked Duck & Pineapple Salsa", "Sourdough chips"]] },
          { h: "Premium main – choose 1", or: true, items: [["Grilled Lamb Chops", "Crispy potato wedges, kombu peppercorn sauce"], ["Braised Beef Cheeks", "Buttered mashed potatoes, beef jus"]] },
          { h: "Second main – choose 1", or: true, items: [["Seared Spiced Chicken", "Buttered mashed potatoes, Diane-style sauce"], ["Herb Crusted Seabass", "Crispy potato wedges, zaalouk sauce"]] },
          { h: "Vegetables – 2", items: [["Spiced Charred Carrots"], ["Roasted Broccoli & Cauliflower"]] },
          { h: "Pasta – choose 1", or: true, items: [["Mushroom Pesto Rigatoni"], ["Truffle Mushroom Paccheri"]] },
          { h: "Dessert – 1", items: [["Classic Homemade Tiramisu"]] },
          { h: "Beverages – 2", items: [["Sparkling Yuzu Lemonade"], ["Black Coffee", "Hot or iced"]] }
        ] }
    ],
    plated: [
      { id: "table", kicker: "3-course plated dinner 01", tone: "Polished & approachable", name: "The Table", price: 155,
        blurb: "A polished, approachable plated dinner built for private celebrations and corporate evenings.",
        includes: ["Assorted sourdough bread service", "3-course plated dinner", "Choice of 2 mains", "Vegetarian option available", "Sparkling yuzu lemonade + black coffee or tea"],
        courses: [
          { h: "Bread service", items: [["Assorted Sourdough Breads by The Bread Bar", "Served with salted butter"]] },
          { h: "Starter", items: [["Smoked Duck Arancini", "Zaalouk sauce, garlic aioli"]] },
          { h: "Main course – choose 1", or: true, items: [["Roasted Chicken with Mushroom Butter", "Charred asparagus heads, pomme puree, chicken truffle jus"], ["Seared Seabass with Potato Gnocchi", "Grilled tiger prawns, roasted cherry tomatoes, lemon caper herb sauce"]] },
          { h: "Dessert", items: [["Caramelized Banana Cake Slice", "Vanilla bean cream, brown butter crumble"]] },
          { h: "Beverages", items: [["Sparkling Yuzu Lemonade"], ["Black Coffee or Tea"]] }
        ],
        veg: [["Starter", "Corn Arancini", "Zaalouk sauce, garlic aioli, chives"], ["Main", "Miso Roasted Purple Cabbage", "Barley & mushroom risotto, sage butter"]] },
      { id: "occasion", kicker: "3-course plated dinner 02", tone: "Premium & celebratory", name: "The Occasion", price: 215,
        blurb: "A premium plated dinner for celebrations that call for something a little more special.",
        includes: ["Sourdough with truffle & kombu butter", "Premium 3-course plated dinner", "Choice of 2 mains", "Vegetarian option available", "Sparkling yuzu lemonade + black coffee or tea"],
        courses: [
          { h: "Bread service", items: [["Assorted Sourdough Breads by The Bread Bar", "Served with truffle and kombu butter"]] },
          { h: "Starter", items: [["Prawn & Scallop Raviolo", "Confit tomato sauce"]] },
          { h: "Main course – choose 1", or: true, items: [["Seared Salmon", "Brown butter cauliflower, potato gnocchi, miso beurre blanc"], ["Braised Angus Beef Cheek", "Pomme puree, glazed vegetables, kombu beef jus"]] },
          { h: "Dessert", items: [["Citrus Gateaux", "Torched meringue, macerated strawberries, vanilla ice cream"]] },
          { h: "Beverages", items: [["Sparkling Yuzu Lemonade"], ["Black Coffee or Tea"]] }
        ],
        veg: [["Starter", "Spinach & Ricotta Raviolo", "Kombu cream sauce"], ["Main", "Truffle Mushroom Risotto", "Charred asparagus heads, Grana Padano"]] }
    ],
    platedNote: "Menus are designed for plated service and confirmed guest counts. Dietary substitutions and event-specific adjustments can be discussed in advance.",
    bookout: {
      min: "A full restaurant bookout is required for events of 40 guests and above.",
      note: "Minimum spend includes venue space and F&B.",
      slots: ["10.00am – 3.00pm · Lunch event", "11.00am – 4.00pm · Lunch / high tea"],
      dinner: "5.00pm – 10.00pm (setup time included)",
      rows: [
        { days: "Mon – Thu", day: 5500, dinner: 5500 },
        { days: "Fri – Sun & public holidays", day: 9500, dinner: 7000 }
      ]
    },
    terms: [
      ["Menu changes & add-ons", "Feel free to ask us about swaps, upgrades or small changes. We will do our best to accommodate."],
      ["Final guest count", "Your final event price is based on the confirmed number of guests and the selected menu."],
      ["Canapé / mini pastry add-ons", "Canapé and mini pastry selections can be added before lunch or dinner service, or arranged as a reception session. Canapé add-ons can be arranged based on guest count and selected items."]
    ],
    addons: [
      { h: "Mini pastries (savoury)", items: ["Truffle Mushroom Danish", "Beef Bacon & Mushroom Feta Danish", "Marinated Tomato & Basil Danish", "Chicken Chorizo Brioche Roll", "Ham & Cheese Croissant", "Spinach & Ricotta Danish"] },
      { h: "Canapés (savoury)", items: ["Smoked Duck Arancini & Garlic Aioli", "Prawn & Avocado on Toast", "Caramelized Onion & Brie on Rye Crackers", "Smoked Salmon Crostini, Herb Cheese", "Jerk Chicken Skewers", "Smoked Duck & Sweet Potato in Crispy Semolina Ball", "Shrimp Cakes with Ajvar Sauce"] },
      { h: "Mini pastries / desserts (sweet)", items: ["Almond Croissant", "Strawberry Choux", "Matcha Custard Choux", "Pain au Chocolat", "Peach & Vanilla Custard Danish", "Lemon Meringue Danish", "Peanut Butter & Banana Pain au Chocolat", "Vanilla Custard Danish", "Korean Honey Butter Toast", "Flourless Chocolate Cake"] }
    ],
    canapes: {
      intro: "Curated event bites designed for celebrations, launches, meetings and private gatherings.",
      groups: [
        { id: "savoury", h: "Canapés & savoury bites", line: "Thoughtfully crafted small bites for mingling, grazing tables and passed service.", img: "e66", from: true, moq: "MOQ 20 pcs per item · 30 pcs on selected items",
          items: [["Brie & Caramelized Onion on Rye Crackers", 10], ["Beef Bacon Wrapped Enoki", 10], ["Truffle Mushroom Danish", 11], ["Mini Chicken Chorizo Sandwich", 12], ["Avocado Prawn Toast", 12]] },
        { id: "sandwiches", h: "Petit sandwiches", line: "Mini event-sized sandwiches designed for easy eating and bold flavour. Choice of bread: focaccia / sourdough.", img: "petit-sandwiches", moq: "MOQ 20 pcs per flavour",
          items: [["Beef Prosciutto", 15, "pesto, cream cheese, chili oil, rocket"], ["Chicken Ham", 12, "provolone cheese, red pepper pesto, sundried tomatoes, rocket"], ["Corned Beef", 12, "aged cheddar, mustard, pickles"], ["Grilled Chicken & Avocado", 12, "spicy mayo, sundried tomatoes"], ["Smoked Salmon", 14, "dill cream cheese, capers, pickled onion"], ["Tuna Melt", 12, "jalapeños, aged cheddar, pickles"], ["Crispy Halloumi", 13, "grilled bell peppers & zucchini, pesto (vegetarian)"]] },
        { id: "sweet", h: "Mini pastries / sweet", line: "Beautifully crafted sweet bites for dessert tables, tea breaks and celebrations.", img: "e185", moq: "MOQ 20 pcs per item",
          items: [["Blueberry Crumble Cupcakes", 9], ["Mini Strawberry Choux", 10], ["Lemon Meringue Danish", 11], ["Peach & Vanilla Custard Danish", 11], ["Caramelized Banana Cake Slice, Vanilla Cream", 12], ["Lemon Poppy Seed Cake Slice, Lemon Vanilla Cream", 12]] }
      ],
      notes: ["Final selection can be mixed across categories.", "Prices listed are subject to prevailing taxes."]
    },
    /* gallery: e = photo, v = looping clip (muted). tag = filter chip */
    tags: [["setups", "Room setups"], ["corporate", "Corporate"], ["launch", "Brand launches"], ["bites", "Canapés & pastries"], ["plated", "Plated service"], ["outdoor", "Off-site catering"]],
    media: [
      ["v160", "launch", "Launch styling, moss and timber"], ["e1", "setups", "Long tables, set for dinner"], ["e37", "bites", "Pastry table"],
      ["v33", "plated", "Plating for a seated dinner"], ["e12", "corporate", "A morning session at FLAT18"], ["e185", "bites", "Matcha choux"],
      ["e96", "outdoor", "Off-site long table"], ["e165", "launch", "Launch table setting"], ["v75", "bites", "Danish and canapés"],
      ["e3", "setups", "Table setup by the glass"], ["e190", "bites", "Savoury danishes"], ["e116", "outdoor", "Coffee cart at an outdoor event"],
      ["v192", "launch", "Layered coolers for a launch"], ["e147", "corporate", "Evening event, full house"], ["e29", "plated", "Plating in progress"],
      ["e55", "bites", "Beef bacon wrapped enoki"], ["e159", "launch", "Product wall for a launch"], ["v7", "bites", "Bread and canapé spread"],
      ["e133", "setups", "Buffet line, before guests arrive"], ["e99", "outdoor", "Grazing table in the garden"], ["e181", "bites", "Blueberry crumble cupcakes"],
      ["e34", "plated", "Ready for service"], ["e138", "corporate", "Team dinner"], ["v183", "bites", "Matcha choux"],
      ["e176", "launch", "Launch backdrop"], ["e0", "bites", "Bread table with candles"], ["e108", "outdoor", "Live pastry station"],
      ["e15", "corporate", "Workshop seating"], ["v170", "launch", "Launch display"], ["e194", "bites", "Canapé plate"],
      ["e6", "setups", "Long table by the windows"], ["e130", "outdoor", "Fresh coolers"], ["e188", "bites", "Layered event cooler"],
      ["v135", "setups", "Buffet line"], ["e166", "launch", "Launch tablescape"], ["e66", "bites", "Brie & caramelised onion on rye"],
      ["e91", "corporate", "Full restaurant buffet"], ["e123", "outdoor", "Salad station"], ["v45", "bites", "Mini pastry table"],
      ["e149", "corporate", "Dinner, lights down"], ["e196", "bites", "Mini sweets"], ["e136", "setups", "The room, set and waiting"],
      ["v152", "outdoor", "Buffet warmers, outdoors"], ["e21", "setups", "Candles and bread"], ["e156", "launch", "Centrepiece detail"],
      ["e76", "corporate", "A full house"], ["e47", "bites", "Avocado prawn toast"], ["e72", "bites", "Mini danish table"]
    ]
  }
};
