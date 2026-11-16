// ==========================================
// 1. NAVBAR TOGGLE
// ==========================================
const navToggle = document.getElementById('brewNavToggle');
const mobileMenu = document.getElementById('brewMobileMenu');
const toggleIcon = document.getElementById('brewNavToggleIcon');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
    
    if (mobileMenu.classList.contains('is-open')) {
      toggleIcon.innerHTML = '<use href="#i-x"/>';
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      toggleIcon.innerHTML = '<use href="#i-menu"/>';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ==========================================
// 2. TODAY'S EXPERIMENT FORM
// ==========================================
const guessForm = document.getElementById('guessForm');
const guessSuccess = document.getElementById('guessSuccess');

if (guessForm) {
  guessForm.addEventListener('submit', function(e) {
    e.preventDefault();
    guessForm.style.display = 'none';
    guessSuccess.hidden = false;		
  });
}

// ==========================================
// 3. 3D CAROUSEL WHEEL LOGIC (HOME ONLY)
// ==========================================
const carousel = document.querySelector('.featured-trials__grid');
const cards = document.querySelectorAll('.trial-card');

if (carousel && cards.length === 3) {
  
  // Setup initial index for the cards
  cards[0].dataset.index = "2"; 
  cards[1].dataset.index = "0"; 
  cards[2].dataset.index = "1"; 

  let startX = 0;
  let isSwiping = false;

  function updateCardPositions() {
    // If desktop, clear inline styles so CSS Grid works
    if (window.innerWidth > 900) {
      cards.forEach(card => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.opacity = "";
        card.style.boxShadow = "";
        card.classList.remove('is-active');
      });
      return;
    }

    // If mobile, apply the 3D wheel positions
    cards.forEach(card => {
      const index = parseInt(card.dataset.index);

      if (index === 0) {
        card.classList.add('is-active');
        card.style.transform = "translateX(0) scale(1) rotateY(0deg)";
        card.style.zIndex = 3;
        card.style.opacity = 1;
        card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
      } 
      else if (index === 1) {
        card.classList.remove('is-active');
        card.style.transform = "translateX(35%) scale(0.85) rotateY(35deg)";
        card.style.zIndex = 2;
        card.style.opacity = 0.9;
        card.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)";
      } 
      else if (index === 2) {
        card.classList.remove('is-active');
        card.style.transform = "translateX(-35%) scale(0.85) rotateY(-35deg)";
        card.style.zIndex = 2;
        card.style.opacity = 0.9;
        card.style.boxShadow = "-5px 5px 10px rgba(0,0,0,0.5)";
      }
    });
  }

  updateCardPositions();
  window.addEventListener('resize', updateCardPositions);

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const distance = startX - endX;
    
    if (distance > 40) rotateWheel('next');
    if (distance < -40) rotateWheel('prev');
    
    isSwiping = false;
  });

  carousel.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isSwiping = true;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!isSwiping) return;
    const endX = e.clientX;
    const distance = startX - endX;
    
    if (distance > 40) rotateWheel('next');
    if (distance < -40) rotateWheel('prev');
    
    isSwiping = false;
  });

  function rotateWheel(direction) {
    cards.forEach(card => {
      let index = parseInt(card.dataset.index);
      
      if (direction === 'next') {
        index = (index + 2) % 3; 
      } else {
        index = (index + 1) % 3; 
      }
      
      card.dataset.index = index;
    });

    updateCardPositions();
  }
}

//Menu filters

const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if(filterBtns.length > 0) {
	filterBtns.forEach (btn => {
		btn.addEventListener('click', () => {
			//remove active from all buttons
			filterBtns.forEach(b => b.classList.remove('active'));
			// add active to clicked btn
			btn.classList.add('active');
			
			const filter = btn.dataset.filter;
			
			menuItems.forEach(item => {
				if (filter === 'all' || item.dataset.category === filter) {
					item.style.display = 'flex';
			   } else {
				    item.style.display = 'none';
				}
			});
		});
	});
}

// ==========================================
// 5. COMMUNITY PAGE - SUSPENDED COFFEES
// ==========================================
const addCoffeeBtn = document.getElementById('addCoffeeBtn');
const coffeeCount = document.getElementById('coffeeCount');

if (addCoffeeBtn && coffeeCount) {
  addCoffeeBtn.addEventListener('click', () => {
    let currentCount = parseInt(coffeeCount.textContent);
    coffeeCount.textContent = currentCount + 1;
  });
}

// ==========================================
// 6. COMMUNITY PAGE - GUESTBOOK
// ==========================================
const guestbookForm = document.getElementById('guestbookForm');
const guestbookInput = document.getElementById('guestbookInput');
const guestbookWall = document.getElementById('guestbookWall');

if (guestbookForm && guestbookInput && guestbookWall) {
  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = guestbookInput.value.trim();
    if (!message) return;

    // Create a new entry
    const newEntry = document.createElement('p');
    newEntry.className = 'guestbook__entry handwritten';
    newEntry.textContent = `"${message}" — Anonymous`;
    
    // Add it to the top of the wall
    guestbookWall.prepend(newEntry);
    
    // Clear the input
    guestbookInput.value = '';
  });
}

// ==========================================
// 6b. VISIT PAGE - CONTACT FORM (concept site: no real sending)
// ==========================================
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactStatus.textContent = 'Message received. The Lab will be in touch... eventually.';
    contactForm.reset();
  });
}

// ==========================================
// 7. INTERACTIVE MAP (VISIT PAGE)
// 4 image layers: far -> region -> overview -> close-up.
// Drag to pan, pinch / wheel / buttons to zoom.
// Each closer image fades in as you zoom toward the Lab.
// ==========================================
(function () {
  const wrapper = document.getElementById('mapWrapper');
  const world = document.getElementById('mapWorld');
  const marker = document.getElementById('mapMarker');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const findLabBtn = document.getElementById('findLabBtn');

  if (!wrapper || !world || !marker) return;

  // ---------- SETTINGS (tweak these if layers look misaligned) ----------
  const OV_W = 1000; // the overview image is drawn 1000 units wide

  // Farthest first. Each layer:
  //   detail = how big its details are compared to the overview (overview = 1)
  //   door   = where the Lab door is inside that image (0 to 1, from top-left)
  const LAYERS = [
    { id: 'mapFar',      detail: 1 / 3.8, door: { x: 0.510, y: 0.488 } },
    { id: 'mapRegion',   detail: 0.5,     door: { x: 0.506, y: 0.518 } },
    { id: 'mapOverview', detail: 1,       door: { x: 0.505, y: 0.520 } },
    { id: 'mapCloseup',  detail: 2.4,     door: { x: 0.500, y: 0.585 } }
  ];

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 24;     // raise for a closer zoom (images get blurrier)
  const FIND_ZOOM = 14;    // zoom level used by "Find the Lab"
  const ZOOM_STEP = 1.5;   // size of each + / - tap
  const FADE_START = 0.9;  // an image starts fading in when it is this wide (x box width)
  const FADE_LENGTH = 0.7; // and is fully visible after this much more
  // ----------------------------------------------------------------------

  const layers = LAYERS
    .map((l) => Object.assign({ el: document.getElementById(l.id) }, l))
    .filter((l) => l.el);

  if (!layers.length) return;

  const WORLD = OV_W / layers[0].detail;   // size of the biggest (far) image
  const door = { x: layers[0].door.x * WORLD, y: layers[0].door.y * WORLD };

  // Size and place every layer so all the Lab doors line up
  world.style.width = WORLD + 'px';
  world.style.height = WORLD + 'px';

  layers.forEach((l) => {
    l.w = OV_W / l.detail;
    l.el.style.width = l.w + 'px';
    l.el.style.height = l.w + 'px';
    l.el.style.left = (door.x - l.door.x * l.w) + 'px';
    l.el.style.top = (door.y - l.door.y * l.w) + 'px';
  });

  marker.style.left = door.x + 'px';
  marker.style.top = door.y + 'px';

  let vw = 0, vh = 0, base = 1;
  let z = MIN_ZOOM, tx = 0, ty = 0;
  let animTimer = null;

  const clampVal = (v, min, max) => Math.min(max, Math.max(min, v));

  function measure() {
    vw = wrapper.clientWidth;
    vh = wrapper.clientHeight;
    base = Math.max(vw, vh) / WORLD;       // zoom 1 = far image just covers the box
  }

  function clampPos() {
    const s = base * z;
    tx = clampVal(tx, vw - WORLD * s, 0);
    ty = clampVal(ty, vh - WORLD * s, 0);
  }

  function apply() {
    const s = base * z;
    const vmin = Math.min(vw, vh);
    world.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + s + ')';

    // Marker cancels the zoom so it stays the same size
    marker.style.transform = 'translate(-50%,-100%) scale(' + (1 / s) + ')';

    // Each closer image fades in as it gets big enough on screen
    let lastT = 0;
    layers.forEach((l, i) => {
      if (i === 0) return;
      const t = clampVal((l.w * s - vmin * FADE_START) / (vmin * FADE_LENGTH), 0, 1);
      l.el.style.opacity = t;
      lastT = t;
    });

    // Marker fades out once the close-up shows the real sign and door
    marker.style.opacity = 1 - clampVal((lastT - 0.3) / 0.7, 0, 1);
  }

  function stopAnimation() {
    clearTimeout(animTimer);
    wrapper.classList.remove('is-animating');
  }

  function startAnimation() {
    stopAnimation();
    wrapper.classList.add('is-animating');
    animTimer = setTimeout(() => wrapper.classList.remove('is-animating'), 650);
  }

  // Zoom keeping the screen point (px, py) fixed
  function zoomAt(px, py, newZ) {
    newZ = clampVal(newZ, MIN_ZOOM, MAX_ZOOM);
    const s = base * z;
    const wx = (px - tx) / s;
    const wy = (py - ty) / s;
    z = newZ;
    const s2 = base * z;
    tx = px - wx * s2;
    ty = py - wy * s2;
    clampPos();
    apply();
  }

  // Put a world point in the middle of the box at a given zoom
  function focusOn(wx, wy, newZ) {
    z = clampVal(newZ, MIN_ZOOM, MAX_ZOOM);
    const s = base * z;
    tx = vw / 2 - wx * s;
    ty = vh / 2 - wy * s;
    clampPos();
    apply();
  }

  // ---------- Buttons ----------
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      startAnimation();
      zoomAt(vw / 2, vh / 2, z * ZOOM_STEP);
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      startAnimation();
      zoomAt(vw / 2, vh / 2, z / ZOOM_STEP);
    });
  }

  if (findLabBtn) {
    findLabBtn.addEventListener('click', () => {
      startAnimation();
      focusOn(door.x, door.y, FIND_ZOOM);
    });
  }

  // ---------- Mouse wheel ----------
  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    stopAnimation();
    const rect = wrapper.getBoundingClientRect();
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, z * Math.exp(-e.deltaY * 0.0015));
  }, { passive: false });

  // ---------- Drag and pinch (mouse + touch) ----------
  const pointers = new Map();
  let lastDist = 0;
  let lastMid = null;

  function startPinch() {
    const pts = Array.from(pointers.values());
    const rect = wrapper.getBoundingClientRect();
    lastDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    lastMid = {
      x: (pts[0].x + pts[1].x) / 2 - rect.left,
      y: (pts[0].y + pts[1].y) / 2 - rect.top
    };
  }

  wrapper.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.map-controls') || e.target.closest('.map-find')) return;
    stopAnimation();
    wrapper.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    wrapper.classList.add('is-dragging');
    if (pointers.size === 2) startPinch();
  });

  wrapper.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);

    if (pointers.size === 1) {
      tx += e.clientX - prev.x;
      ty += e.clientY - prev.y;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      clampPos();
      apply();
      return;
    }

    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && lastMid) {
      const pts = Array.from(pointers.values());
      const rect = wrapper.getBoundingClientRect();
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = {
        x: (pts[0].x + pts[1].x) / 2 - rect.left,
        y: (pts[0].y + pts[1].y) / 2 - rect.top
      };
      tx += mid.x - lastMid.x;
      ty += mid.y - lastMid.y;
      if (lastDist > 0) zoomAt(mid.x, mid.y, z * (dist / lastDist));
      else { clampPos(); apply(); }
      lastDist = dist;
      lastMid = mid;
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    lastDist = 0;
    lastMid = null;
    if (pointers.size === 0) wrapper.classList.remove('is-dragging');
    if (pointers.size === 2) startPinch();
  }

  wrapper.addEventListener('pointerup', endPointer);
  wrapper.addEventListener('pointercancel', endPointer);

  // ---------- Resize: keep the same center ----------
  window.addEventListener('resize', () => {
    const s = base * z;
    const cx = (vw / 2 - tx) / s;
    const cy = (vh / 2 - ty) / s;
    measure();
    focusOn(cx, cy, z);
  });

  // ---------- Start: far view, centered on the Lab ----------
  measure();
  focusOn(door.x, door.y, MIN_ZOOM);
})();
