// Gallery Dept. Shopify Theme — JavaScript

(function () {
  'use strict';

  // ── Cart count badge ──────────────────────────────────────────────────────
  function updateCartCount() {
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        document.querySelectorAll('.cart-count').forEach(function (el) {
          if (cart.item_count > 0) {
            el.textContent = cart.item_count;
            el.style.display = 'flex';
          } else {
            el.style.display = 'none';
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

  // ── Mobile menu ───────────────────────────────────────────────────────────
  var hamburger = document.querySelector('.hamburger-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // ── Initialise ────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
  });
})();
