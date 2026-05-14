window._cartCount = parseInt(localStorage.getItem('she_cart') || '0');
document.getElementById('cartCount').textContent = window._cartCount;

const allProducts = [
  {id:1,name:'Floral Anarkali Kurta Set',brand:'W',price:799,was:1999,off:60,img:'src/kurti.webp',bg:'#fde8f0',badge:'BESTSELLER',stars:'★★★★★',rating:5,reviews:2341},
  {id:2,name:'Matte Lipstick Set (12 Shades)',brand:'Lakméé',price:499,was:999,off:50,img:'src/lipstick.webp',bg:'#fff0f5',badge:'NEW',stars:'★★★★½',rating:4.5,reviews:876},
  {id:3,name:'Rose Gold Hoop Earrings',brand:'Tanishq',price:2499,was:4999,off:50,img:'src/rose gold.webp',bg:'#fffde8',badge:'TRENDING',stars:'★★★★★',rating:5,reviews:1203},
  {id:4,name:'Yoga Mat Premium 6mm',brand:'Decathlon',price:649,was:1299,off:50,img:'src/yoga mat.webp',bg:'#e8fde8',badge:'SALE',stars:'★★★★☆',rating:4,reviews:445},
  {id:5,name:'Samsung Galaxy Buds 3',brand:'Samsung',price:4999,was:9999,off:50,img:'src/samsungbud.webp',bg:'#e8f4fd',badge:'HOT',stars:'★★★★★',rating:5,reviews:3120},
  {id:6,name:'Ethnic Block-Print Saree',brand:'Fabindia',price:1299,was:2999,off:57,img:'src/saree.webp',bg:'#fde8f0',badge:'BESTSELLER',stars:'★★★★★',rating:5,reviews:987},
  {id:7,name:'Vitamin C Serum 30ml',brand:'Mamaearth',price:349,was:699,off:50, img:'src/vitamin c.webp',bg:'#f0ffe8',badge:'NEW',stars:'★★★★☆',rating:4,reviews:2234},
  {id:8,name:'Canvas Structured Tote',brand:'Lavie',price:599,was:1199,off:50,img:'src/tote bag.webp',bg:'#fdf5e8',badge:'TRENDING',stars:'★★★★☆',rating:4,reviews:556},
  {id:9,name:'High-Waist Slim Jeans',brand:"Levi's",price:1599,was:3499,off:54,img:'src/jean.webp',bg:'#e8eafd',badge:'SALE',stars:'★★★★★',rating:5,reviews:1678},
  {id:10,name:'Silk Scrunchie Set (5 pcs)',brand:'Hm',price:249,was:499,off:50,img:'src/scrunchis.webp',bg:'#fde8fd',badge:'HOT',stars:'★★★★½',rating:4.5,reviews:789},
  {id:11,name:'Embroidered Kurta Palazzo',brand:'Biba',price:1099,was:2199,off:50,img:'src/plazo.jpeg',bg:'#fff0e8',badge:'NEW',stars:'★★★★☆',rating:4,reviews:412},
  {id:12,name:'Retinol Night Cream',brand:'Olay',price:449,was:899,off:50,img:'src/retinol.webp',bg:'#f0f8ff',badge:'BESTSELLER',stars:'★★★★★',rating:5,reviews:1876},
  {id:13,name:'Statement Necklace Set',brand:'Accessorize',price:699,was:1499,off:53,img:'src/necklace.webp',bg:'#ffe8fd',badge:'TRENDING',stars:'★★★★☆',rating:4,reviews:334},
  {id:14,name:'Running Shoes Lite',brand:'Nike',price:2499,was:4999,off:50,img:'src/shoes.webp',bg:'#e8f0fd',badge:'SALE',stars:'★★★★★',rating:5,reviews:2210},
  {id:15,name:'Boho Maxi Dress',brand:'Zara',price:1999,was:3999,off:50,img:'src/maxi.webp',bg:'#fef9e8',badge:'HOT',stars:'★★★½',rating:3.5,reviews:654},
  {id:16,name:'Hydra Glow Face Mask',brand:'Plum',price:299,was:599,off:50,img:'src/mask.webp',bg:'#e8fef9',badge:'NEW',stars:'★★★★☆',rating:4,reviews:1120},
];

let curPage = 1;
const params = new URLSearchParams(location.search);
const cat = params.get('cat') || '';
const q = params.get('q') || '';

// Set page title
const catTitles = {fashion:"Women's Fashion",beauty:'Beauty & Skincare',electronics:'Electronics',home:'Home & Living',jewellery:'Jewellery',sports:'Sports & Fitness',kids:'Kids',grocery:'Grocery',wellness:'Health & Wellness',trending:'Trending Now',bestsellers:'Best Sellers'};
const title = q ? `Search results for "${q}"` : (catTitles[cat] || 'All Products');
document.getElementById('pageTitle').textContent = title;

// Nav active
if(cat) { const navEl=document.getElementById('nav-'+cat); if(navEl) navEl.classList.add('cur'); }

// Add chips
const chipsEl = document.getElementById('chips');
if(cat) chipsEl.innerHTML += `<div class="chip">${catTitles[cat]||cat} <button onclick="location.href='category.html'">×</button></div>`;
if(q) chipsEl.innerHTML += `<div class="chip">Search: "${q}" <button onclick="location.href='category.html'">×</button></div>`;

function renderProducts(data) {
  document.getElementById('prodGrid').innerHTML = data.map(p => `
    <div class="prod-card">
      <div class="prod-img" style="background:${p.bg}" onclick="location.href='product.html?id=${p.id}'">
         <img src="${p.img}" class="product-image">
        <span class="prod-badge">${p.badge}</span>
        <button class="prod-wish" onclick="event.stopPropagation();wishlist(this)">♡</button>
      </div>
      <div class="prod-info" onclick="location.href='product.html?id=${p.id}'">
        <div class="prod-brand">${p.brand}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-price">
          <span class="now">₹${p.price.toLocaleString()}</span>
          <span class="was">₹${p.was.toLocaleString()}</span>
          <span class="off">${p.off}% off</span>
        </div>
        <div class="prod-stars">${p.stars} <span>(${p.reviews.toLocaleString()})</span></div>
      </div>
      <button class="quick-add" onclick="addToCart('${p.id}')">
      + Add to Cart
    </button>
    </div>
  `).join('');
}

let filteredProducts = [...allProducts];


const perPage=8;
loadProducts();

function loadProducts(){
  const start = (curPage - 1) * perPage;
  const end = start + perPage;

  const pageData = filteredProducts.slice(start, end);

  renderProducts(pageData);
}

function sortProducts(val) {
  let sorted = [...allProducts];
  if(val==='price-asc') sorted.sort((a,b)=>a.price-b.price);
  else if(val==='price-desc') sorted.sort((a,b)=>b.price-a.price);
  else if(val==='rating') sorted.sort((a,b)=>b.reviews-a.reviews);
  else if(val==='discount') sorted.sort((a,b)=>b.off-a.off);
  renderProducts(sorted);
}

function addToCart(id){
  const product = allProducts.find(p => p.id === Number(id));

  if(!product){
    console.error("Product not found ❌");
    return;
  }

  updateCart(product);
}

console.log(JSON.parse(localStorage.getItem('cartItems')))

function wishlist(btn){
  btn.textContent=btn.textContent==='♡'?'♥':'♡';
  btn.style.color=btn.textContent==='♥'?'#e8175d':'';
  showToast(btn.textContent==='♥'?'💖 Wishlisted!':'Removed from Wishlist');
}

function changePage(n){
  const totalPages = Math.ceil(allProducts.length / perPage);

  curPage = Math.max(1, Math.min(totalPages, n));

  document.querySelectorAll('.page-btn').forEach((b,i)=>{
    if(i>0 && i<6) b.classList.toggle('active', i===curPage);
  });

  loadProducts(); 

  window.scrollTo(0,0);
}


function updatePriceLabel(v){
  document.getElementById('priceLabel').textContent =
    'Up to ₹' + parseInt(v).toLocaleString();

  applyFilters(); 
}

const totalPages = Math.ceil(filteredProducts.length / perPage);

function applyFilters(){
  const maxPrice = parseInt(document.getElementById('priceRange').value);

  const ratings = [...document.querySelectorAll('.star-filter input:checked')]
    .map(c => parseFloat(c.value))
    .filter(r => !isNaN(r)); 
  filteredProducts = allProducts.filter(p => {

    const priceOk = p.price <= maxPrice;

    const ratingOk =
      ratings.length === 0 ||
      ratings.some(r => p.rating >= r);

    return priceOk && ratingOk;
  });

  curPage = 1;
  loadProducts();
}

function clearFilters(){document.querySelectorAll('input[type=checkbox]').forEach(c=>c.checked=false);}
function doSearch(){const q=document.getElementById('searchInput').value;if(q.trim())location.href=`category.html?q=${encodeURIComponent(q)}`;}
document.getElementById('searchInput').addEventListener('keypress',e=>{if(e.key==='Enter')doSearch();});
document.getElementById('searchInput').value = q;

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}