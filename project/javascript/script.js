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
  { id:10, name:'Silk Scrunchie Set (5 pcs)', brand:'Hm', price:249, was:499, off:50, img:'src/scrunchis.webp', bg:'#fde8fd', badge:'HOT', stars:'★★★★½', reviews:789 },
];

function renderProducts(data, containerId) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = data.map(p => `
    <div class="prod-card" onclick="location.href='product.html?id=${p.id}'">
      <div class="prod-img" style="background:${p.bg}">
        <img src="${p.img}" class="product-image">
        <span class="prod-badge">${p.badge}</span>
        <button class="prod-wish" onclick="event.stopPropagation();wishlist(this)">♡</button>
      </div>
      <div class="prod-info">
        <div class="prod-brand">${p.brand}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-price">
          <span class="now">₹${p.price.toLocaleString()}</span>
          <span class="was">₹${p.was.toLocaleString()}</span>
          <span class="off">${p.off}% off</span>
        </div>
        <div class="prod-stars">${p.stars} <span>(${p.reviews.toLocaleString()})</span></div>
      </div>
    </div>
  `).join('');
}

renderProducts(products.slice(0,5), 'trendingGrid');
renderProducts(products.slice(5,10), 'bestsellerGrid');


function wishlist(btn) {
  btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
  btn.style.color = btn.textContent === '♥' ? '#e8175d' : '';
  showToast(btn.textContent === '♥' ? '💖 Added to Wishlist!' : 'Removed from Wishlist');
}



// Slider
let cur = 0;
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');

function goSlide(n) {
  cur = n;
  slides.style.transform = `translateX(-${cur * 100}%)`;
  dots.forEach((d,i) => d.classList.toggle('active', i === cur));
}
function changeSlide(dir) {
  goSlide((cur + dir + 3) % 3);
}
setInterval(() => changeSlide(1), 3000);

// Timer
function startTimer(h, m, s) {
  let total = h*3600 + m*60 + s;
  setInterval(() => {
    total--;
    if(total < 0) total = 10*3600;
    const hh = Math.floor(total/3600);
    const mm = Math.floor((total%3600)/60);
    const ss = total%60;
    document.getElementById('th').textContent = String(hh).padStart(2,'0');
    document.getElementById('tm').textContent = String(mm).padStart(2,'0');
    document.getElementById('ts').textContent = String(ss).padStart(2,'0');
  }, 1000);
}
startTimer(3, 45, 0);

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function doSearch() {
  const q = document.getElementById('searchInput').value;
  if(q.trim()) location.href = `category.html?q=${encodeURIComponent(q)}`;
}
document.getElementById('searchInput').addEventListener('keypress', e => { if(e.key === 'Enter') doSearch(); });