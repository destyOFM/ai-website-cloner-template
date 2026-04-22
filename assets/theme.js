// Gallery Dept. Shopify Theme — JavaScript

(function () {
  'use strict';

  // ── Cart count badge ──────────────────────────────────────────────────────
  function updateCartCount() {
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        document.querySelectorAll('.gd-cart-count').forEach(function (el) {
          if (cart.item_count > 0) {
            el.textContent = cart.item_count;
            el.removeAttribute('hidden');
          } else {
            el.setAttribute('hidden', '');
          }
        });
      });
  }

  // ── Add-to-cart form ──────────────────────────────────────────────────────
  var productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(productForm);
      var btn = productForm.querySelector('.product-page__add-btn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'ADDING...';
      }
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: formData.get('id'), quantity: 1 })
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          updateCartCount();
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'ADDED';
            setTimeout(function () { btn.textContent = 'ADD TO CART'; }, 2000);
          }
        })
        .catch(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'ADD TO CART';
          }
        });
    });

    // Variant selector → update hidden id input + price
    var variantSelects = productForm.querySelectorAll('select');
    variantSelects.forEach(function (select) {
      select.addEventListener('change', function () {
        syncVariant(productForm);
      });
    });
  }

  function syncVariant(form) {
    var selects = form.querySelectorAll('select');
    var selectedOptions = Array.from(selects).map(function (s) { return s.value; });
    var variantData = window.__variantData;
    if (!variantData) return;
    var match = variantData.find(function (v) {
      return v.options.every(function (opt, i) { return opt === selectedOptions[i]; });
    });
    if (match) {
      var idInput = form.querySelector('input[name="id"]');
      if (idInput) idInput.value = match.id;
      var priceEl = document.querySelector('.product-page__price');
      if (priceEl && match.price) {
        var formatted = (match.price / 100).toFixed(2);
        priceEl.textContent = '$' + formatted;
      }
      var addBtn = form.querySelector('.product-page__add-btn');
      if (addBtn) {
        addBtn.disabled = !match.available;
        addBtn.textContent = match.available ? 'ADD TO CART' : 'SOLD OUT';
      }
    }
  }

  // ── Product gallery thumbnails ─────────────────────────────────────────────
  var thumbnails = document.querySelectorAll('.product-page__thumbnail');
  thumbnails.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var mainImg = document.querySelector('.product-page__image');
      if (mainImg) {
        mainImg.src = thumb.dataset.full || thumb.src;
      }
      thumbnails.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });

  // ── Sticky scroll (hide on down, reveal on up) ────────────────────────────
  var banner  = document.getElementById('gd-sticky-banner');
  var lastY   = 0;
  var rafId   = null;

  if (banner) {
    window.addEventListener('scroll', function () {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        var y = window.scrollY;
        if (y <= 0) {
          banner.classList.remove('gd-sticky-banner--hidden', 'gd-sticky-banner--scrolled');
        } else if (y > lastY) {
          banner.classList.add('gd-sticky-banner--hidden', 'gd-sticky-banner--scrolled');
        } else {
          banner.classList.remove('gd-sticky-banner--hidden');
          banner.classList.add('gd-sticky-banner--scrolled');
        }
        lastY = y;
      });
    }, { passive: true });
  }

  // ── Mobile drawer ─────────────────────────────────────────────────────────
  var drawer   = document.getElementById('gd-drawer');
  var backdrop = document.getElementById('gd-backdrop');
  var hamburgers = document.querySelectorAll('.gd-hamburger');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburgers.forEach(function (btn) { btn.setAttribute('aria-expanded', 'true'); });
    drawer.removeAttribute('hidden');
    // focus first focusable element
    var first = drawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburgers.forEach(function (btn) { btn.setAttribute('aria-expanded', 'false'); });
    // Re-hide from screen readers after the slide-out transition (300ms)
    setTimeout(function () {
      if (!drawer.classList.contains('is-open')) {
        drawer.setAttribute('hidden', '');
      }
    }, 310);
  }

  hamburgers.forEach(function (btn) {
    btn.addEventListener('click', openDrawer);
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  document.querySelectorAll('[data-close-drawer]').forEach(function (btn) {
    btn.addEventListener('click', closeDrawer);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  // ── Drawer accordion ──────────────────────────────────────────────────────
  document.querySelectorAll('[data-accordion]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var sub     = toggle.nextElementSibling;
      var isOpen  = toggle.getAttribute('aria-expanded') === 'true';
      // Close all other open items
      document.querySelectorAll('[data-accordion]').forEach(function (t) {
        if (t !== toggle) {
          t.setAttribute('aria-expanded', 'false');
          var s = t.nextElementSibling;
          if (s) s.hidden = true;
        }
      });
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;
    });
  });

  // ── Initialise ────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
  });
})();
