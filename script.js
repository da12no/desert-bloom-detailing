/* ===== DESERT BLOOM MOBILE CAR DETAILING ===== */
;(function () {
  'use strict'

  const COMPANY    = 'Desert Bloom Mobile Car Detailing'
  const PHONE      = '4804050272'
  const PHONE_DISP = '(480) 405-0272'
  const EMAIL_TO   = 'hello@desertbloommobilecardetailing.shop'
  const DOMAIN     = 'desertbloommobilecardetailing.shop'
  const LS_KEY     = 'desert_bloom_booking'
  const GOLD       = '#C8714A'

  const SUPABASE_URL = 'https://wjtjsfopysjtpkooxyje.supabase.co'
  const SUPABASE_KEY = 'sb_publishable_KTN_kS0acmCrDHKd0PV87g_OgYKL15s'
  const BUSINESS_ID  = '407b8441-e298-47ea-80b1-b483b11d9b98'

  /* ===== FOOTER YEAR ===== */
  const fyEl = document.getElementById('footerYear')
  if (fyEl) fyEl.textContent = new Date().getFullYear()

  /* ===== NAVBAR ===== */
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50)
  })

  const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const mobileMenu    = document.getElementById('mobileMenu')
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'))
    document.querySelectorAll('.mobile-nav-link').forEach(l =>
      l.addEventListener('click', () => mobileMenu.classList.remove('open'))
    )
  }

  /* ===== STICKY BOOK NOW ===== */
  const stickyBook  = document.getElementById('stickyBook')
  const servicesEl  = document.getElementById('services')
  const bookingEl   = document.getElementById('booking')
  if (stickyBook && servicesEl) {
    window.addEventListener('scroll', () => {
      const pastPackages = servicesEl.getBoundingClientRect().bottom < 0
      const inBooking    = bookingEl
        && bookingEl.getBoundingClientRect().top  < window.innerHeight
        && bookingEl.getBoundingClientRect().bottom > 0
      stickyBook.classList.toggle('show', pastPackages && !inBooking)
    }, { passive: true })
  }

  /* ===== SMOOTH SCROLL (anchor links with navbar offset) ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })

  /* ===== FADE-UP ANIMATIONS ===== */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60)
        fadeObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.package-card, .addon-card, .step, .gallery-item, .area-item').forEach(el => {
    el.classList.add('fade-up')
    fadeObserver.observe(el)
  })

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el))

  /* ===== GALLERY ===== */
  const galleryPhotos = [
    'photos/gallery-1.jpg', 'photos/gallery-2.jpg', 'photos/gallery-3.jpg',
    'photos/gallery-4.jpg', 'photos/gallery-5.jpg', 'photos/gallery-6.jpg',
  ]
  const galleryGrid = document.getElementById('galleryGrid')
  if (galleryGrid) {
    galleryPhotos.forEach((src, i) => {
      const item = document.createElement('div')
      item.className = 'gallery-item'
      item.innerHTML = `<img src="${src}" alt="${COMPANY} gallery photo ${i + 1}" loading="lazy">`
      galleryGrid.appendChild(item)
    })
  }

  /* ===== BEFORE / AFTER SLIDER ===== */
  const baPhotoPairs = [
    { after: 'photos/before-after-1-after.jpg', before: 'photos/before-after-1-before.jpg' },
    { after: 'photos/before-after-2-after.jpg', before: 'photos/before-after-2-before.jpg' },
  ]
  const baGrid = document.getElementById('baGrid')
  if (baGrid) {
    baPhotoPairs.forEach((pair, idx) => {
      const card = document.createElement('div')
      card.innerHTML = `
        <div class="ba-card-label">Transformation ${idx + 1}</div>
        <div class="ba-slider" id="baSlider${idx}">
          <img class="ba-after"  src="${pair.after}"  alt="After detailing">
          <img class="ba-before" src="${pair.before}" alt="Before detailing" id="baBefore${idx}">
          <div class="ba-handle" id="baHandle${idx}">
            <div class="ba-handle-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          <span class="ba-tag before">Before</span>
          <span class="ba-tag after">After</span>
        </div>`
      baGrid.appendChild(card)
      initBASlider(idx)
    })
  }

  function initBASlider(idx) {
    const slider  = document.getElementById(`baSlider${idx}`)
    const before  = document.getElementById(`baBefore${idx}`)
    const handle  = document.getElementById(`baHandle${idx}`)
    if (!slider || !before || !handle) return
    let dragging = false
    let pct = 50
    function setPos(x) {
      const rect = slider.getBoundingClientRect()
      pct = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100))
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
      handle.style.left = `${pct}%`
    }
    setPos(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width / 2)
    slider.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX) })
    window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX) })
    window.addEventListener('mouseup', () => { dragging = false })
    slider.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX) }, { passive: true })
    window.addEventListener('touchmove',  e => { if (dragging) setPos(e.touches[0].clientX) }, { passive: true })
    window.addEventListener('touchend',   () => { dragging = false })
  }

  /* ===== BOOKING WIZARD ===== */
  const packages = [
    { id: 'interior', name: 'Interior Detail',                    price: 200, dur: '3–4 Hours', popular: false, desc: 'Complete interior transformation — steam cleaning, shampooing, odor removal & more.' },
    { id: 'premium',  name: 'Premium Interior + Exterior Detail', price: 299, dur: '4–5 Hours', popular: true,  desc: 'Everything in Interior plus exterior hand wash, wheels, tire shine, spray wax & more.' },
    { id: 'ultimate', name: 'Ultimate Detail Package',            price: 499, dur: 'Full Day',  popular: false, desc: 'The complete package — full detail plus clay bar & hand wax, engine bay & priority treatment.' },
  ]
  const vehicleSizes = [
    { id: 'standard', name: 'Standard Vehicle',              desc: 'Cars, sedans, coupes, small SUVs',               add: 0  },
    { id: 'large',    name: 'Oversized / 3rd Row Vehicle',   desc: 'Full-size SUV, minivan, truck, 3-row vehicle',   add: 50 },
  ]
  const ADDONS = [
    { id: 'pet-hair',  name: 'Excessive Pet Hair Removal',     price: 60,  desc: 'Removes deeply embedded pet hair from carpets, seats, and hard-to-reach areas for a truly clean interior',         cat: 'Interior', qty: false },
    { id: 'ozone',     name: 'Ozone Odor Treatment',           price: 100, desc: 'Eliminates stubborn odors at the source, including smoke, food, and mildew smells',                               cat: 'Interior', qty: false },
    { id: 'childseat', name: 'Child Seat / Car Seat Cleaning', price: 30,  desc: 'Deep cleaning and sanitization of child seats to remove dirt, spills, and bacteria',                              cat: 'Interior', qty: true  },
    { id: 'leather',   name: 'Leather Conditioning',           price: 60,  desc: 'Deep leather clean + pH-balanced conditioner + UV protectant',                                                    cat: 'Interior', qty: false },
    { id: 'clay',      name: 'Clay Bar Treatment + Hand Wax',  price: 100, desc: 'Removes embedded contaminants from paint, restoring a smooth, glass-like finish and improving shine',             cat: 'Exterior', qty: false },
    { id: 'engine',    name: 'Engine Bay Detail',              price: 75,  desc: 'Safe deep clean and dressing to remove buildup and restore a clean, like-new engine appearance',                  cat: 'Exterior', qty: false },
    { id: 'headlight', name: 'Headlight Restoration',          price: 120, desc: 'Restores clarity to foggy or oxidized headlights for improved appearance and visibility',                        cat: 'Exterior', qty: false },
    { id: 'sealant',   name: 'Sealant Protection',             price: 70,  desc: 'Long-lasting shine & paint protection sealant application',                                                      cat: 'Exterior', qty: false },
  ]
  const TIME_SLOTS = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM']

  let state = (() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
  })()
  state.step           = 0
  state.selectedPkg    = state.selectedPkg    || null
  state.selectedSize   = state.selectedSize   || 'standard'
  state.selectedAddons = state.selectedAddons || {}
  state.childSeatQty   = state.childSeatQty   || 1
  state.selectedDate   = state.selectedDate   || null
  state.selectedTime   = state.selectedTime   || null
  state.calYear        = state.calYear        || new Date().getFullYear()
  state.calMonth       = state.calMonth       || new Date().getMonth()
  state.firstName     = state.firstName     || ''
  state.lastName      = state.lastName      || ''
  state.email         = state.email         || ''
  state.phone         = state.phone         || ''
  state.address       = state.address       || ''
  state.city          = state.city          || ''
  state.zip           = state.zip           || ''
  state.notes         = state.notes         || ''
  state.bookedSlots   = state.bookedSlots   || {}

  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)) } catch {}
  }

  function getTotal() {
    if (!state.selectedPkg) return 0
    const pkg  = packages.find(p => p.id === state.selectedPkg)
    const size = vehicleSizes.find(v => v.id === state.selectedSize)
    let t = (pkg?.price || 0) + (size?.add || 0)
    ADDONS.forEach(a => {
      if (state.selectedAddons[a.id]) {
        const qty = a.qty ? (state.childSeatQty || 1) : 1
        t += a.price * qty
      }
    })
    return t
  }

  function fmtMoney(n) { return '$' + n.toLocaleString() }

  function updateTotals() {
    const t = fmtMoney(getTotal())
    const wt = document.getElementById('wizTotal')
    const ft = document.getElementById('wizFooterTotal')
    if (wt) wt.textContent = t
    if (ft) ft.textContent = t
  }

  /* ===== RENDER WIZARD ===== */
  function renderWizard() {
    updateTotals()
    const stepNums  = ['Step 1 of 4', 'Step 2 of 4', 'Step 3 of 4', 'Step 4 of 4']
    const stepNames = ['Choose Package', 'Pick Date & Time', 'Your Details', 'Review & Book']
    const sn = document.getElementById('wizStepNum')
    const snm = document.getElementById('wizStepName')
    if (sn)  sn.textContent  = stepNums[state.step]
    if (snm) snm.textContent = stepNames[state.step]

    for (let i = 0; i < 4; i++) {
      const el = document.getElementById(`prog-${i}`)
      if (!el) continue
      el.classList.remove('active', 'done')
      if (i < state.step)  el.classList.add('done')
      if (i === state.step) el.classList.add('active')
    }

    const back = document.getElementById('wizBack')
    const next = document.getElementById('wizNext')
    if (back) {
      back.style.visibility = state.step === 0 ? 'hidden' : 'visible'
    }
    if (next) {
      next.textContent = state.step === 3 ? 'Confirm Booking' : 'Continue →'
      next.disabled = !canAdvance()
    }

    const body = document.getElementById('wizBody')
    if (!body) return
    body.style.animation = 'none'
    void body.offsetWidth
    body.style.animation = ''

    if (state.step === 0) renderStep0(body)
    if (state.step === 1) renderStep1(body)
    if (state.step === 2) renderStep2(body)
    if (state.step === 3) renderStep3(body)
  }

  function canAdvance() {
    if (state.step === 0) return !!state.selectedPkg
    if (state.step === 1) return !!state.selectedDate && !!state.selectedTime
    if (state.step === 2) {
      return state.firstName.trim() && state.lastName.trim() &&
             state.email.trim() && state.phone.trim() &&
             state.address.trim() && state.city.trim() && state.zip.trim()
    }
    if (state.step === 3) return true
    return false
  }

  /* ===== STEP 0: Package ===== */
  function renderStep0(body) {
    body.innerHTML = `
      <div class="wiz-section">
        <div class="wiz-section-tag">Choose Your Service</div>
        <h3 class="wiz-heading">Which package suits <span class="wiz-em">your vehicle?</span></h3>
        <p class="wiz-sub">All packages include a fully mobile setup — we bring everything to your location.</p>
        <div class="wiz-packages" id="wizPkgs"></div>
      </div>
      <div class="wiz-section" style="margin-top:32px;">
        <div class="wiz-section-tag">Vehicle Size</div>
        <h3 class="wiz-heading" style="font-size:22px;">What are we detailing?</h3>
        <p class="wiz-sub">Larger vehicles require more product and time — the size add-on covers that.</p>
        <div class="wiz-vehicle-grid" id="wizVehicles"></div>
      </div>`

    const pkgCont = document.getElementById('wizPkgs')
    packages.forEach(pkg => {
      const card = document.createElement('div')
      card.className = 'wiz-pkg-card' + (state.selectedPkg === pkg.id ? ' selected' : '')
      card.innerHTML = `
        ${pkg.popular ? '<div class="wiz-popular-badge">Most Popular</div>' : ''}
        <div class="wiz-pkg-top">
          <div>
            <div class="wiz-pkg-name">${pkg.name}</div>
            <div class="wiz-pkg-dur">${pkg.dur}</div>
          </div>
          <div class="wiz-pkg-price">${fmtMoney(pkg.price)}</div>
        </div>
        <div class="wiz-pkg-desc">${pkg.desc}</div>`
      card.addEventListener('click', () => {
        state.selectedPkg = pkg.id
        saveState()
        renderWizard()
      })
      pkgCont.appendChild(card)
    })

    const vehCont = document.getElementById('wizVehicles')
    vehicleSizes.forEach(v => {
      const card = document.createElement('div')
      card.className = 'wiz-vehicle-card' + (state.selectedSize === v.id ? ' selected' : '')
      card.innerHTML = `
        <div class="wiz-vehicle-radio${state.selectedSize === v.id ? ' active' : ''}"></div>
        <div class="wiz-vehicle-info">
          <div class="wiz-vehicle-name">${v.name}</div>
          <div class="wiz-vehicle-desc">${v.desc}</div>
        </div>
        <div class="wiz-vehicle-price">${v.add > 0 ? '+' + fmtMoney(v.add) : 'Included'}</div>`
      card.addEventListener('click', () => {
        state.selectedSize = v.id
        saveState()
        renderWizard()
      })
      vehCont.appendChild(card)
    })

    renderAddons(body)
  }

  function renderAddons(body) {
    const wrap = document.createElement('div')
    wrap.className = 'wiz-section'
    wrap.style.marginTop = '32px'
    wrap.innerHTML = `
      <div class="wiz-section-tag">Add-Ons <span style="color:var(--gray);font-size:10px;font-weight:400;letter-spacing:0;text-transform:none;">(optional)</span></div>
      <h3 class="wiz-heading" style="font-size:22px;">Enhance your detail</h3>
      <div class="wiz-addons" id="wizAddons"></div>`
    body.appendChild(wrap)

    const cont = document.getElementById('wizAddons')
    let lastCat = null
    ADDONS.forEach(a => {
      if (a.cat !== lastCat) {
        lastCat = a.cat
        const catLabel = document.createElement('div')
        catLabel.className = 'wiz-addon-cat'
        catLabel.textContent = a.cat
        cont.appendChild(catLabel)
      }
      const active = !!state.selectedAddons[a.id]
      const qty    = state.childSeatQty || 1
      const row    = document.createElement('div')
      row.className = 'wiz-addon' + (active ? ' selected' : '')
      row.innerHTML = `
        <div class="wiz-addon-toggle${active ? ' active' : ''}">${active ? '✓' : '+'}</div>
        <div class="wiz-addon-info">
          <div class="wiz-addon-name">${a.name}</div>
          <div class="wiz-addon-desc">${a.desc}</div>
        </div>
        <div class="wiz-addon-right">
          ${a.qty && active ? `
            <div class="wiz-qty-ctrl" onclick="event.stopPropagation()">
              <button class="wiz-qty-btn" id="qtyMinus" ${qty <= 1 ? 'disabled' : ''}>−</button>
              <span class="wiz-qty-num">${qty}</span>
              <button class="wiz-qty-btn" id="qtyPlus">+</button>
            </div>
          ` : ''}
          <div class="wiz-addon-price">+${fmtMoney(a.qty ? a.price * qty : a.price)}${a.qty ? ` <span class="wiz-addon-each">each</span>` : ''}</div>
        </div>`
      row.addEventListener('click', () => {
        if (state.selectedAddons[a.id]) {
          delete state.selectedAddons[a.id]
        } else {
          state.selectedAddons[a.id] = true
        }
        saveState()
        renderWizard()
      })
      cont.appendChild(row)

      if (a.qty) {
        document.getElementById('qtyMinus')?.addEventListener('click', e => {
          e.stopPropagation()
          if (state.childSeatQty > 1) { state.childSeatQty--; saveState(); renderWizard() }
        })
        document.getElementById('qtyPlus')?.addEventListener('click', e => {
          e.stopPropagation()
          state.childSeatQty++; saveState(); renderWizard()
        })
      }
    })
  }

  /* ===== STEP 1: Date & Time ===== */
  function renderStep1(body) {
    body.innerHTML = `
      <div class="wiz-section">
        <div class="wiz-section-tag">Schedule Your Detail</div>
        <h3 class="wiz-heading">When works best <span class="wiz-em">for you?</span></h3>
        <p class="wiz-sub">We're available 7 days a week. Same-day slots subject to availability.</p>
        <div class="wiz-cal-wrap">
          <div>
            <div class="wiz-cal" id="wizCal"></div>
          </div>
          <div>
            <p style="font-size:13px;color:var(--gray);margin-bottom:12px;">
              ${state.selectedDate ? `<strong style="color:var(--white)">Selected: ${formatDate(state.selectedDate)}</strong><br>Pick a time below` : 'Select a date to see available times'}
            </p>
            ${state.selectedDate ? `<div class="wiz-slots" id="wizSlots"></div>` : ''}
            <p class="cal-note" style="margin-top:16px;">We'll confirm your exact time via text within 1 hour of your booking.</p>
          </div>
        </div>
      </div>`

    renderCalendar()
    if (state.selectedDate) renderSlots()
  }

  function renderCalendar() {
    const cal = document.getElementById('wizCal')
    if (!cal) return
    const now = new Date()
    const year = state.calYear
    const month = state.calMonth
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const dows = ['Su','Mo','Tu','We','Th','Fr','Sa']

    cal.innerHTML = `
      <div class="cal-nav">
        <button class="cal-nav-btn" id="calPrev">&#8249;</button>
        <div class="cal-month-label">${monthNames[month]} ${year}</div>
        <button class="cal-nav-btn" id="calNext">&#8250;</button>
      </div>
      <div class="cal-grid" id="calGrid"></div>`

    document.getElementById('calPrev')?.addEventListener('click', () => {
      state.calMonth--
      if (state.calMonth < 0) { state.calMonth = 11; state.calYear-- }
      saveState(); renderWizard()
    })
    document.getElementById('calNext')?.addEventListener('click', () => {
      state.calMonth++
      if (state.calMonth > 11) { state.calMonth = 0; state.calYear++ }
      saveState(); renderWizard()
    })

    const grid = document.getElementById('calGrid')
    dows.forEach(d => {
      const h = document.createElement('div')
      h.className = 'cal-dow'; h.textContent = d; grid.appendChild(h)
    })
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div'); blank.className = 'cal-cell'; grid.appendChild(blank)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      const cellDate = new Date(year, month, d)
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const isPast = cellDate < today
      const cell = document.createElement('div')
      cell.className = 'cal-cell' + (isPast ? ' past' : ' available') + (state.selectedDate === dateStr ? ' selected' : '')
      cell.textContent = d
      if (!isPast) {
        cell.addEventListener('click', () => {
          state.selectedDate = dateStr
          state.selectedTime = null
          saveState(); renderWizard()
        })
      }
      grid.appendChild(cell)
    }
  }

  function renderSlots() {
    const cont = document.getElementById('wizSlots')
    if (!cont || !state.selectedDate) return
    const now = new Date()
    const booked = state.bookedSlots[state.selectedDate] || []
    cont.innerHTML = ''
    TIME_SLOTS.forEach(slot => {
      const isBooked = booked.includes(slot)
      const isPast   = isPastSlot(slot)
      const isSelected = state.selectedTime === slot
      const div = document.createElement('div')
      div.className = 'wiz-slot' + (isBooked ? ' booked' : isPast ? ' past' : isSelected ? ' selected' : ' available')
      div.innerHTML = `<div class="slot-time">${slot}</div><div class="slot-status">${isBooked ? 'Booked' : isPast ? 'Passed' : isSelected ? 'Selected' : 'Open'}</div>`
      if (!isBooked && !isPast) {
        div.addEventListener('click', () => {
          state.selectedTime = slot
          saveState(); renderWizard()
        })
      }
      cont.appendChild(div)
    })
  }

  function isPastSlot(slot) {
    if (!state.selectedDate) return false
    const today = new Date()
    const sel = new Date(state.selectedDate + 'T00:00:00')
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (sel > todayMidnight) return false
    if (sel < todayMidnight) return true
    const [timePart, ampm] = slot.split(' ')
    let [h, m] = timePart.split(':').map(Number)
    if (ampm === 'PM' && h !== 12) h += 12
    if (ampm === 'AM' && h === 12) h = 0
    const slotMs = h * 60 + m
    const nowMs  = today.getHours() * 60 + today.getMinutes()
    return slotMs <= nowMs
  }

  function formatDate(str) {
    if (!str) return ''
    const [y, m, d] = str.split('-').map(Number)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const dt = new Date(y, m - 1, d)
    return `${days[dt.getDay()]}, ${months[m - 1]} ${d}, ${y}`
  }

  /* ===== STEP 2: Details ===== */
  function renderStep2(body) {
    body.innerHTML = `
      <div class="wiz-section">
        <div class="wiz-section-tag">Your Information</div>
        <h3 class="wiz-heading">Tell us about <span class="wiz-em">yourself</span></h3>
        <p class="wiz-sub">No account needed — we just need enough to reach you and find your vehicle.</p>
      </div>
      <form class="wiz-details-form" id="wizForm" onsubmit="return false">
        <div class="wiz-details-group">
          <div class="wiz-details-num">1</div>
          <div>
            <div class="wiz-details-title">Contact Info</div>
            <div class="wiz-fields-row">
              <div class="wiz-field">
                <label>First Name</label>
                <input type="text" id="wfFirst" placeholder="Jane" value="${escHtml(state.firstName)}" autocomplete="given-name">
              </div>
              <div class="wiz-field">
                <label>Last Name</label>
                <input type="text" id="wfLast" placeholder="Smith" value="${escHtml(state.lastName)}" autocomplete="family-name">
              </div>
            </div>
            <div class="wiz-fields-row">
              <div class="wiz-field">
                <label>Email Address</label>
                <input type="email" id="wfEmail" placeholder="jane@email.com" value="${escHtml(state.email)}" autocomplete="email">
              </div>
              <div class="wiz-field">
                <label>Phone Number</label>
                <input type="tel" id="wfPhone" placeholder="(480) 000-0000" value="${escHtml(state.phone)}" autocomplete="tel">
              </div>
            </div>
          </div>
        </div>
        <div class="wiz-details-group">
          <div class="wiz-details-num">2</div>
          <div>
            <div class="wiz-details-title">Service Location</div>
            <div class="wiz-fields-row">
              <div class="wiz-field wiz-field-addr" style="grid-column:1/-1;">
                <label>Street Address</label>
                <input type="text" id="wfAddr" placeholder="123 Main St" value="${escHtml(state.address)}" autocomplete="off">
                <div class="wiz-addr-suggestions" id="addrSuggestions"></div>
              </div>
            </div>
            <div class="wiz-fields-row wiz-fields-3">
              <div class="wiz-field">
                <label>City</label>
                <input type="text" id="wfCity" placeholder="Phoenix" value="${escHtml(state.city)}" autocomplete="address-level2">
              </div>
              <div class="wiz-field">
                <label>State</label>
                <input type="text" id="wfState" placeholder="AZ" value="AZ" readonly style="opacity:0.5;cursor:default;">
              </div>
              <div class="wiz-field">
                <label>ZIP Code</label>
                <input type="text" id="wfZip" placeholder="85001" value="${escHtml(state.zip)}" autocomplete="postal-code" maxlength="5">
              </div>
            </div>
          </div>
        </div>
        <div class="wiz-details-group" style="border-bottom:none;">
          <div class="wiz-details-num">3</div>
          <div>
            <div class="wiz-details-title">Vehicle &amp; Notes <span class="wiz-optional">(optional)</span></div>
            <div class="wiz-fields-row">
              <div class="wiz-field">
                <label>Vehicle Make / Model</label>
                <input type="text" id="wfCar" placeholder="e.g. 2022 Toyota Camry" value="${escHtml(state.notes ? '' : '')}">
              </div>
              <div class="wiz-field">
                <label>Special Requests <span class="wiz-optional">optional</span></label>
                <input type="text" id="wfNotes" placeholder="Anything we should know?" value="${escHtml(state.notes)}">
              </div>
            </div>
          </div>
        </div>
      </form>`

    const bind = (id, key) => {
      const el = document.getElementById(id)
      if (el) el.addEventListener('input', () => { state[key] = el.value; saveState(); updateNextBtn() })
    }
    bind('wfFirst', 'firstName'); bind('wfLast', 'lastName')
    bind('wfEmail', 'email');     bind('wfPhone', 'phone')
    bind('wfCity',  'city');      bind('wfZip',   'zip')

    const carEl   = document.getElementById('wfCar')
    const notesEl = document.getElementById('wfNotes')
    if (carEl)   carEl.addEventListener('input',   () => saveState())
    if (notesEl) notesEl.addEventListener('input', () => { state.notes = notesEl.value; saveState() })

    initAddrAutocomplete()
  }

  function initAddrAutocomplete() {
    const input = document.getElementById('wfAddr')
    const sugg  = document.getElementById('addrSuggestions')
    if (!input || !sugg) return
    let debounce
    input.addEventListener('input', () => {
      state.address = input.value; saveState(); updateNextBtn()
      clearTimeout(debounce)
      const q = input.value.trim()
      if (q.length < 3) { sugg.style.display = 'none'; return }
      debounce = setTimeout(async () => {
        try {
          const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q + ' Arizona')}&limit=5&lang=en`
          const res = await fetch(url)
          const data = await res.json()
          const features = data.features || []
          if (!features.length) { sugg.style.display = 'none'; return }
          sugg.innerHTML = ''
          features.forEach(f => {
            const p = f.properties
            const label = [p.name, p.street, p.city, p.state].filter(Boolean).join(', ')
            const opt = document.createElement('div')
            opt.className = 'wiz-addr-option'
            opt.textContent = label
            opt.addEventListener('mousedown', e => {
              e.preventDefault()
              input.value = label
              state.address = label
              if (p.city)  { state.city = p.city; const c = document.getElementById('wfCity'); if (c) c.value = p.city }
              if (p.postcode) { state.zip = p.postcode; const z = document.getElementById('wfZip'); if (z) z.value = p.postcode }
              saveState(); updateNextBtn()
              sugg.style.display = 'none'
            })
            sugg.appendChild(opt)
          })
          sugg.style.display = 'block'
        } catch { sugg.style.display = 'none' }
      }, 350)
    })
    input.addEventListener('blur', () => setTimeout(() => { sugg.style.display = 'none' }, 200))
  }

  function updateNextBtn() {
    const btn = document.getElementById('wizNext')
    if (btn) btn.disabled = !canAdvance()
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  }

  /* ===== STEP 3: Review ===== */
  function renderStep3(body) {
    const pkg  = packages.find(p => p.id === state.selectedPkg)
    const size = vehicleSizes.find(v => v.id === state.selectedSize)
    const addons = ADDONS.filter(a => state.selectedAddons[a.id])

    body.innerHTML = `
      <div class="wiz-section">
        <div class="wiz-section-tag">Almost Done</div>
        <h3 class="wiz-heading">Review your <span class="wiz-em">booking</span></h3>
        <p class="wiz-sub">No payment required now. We'll reach out within the hour to confirm.</p>
      </div>
      <div class="wiz-order-summary">
        <div class="wiz-summary-label">Order Summary</div>
        <div class="wiz-summary-lines">
          <div class="wiz-summary-line">
            <span>${pkg?.name || '—'}</span>
            <span>${fmtMoney(pkg?.price || 0)}</span>
          </div>
          ${size?.add > 0 ? `<div class="wiz-summary-line"><span>Size: ${size.name}</span><span>+${fmtMoney(size.add)}</span></div>` : `<div class="wiz-summary-line"><span>Size: ${size?.name || '—'}</span><span>Included</span></div>`}
          ${addons.map(a => `<div class="wiz-summary-line"><span>${a.name}</span><span>+${fmtMoney(a.price)}</span></div>`).join('')}
          <div class="wiz-summary-line datetime"><span>📅 Date</span><span>${formatDate(state.selectedDate)}</span></div>
          <div class="wiz-summary-line datetime"><span>🕐 Time</span><span>${state.selectedTime || '—'}</span></div>
          <div class="wiz-summary-line datetime"><span>📍 Location</span><span style="text-align:right;max-width:60%;">${escHtml(state.address)}, ${escHtml(state.city)} AZ ${escHtml(state.zip)}</span></div>
          <div class="wiz-summary-line datetime"><span>👤 Name</span><span>${escHtml(state.firstName)} ${escHtml(state.lastName)}</span></div>
          <div class="wiz-summary-line datetime"><span>✉️ Email</span><span>${escHtml(state.email)}</span></div>
          <div class="wiz-summary-line datetime"><span>📞 Phone</span><span>${escHtml(state.phone)}</span></div>
        </div>
        <div class="wiz-summary-total">
          <span>Total Due at Service</span>
          <span class="wiz-summary-total-val">${fmtMoney(getTotal())}</span>
        </div>
      </div>`
  }

  /* ===== SUBMIT BOOKING ===== */
  async function submitBooking() {
    const btn = document.getElementById('wizNext')
    if (btn) { btn.disabled = true; btn.textContent = 'Booking…' }

    const pkg  = packages.find(p => p.id === state.selectedPkg)
    const size = vehicleSizes.find(v => v.id === state.selectedSize)
    const addons = ADDONS.filter(a => state.selectedAddons[a.id])
    const carEl   = document.getElementById('wfCar')
    const vehicle = carEl?.value || ''

    const bookingData = {
      business_id:    BUSINESS_ID,
      first_name:     state.firstName,
      last_name:      state.lastName,
      email:          state.email,
      phone:          state.phone,
      address:        `${state.address}, ${state.city}, AZ ${state.zip}`,
      package_name:   pkg?.name || '',
      package_price:  pkg?.price || 0,
      vehicle_size:   size?.name || '',
      addons:         addons.map(a => a.name).join(', '),
      total:          getTotal(),
      booking_date:   state.selectedDate,
      booking_time:   state.selectedTime,
      notes:          vehicle ? `Vehicle: ${vehicle}. ${state.notes}`.trim() : state.notes,
      status:         'pending',
    }

    try {
      navigator.sendBeacon(
        `${SUPABASE_URL}/rest/v1/bookings`,
        new Blob([JSON.stringify(bookingData)], { type: 'application/json' })
      )
    } catch {}

    await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(bookingData),
      keepalive: true,
    }).catch(() => {})

    sendConfirmationEmail(bookingData)

    showSuccess()
  }

  async function sendConfirmationEmail(b) {
    const addonLines = b.addons
      ? b.addons.split(', ').map(a => `<li style="padding:4px 0;color:#C0B09A;">+ ${a}</li>`).join('')
      : ''

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Booking Confirmed</title></head>
<body style="margin:0;padding:0;background:#0F0A07;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0A07;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#1A1108;border-radius:12px;overflow:hidden;border:1px solid #3A2A18;max-width:100%;">
  <tr><td style="background:#211508;padding:32px 40px;text-align:center;border-bottom:1px solid #3A2A18;">
    <img src="https://${DOMAIN}/logo.png" alt="${COMPANY}" style="height:60px;width:auto;">
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="color:#C8714A;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Booking Confirmed</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 16px;line-height:1.3;">Hi ${escHtml(b.first_name)}, you're all set! 🌸</h1>
    <p style="color:#C0B09A;font-size:15px;line-height:1.7;margin:0 0 32px;">We've received your booking and will text you at <strong style="color:#fff;">${escHtml(b.phone)}</strong> within 1 business hour to confirm your appointment.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0A07;border-radius:8px;border:1px solid #3A2A18;margin-bottom:24px;">
      <tr><td style="padding:24px;">
        <p style="color:#C8714A;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Booking Details</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;width:40%;">Package</td><td style="color:#ffffff;font-size:13px;font-weight:600;padding:6px 0;">${escHtml(b.package_name)}</td></tr>
          ${b.vehicle_size !== 'Sedan / Coupe' ? `<tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;">Vehicle Size</td><td style="color:#ffffff;font-size:13px;font-weight:600;padding:6px 0;">${escHtml(b.vehicle_size)}</td></tr>` : ''}
          ${b.addons ? `<tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;vertical-align:top;">Add-Ons</td><td style="color:#ffffff;font-size:13px;padding:6px 0;"><ul style="margin:0;padding-left:16px;">${addonLines}</ul></td></tr>` : ''}
          <tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;">Date</td><td style="color:#ffffff;font-size:13px;font-weight:600;padding:6px 0;">${formatDate(b.booking_date)}</td></tr>
          <tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;">Time</td><td style="color:#ffffff;font-size:13px;font-weight:600;padding:6px 0;">${escHtml(b.booking_time)}</td></tr>
          <tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;">Location</td><td style="color:#ffffff;font-size:13px;font-weight:600;padding:6px 0;">${escHtml(b.address)}</td></tr>
          ${b.notes ? `<tr><td style="color:#8A7A6A;font-size:13px;padding:6px 0;vertical-align:top;">Notes</td><td style="color:#C0B09A;font-size:13px;padding:6px 0;">${escHtml(b.notes)}</td></tr>` : ''}
        </table>
        <div style="border-top:1px solid #3A2A18;margin-top:16px;padding-top:16px;display:flex;justify-content:space-between;">
          <span style="color:#8A7A6A;font-size:13px;">Total Due at Service</span>
          <span style="color:#C8714A;font-size:22px;font-weight:700;">$${b.total}</span>
        </div>
      </td></tr>
    </table>
    <p style="color:#8A7A6A;font-size:13px;line-height:1.7;margin:0 0 24px;">No payment is needed right now. We'll reach out to confirm and answer any questions before we arrive.</p>
    <div style="text-align:center;margin-bottom:32px;">
      <a href="tel:${PHONE}" style="display:inline-block;background:#C8714A;color:#ffffff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:6px;text-decoration:none;">Call Us: ${PHONE_DISP}</a>
    </div>
    <hr style="border:none;border-top:1px solid #3A2A18;margin:0 0 24px;">
    <p style="color:#8A7A6A;font-size:12px;line-height:1.7;margin:0;text-align:center;">
      ${COMPANY}<br>
      Phoenix Metro Area, Arizona<br>
      <a href="mailto:${EMAIL_TO}" style="color:#C8714A;text-decoration:none;">${EMAIL_TO}</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`

    fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: b.email,
        name:  `${b.first_name} ${b.last_name}`,
        subject: `Your Booking is Confirmed - ${COMPANY}`,
        htmlContent: html,
      }),
      keepalive: true,
    }).catch(() => {})
  }

  function showSuccess() {
    const body = document.getElementById('wizBody')
    const footer = document.querySelector('.wiz-footer')
    if (footer) footer.style.display = 'none'
    if (body) {
      body.innerHTML = `
        <div class="wiz-success">
          <div class="wiz-success-icon">✓</div>
          <p class="section-tag" style="margin-bottom:8px;">Booking Received!</p>
          <h3 style="font-family:var(--serif);font-size:28px;margin-bottom:12px;">Thank you, ${escHtml(state.firstName)}!</h3>
          <p style="color:var(--lt-gray);margin-bottom:24px;line-height:1.7;">We'll text you at ${escHtml(state.phone)} within 1 hour to confirm your appointment for <strong style="color:var(--white)">${formatDate(state.selectedDate)}</strong> at <strong style="color:var(--white)">${state.selectedTime}</strong>.</p>
          <a href="tel:${PHONE}" class="btn-gold" style="margin-right:12px;">Call Us</a>
          <a href="/" class="btn-outline" style="display:inline-block;margin-top:8px;">Back to Home</a>
        </div>`
    }
    saveState()
  }

  /* ===== WIZARD NAVIGATION ===== */
  document.getElementById('wizNext')?.addEventListener('click', async () => {
    if (!canAdvance()) return
    if (state.step === 3) {
      await submitBooking()
    } else {
      state.step++
      saveState()
      renderWizard()
    }
  })

  document.getElementById('wizBack')?.addEventListener('click', () => {
    if (state.step > 0) { state.step--; saveState(); renderWizard() }
  })

  /* ===== INIT ===== */
  renderWizard()
})()
