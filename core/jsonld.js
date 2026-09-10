/* =====================================================================
   core/jsonld.js — the machine-readable layer.
   -----------------------------------------------------------------
   Pulls exclusively from APPROVED_CONTENT (gated by canRender for every
   claim-bearing field). For the delivery_check state it also folds in
   the concrete yes/no for the visitor's city, built the same way the
   on-page answer is: an approved template with the (escaped) city name
   substituted.
   ===================================================================== */
function buildJsonLd(state, params) {
  const b = APPROVED_CONTENT.brand;
  const organization = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": b.name,
    "legalName": b.legalName,
    "url": b.url,
    "description": b.description,
    "areaServed": APPROVED_CONTENT.cities
  };

  const price = APPROVED_CONTENT.price3bhk;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Full home interior design & execution",
    "provider": { "@type": "Organization", "name": b.name },
    "areaServed": APPROVED_CONTENT.cities
  };
  if (canRender(price)) {
    service.offers = {
      "@type": "Offer",
      "priceCurrency": price.currency,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": price.low,
        "maxPrice": price.high,
        "priceCurrency": price.currency
      },
      "description": price.disclaimer
    };
  }
  const svc = APPROVED_CONTENT.serviceability;
  if (state === 'delivery_check' && params && params.city && canRender(svc)) {
    const result = checkServiceability(params.city);
    const template = result.isServiceable ? svc.yesTemplate : svc.noTemplate;
    service.additionalProperty = {
      "@type": "PropertyValue",
      "name": "serviceabilityCheck",
      "value": template.replace('{city}', result.matchedCity || params.city)
    };
  }

  const faqs = APPROVED_CONTENT.faqs.filter(canRender);
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return [organization, service, faqPage];
}

function updateJsonLd(state, params) {
  const ldScript = document.getElementById('ld-json');
  if (!ldScript) return;
  const data = buildJsonLd(state, params);
  // Escape "<" so a literal script-closing tag can never appear inside the JSON text.
  ldScript.textContent = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}
