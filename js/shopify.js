/* =============================================
   ORET — Shopify Storefront API Integration
   Replace SHOPIFY_DOMAIN and SHOPIFY_TOKEN
   with your actual store credentials.
   ============================================= */

const SHOPIFY_DOMAIN = 'votre-boutique.myshopify.com';
const SHOPIFY_TOKEN  = 'votre_storefront_access_token';
const API_URL        = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

// ─── FETCH PRODUCTS ──────────────────────────
export async function fetchProducts({ first = 20, after = null, query = '' } = {}) {
  const gql = `
    query GetProducts($first: Int!, $after: String, $query: String) {
      products(first: $first, after: $after, query: $query) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id handle title
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
            variants(first: 5) {
              edges { node { id title availableForSale price { amount } } }
            }
            tags
            productType
          }
        }
      }
    }`;
  const data = await shopifyFetch(gql, { first, after, query });
  return data.products;
}

// ─── FETCH SINGLE PRODUCT ────────────────────
export async function fetchProduct(handle) {
  const gql = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id handle title description
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 5) { edges { node { url altText } } }
        variants(first: 10) {
          edges { node { id title availableForSale price { amount } } }
        }
      }
    }`;
  const data = await shopifyFetch(gql, { handle });
  return data.product;
}

// ─── CREATE CART ─────────────────────────────
export async function createCart(lines = []) {
  const gql = `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id checkoutUrl
          cost { totalAmount { amount currencyCode } }
          lines(first: 20) {
            edges {
              node {
                id quantity
                merchandise { ... on ProductVariant { id title product { title } } }
                cost { totalAmount { amount } }
              }
            }
          }
        }
        userErrors { field message }
      }
    }`;
  const data = await shopifyFetch(gql, { lines });
  return data.cartCreate;
}

// ─── ADD LINES TO CART ────────────────────────
export async function addCartLines(cartId, lines) {
  const gql = `
    mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl cost { totalAmount { amount currencyCode } } }
        userErrors { field message }
      }
    }`;
  const data = await shopifyFetch(gql, { cartId, lines });
  return data.cartLinesAdd;
}

// ─── UPDATE LINE QUANTITY ─────────────────────
export async function updateCartLine(cartId, lineId, quantity) {
  const gql = `
    mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id cost { totalAmount { amount currencyCode } } }
        userErrors { field message }
      }
    }`;
  const data = await shopifyFetch(gql, { cartId, lines: [{ id: lineId, quantity }] });
  return data.cartLinesUpdate;
}

// ─── REMOVE LINE FROM CART ────────────────────
export async function removeCartLine(cartId, lineId) {
  const gql = `
    mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id cost { totalAmount { amount currencyCode } } }
        userErrors { field message }
      }
    }`;
  const data = await shopifyFetch(gql, { cartId, lineIds: [lineId] });
  return data.cartLinesRemove;
}

/* ─── USAGE EXAMPLE ─────────────────────────────

// In your main.js, replace the local cart with Shopify:

import { createCart, addCartLines, fetchProducts } from './shopify.js';

// Load products from Shopify instead of local array:
const shopifyProducts = await fetchProducts({ first: 20 });

// On "Add to cart":
const { cart } = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
localStorage.setItem('oret_shopify_cart_id', cart.id);

// Redirect to Shopify checkout:
window.location.href = cart.checkoutUrl;

─────────────────────────────────────────────── */
