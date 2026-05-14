window._cartCount = parseInt(localStorage.getItem('she_cart') || '0');
document.getElementById('cartCount').textContent = window._cartCount;

// Check URL for section
const urlPath = location.pathname;
if(urlPath.includes('orders')) showSection('orders', null);

function showSection(id, el) {
  document.querySelectorAll('.content-section').forEach(s=>s.style.display='none');
  document.getElementById(id).style.display='block';
  document.querySelectorAll('.menu-item').forEach(m=>m.classList.remove('active'));
  if(el) el.classList.add('active');
}

function saveProfile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  const fullName = firstName + " " + lastName;

  // update sidebar
  document.getElementById("sidebarName").textContent = fullName;
  document.getElementById("sidebarEmail").textContent = email;

  alert("Profile updated!");
}


document.addEventListener("DOMContentLoaded", function () {

  function showSection(sectionId) {
    // hide all sections
    document.querySelectorAll(".content-section").forEach(sec => {
      sec.style.display = "none";
    });

    // show selected section
    const active = document.getElementById(sectionId);
    if (active) {
      active.style.display = "block";
    }
  }

  // 🔥 get section from URL
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  if (section) {
    showSection(section);
  } else {
    showSection("dashboard");
  }

});

window.onload = function() {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  if(name) document.getElementById("sidebarName").textContent = name;
  if(email) document.getElementById("sidebarEmail").textContent = email;
}

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}