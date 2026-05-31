const WHATSAPP_NUMBER = "51925080132";
const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "1234";
const SUPABASE_URL = "https://scdhvnsxcfzgevahkanw.supabase.co";
const SUPABASE_KEY = "sb_publishable_mG1HU6WIIRA94nEoE1m40Q_AMUYfJrG";
const SUPABASE_MODULE_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const STORAGE_PRODUCTS = "tiendaExpressProducts";
const STORAGE_CART = "tiendaExpressCart";
const STORAGE_THEME = "tiendaExpressTheme";
const STORAGE_ADMIN_SESSION = "tiendaExpressAdminSession";
const STORAGE_PRODUCTS_PER_PAGE = "tiendaExpressProductsPerPage";
const NEW_CATEGORY_VALUE = "__new_category__";
const DEFAULT_PRODUCTS_PER_PAGE = 8;
const IMAGE_BUCKET = "product-images";
let supabaseClient = null;

const seedProducts = [
  {
    id: "p1",
    title: "Audifonos In Ear Transparentes",
    price: 39.9,
    stock: 36,
    category: "Tecnologia",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,wireless,earbuds" },
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?white,wireless,earbuds" },
      { name: "Verde", image: "https://source.unsplash.com/1200x900/?green,wireless,earbuds" },
      { name: "Morado", image: "https://source.unsplash.com/1200x900/?purple,wireless,earbuds" }
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80",
    description: "Audifonos compactos con estuche transparente, Bluetooth y carga rapida."
  },
  {
    id: "p2",
    title: "Mochila Antirrobo USB",
    price: 69.9,
    stock: 28,
    category: "Accesorios",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,backpack" },
      { name: "Gris", image: "https://source.unsplash.com/1200x900/?gray,backpack" },
      { name: "Azul", image: "https://source.unsplash.com/1200x900/?blue,backpack" },
      { name: "Con puerto USB", image: "https://source.unsplash.com/1200x900/?usb,backpack" }
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    description: "Mochila urbana con bolsillos ocultos, puerto lateral y espacio para laptop."
  },
  {
    id: "p3",
    title: "Reloj Smart Deportivo",
    price: 58.9,
    stock: 42,
    category: "Tecnologia",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,smartwatch" },
      { name: "Rosado", image: "https://source.unsplash.com/1200x900/?pink,smartwatch" },
      { name: "Azul", image: "https://source.unsplash.com/1200x900/?blue,smartwatch" },
      { name: "Correa extra", image: "https://source.unsplash.com/1200x900/?watch,strap" }
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    description: "Pantalla tactil, modos deportivos, notificaciones y control de actividad diaria."
  },
  {
    id: "p4",
    title: "Mini Impresora Termica",
    price: 79.9,
    stock: 25,
    category: "Tecnologia",
    variants: [
      { name: "Rosa", image: "https://source.unsplash.com/1200x900/?pink,mini,printer" },
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?white,mini,printer" },
      { name: "Amarillo", image: "https://source.unsplash.com/1200x900/?yellow,mini,printer" },
      { name: "Con 3 rollos", image: "https://source.unsplash.com/1200x900/?thermal,paper,rolls" }
    ],
    featured: true,
    image: "https://source.unsplash.com/1200x900/?mini,thermal,printer",
    description: "Impresora portatil para notas, etiquetas y fotos pequenas desde el celular."
  },
  {
    id: "p5",
    title: "Tira LED RGB Con Control",
    price: 24.9,
    stock: 64,
    category: "Hogar",
    variants: [
      { name: "5 metros", image: "https://source.unsplash.com/1200x900/?rgb,led,strip" },
      { name: "10 metros", image: "https://source.unsplash.com/1200x900/?led,strip,bedroom" },
      { name: "20 metros", image: "https://source.unsplash.com/1200x900/?color,led,lights" },
      { name: "Control 44 teclas", image: "https://source.unsplash.com/1200x900/?led,remote,control" }
    ],
    featured: true,
    image: "https://source.unsplash.com/1200x900/?rgb,led,strip,room",
    description: "Luces RGB para dormitorio o escritorio con control remoto y modos de color."
  },
  {
    id: "p6",
    title: "Bolsa Neceser Transparente TSA",
    price: 12.9,
    stock: 58,
    category: "Viaje",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,toiletry,bag" },
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?clear,toiletry,bag" },
      { name: "Azul", image: "https://source.unsplash.com/1200x900/?blue,toiletry,bag" },
      { name: "Pack x3", image: "https://source.unsplash.com/1200x900/?travel,cosmetic,bags" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?transparent,toiletry,bag",
    description: "Bolsa PVC transparente para cosmeticos, skincare o articulos de viaje."
  },
  {
    id: "p7",
    title: "Set De Brochas Maquillaje",
    price: 29.9,
    stock: 47,
    category: "Belleza",
    variants: [
      { name: "Rosa 12 piezas", image: "https://source.unsplash.com/1200x900/?pink,makeup,brushes" },
      { name: "Negro dorado", image: "https://source.unsplash.com/1200x900/?black,gold,makeup,brush" },
      { name: "Ojos 11 piezas", image: "https://source.unsplash.com/1200x900/?eyeshadow,brushes" },
      { name: "Con estuche", image: "https://source.unsplash.com/1200x900/?makeup,brush,case" }
    ],
    featured: false,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    description: "Brochas suaves para base, sombras, corrector y acabado diario."
  },
  {
    id: "p8",
    title: "Funda Magnetica Transparente",
    price: 18.9,
    stock: 80,
    category: "Celulares",
    variants: [
      { name: "iPhone 15", image: "https://source.unsplash.com/1200x900/?iphone,clear,case" },
      { name: "iPhone 14", image: "https://source.unsplash.com/1200x900/?phone,case,transparent" },
      { name: "Samsung S24", image: "https://source.unsplash.com/1200x900/?samsung,phone,case" },
      { name: "Con soporte", image: "https://source.unsplash.com/1200x900/?phone,case,stand" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?transparent,phone,case",
    description: "Funda TPU transparente con aro magnetico y soporte para ver videos."
  },
  {
    id: "p9",
    title: "Rodillo Quita Pelusa Reutilizable",
    price: 15.9,
    stock: 54,
    category: "Hogar",
    variants: [
      { name: "Grande", image: "https://source.unsplash.com/1200x900/?lint,roller" },
      { name: "Pequeno", image: "https://source.unsplash.com/1200x900/?pet,hair,roller" },
      { name: "Pack x2", image: "https://source.unsplash.com/1200x900/?cleaning,roller" },
      { name: "Para mascotas", image: "https://source.unsplash.com/1200x900/?pet,hair,cleaner" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?lint,roller,pet",
    description: "Removedor lavable para pelo de mascotas, ropa, sofa y asiento de auto."
  },
  {
    id: "p10",
    title: "Organizador Giratorio Cocina",
    price: 21.9,
    stock: 33,
    category: "Hogar",
    variants: [
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?white,kitchen,organizer" },
      { name: "Gris", image: "https://source.unsplash.com/1200x900/?gray,kitchen,organizer" },
      { name: "2 niveles", image: "https://source.unsplash.com/1200x900/?spice,organizer" },
      { name: "Grande", image: "https://source.unsplash.com/1200x900/?pantry,organizer" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?kitchen,organizer",
    description: "Base giratoria para condimentos, botellas, cosmeticos o pequenos frascos."
  },
  {
    id: "p11",
    title: "Humidificador Mini USB",
    price: 22.9,
    stock: 49,
    category: "Hogar",
    variants: [
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?white,humidifier" },
      { name: "Rosa", image: "https://source.unsplash.com/1200x900/?pink,humidifier" },
      { name: "Verde", image: "https://source.unsplash.com/1200x900/?green,humidifier" },
      { name: "Con luz", image: "https://source.unsplash.com/1200x900/?humidifier,light" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?mini,humidifier",
    description: "Humidificador pequeno para escritorio, dormitorio o mesa de noche."
  },
  {
    id: "p12",
    title: "Organizador De Cables Adhesivo",
    price: 8.9,
    stock: 120,
    category: "Tecnologia",
    variants: [
      { name: "Negro x6", image: "https://source.unsplash.com/1200x900/?black,cable,organizer" },
      { name: "Blanco x6", image: "https://source.unsplash.com/1200x900/?white,cable,organizer" },
      { name: "Transparente", image: "https://source.unsplash.com/1200x900/?cable,clips" },
      { name: "Pack x12", image: "https://source.unsplash.com/1200x900/?desk,cable,management" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?cable,organizer",
    description: "Clips adhesivos para ordenar cargadores, audifonos y cables del escritorio."
  },
  {
    id: "p13",
    title: "Bolso Deportivo Con Compartimento",
    price: 49.9,
    stock: 31,
    category: "Viaje",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,gym,bag" },
      { name: "Rosa", image: "https://source.unsplash.com/1200x900/?pink,travel,bag" },
      { name: "Morado", image: "https://source.unsplash.com/1200x900/?purple,duffel,bag" },
      { name: "Con bolsillo humedo", image: "https://source.unsplash.com/1200x900/?weekender,bag" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?travel,duffel,bag",
    description: "Bolso de viaje o gimnasio con bolsillo para ropa humeda y asa comoda."
  },
  {
    id: "p14",
    title: "Botella Motivacional 1L",
    price: 19.9,
    stock: 76,
    category: "Accesorios",
    variants: [
      { name: "Morado degradado", image: "https://source.unsplash.com/1200x900/?purple,water,bottle" },
      { name: "Azul degradado", image: "https://source.unsplash.com/1200x900/?blue,water,bottle" },
      { name: "Rosa", image: "https://source.unsplash.com/1200x900/?pink,water,bottle" },
      { name: "Con pajilla", image: "https://source.unsplash.com/1200x900/?sport,water,bottle" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?motivational,water,bottle",
    description: "Botella con marcador de horas, tapa segura y correa para llevar."
  },
  {
    id: "p15",
    title: "Collar De Acero Minimalista",
    price: 13.9,
    stock: 68,
    category: "Accesorios",
    variants: [
      { name: "Dorado", image: "https://source.unsplash.com/1200x900/?gold,necklace" },
      { name: "Plateado", image: "https://source.unsplash.com/1200x900/?silver,necklace" },
      { name: "Corazon", image: "https://source.unsplash.com/1200x900/?heart,necklace" },
      { name: "Inicial", image: "https://source.unsplash.com/1200x900/?initial,necklace" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?minimalist,necklace",
    description: "Collar simple para uso diario, combinable con outfits casuales o elegantes."
  },
  {
    id: "p16",
    title: "Lentes De Sol Retro",
    price: 17.9,
    stock: 44,
    category: "Accesorios",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,sunglasses" },
      { name: "Carey", image: "https://source.unsplash.com/1200x900/?tortoise,sunglasses" },
      { name: "Transparente", image: "https://source.unsplash.com/1200x900/?clear,sunglasses" },
      { name: "Marron", image: "https://source.unsplash.com/1200x900/?brown,sunglasses" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?retro,sunglasses",
    description: "Lentes livianos con diseno retro y acabado moderno para uso diario."
  },
  {
    id: "p17",
    title: "Cartera Crossbody Casual",
    price: 34.9,
    stock: 37,
    category: "Moda",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,crossbody,bag" },
      { name: "Beige", image: "https://source.unsplash.com/1200x900/?beige,crossbody,bag" },
      { name: "Cafe", image: "https://source.unsplash.com/1200x900/?brown,crossbody,bag" },
      { name: "Con cadena", image: "https://source.unsplash.com/1200x900/?chain,shoulder,bag" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?crossbody,bag",
    description: "Bolso pequeno con correa ajustable, cierre principal y bolsillo interno."
  },
  {
    id: "p18",
    title: "Top Deportivo Sin Costuras",
    price: 26.9,
    stock: 51,
    category: "Moda",
    variants: [
      { name: "Talla S negro", image: "https://source.unsplash.com/1200x900/?black,sports,top" },
      { name: "Talla M rosa", image: "https://source.unsplash.com/1200x900/?pink,sports,top" },
      { name: "Talla L verde", image: "https://source.unsplash.com/1200x900/?green,sports,top" },
      { name: "Talla XL gris", image: "https://source.unsplash.com/1200x900/?gray,sports,top" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?sports,top",
    description: "Top elastico para entrenamiento, yoga o uso casual con tela comoda."
  },
  {
    id: "p19",
    title: "Soporte Plegable Para Celular",
    price: 10.9,
    stock: 90,
    category: "Celulares",
    variants: [
      { name: "Negro", image: "https://source.unsplash.com/1200x900/?black,phone,stand" },
      { name: "Blanco", image: "https://source.unsplash.com/1200x900/?white,phone,stand" },
      { name: "Rosa", image: "https://source.unsplash.com/1200x900/?pink,phone,stand" },
      { name: "Ajustable", image: "https://source.unsplash.com/1200x900/?adjustable,phone,stand" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?phone,stand",
    description: "Base plegable para videollamadas, clases, recetas o ver contenido."
  },
  {
    id: "p20",
    title: "Set De Esponjas De Maquillaje",
    price: 11.9,
    stock: 83,
    category: "Belleza",
    variants: [
      { name: "Rosa x4", image: "https://source.unsplash.com/1200x900/?pink,makeup,sponge" },
      { name: "Multicolor x6", image: "https://source.unsplash.com/1200x900/?makeup,sponge,set" },
      { name: "Con estuche", image: "https://source.unsplash.com/1200x900/?beauty,blender,case" },
      { name: "Mini x8", image: "https://source.unsplash.com/1200x900/?cosmetic,sponge" }
    ],
    featured: false,
    image: "https://source.unsplash.com/1200x900/?makeup,sponge",
    description: "Esponjas suaves para base, corrector y retoques con acabado natural."
  }
];

let products = loadProducts();
let cart = loadCart();
let activeProduct = null;
let activeVariant = null;
let adminVariantDraft = [];
let currentPage = 1;
let committedSearch = "";
let selectedQuantity = 1;
let productsPerPage = loadProductsPerPage();
let mainImageFile = null;
let dataReady = false;

const productGrid = document.querySelector("#productGrid");
const featuredGrid = document.querySelector("#featuredGrid");
const heroShowcase = document.querySelector("#heroShowcase");
const quickCategories = document.querySelector("#quickCategories");
const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const pagination = document.querySelector("#pagination");
const catalogStatus = document.querySelector("#catalogStatus");
const productModal = document.querySelector("#productModal");
const productPreview = document.querySelector("#productPreview");
const imageModal = document.querySelector("#imageModal");
const imageViewerMain = document.querySelector("#imageViewerMain");
const imageViewerThumbs = document.querySelector("#imageViewerThumbs");
const cartModal = document.querySelector("#cartModal");
const cartList = document.querySelector("#cartList");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const cartWhatsapp = document.querySelector("#cartWhatsapp");
const clearCartButton = document.querySelector("#clearCart");
const adminQuickOpen = document.querySelector("#adminQuickOpen");
const adminModal = document.querySelector("#adminModal");
const loginPanel = document.querySelector("#loginPanel");
const adminWorkspace = document.querySelector("#adminWorkspace");
const productForm = document.querySelector("#productForm");
const adminProducts = document.querySelector("#adminProducts");
const themeToggle = document.querySelector("#themeToggle");
const themeLabel = document.querySelector("#themeLabel");
const variantEditorList = document.querySelector("#variantEditorList");
const formImage = document.querySelector("#formImage");
const formImagePreview = document.querySelector("#formImagePreview");
const saveMessage = document.querySelector("#saveMessage");
const editModeBadge = document.querySelector("#editModeBadge");
const formCategory = document.querySelector("#formCategory");
const newCategoryWrap = document.querySelector("#newCategoryWrap");
const newCategoryInput = document.querySelector("#newCategoryInput");
const adminSearchInput = document.querySelector("#adminSearchInput");
const productsPerPageSetting = document.querySelector("#productsPerPageSetting");

setTheme(localStorage.getItem(STORAGE_THEME) || "dark");
productsPerPageSetting.value = String(productsPerPage);
document.querySelector("#cartOpen").addEventListener("click", openCart);
document.querySelector("#heroCart").addEventListener("click", openCart);
adminQuickOpen.addEventListener("click", () => {
  window.history.pushState({}, "", "/admin");
  openAdmin();
});
clearCartButton.addEventListener("click", clearCart);
themeToggle.addEventListener("click", toggleTheme);
document.querySelector("#contactWhatsapp").href = whatsappLink("Hola, quiero hacer una consulta sobre los productos.");

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeDialog(document.querySelector(`#${button.dataset.close}`));
  });
});

[productModal, imageModal, cartModal, adminModal].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  });
});

searchButton.addEventListener("click", applyCatalogSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyCatalogSearch();
  }
});
categoryFilter.addEventListener("change", () => {
  currentPage = 1;
  renderCatalog();
  renderQuickCategories();
});
formCategory.addEventListener("change", syncCategoryCreateField);
adminSearchInput.addEventListener("input", renderAdminProducts);
productsPerPageSetting.addEventListener("change", async () => {
  productsPerPage = Number(productsPerPageSetting.value) || DEFAULT_PRODUCTS_PER_PAGE;
  localStorage.setItem(STORAGE_PRODUCTS_PER_PAGE, String(productsPerPage));
  await saveProductsPerPageSetting();
  currentPage = 1;
  renderCatalog();
});

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = document.querySelector("#username").value.trim();
  const pass = document.querySelector("#password").value;
  const message = document.querySelector("#loginMessage");

  if (await signInAdmin(user, pass, message)) {
    message.textContent = "";
    await showAdminWorkspace();
    return;
  }

  message.textContent = "Correo o contrasena incorrectos, o el usuario no es admin.";
});

document.querySelector("#logoutAdmin").addEventListener("click", async () => {
  localStorage.removeItem(STORAGE_ADMIN_SESSION);
  await supabaseClient?.auth.signOut();
  showAdminLogin();
});

document.querySelector("#newProduct").addEventListener("click", resetProductForm);
document.querySelector("#addVariant").addEventListener("click", () => {
  adminVariantDraft.push({ name: "", image: "" });
  renderVariantEditor();
});

document.querySelector("#formImageFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  mainImageFile = file;
  formImage.value = await fileToDataUrl(file);
  updateMainImagePreview();
});

formImage.addEventListener("input", updateMainImagePreview);

variantEditorList.addEventListener("input", (event) => {
  const row = event.target.closest("[data-variant-index]");
  if (!row) return;
  const index = Number(row.dataset.variantIndex);

  if (event.target.matches("[data-variant-name]")) {
    adminVariantDraft[index].name = event.target.value;
  }

  if (event.target.matches("[data-variant-image]")) {
    adminVariantDraft[index].image = event.target.value;
    const preview = row.querySelector(".variant-thumb img");
    preview.src = event.target.value || formImage.value || seedProducts[0].image;
  }
});

variantEditorList.addEventListener("change", async (event) => {
  if (!event.target.matches("[data-variant-file]")) return;
  const file = event.target.files[0];
  if (!file) return;
  const row = event.target.closest("[data-variant-index]");
  const index = Number(row.dataset.variantIndex);
  adminVariantDraft[index].file = file;
  adminVariantDraft[index].image = await fileToDataUrl(file);
  renderVariantEditor();
});

variantEditorList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-variant]");
  if (!removeButton) return;
  const index = Number(removeButton.dataset.removeVariant);
  adminVariantDraft.splice(index, 1);
  renderVariantEditor();
});

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const id = document.querySelector("#productId").value || `p${Date.now()}`;
    const category = currentFormCategory();
    saveMessage.textContent = "Guardando...";
    const uploadedMainImage = mainImageFile
      ? await uploadProductImage(mainImageFile, `${id}/principal`)
      : formImage.value.trim();
    const uploadedVariants = await Promise.all(adminVariantDraft.map(async (variant, index) => ({
      name: variant.name.trim(),
      image: variant.file
        ? await uploadProductImage(variant.file, `${id}/opcion-${index + 1}`)
        : variant.image.trim()
    })));
    const updatedProduct = {
      id,
      title: document.querySelector("#formTitle").value.trim(),
      price: Number(document.querySelector("#formPrice").value),
      stock: Number(document.querySelector("#formStock").value),
      category,
      variants: uploadedVariants.filter((variant) => variant.name),
      image: uploadedMainImage || seedProducts[0].image,
      description: document.querySelector("#formDescription").value.trim(),
      featured: document.querySelector("#formFeatured").checked
    };

    await saveProductRemote(updatedProduct);
    products = products.some((product) => product.id === id)
      ? products.map((product) => product.id === id ? updatedProduct : product)
      : [updatedProduct, ...products];
    saveProducts();
    resetProductForm();
    renderAll();
    renderAdminProducts();
    saveMessage.textContent = "Cambios guardados.";
    setTimeout(() => {
      saveMessage.textContent = "";
    }, 2400);
  } catch (error) {
    console.error(error);
    saveMessage.textContent = `No se pudo guardar: ${friendlyError(error)}`;
  }
});

function loadProducts() {
  const saved = localStorage.getItem(STORAGE_PRODUCTS);
  if (!saved) {
    return seedProducts.map(normalizeProduct);
  }

  const savedProducts = JSON.parse(saved).map(normalizeProduct);
  const legacyDemo = savedProducts.length <= 5 && savedProducts.every((product, index) => product.id === `p${index + 1}`);

  if (legacyDemo) {
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(seedProducts));
    return seedProducts.map(normalizeProduct);
  }

  const savedIds = new Set(savedProducts.map((product) => product.id));
  const missingSeeds = seedProducts.filter((product) => !savedIds.has(product.id)).map(normalizeProduct);
  return [...savedProducts, ...missingSeeds];
}

function saveProducts() {
  localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
}

async function ensureSupabase() {
  if (supabaseClient) {
    return true;
  }

  try {
    const { createClient } = await import(SUPABASE_MODULE_URL);
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    return true;
  } catch (error) {
    console.warn("No se pudo cargar Supabase", error);
    return false;
  }
}

async function initRemoteData() {
  if (!(await ensureSupabase())) {
    dataReady = true;
    return;
  }

  await restoreAdminSession();
  await loadRemoteSettings();
  await loadRemoteProducts();
  dataReady = true;
}

async function loadRemoteProducts() {
  const { data: productRows, error: productError } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (productError) {
    console.warn("No se pudieron cargar productos de Supabase", productError);
    return;
  }

  if (!productRows.length) {
    return;
  }

  const { data: variantRows, error: variantError } = await supabaseClient
    .from("product_variants")
    .select("*")
    .order("sort_order", { ascending: true });

  if (variantError) {
    console.warn("No se pudieron cargar variantes de Supabase", variantError);
  }

  const variantsByProduct = (variantRows || []).reduce((groups, variant) => {
    groups[variant.product_id] ||= [];
    groups[variant.product_id].push(variant);
    return groups;
  }, {});

  products = productRows.map((product) => remoteProductToLocal({
    ...product,
    product_variants: variantsByProduct[product.id] || []
  }));
  saveProducts();
  renderAll();
  renderAdminProducts();
}

async function loadRemoteSettings() {
  const { data, error } = await supabaseClient
    .from("store_settings")
    .select("value")
    .eq("key", "products_per_page")
    .maybeSingle();

  if (error || !data?.value?.value) {
    return;
  }

  const remoteValue = Number(data.value.value);
  if (![4, 8, 12, 16, 20].includes(remoteValue)) {
    return;
  }

  productsPerPage = remoteValue;
  productsPerPageSetting.value = String(remoteValue);
  localStorage.setItem(STORAGE_PRODUCTS_PER_PAGE, String(remoteValue));
}

async function saveProductsPerPageSetting() {
  if (!(await ensureSupabase()) || !(await hasSession())) {
    return;
  }

  const { error } = await supabaseClient
    .from("store_settings")
    .upsert({
      key: "products_per_page",
      value: { value: productsPerPage },
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.warn("No se pudo guardar el ajuste de paginacion", error);
  }
}

async function signInAdmin(email, password, message) {
  if (!(await ensureSupabase())) {
    message.textContent = "Supabase no cargo. Revisa tu conexion.";
    return false;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    return false;
  }

  if (!(await verifyAdmin())) {
    await supabaseClient.auth.signOut();
    return false;
  }

  message.textContent = "Preparando catalogo...";
  await seedRemoteProductsIfEmpty();
  await loadRemoteProducts();
  localStorage.setItem(STORAGE_ADMIN_SESSION, "true");
  return true;
}

async function restoreAdminSession() {
  if (!supabaseClient || localStorage.getItem(STORAGE_ADMIN_SESSION) !== "true") {
    updateAdminQuickButton(false);
    return;
  }

  if (!(await verifyAdmin())) {
    localStorage.removeItem(STORAGE_ADMIN_SESSION);
    updateAdminQuickButton(false);
    return;
  }

  updateAdminQuickButton(true);
  if (window.location.pathname === "/admin") {
    showAdminWorkspace();
  }
}

async function verifyAdmin() {
  if (!supabaseClient) {
    return false;
  }

  const { data: sessionData } = await supabaseClient.auth.getSession();
  if (!sessionData.session) {
    return false;
  }

  const { data, error } = await supabaseClient.rpc("is_admin");
  return !error && data === true;
}

async function hasSession() {
  const { data } = await supabaseClient.auth.getSession();
  return !!data.session;
}

async function requireAdminSession() {
  if (!(await ensureSupabase())) {
    throw new Error("No se pudo conectar con Supabase.");
  }

  if (!(await hasSession())) {
    throw new Error("Inicia sesion nuevamente en admin.");
  }

  if (!(await verifyAdmin())) {
    throw new Error("Tu usuario no tiene permiso de administrador.");
  }
}

async function saveProductRemote(product) {
  await requireAdminSession();

  const productRow = localProductToRemote(product);
  const { error: productError } = await supabaseClient
    .from("products")
    .upsert(productRow);

  if (productError) {
    saveMessage.textContent = "No se pudo guardar en Supabase.";
    throw productError;
  }

  const { error: deleteError } = await supabaseClient
    .from("product_variants")
    .delete()
    .eq("product_id", product.id);

  if (deleteError) {
    throw deleteError;
  }

  const variants = normalizeVariants(product.variants).map((variant, index) => ({
    product_id: product.id,
    name: variant.name,
    image_url: variant.image,
    sort_order: index
  }));

  if (variants.length) {
    const { error: variantError } = await supabaseClient
      .from("product_variants")
      .insert(variants);

    if (variantError) {
      throw variantError;
    }
  }
}

async function seedRemoteProductsIfEmpty() {
  const { count, error } = await supabaseClient
    .from("products")
    .select("id", { count: "exact", head: true });

  if (error || count > 0) {
    return;
  }

  for (const product of seedProducts) {
    await saveProductRemote(normalizeProduct(product));
  }
}

async function deleteProductRemote(id) {
  await requireAdminSession();

  const { error } = await supabaseClient
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

async function uploadProductImage(file, folder) {
  await requireAdminSession();

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${folder}-${Date.now()}.${extension}`;
  const { error } = await supabaseClient.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: true });

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

function friendlyError(error) {
  const message = error?.message || String(error || "error desconocido");

  if (message.includes("JWT") || message.includes("session") || message.includes("sesion")) {
    return "vuelve a iniciar sesion.";
  }

  if (message.includes("row-level security") || message.includes("permission") || message.includes("permiso")) {
    return "tu usuario no tiene permisos de admin en Supabase.";
  }

  if (message.includes("Failed to fetch") || message.includes("NetworkError") || message.includes("conectar")) {
    return "no hay conexion con Supabase.";
  }

  return message;
}

function localProductToRemote(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    stock: product.stock,
    category: product.category,
    image_url: product.image,
    description: product.description,
    featured: product.featured,
    updated_at: new Date().toISOString()
  };
}

function remoteProductToLocal(product) {
  const variants = [...(product.product_variants || [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((variant) => ({
      name: variant.name,
      image: variant.image_url
    }));

  return normalizeProduct({
    id: product.id,
    title: product.title,
    price: Number(product.price),
    stock: Number(product.stock),
    category: product.category,
    variants,
    featured: product.featured,
    image: product.image_url,
    description: product.description
  });
}

function loadCart() {
  const saved = localStorage.getItem(STORAGE_CART);
  return saved ? JSON.parse(saved) : [];
}

function saveCart() {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

function loadProductsPerPage() {
  const saved = Number(localStorage.getItem(STORAGE_PRODUCTS_PER_PAGE));
  return [4, 8, 12, 16, 20].includes(saved) ? saved : DEFAULT_PRODUCTS_PER_PAGE;
}

function normalizeProduct(product) {
  return {
    ...product,
    variants: normalizeVariants(product.variants)
  };
}

function normalizeVariants(variants = []) {
  return variants.map((variant) => {
    if (typeof variant === "string") {
      return { name: variant, image: "" };
    }

    return {
      name: variant.name || "",
      image: variant.image || ""
    };
  }).filter((variant) => variant.name);
}

function variantNames(product) {
  return normalizeVariants(product.variants).map((variant) => variant.name);
}

function variantImage(product, variant) {
  return variant?.image || product.image;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_THEME, theme);
  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "Claro" : "Oscuro";
  themeToggle.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function money(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function productMessage(product, quantity = 1, variant = null) {
  return [
    "Hola, quiero comprar este producto:",
    `Producto: ${product.title}`,
    `ID: ${product.id}`,
    variant ? `Color/modelo: ${variant.name}` : "",
    `Precio: ${money(product.price)}`,
    `Cantidad: ${quantity}`
  ].filter(Boolean).join("\n");
}

function cartMessage() {
  const lines = cart.map((item, index) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    const variantLine = item.variantName ? ` (${item.variantName})` : "";
    return `${index + 1}. ${product.title}${variantLine} x${item.quantity} - ${money(product.price * item.quantity)}`;
  }).filter(Boolean);

  return [
    "Hola, quiero hacer este pedido:",
    ...lines,
    `Total estimado: ${money(cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0))}`,
    "Por favor confirmame disponibilidad, total final y entrega."
  ].join("\n");
}

function renderAll() {
  renderCategories();
  renderQuickCategories();
  renderAdminCategoryOptions();
  renderHero();
  renderFeatured();
  renderCatalog();
  renderCart();
}

function renderCategories() {
  const categories = ["Todos", ...productCategories()];
  categoryFilter.innerHTML = categories.map((category) => `<option value="${escapeAttribute(category)}">${category}</option>`).join("");
}

function renderQuickCategories() {
  const categories = productCategories();
  quickCategories.innerHTML = [
    `<button class="${categoryFilter.value === "Todos" ? "active" : ""}" type="button" data-quick-category="Todos">Todos</button>`,
    ...categories.map((category) => `
      <button class="${categoryFilter.value === category ? "active" : ""}" type="button" data-quick-category="${escapeAttribute(category)}">${category}</button>
    `)
  ].join("");

  quickCategories.querySelectorAll("[data-quick-category]").forEach((button) => {
    button.addEventListener("click", () => {
      categoryFilter.value = button.dataset.quickCategory;
      currentPage = 1;
      renderCatalog();
      renderQuickCategories();
      document.querySelector("#productos").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function productCategories() {
  return [...new Set(products.map((product) => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function renderAdminCategoryOptions(selectedCategory = formCategory.value) {
  const categories = productCategories();
  formCategory.innerHTML = [
    `<option value="" disabled ${selectedCategory ? "" : "selected"}>Seleccionar categoria</option>`,
    ...categories.map((category) => `<option value="${escapeAttribute(category)}">${category}</option>`),
    `<option value="${NEW_CATEGORY_VALUE}">Crear categoria nueva</option>`
  ].join("");

  if (selectedCategory && categories.includes(selectedCategory)) {
    formCategory.value = selectedCategory;
  }

  syncCategoryCreateField();
}

function syncCategoryCreateField() {
  const isCreating = formCategory.value === NEW_CATEGORY_VALUE;
  newCategoryWrap.classList.toggle("hidden", !isCreating);
  newCategoryInput.required = isCreating;
  if (!isCreating) {
    newCategoryInput.value = "";
  }
}

function currentFormCategory() {
  if (formCategory.value === NEW_CATEGORY_VALUE) {
    return newCategoryInput.value.trim();
  }

  return formCategory.value.trim();
}

function renderHero() {
  const heroProducts = products.filter((product) => product.featured).slice(0, 3);
  const [mainProduct, ...sideProducts] = heroProducts;

  if (!mainProduct) {
    heroShowcase.innerHTML = "";
    return;
  }

  heroShowcase.innerHTML = `
    <article class="showcase-card showcase-main" data-product="${mainProduct.id}">
      <img src="${mainProduct.image}" alt="${mainProduct.title}" loading="lazy">
      <div class="showcase-info">
        <span class="showcase-kicker">Destacado principal</span>
        <strong>${mainProduct.title}</strong>
        <p>${mainProduct.description}</p>
        <span class="price">${money(mainProduct.price)}</span>
      </div>
    </article>
    <div class="showcase-stack">
      ${sideProducts.map((product) => `
        <article class="showcase-card showcase-small" data-product="${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <div class="showcase-info">
            <strong>${product.title}</strong>
            <span>${money(product.price)}</span>
          </div>
        </article>
      `).join("")}
      <div class="hero-mini-panel">
        <span>${products.length}</span>
        <strong>productos activos</strong>
      </div>
    </div>
  `;
  bindProductCards(heroShowcase);
}

function renderFeatured() {
  const featured = products.filter((product) => product.featured).slice(0, 3);
  featuredGrid.innerHTML = featured.map((product) => `
    <article class="featured-card" data-product="${product.id}">
      <div class="image-wrap"><img src="${product.image}" alt="${product.title}" loading="lazy"></div>
      <div class="card-body">
        <strong>${product.title}</strong>
        <span class="price">${money(product.price)}</span>
      </div>
    </article>
  `).join("");
  bindProductCards(featuredGrid);
}

function renderCatalog() {
  const search = committedSearch.toLowerCase();
  const category = categoryFilter.value || "Todos";
  const filtered = products.filter((product) => {
    const text = [product.id, product.title, product.description, product.category, variantNames(product).join(" ")].join(" ").toLowerCase();
    const matchesSearch = !search || text.includes(search);
    const matchesCategory = category === "Todos" || product.category === category;
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * productsPerPage;
  const pageProducts = filtered.slice(start, start + productsPerPage);

  productGrid.innerHTML = pageProducts.map((product) => `
    <article class="product-card" data-product="${product.id}">
      <div class="image-wrap"><img src="${product.image}" alt="${product.title}" loading="lazy"></div>
      <div class="card-body">
        <strong>${product.title}</strong>
        <div class="meta-row">
          <span class="price">${money(product.price)}</span>
          <span>${product.stock} en stock</span>
        </div>
      </div>
    </article>
  `).join("") || `<p class="empty-products">No se encontraron productos.</p>`;
  bindProductCards(productGrid);
  renderPagination(filtered.length, totalPages);
}

function applyCatalogSearch() {
  committedSearch = searchInput.value.trim();
  currentPage = 1;
  renderCatalog();
}

function renderPagination(totalProducts, totalPages) {
  const firstItem = totalProducts ? (currentPage - 1) * productsPerPage + 1 : 0;
  const lastItem = Math.min(currentPage * productsPerPage, totalProducts);
  catalogStatus.textContent = totalProducts
    ? `Mostrando ${firstItem}-${lastItem} de ${totalProducts} productos`
    : "Sin resultados";

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    const current = page === currentPage ? "active" : "";
    return `<button class="${current}" type="button" data-page="${page}" aria-label="Ir a pagina ${page}">${page}</button>`;
  }).join("");

  pagination.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = Number(button.dataset.page);
      renderCatalog();
      document.querySelector("#productos").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function bindProductCards(scope) {
  scope.querySelectorAll("[data-product]").forEach((card) => {
    card.addEventListener("click", () => openProduct(card.dataset.product));
  });
}

function openProduct(id) {
  activeProduct = products.find((product) => product.id === id);
  if (!activeProduct) return;
  activeVariant = null;
  selectedQuantity = 1;
  const variants = normalizeVariants(activeProduct.variants);
  const galleryImages = productGalleryImages(activeProduct);

  productPreview.innerHTML = `
    <button class="preview-image" id="openImageViewer" type="button" aria-label="Ampliar imagen">
      <img id="previewImage" src="${activeProduct.image}" alt="${activeProduct.title}">
    </button>
    <div class="preview-info">
      <p class="eyebrow">${activeProduct.category}</p>
      <h2 id="modalTitle">${activeProduct.title}</h2>
      <span class="product-id-chip">ID: ${activeProduct.id}</span>
      <strong class="price">${money(activeProduct.price)}</strong>
      <p class="preview-description">${activeProduct.description}</p>
      <div class="meta-row">
        <span>Stock disponible</span>
        <strong>${activeProduct.stock}</strong>
      </div>
      ${variants.length ? `<p class="selection-hint" id="selectionHint">Elige color, modelo o talla para continuar.</p>` : ""}
      <div class="variant-list" id="previewVariants">
        ${variants.map((variant, index) => `
          <button type="button" data-preview-variant="${index}">
            ${variant.image ? `<img src="${variant.image}" alt="">` : ""}
            <span>${variant.name}</span>
          </button>
        `).join("")}
      </div>
      <div class="preview-actions">
        <div class="quantity-picker" aria-label="Cantidad">
          <button id="qtyLess" type="button" aria-label="Reducir cantidad">-</button>
          <span id="selectedQty">1</span>
          <button id="qtyMore" type="button" aria-label="Aumentar cantidad">+</button>
        </div>
        <button class="secondary-button" id="modalAddCart" type="button">Agregar al carrito</button>
        <a class="primary-link whatsapp-buy ${variants.length ? "disabled-link" : ""}" id="modalBuyLink" href="${variants.length ? "#" : whatsappLink(productMessage(activeProduct))}" target="_blank" rel="noreferrer" aria-disabled="${variants.length ? "true" : "false"}">
          <svg class="whatsapp-icon" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 2.5a9.2 9.2 0 0 0-7.8 14.1L3 21l4.5-1.2A9.2 9.2 0 1 0 12 2.5Z" />
            <path d="M8.8 7.8c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.5 2.6 1 3.1.8 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4l-1.9-.9c-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-.8-1.9Z" />
          </svg>
          Comprar
        </a>
      </div>
      <p class="cart-feedback" id="cartFeedback" aria-live="polite"></p>
    </div>
  `;
  document.querySelector("#qtyLess").addEventListener("click", () => changeSelectedQuantity(-1));
  document.querySelector("#qtyMore").addEventListener("click", () => changeSelectedQuantity(1));
  document.querySelector("#modalAddCart").addEventListener("click", () => {
    if (variants.length && !activeVariant) {
      showSelectionRequired();
      return;
    }

    addToCart(activeProduct.id, activeVariant?.name || "", selectedQuantity);
    showCartFeedback();
  });
  document.querySelector("#modalBuyLink").addEventListener("click", (event) => {
    if (variants.length && !activeVariant) {
      event.preventDefault();
      showSelectionRequired();
    }
  });
  productPreview.querySelectorAll("[data-preview-variant]").forEach((button) => {
    button.addEventListener("click", () => {
      activeVariant = variants[Number(button.dataset.previewVariant)];
      productPreview.querySelectorAll("[data-preview-variant]").forEach((entry) => entry.classList.remove("selected"));
      button.classList.add("selected");
      document.querySelector("#previewImage").src = variantImage(activeProduct, activeVariant);
      const buyLink = document.querySelector("#modalBuyLink");
      buyLink.href = whatsappLink(productMessage(activeProduct, selectedQuantity, activeVariant));
      buyLink.classList.remove("disabled-link");
      buyLink.setAttribute("aria-disabled", "false");
      const hint = document.querySelector("#selectionHint");
      if (hint) {
        hint.textContent = `Seleccionado: ${activeVariant.name}`;
        hint.classList.remove("needs-selection");
      }
    });
  });
  document.querySelector("#openImageViewer").addEventListener("click", () => {
    openImageViewer(document.querySelector("#previewImage").src, galleryImages);
  });
  productModal.showModal();
}

function changeSelectedQuantity(amount) {
  selectedQuantity = Math.max(1, selectedQuantity + amount);
  document.querySelector("#selectedQty").textContent = selectedQuantity;
  if (!activeProduct) return;
  const buyLink = document.querySelector("#modalBuyLink");
  if (!buyLink || buyLink.getAttribute("aria-disabled") === "true") return;
  buyLink.href = whatsappLink(productMessage(activeProduct, selectedQuantity, activeVariant));
}

function showCartFeedback() {
  const feedback = document.querySelector("#cartFeedback");
  if (!feedback) return;
  feedback.textContent = "Se agrego al carrito.";
  setTimeout(() => {
    feedback.textContent = "";
  }, 1800);
}

function productGalleryImages(product) {
  const images = [
    { label: "Principal", src: product.image },
    ...normalizeVariants(product.variants)
      .filter((variant) => variant.image)
      .map((variant) => ({ label: variant.name, src: variant.image }))
  ];
  return images.filter((image, index, all) => image.src && all.findIndex((entry) => entry.src === image.src) === index);
}

function openImageViewer(selectedSrc, images) {
  const gallery = images.length ? images : [{ label: "Imagen", src: selectedSrc }];
  const current = gallery.find((image) => image.src === selectedSrc) || gallery[0];
  imageViewerMain.src = current.src;
  imageViewerThumbs.innerHTML = gallery.map((image) => `
    <button class="${image.src === current.src ? "selected" : ""}" type="button" data-image-src="${escapeAttribute(image.src)}">
      <img src="${image.src}" alt="">
      <span>${image.label}</span>
    </button>
  `).join("");

  imageViewerThumbs.querySelectorAll("[data-image-src]").forEach((button) => {
    button.addEventListener("click", () => {
      imageViewerMain.src = button.dataset.imageSrc;
      imageViewerThumbs.querySelectorAll("button").forEach((entry) => entry.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  imageModal.showModal();
}

function showSelectionRequired() {
  const hint = document.querySelector("#selectionHint");
  if (!hint) return;
  hint.textContent = "Primero elige color, modelo o talla.";
  hint.classList.add("needs-selection");
}

function addToCart(id, variantName = "", quantity = 1) {
  const product = products.find((entry) => entry.id === id);
  if (!product) return;
  const existing = cart.find((item) => item.id === id && (item.variantName || "") === variantName);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, variantName, quantity });
  }
  saveCart();
  renderCart();
}

function openCart() {
  renderCart();
  cartModal.showModal();
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  clearCartButton.disabled = !cart.length;

  if (!cart.length) {
    cartList.innerHTML = `<p class="muted">Tu carrito esta vacio.</p>`;
    cartTotal.textContent = money(0);
    cartWhatsapp.href = whatsappLink("Hola, quiero consultar por los productos.");
    return;
  }

  cartList.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    const selectedVariant = normalizeVariants(product.variants).find((variant) => variant.name === item.variantName);
    return `
      <div class="cart-item">
        <img src="${variantImage(product, selectedVariant)}" alt="${product.title}">
        <div>
          <strong>${product.title}</strong>
          ${item.variantName ? `<div class="muted">${item.variantName}</div>` : ""}
          <div class="muted">${money(product.price)} c/u</div>
          <div class="cart-line-total">${money(product.price * item.quantity)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-controls">
          <button type="button" data-less="${cartKey(item)}" ${item.quantity <= 1 ? "disabled" : ""}>-</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-more="${cartKey(item)}">+</button>
          </div>
          <button class="remove-cart-item" type="button" data-remove-cart="${cartKey(item)}">Borrar</button>
        </div>
      </div>
    `;
  }).join("");

  cartList.querySelectorAll("[data-less]").forEach((button) => {
    button.addEventListener("click", () => changeQty(button.dataset.less, -1));
  });
  cartList.querySelectorAll("[data-more]").forEach((button) => {
    button.addEventListener("click", () => changeQty(button.dataset.more, 1));
  });
  cartList.querySelectorAll("[data-remove-cart]").forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.removeCart));
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  cartTotal.textContent = money(total);
  cartWhatsapp.href = whatsappLink(cartMessage());
}

function cartKey(item) {
  return `${item.id}::${item.variantName || ""}`;
}

function changeQty(key, amount) {
  cart = cart.map((item) => {
    if (cartKey(item) !== key) return item;
    return { ...item, quantity: Math.max(1, item.quantity + amount) };
  });
  saveCart();
  renderCart();
}

function removeFromCart(key) {
  cart = cart.filter((item) => cartKey(item) !== key);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

async function openAdmin() {
  if (localStorage.getItem(STORAGE_ADMIN_SESSION) === "true" && await verifyAdmin()) {
    await showAdminWorkspace();
  } else {
    showAdminLogin();
  }

  adminModal.showModal();
}

function closeDialog(dialog) {
  if (!dialog?.open) return;
  dialog.close();
  if (dialog === adminModal && window.location.pathname === "/admin") {
    window.history.pushState({}, "", "/");
  }
}

function showAdminWorkspace() {
  loginPanel.classList.add("hidden");
  adminWorkspace.classList.remove("hidden");
  updateAdminQuickButton(true);
  renderAdminProducts();
}

function showAdminLogin() {
  loginPanel.classList.remove("hidden");
  adminWorkspace.classList.add("hidden");
  updateAdminQuickButton(false);
}

function updateAdminQuickButton(isAdmin) {
  adminQuickOpen.classList.toggle("hidden", !isAdmin);
}

function renderAdminProducts() {
  const search = adminSearchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const text = [product.id, product.title, product.category, product.description, variantNames(product).join(" ")].join(" ").toLowerCase();
    return !search || text.includes(search);
  });

  adminProducts.innerHTML = filteredProducts.map((product) => `
    <div class="admin-row">
      <img src="${product.image}" alt="${product.title}">
      <div>
        <strong>${product.title}</strong>
        <div class="product-id-line">ID: ${product.id}</div>
        <div class="muted">${money(product.price)} - ${product.category} - Stock ${product.stock}</div>
        <div class="muted">${variantNames(product).length || "Sin"} opciones de color/modelo</div>
      </div>
      <div class="admin-row-actions">
        <button type="button" data-edit="${product.id}">Editar</button>
        <button type="button" data-delete="${product.id}">Eliminar</button>
      </div>
    </div>
  `).join("") || `<div class="empty-variant-state">No se encontraron productos en el panel.</div>`;

  adminProducts.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => fillProductForm(button.dataset.edit));
  });
  adminProducts.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        saveMessage.textContent = "Eliminando producto...";
        await deleteProductRemote(button.dataset.delete);
        products = products.filter((product) => product.id !== button.dataset.delete);
        cart = cart.filter((item) => item.id !== button.dataset.delete);
        saveProducts();
        saveCart();
        renderAll();
        renderAdminProducts();
        saveMessage.textContent = "Producto eliminado.";
        setTimeout(() => {
          saveMessage.textContent = "";
        }, 1800);
      } catch (error) {
        console.error(error);
        saveMessage.textContent = "No se pudo eliminar. Revisa tu sesion o conexion.";
      }
    });
  });
}

function fillProductForm(id) {
  const product = products.find((entry) => entry.id === id);
  if (!product) return;
  document.querySelector("#productId").value = product.id;
  document.querySelector("#formTitle").value = product.title;
  document.querySelector("#formPrice").value = product.price;
  document.querySelector("#formStock").value = product.stock;
  renderAdminCategoryOptions(product.category);
  formImage.value = product.image;
  document.querySelector("#formDescription").value = product.description;
  document.querySelector("#formFeatured").checked = product.featured;
  adminVariantDraft = normalizeVariants(product.variants).map((variant) => ({ ...variant }));
  editModeBadge.textContent = "Editando producto";
  saveMessage.textContent = "";
  updateMainImagePreview();
  renderVariantEditor();
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetProductForm() {
  productForm.reset();
  mainImageFile = null;
  document.querySelector("#productId").value = "";
  renderAdminCategoryOptions("");
  adminVariantDraft = [];
  editModeBadge.textContent = "Nuevo producto";
  saveMessage.textContent = "";
  updateMainImagePreview();
  renderVariantEditor();
}

function updateMainImagePreview() {
  const src = formImage.value.trim() || seedProducts[0].image;
  formImagePreview.src = src;
}

function renderVariantEditor() {
  if (!adminVariantDraft.length) {
    variantEditorList.innerHTML = `
      <div class="empty-variant-state">
        No hay opciones todavia. Si no agregas colores o modelos, el producto usara solo la imagen principal.
      </div>
    `;
    return;
  }

  variantEditorList.innerHTML = adminVariantDraft.map((variant, index) => `
    <div class="variant-editor-row" data-variant-index="${index}">
      <div class="variant-thumb">
        <img src="${variant.image || formImage.value || seedProducts[0].image}" alt="">
      </div>
      <div class="variant-fields">
        <label>
          Nombre de color/modelo/talla
          <input data-variant-name value="${escapeAttribute(variant.name)}" placeholder="Ej. Negro, Modelo A, Talla M" />
        </label>
        <label>
          Imagen opcional
          <input data-variant-image type="text" value="${escapeAttribute(variant.image)}" placeholder="https://..." />
        </label>
        <label>
          O subir imagen local
          <input data-variant-file type="file" accept="image/*" />
        </label>
      </div>
      <button class="secondary-button" data-remove-variant="${index}" type="button">Quitar</button>
    </div>
  `).join("");
}

function escapeAttribute(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

renderAll();
updateMainImagePreview();
renderVariantEditor();
initRemoteData().then(() => {
  if (window.location.pathname === "/admin") {
    openAdmin();
  }
});
