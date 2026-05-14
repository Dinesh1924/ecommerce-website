window._cartCount = parseInt(localStorage.getItem('she_cart') || '0');
document.getElementById('cartCount').textContent = window._cartCount;

const products = [
  { id:1, name:'Floral Anarkali Kurta', brand:'W', price:799, was:1999, off:60,  img:'src/kurti.webp', bg:'#fde8f0', badge:'BESTSELLER', stars:'★★★★★', reviews:2341 },
  { id:2, name:'Matte Lipstick Set (12 Shades)', brand:'Lakméé', price:499, was:999, off:50, img:'src/lipstick.webp', bg:'#fff0f5', badge:'NEW', stars:'★★★★½', reviews:876 },
  { id:3, name:'Rose Gold Earrings', brand:'Tanishq', price:2499, was:4999, off:50, img:'src/rose gold.webp', bg:'#fffde8', badge:'TRENDING', stars:'★★★★★', reviews:1203 },
  { id:4, name:'Yoga Mat Premium', brand:'Decathlon', price:649, was:1299, off:50, img:'src/yoga mat.webp', bg:'#e8fde8', badge:'SALE', stars:'★★★★☆', reviews:445 },
  { id:5, name:'Samsung Galaxy Buds 3', brand:'Samsung', price:4999, was:9999, off:50, img:'src/samsungbud.webp', bg:'#e8f4fd', badge:'HOT', stars:'★★★★★', reviews:3120 },
  { id:6, name:'Ethnic Block-Print Saree', brand:'Fabindia', price:1299, was:2999, off:57, img:'src/saree.webp', bg:'#fde8f0', badge:'BESTSELLER', stars:'★★★★★', reviews:987 },
  { id:7, name:'Vitamin C Serum 30ml', brand:'Mamaearth', price:349, was:699, off:50, img:'src/vitamin c.webp', bg:'#f0ffe8', badge:'NEW', stars:'★★★★☆', reviews:2234 },
  { id:8, name:'Canvas Tote Bag', brand:'Lavie', price:599, was:1199, off:50, img:'src/tote bag.webp', bg:'#fdf5e8', badge:'TRENDING', stars:'★★★★☆', reviews:556 },
  { id:9, name:'High-Waist Jeans Slim Fit', brand:'Levi\'s', price:1599, was:3499, off:54, img:'src/jean.webp', bg:'#e8eafd', badge:'SALE', stars:'★★★★★', reviews:1678 },
 
   { id:10, name:'Iphone 17 pro', brand:'Hm', price:249000, was:499, off:50, img:'src/iphone.webp', bg:'#fde8fd', badge:'HOT', stars:'★★★★½', reviews:789 },
    { id:11, name:'Lakme kit', brand:'Hm', price:249, was:499, off:50, img:'src/lak.webp', bg:'#fde8fd', badge:'HOT', stars:'★★★★½', reviews:789 },
];

// Load product by URL param
const params = new URLSearchParams(location.search);
const pid = parseInt(params.get('id') || '1');
const prod = products.find(p=>p.id===pid) || products[0];
document.getElementById('prodTitle').textContent = prod.name;
document.getElementById('prodBrand').textContent = prod.brand;
document.getElementById('mainEmoji').innerHTML = `<img src="${prod.img}" class="main-product-img">`;
document.getElementById('mainImg').style.background = prod.bg;
document.getElementById('prodPrice').textContent = '₹'+prod.price.toLocaleString();
document.getElementById('prodWas').textContent = '₹'+prod.was.toLocaleString();
document.getElementById('prodOff').textContent = prod.off+'% off';
document.getElementById('prodBreadName').textContent = prod.name;

// Thumbs
document.getElementById('thumbs').innerHTML = `
  <div class="thumb active" onclick="selectImg(this, '${prod.img}', '${prod.bg}')">
    <img src="${prod.img}" />
  </div>
  <div class="thumb" onclick="selectImg(this, '${prod.img}', '#f9f4f7')">
    <img src="${prod.img}" />
  </div>
  <div class="thumb" onclick="selectImg(this, '${prod.img}', '#f0f8ff')">
    <img src="${prod.img}" />
  </div>
  <div class="thumb" onclick="selectImg(this, '${prod.img}', '#fff8f0')">
    <img src="${prod.img}" />
  </div>
`;

function selectImg(el, img, bg) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('mainImg').innerHTML = `<img src="${img}" class="main-product-img">`;
  document.getElementById('mainImg').style.background = bg;
}

// Related
document.getElementById('relatedGrid').innerHTML = products.map(p=>`
  <div class="prod-card" onclick="location.href='product.html?id=${p.id}'">
    
    <div class="prod-img" style="background:${p.bg}">
      <img src="${p.img}" class="product-image">
      <span class="prod-badge">${p.badge}</span>
    </div>

    <div class="prod-info">
      <div class="prod-brand">${p.brand}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-price">
        <span class="now">₹${p.price.toLocaleString()}</span>
        <span class="was">₹${p.was.toLocaleString()}</span>
        <span class="off">${p.off}% off</span>
      </div>
    </div>

  </div>
`).join('');

let qty = 1;
function changeQty(d){qty=Math.max(1,qty+d);document.getElementById('qty').textContent=qty;}
function selectSize(btn){document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}
function selectColor(el,emoji,bg){document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));el.classList.add('active');document.getElementById('mainEmoji').textContent=emoji;document.getElementById('mainImg').style.background=bg;}

function addToCart(){
  window._cartCount++;
  localStorage.setItem('she_cart', window._cartCount);
  document.getElementById('cartCount').textContent=window._cartCount;
  showToast('🛒 Added to cart successfully!');
}

function toggleWishlist(btn){
  const w=btn.textContent.includes('♡');
  btn.textContent=w?'♥ Wishlisted':'♡ Add to Wishlist';
  btn.style.borderColor=w?'var(--rose)':'var(--border)';
  btn.style.color=w?'var(--rose)':'';
  showToast(w?'💖 Added to Wishlist!':'Removed from Wishlist');
}

function switchTab(id,el){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}