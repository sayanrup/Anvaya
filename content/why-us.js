// content/why-us.js — "Why choose Anvaya": Anvaya vs. two generic
// categories (organized interior brands in general, and local/
// unorganized contractors) — never a NAMED competitor, consistent with
// the rest of this page. Anvaya's own column pulls real approved data
// (price tiers via getPriceTier(), commitments); the other two columns
// are deliberately qualitative, not invented numbers — this project's
// guardrail has never allowed a fabricated competitor price, and a
// specific "other brands charge ₹X" figure would be exactly that, just
// aimed at a category instead of a name. See sections/why-us.js.
const CONTENT_WHY_US = {
  whyUs: {
    kicker: "See the difference",
    heading: "Why choose Anvaya",
    note: "A general category comparison — not based on any named competitor's published pricing.",
    columns: [
      {
        id: "anvaya", label: "Anvaya", featured: true,
        rows: {
          price1bhk: { tierRef: "1bhk" },
          price2bhk: { tierRef: "2bhk" },
          delivery: "45 days, fixed in writing",
          trust: "Written warranty on every project",
          payment: "Milestone-based, itemised upfront"
        }
      },
      {
        id: "brands", label: "Other Brands",
        rows: {
          price1bhk: "Similar range, varies by brand",
          price2bhk: "Similar range, varies by brand",
          delivery: "Often 60–90 days, not always fixed",
          trust: "Varies by brand",
          payment: "Varies, terms not always itemised"
        }
      },
      {
        id: "local", label: "Local Shops",
        rows: {
          price1bhk: "Lower quoted upfront, overruns common",
          price2bhk: "Lower quoted upfront, overruns common",
          delivery: "No fixed timeline",
          trust: "Usually verbal only",
          payment: "Often advance-heavy, less structured"
        }
      }
    ],
    rowLabels: {
      price1bhk: "1BHK price",
      price2bhk: "2BHK price",
      delivery: "Delivery",
      trust: "Trust",
      payment: "Payment"
    }
  }
};
