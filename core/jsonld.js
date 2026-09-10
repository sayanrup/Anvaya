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

  const tiers = APPROVED_CONTENT.priceTiers.filter(canRender);
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Full home interior design & execution",
    "provider": { "@type": "Organization", "name": b.name },
    "areaServed": APPROVED_CONTENT.cities
  };
  if (tiers.length) {
    service.offers = tiers.map(t => {
      const priceSpecification = {
        "@type": "PriceSpecification",
        "minPrice": t.low,
        "priceCurrency": t.currency
      };
      // Open-ended tiers ("₹12L onwards") carry no maxPrice — there is no
      // approved upper bound to report, so none is invented for schema.org.
      if (!t.openEnded) priceSpecification.maxPrice = t.high;
      return {
        "@type": "Offer",
        "name": `${t.label} full-home interiors`,
        "priceCurrency": t.currency,
        "priceSpecification": priceSpecification,
        "description": APPROVED_CONTENT.priceDisclaimer
      };
    });
  }
  const svc = APPROVED_CONTENT.serviceability;
  if ((state === 'delivery_check' || state === 'delivery_check_needs_city') && params && params.city && canRender(svc)) {
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

  // The process no longer has its own visual section — it's one line
  // under the pricing heading (sections/pricing-tiers.js) — but stays in
  // the machine-readable layer here.
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How your home gets done with Anvaya",
    "step": APPROVED_CONTENT.processFlow.map(step => ({
      "@type": "HowToStep",
      "name": step
    }))
  };

  // Individual customer reviews, only the approved ones. No
  // AggregateRating: there is no approved aggregate figure to back one.
  const reviews = APPROVED_CONTENT.reviews.filter(canRender);
  organization.review = reviews.map(r => ({
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 },
    "author": { "@type": "Person", "name": r.name },
    "reviewBody": r.text
  }));

  return [organization, service, faqPage, howTo];
}

function updateJsonLd(state, params) {
  const ldScript = document.getElementById('ld-json');
  if (!ldScript) return;
  const data = buildJsonLd(state, params);
  // Escape "<" so a literal script-closing tag can never appear inside the JSON text.
  ldScript.textContent = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}
