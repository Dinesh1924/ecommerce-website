function selectAddr(el){el.classList.toggle('active');el.querySelector('input').checked=true;}
function selectPay(el){document.querySelectorAll('.pay-option').forEach(p=>p.classList.remove('active'));el.classList.add('active');el.querySelector('input').checked=true;}

let newAddrOpen = false;
function toggleNewAddr(){
  newAddrOpen = !newAddrOpen;
  document.getElementById('newAddrForm').style.display = newAddrOpen ? 'block' : 'none';
}

function placeOrder(){
  const orderId = Math.floor(Math.random()*90000)+10000;
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('successOverlay').classList.add('show');
  localStorage.setItem('she_cart', '0');
}