window._cartCount = parseInt(localStorage.getItem('she_cart') || '0');
document.getElementById('cartCount').textContent = window._cartCount;

// Demo cart items
let cartItems = [
  {id:1,name:'Floral Anarkali Kurta Set with Dupatta',brand:'W for Woman',price:799,was:1999,img:'src/kurti.webp',bg:'#fde8f0',size:'M',color:'Rose Red',qty:1},
  {id:2,name:'Matte Lipstick Set (12 Shades)',brand:'Lakméé',price:499,was:999,img:'src/lipstick.webp',bg:'#fff0f5',size:'One Size',color:'Multicolor',qty:2},
  {id:5,name:'Samsung Galaxy Buds 3',brand:'Samsung',price:4999,was:9999,img:'src/samsungbud.webp',bg:'#e8f4fd',size:'Standard',color:'Phantom Black',qty:1},
];

function renderCart() {
  const container = document.getElementById('cartItems');
  if(cartItems.length === 0) {
    document.getElementById('cartBox').innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet. Let's change that!</p>
        <a href="index.html">Start Shopping</a>
      </div>`;
    document.getElementById('summaryBox').style.display = 'none';
    return;
  }
  container.innerHTML = cartItems.map((item,i) => `
    <div class="cart-item">
      <div class="item-img" style="background:${item.bg}">
  <img src="${item.img}" alt="${item.name}">
</div>
      <div class="item-info">
        <div class="item-brand">${item.brand}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-meta">Size: ${item.size} | Color: ${item.color}</div>
        <div class="item-actions">
          <div class="qty-ctrl">
            <button onclick="changeQty(${i},-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${i},1)">+</button>
          </div>
          <button class="item-del" onclick="removeItem(${i})">🗑 Remove</button>
          <button class="item-del" onclick="showToast('💖 Saved to Wishlist!')">♡ Save</button>
        </div>
      </div>
      <div class="item-price-col">
        <div class="now">₹${(item.price * item.qty).toLocaleString()}</div>
        <div class="was">₹${(item.was * item.qty).toLocaleString()}</div>
        <div class="saved">Save ₹${((item.was - item.price) * item.qty).toLocaleString()}</div>
      </div>
    </div>
  `).join('');
  updateSummary();
}

function changeQty(i, d) {
  cartItems[i].qty = Math.max(1, cartItems[i].qty + d);
  renderCart();
}

function removeItem(i) {
  cartItems.splice(i, 1);
  window._cartCount = cartItems.reduce((a,c)=>a+c.qty,0);
  localStorage.setItem('she_cart', window._cartCount);
  document.getElementById('cartCount').textContent = window._cartCount;
  renderCart();
  showToast('🗑 Item removed from cart');
}
let discount=0;

function updateSummary() {
  const subtotal = cartItems.reduce((a,c)=>a+c.price*c.qty, 0);
  const wasTotal = cartItems.reduce((a,c)=>a+c.was*c.qty, 0);
  const saved = wasTotal - subtotal;

  const finalTotal = Math.max(subtotal - discount, 0);

  const count = cartItems.reduce((a,c)=>a+c.qty, 0);

  document.getElementById('itemCount').textContent = count;
  document.getElementById('subtotal').textContent = '₹'+subtotal.toLocaleString();
  document.getElementById('savedAmt').textContent = '₹'+(saved + discount).toLocaleString();
  document.getElementById('totalAmt').textContent = '₹'+finalTotal.toLocaleString();
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.toUpperCase();

  const subtotal = cartItems.reduce((a,c)=>a+c.price*c.qty, 0);

  if(code === 'SHE50') {
    discount = subtotal * 0.5;
    localStorage.setItem('she_discount', discount);
    showToast('🎉 50% discount applied');
  }
  else if(code === 'NEWUSER') {
    discount = 200;
    localStorage.setItem('she_discount', discount);
    showToast('🎉 ₹200 discount applied');
  }
  else {
    discount = 0;
    localStorage.setItem('she_discount', 0);
    showToast('❌ Invalid coupon');
  }

  updateSummary();
}

function checkout() {
  showToast('✅ Proceeding to checkout...');
  setTimeout(() => location.href='checkout.html', 1200);
}

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}

renderCart();