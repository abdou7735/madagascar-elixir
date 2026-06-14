import React, { useState, useMemo } from "react";

// ============================================================
// BOUTIQUE MADAGASCAR ELIXIR — TERRALINK DROP
// Pour ajouter une photo : remplacer image: null par
// image: "https://lien-de-ta-photo.jpg"
//
// PRIX DES FORMATS (dégressifs, modifiables ci-dessous) :
//  - 100g  = prix 50g x 1,9   (-5%)
//  - 500g  = prix 50g x 8,5   (-15%)
//  - 1kg   = prix 50g x 16    (-20%)
// ============================================================

const CONTACT = {
  email: "yankoub@laposte.net",
  phone: "0745091014",
  whatsapp: "33745091014",
};

// Arrondi à 5 centimes
const r5 = (n) => Math.round(n * 20) / 20;

// Formats standards pour les épices vendues en 50g de base
const formats50 = (p) => [
  { label: "50g", prix: p },
  { label: "100g", prix: r5(p * 1.9) },
  { label: "500g", prix: r5(p * 8.5) },
  { label: "1kg", prix: r5(p * 16) },
];

// Combava (base 30g)
const formats30 = (p) => [
  { label: "30g", prix: p },
  { label: "100g", prix: r5(p * (100 / 30) * 0.95) },
  { label: "500g", prix: r5(p * (500 / 30) * 0.85) },
  { label: "1kg", prix: r5(p * (1000 / 30) * 0.8) },
];

// Miels (base 250g)
const formatsMiel = (p) => [
  { label: "250g", prix: p },
  { label: "500g", prix: r5(p * 1.9) },
  { label: "1kg", prix: r5(p * 3.6) },
];

// Vanille (à la gousse)
const formatsVanille = (p) => [
  { label: "5 gousses", prix: p },
  { label: "10 gousses", prix: r5(p * 1.92) },
  { label: "20 gousses", prix: r5(p * 3.7) },
];

const PRODUITS = [
  // ---------- ÉPICES & POIVRES ----------
  { id: 1, phare: true, cat: "Épices & Poivres", nom: "Curcuma moulu", desc: "Poudre fine 100% naturelle, riche en curcumine. Idéal lait doré, currys, riz et smoothies.", formats: formats50(3.40), grad: ["#E8A413", "#C97B0A"], image: "/images/curcuma.jpg" },
  { id: 2, cat: "Épices & Poivres", nom: "Cannelle moulue", desc: "Douceur boisée incomparable pour pâtisseries, compotes et boissons chaudes.", formats: formats50(3.40), grad: ["#A9683A", "#7C4423"], image: "/images/cannelle.jpg" },
  { id: 3, cat: "Épices & Poivres", nom: "Gingembre moulu", desc: "Notes florales et citronnées, plus doux que le gingembre asiatique. Marinades, woks, infusions.", formats: formats50(3.40), grad: ["#E3C77A", "#C2A04E"], image: "/images/gingembre.jpg" },
  { id: 4, cat: "Épices & Poivres", nom: "Poivre noir moulu", desc: "Notes boisées et fruitées, finement moulu. Qualité gastronomique, origine contrôlée.", formats: formats50(3.60), grad: ["#3B3530", "#1C1916"], image: "/images/poivre-noir-moulu.jpg" },
  { id: 5, cat: "Épices & Poivres", nom: "Poivre noir concassé", desc: "Explosion d'arômes à la chaleur. Incontournable pour steaks au poivre et BBQ.", formats: formats50(3.80), grad: ["#4A4138", "#262019"], image: "/images/poivre-noir-concasse.jpg" },
  { id: 6, cat: "Épices & Poivres", nom: "Poivre noir grains (lourd)", desc: "Grains denses et charnus, calibre premium. Parfait pour le moulin et les bouillons.", formats: formats50(4.25), grad: ["#36302B", "#15120F"], image: "/images/poivre-noir-grains.jpg" },
  { id: 7, cat: "Épices & Poivres", nom: "Poivre vert déshydraté", desc: "Arômes frais et peu piquants. Star du steak au poivre vert, parfait avec crème et saumon.", formats: formats50(4.25), grad: ["#6B8F4E", "#46662F"], image: "/images/poivre-vert.jpg" },
  { id: 8, phare: true, cat: "Épices & Poivres", nom: "Poivre sauvage Voatsiperifery", desc: "Cueilli à la main en forêt primaire. Notes florales, citronnées, anisées. Prisé des chefs étoilés.", formats: formats50(7.65), badge: "Rare", grad: ["#5C4033", "#2E1F17"], image: "/images/voatsiperifery.jpg" },
  { id: 9, phare: true, cat: "Épices & Poivres", nom: "Baies roses Grade 1", desc: "Les plus belles baies triées à la main. Poivrées, sucrées, anisées. Sélection gourmet.", formats: formats50(5.95), badge: "Premium", grad: ["#C9526B", "#9C3049"], image: "/images/baies-roses.jpg" },
  { id: 10, cat: "Épices & Poivres", nom: "Baies roses Grade 2", desc: "Mêmes saveurs que le Grade 1, calibre variable. Idéales cuisine quotidienne et restauration.", formats: formats50(4.25), grad: ["#C76379", "#A04158"], image: "/images/baies-roses.jpg" },
  { id: 11, cat: "Épices & Poivres", nom: "Baies roses Grade 3", desc: "Saveur identique aux grades supérieurs, format économique pour le quotidien.", formats: formats50(3.40), grad: ["#C27086", "#A2536A"], image: "/images/baies-roses.jpg" },
  { id: 12, cat: "Épices & Poivres", nom: "Combava en poudre", desc: "Zeste séché aux notes intenses de citron vert et citronnelle. Poissons, crevettes, desserts.", formats: formats30(5.10), grad: ["#8BA854", "#5F7A33"], image: "/images/combava.jpg" },
  { id: 13, cat: "Épices & Poivres", nom: "Piment Pili-Pili rouge entier", desc: "Fort et fruité, séché au soleil malgache. Pour pizzas, sauces et plats relevés.", formats: formats50(2.55), grad: ["#C73A22", "#8F1F0E"], image: "/images/piment-entier.jpg" },
  { id: 14, cat: "Épices & Poivres", nom: "Piment Pili-Pili en poudre", desc: "Poudre fine et brûlante, facile à doser. Rougails, currys, huiles pimentées maison.", formats: formats50(2.55), grad: ["#D2451F", "#9E2810"], image: "/images/piment-poudre.jpg" },
  { id: 15, phare: true, cat: "Épices & Poivres", nom: "Clous de girofle entiers", desc: "Haute teneur en eugénol, parmi les meilleurs au monde. Vin chaud, pains d'épices, bouillons.", formats: formats50(3.40), grad: ["#6E4A2E", "#432916"], image: "/images/girofle.jpg" },
  { id: 16, phare: true, cat: "Épices & Poivres", nom: "Vanille Bourbon Grade A", desc: "La référence mondiale. Gousses longues et charnues, débordantes de graines vanillées.", formats: formatsVanille(12.75), badge: "Best-seller", grad: ["#3A2A1C", "#1A0F08"], image: "/images/vanille.jpg" },
  // ---------- PLANTES & SUPERALIMENTS ----------
  { id: 17, cat: "Plantes & Superaliments", nom: "Stevia feuilles séchées", desc: "Sucrant naturel 0 calorie. Infusions, desserts, alternative au sucre.", formats: formats50(3.40), grad: ["#7BA05B", "#527437"], image: "/images/stevia-feuilles.jpg" },
  { id: 18, cat: "Plantes & Superaliments", nom: "Stevia en poudre", desc: "Bien plus sucrée que le sucre. Boissons, yaourts, pâtisseries et confitures.", formats: formats50(4.25), grad: ["#94B873", "#6A8F4A"], image: "/images/stevia-poudre.jpg" },
  { id: 19, cat: "Plantes & Superaliments", nom: "Moringa feuilles", desc: "L'arbre de vie : protéines, vitamines A et C, calcium. En infusion ou sur vos plats.", formats: formats50(3.40), grad: ["#4E7C3A", "#2F5222"], image: "/images/moringa-feuilles.jpg" },
  { id: 20, cat: "Plantes & Superaliments", nom: "Moringa en poudre", desc: "Poudre fine pour smoothies, jus et soupes. Concentration maximale en nutriments.", formats: formats50(4.25), grad: ["#3F6B2E", "#24431A"], image: "/images/moringa-poudre.jpg" },
  { id: 21, cat: "Plantes & Superaliments", nom: "Citronnelle séchée", desc: "Notes fraîches et citronnées. Infusions relaxantes, bouillons asiatiques, currys thaï.", formats: formats50(2.55), grad: ["#C5C26A", "#9A973F"], image: "/images/citronnelle.jpg" },
  { id: 22, cat: "Plantes & Superaliments", nom: "Fleurs d'hibiscus", desc: "Infusion rouge rubis, acidulée et antioxydante. Aussi en cocktails, sorbets, confitures.", formats: formats50(3.40), grad: ["#B5123C", "#7C0825"], image: "/images/hibiscus.jpg" },
  // ---------- MIELS ----------
  { id: 23, phare: true, cat: "Miels", nom: "Miel de Niaouli (monofloral)", desc: "Notes herbacées et mentholées, récolté artisanalement, non pasteurisé.", formats: formatsMiel(7.65), grad: ["#E2A52E", "#B57A12"], image: "/images/miel-niaouli.jpg" },
  { id: 24, cat: "Miels", nom: "Miel Polyfloral", desc: "Saveurs complexes et équilibrées, reflet de la biodiversité malgache.", formats: formatsMiel(5.95), grad: ["#D99423", "#A86A0D"], image: "/images/miel-polyfloral.jpg" },
  { id: 25, cat: "Miels", nom: "Miel de Palissandre (monofloral)", desc: "Notes boisées et florales uniques. Très rare sur le marché européen.", formats: formatsMiel(9.35), badge: "Rare", grad: ["#B5701E", "#7E480C"], image: "/images/miel-palissandre.jpg" },
];

const PHARES = "⭐ Produits phares";
const CATEGORIES = ["Tous", PHARES, "Épices & Poivres", "Plantes & Superaliments", "Miels"];

const eur = (n) => n.toFixed(2).replace(".", ",") + " €";
// Prix marché barré = nos prix sont -15% sous le marché
const marche = (p) => r5(p / 0.85);
// Recherche sans tenir compte des accents/majuscules
const normaliser = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Boutique() {
  const [page, setPage] = useState("boutique"); // "boutique" | "histoire"
  const [cat, setCat] = useState("Tous");
  const [recherche, setRecherche] = useState("");
  const [formatChoisi, setFormatChoisi] = useState({}); // id produit -> index format
  const [panier, setPanier] = useState({}); // "id|formatIdx" -> quantité
  const [drawer, setDrawer] = useState(false);
  const [contactForm, setContactForm] = useState({ prenom: "", nom: "", email: "", sujet: "", message: "" });
  const [compteTab, setCompteTab] = useState("connexion"); // "connexion" | "creer"
  const [detailId, setDetailId] = useState(null);
  const [checkout, setCheckout] = useState({ prenom: "", nom: "", email: "", adresse: "", cp: "", ville: "" });
  const [commande, setCommande] = useState(null);
  const [banniere, setBanniere] = useState(true);

  const ouvrirDetail = (id) => { setDetailId(id); setPage("detail"); window.scrollTo({ top: 0 }); };

  const SEUIL_PORT_OFFERT = 50;
  const FRAIS_PORT = 5.90;

  const confirmerCommande = () => {
    const numero = `ME-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const sousTotal = total;
    const livraison = sousTotal >= SEUIL_PORT_OFFERT ? 0 : FRAIS_PORT;
    setCommande({
      numero,
      date: new Date().toLocaleDateString("fr-FR"),
      client: { ...checkout },
      lignes: items.map((i) => ({ nom: i.nom, label: i.label, qte: i.qte, prix: i.prix })),
      sousTotal,
      livraison,
      total: sousTotal + livraison,
    });
    setPanier({});
    setDrawer(false);
    setPage("confirmation");
    window.scrollTo({ top: 0 });
  };

  const [factureVisible, setFactureVisible] = useState(false);
  const imprimerFacture = () => setFactureVisible(true);

  const envoyerContact = () => {
    const { prenom, nom, email, sujet, message } = contactForm;
    const corps = `Nom : ${prenom} ${nom}\nEmail : ${email}\nSujet : ${sujet}\n\n${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Contact site — " + (sujet || "Message"))}&body=${encodeURIComponent(corps)}`;
  };

  const produits = useMemo(() => {
    let liste =
      cat === "Tous" ? PRODUITS
      : cat === PHARES ? PRODUITS.filter((p) => p.phare)
      : PRODUITS.filter((p) => p.cat === cat);
    if (recherche.trim()) {
      const q = normaliser(recherche);
      liste = liste.filter((p) => normaliser(p.nom + " " + p.desc + " " + p.cat).includes(q));
    }
    return liste;
  }, [cat, recherche]);

  const items = Object.entries(panier)
    .filter(([, q]) => q > 0)
    .map(([cle, q]) => {
      const [id, fIdx] = cle.split("|").map(Number);
      const p = PRODUITS.find((x) => x.id === id);
      const f = p.formats[fIdx];
      return { cle, nom: p.nom, grad: p.grad, label: f.label, prix: f.prix, qte: q };
    });

  const total = items.reduce((s, i) => s + i.prix * i.qte, 0);
  const nbArticles = items.reduce((s, i) => s + i.qte, 0);

  const modifier = (cle, delta) =>
    setPanier((p) => ({ ...p, [cle]: Math.max(0, (p[cle] || 0) + delta) }));

  const ajouterProduit = (p) => {
    const fIdx = formatChoisi[p.id] || 0;
    modifier(`${p.id}|${fIdx}`, 1);
  };

  const messageCommande = () => {
    const lignes = items
      .map((i) => `• ${i.nom} (${i.label}) x${i.qte} = ${eur(i.prix * i.qte)}`)
      .join("\n");
    return `Bonjour, je souhaite commander :\n\n${lignes}\n\nTotal : ${eur(total)}\n\nMerci !`;
  };

  const lienWhatsApp = () =>
    `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(messageCommande())}`;
  const lienEmail = () =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent("Commande épices de Madagascar")}&body=${encodeURIComponent(messageCommande())}`;

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#F7F2E9", minHeight: "100vh", color: "#1A1714" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; }
        button { cursor: pointer; font-family: inherit; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 14px; }
        @media (min-width: 700px) { .grid { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px; } }
        .carte { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 4px rgba(42,33,26,.08); display: flex; flex-direction: column; transition: transform .15s, box-shadow .15s; }
        .carte:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(42,33,26,.14); }
        .btn-add { background: #15110D; color: #F7F2E9; border: none; border-radius: 10px; padding: 9px 0; font-weight: 600; font-size: 13px; width: 100%; transition: background .15s; letter-spacing: .3px; }
        .btn-add:hover { background: #C9A24B; color: #15110D; }
        .tab { border: 1.5px solid #15110D26; background: #fff; color: #15110D; border-radius: 999px; padding: 7px 14px; font-size: 13px; font-weight: 600; white-space: nowrap; }
        .tab.actif { background: #15110D; color: #C9A24B; border-color: #15110D; }
        .qty-btn { width: 28px; height: 28px; border-radius: 8px; border: 1.5px solid #15110D33; background: #fff; font-weight: 700; font-size: 15px; color: #15110D; }
        .select-format { width: 100%; padding: 8px 10px; border-radius: 10px; border: 1.5px solid #15110D2E; background: #F7F2E9; font-family: inherit; font-size: 13px; font-weight: 600; color: #1A1714; }
        .recherche { width: 100%; padding: 11px 14px 11px 40px; border-radius: 12px; border: 1.5px solid #15110D26; background: #fff; font-family: inherit; font-size: 14px; color: #1A1714; outline: none; }
        .recherche:focus { border-color: #C9A24B; }
        @media print {
          body * { visibility: hidden; }
          #facture, #facture * { visibility: visible; }
          #facture { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; }
          .no-print, header, footer { display: none !important; }
        }
      `}</style>

      {/* ===== BANDEAU LIVRAISON ===== */}
      {banniere && (
        <div style={{ background: "#15110D", color: "#C9A24B", textAlign: "center", padding: "9px 40px 9px 16px", position: "relative", fontSize: 12.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
          ✦ Livraison offerte dès 50 € d'achat partout en Europe ✦
          <button onClick={() => setBanniere(false)} aria-label="Fermer" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#C9A24B", fontSize: 16, cursor: "pointer" }}>✕</button>
        </div>
      )}

      {/* ===== EN-TÊTE ===== */}
      <header style={{ background: "#15110D", color: "#F7F2E9", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 14px rgba(0,0,0,.3)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div onClick={() => { setPage("boutique"); window.scrollTo({ top: 0 }); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 11 }}>
            <img src="/images/logo.jpg" alt="Madagascar Elixir" style={{ width: 46, height: 46, borderRadius: "50%", background: "#fff", objectFit: "cover", flexShrink: 0, boxShadow: "0 0 0 1.5px #C9A24B66" }} />
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>
                <span style={{ color: "#C9A24B" }}>Madagascar</span> Elixir
              </div>
              <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 2, textTransform: "uppercase", color: "#C9A24B" }}>Vanille · Épices · Miels</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => { setPage("compte"); window.scrollTo({ top: 0 }); }}
              aria-label="Mon compte"
              style={{ background: "none", border: "1.5px solid #C9A24B66", color: "#C9A24B", borderRadius: 12, padding: "8px 11px", fontSize: 15, cursor: "pointer" }}
            >
              👤
            </button>
            <button
              onClick={() => setDrawer(true)}
              style={{ background: "#C9A24B", color: "#15110D", border: "none", borderRadius: 12, padding: "9px 14px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 7 }}
            >
              🧺 Panier{nbArticles > 0 ? ` (${nbArticles})` : ""}
            </button>
          </div>
        </div>
        {/* Barre de navigation */}
        <nav style={{ borderTop: "1px solid #C9A24B26", display: "flex", justifyContent: "center", gap: 4, overflowX: "auto", padding: "0 8px" }}>
          {[
            { label: "Accueil", action: () => { setPage("boutique"); setCat("Tous"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
            { label: "Boutique", action: () => { setPage("boutique"); document.getElementById("produits")?.scrollIntoView({ behavior: "smooth" }); } },
            { label: "Notre Histoire", action: () => { setPage("histoire"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
            { label: "Contact", action: () => { setPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
          ].map((item) => (
            <button key={item.label} onClick={item.action} style={{ background: "none", border: "none", color: "#F7F2E9", fontSize: 13.5, fontWeight: 500, fontFamily: "inherit", padding: "10px 12px", whiteSpace: "nowrap", cursor: "pointer", opacity: 0.9 }}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {page === "boutique" && (<>
      {/* ===== HÉRO ===== */}
      <section style={{ position: "relative", background: "#F7F2E9", padding: "54px 20px 60px", textAlign: "center", overflow: "hidden" }}>
        {/* Logo en filigrane */}
        <img src="/images/logo.jpg" alt="" aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(420px, 90%)", opacity: 0.06, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(34px, 9vw, 56px)", fontWeight: 700, color: "#C9A24B", lineHeight: 1.05, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>
            Madagascar<br />Elixir
          </h1>
          {/* Séparateur décoratif */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "22px auto", maxWidth: 240 }}>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #C9A24B)" }} />
            <span style={{ color: "#C9A24B", fontSize: 16 }}>✦</span>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #C9A24B, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 17, color: "#4A4038", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 28px" }}>
            L'Essence Authentique de Madagascar<br />
            Vanille Bourbon &amp; Épices d'exception
          </p>
          <button onClick={() => document.getElementById("produits")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(90deg, #C9A24B, #9A7B2E)", color: "#15110D", border: "none", borderRadius: 4, padding: "16px 38px", fontWeight: 700, fontSize: 14, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 2, cursor: "pointer", boxShadow: "0 4px 14px rgba(201,162,75,.35)" }}>
            Découvrir la boutique
          </button>
        </div>
      </section>

      {/* Titre section produits */}
      <div style={{ textAlign: "center", padding: "34px 16px 0" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 6vw, 34px)", fontWeight: 700, color: "#15110D", textTransform: "uppercase", letterSpacing: 1 }}>Nos Produits</h2>
        <p style={{ fontSize: 13.5, color: "#9A7B2E", marginTop: 6 }}>Une sélection d'exception, droit venue de la Grande Île</p>
      </div>

      {/* ===== RECHERCHE + FILTRES ===== */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px 4px" }}>
        <div style={{ position: "relative", maxWidth: 480 }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.55 }}>🔍</span>
          <input
            className="recherche"
            type="text"
            placeholder="Rechercher une épice, un miel, une plante..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          {recherche && (
            <button
              onClick={() => setRecherche("")}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 16, color: "#9A8E80" }}
            >
              ✕
            </button>
          )}
        </div>
        <nav style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 12, paddingBottom: 4 }}>
          {CATEGORIES.map((c) => (
            <button key={c} className={`tab ${cat === c ? "actif" : ""}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </nav>
      </div>

      {/* ===== PRODUITS ===== */}
      <main id="produits" style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px 50px" }}>
        {produits.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9A8E80", padding: "50px 0", fontSize: 15 }}>
            Aucun produit ne correspond à « {recherche} ».<br />Essayez un autre mot-clé.
          </p>
        ) : (
          <div className="grid">
            {produits.map((p) => {
              const fIdx = formatChoisi[p.id] || 0;
              const f = p.formats[fIdx];
              const cle = `${p.id}|${fIdx}`;
              return (
                <article key={p.id} className="carte">
                  {/* Visuel : photo si dispo, sinon pastille colorée */}
                  <div onClick={() => ouvrirDetail(p.id)} style={{ position: "relative", aspectRatio: "1.15", background: `radial-gradient(circle at 35% 30%, ${p.grad[0]}, ${p.grad[1]})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    {p.image ? (
                      <img src={p.image} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontFamily: "'Fraunces', serif", color: "#FBF6EC", fontSize: 13, fontWeight: 500, textAlign: "center", padding: "0 12px", textShadow: "0 1px 3px rgba(0,0,0,.3)" }}>
                        {p.nom}
                      </span>
                    )}
                    {p.badge && (
                      <span style={{ position: "absolute", top: 8, left: 8, background: "#C9A24B", color: "#15110D", fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "12px 13px 14px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    <h3 onClick={() => ouvrirDetail(p.id)} style={{ fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 700, lineHeight: 1.25, cursor: "pointer" }}>{p.nom}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.45, color: "#5C5248", flex: 1 }}>{p.desc}</p>

                    {/* Choix du format */}
                    <select
                      className="select-format"
                      value={fIdx}
                      onChange={(e) => setFormatChoisi((s) => ({ ...s, [p.id]: Number(e.target.value) }))}
                    >
                      {p.formats.map((fmt, i) => (
                        <option key={fmt.label} value={i}>
                          {fmt.label} — {eur(fmt.prix)}
                        </option>
                      ))}
                    </select>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#9A7B2E" }}>{eur(f.prix)}</span>
                      <span style={{ fontSize: 12, color: "#9A8E80", textDecoration: "line-through" }}>{eur(marche(f.prix))}</span>
                      <span style={{ fontSize: 11.5, color: "#9A8E80", marginLeft: "auto" }}>{f.label}</span>
                    </div>

                    {panier[cle] > 0 ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                        <button className="qty-btn" onClick={() => modifier(cle, -1)}>−</button>
                        <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{panier[cle]}</span>
                        <button className="qty-btn" onClick={() => modifier(cle, 1)}>+</button>
                      </div>
                    ) : (
                      <button className="btn-add" onClick={() => ajouterProduit(p)}>Ajouter au panier</button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      </>)}

      {/* ===== PAGE NOTRE HISTOIRE ===== */}
      {page === "histoire" && (
        <main>
          {/* Héro histoire */}
          <section style={{ background: "linear-gradient(160deg, #15110D 0%, #2B2218 55%, #15110D 100%)", color: "#F7F2E9", padding: "44px 16px 52px", textAlign: "center" }}>
            <div style={{ fontSize: 12.5, opacity: 0.6, marginBottom: 14 }}>
              <button onClick={() => { setPage("boutique"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", color: "#C9A24B", cursor: "pointer", fontSize: 12.5 }}>Accueil</button> / Notre Histoire
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 5.5vw, 40px)", fontWeight: 700, maxWidth: 720, margin: "0 auto", lineHeight: 1.2 }}>
              « De la Grande Île à la Côte d'Azur, une passion pour les épices d'exception. »
            </h1>
          </section>

          <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 18px 60px" }}>
            {[
              { t: "L'Or Noir de Madagascar", p: [
                "Madagascar est mondialement reconnue pour produire la vanille la plus parfumée au monde. Cultivée dans la région SAVA, au nord-est de l'île, la vanille Bourbon (Vanilla planifolia) y trouve son terroir idéal : climat tropical humide, sols volcaniques riches, et un savoir-faire transmis depuis le XIXe siècle.",
                "Chaque gousse est le fruit d'un travail méticuleux : fécondation manuelle fleur par fleur, attente patiente de 9 mois pour la maturation, puis récolte verte avant un processus complexe d'échaudage, d'étuvage et de séchage qui dure jusqu'à six mois. C'est dans ce temps long que se développent les arômes complexes que nous aimons tant.",
              ]},
              { t: "De Madagascar à Nice", p: [
                "Madagascar Elixir est née d'une rencontre entre deux passions : celle des producteurs malgaches qui perpétuent un savoir-faire ancestral, et la nôtre, ici à Nice, pour les produits d'exception.",
                "Notre mission est simple : relier directement les producteurs aux amateurs européens, sans intermédiaires inutiles. Nous travaillons en partenariat direct avec des coopératives malgaches qui rémunèrent dignement les cultivateurs et préservent les méthodes traditionnelles.",
                "Depuis notre atelier niçois, nous sélectionnons, conditionnons et expédions chaque commande avec le même soin que si nous l'offrions.",
              ]},
            ].map((s) => (
              <section key={s.t} style={{ marginBottom: 34 }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 700, color: "#15110D", marginBottom: 14, borderLeft: "3px solid #C9A24B", paddingLeft: 12 }}>{s.t}</h2>
                {s.p.map((para, i) => (
                  <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: "#3A332B", marginBottom: 12 }}>{para}</p>
                ))}
              </section>
            ))}

            {/* Au-delà de la vanille */}
            <section style={{ marginBottom: 34 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 700, color: "#15110D", marginBottom: 14, borderLeft: "3px solid #C9A24B", paddingLeft: 12 }}>Au-delà de la vanille</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#3A332B", marginBottom: 12 }}>La vanille n'est que le début de l'aventure. Madagascar regorge de trésors aromatiques :</p>
              <ul style={{ fontSize: 15, lineHeight: 1.8, color: "#3A332B", paddingLeft: 20, margin: "0 0 12px" }}>
                <li><strong>Le poivre Voatsiperifery</strong> — sauvage, grimpant aux arbres, aux notes florales uniques</li>
                <li><strong>Le café Bourbon Pointu</strong> — variété rare d'arabica, faible en caféine</li>
                <li><strong>Le cumin, le clou de girofle, la cannelle</strong> — produits aux arômes incomparables</li>
                <li><strong>Le cacao d'Ambanja</strong> — bientôt disponible, l'un des meilleurs du monde</li>
              </ul>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#3A332B" }}>Notre catalogue s'enrichit progressivement, toujours dans la même exigence de qualité.</p>
            </section>

            {/* Engagements */}
            <section style={{ marginBottom: 34, background: "#fff", borderRadius: 16, padding: "24px 22px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 700, color: "#15110D", marginBottom: 16 }}>Nos engagements</h2>
              {[
                ["🤝 Commerce équitable", "rémunération juste des producteurs"],
                ["🔍 Traçabilité totale", "chaque lot est identifié et traçable"],
                ["📦 Conditionnement soigné", "verre, kraft, matériaux durables"],
                ["⚡ Expédition rapide", "sous 48h ouvrées depuis Nice"],
                ["💬 Service client à l'écoute", "par WhatsApp, email ou téléphone"],
              ].map(([t, d]) => (
                <div key={t} style={{ display: "flex", gap: 8, padding: "7px 0", fontSize: 14.5, lineHeight: 1.5, borderBottom: "1px solid #00000010" }}>
                  <span style={{ fontWeight: 700, color: "#15110D", whiteSpace: "nowrap" }}>{t}</span>
                  <span style={{ color: "#6B6157" }}>— {d}</span>
                </div>
              ))}
            </section>

            {/* Citation */}
            <blockquote style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "#15110D", textAlign: "center", borderTop: "1px solid #C9A24B55", borderBottom: "1px solid #C9A24B55", padding: "24px 10px", margin: "0 0 30px" }}>
              « Nous croyons que les meilleures épices se transmettent avec une histoire. Madagascar Elixir, c'est notre façon de partager celle des producteurs malgaches avec les tables d'Europe. »
            </blockquote>

            <div style={{ textAlign: "center" }}>
              <button onClick={() => { setPage("boutique"); setCat("Tous"); window.scrollTo({ top: 0 }); }} style={{ background: "#15110D", color: "#C9A24B", border: "none", borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 15, fontFamily: "inherit", cursor: "pointer" }}>
                Découvrir nos produits
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ===== PAGE CONTACT ===== */}
      {page === "contact" && (
        <main>
          <section style={{ background: "linear-gradient(160deg, #15110D 0%, #2B2218 55%, #15110D 100%)", color: "#F7F2E9", padding: "40px 16px 46px", textAlign: "center" }}>
            <div style={{ fontSize: 12.5, opacity: 0.6, marginBottom: 14 }}>
              <button onClick={() => { setPage("boutique"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", color: "#C9A24B", cursor: "pointer", fontSize: 12.5 }}>Accueil</button> / Contact
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 700, margin: 0 }}>Contactez-nous</h1>
          </section>

          <style>{`.contact-grid { display: grid; grid-template-columns: 1fr; gap: 28px; } @media (min-width: 760px) { .contact-grid { grid-template-columns: 1fr 1fr; align-items: start; } }`}</style>
          <div className="contact-grid" style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 18px 60px" }}>

            {/* Colonne infos */}
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#9A7B2E" }}>Madagascar Elixir</div>
              <p style={{ fontSize: 14, color: "#6B6157", lineHeight: 1.6, marginTop: 8 }}>
                Société basée à Nice, France.<br />Vente de vanille Bourbon et épices d'exception de Madagascar à destination de l'Europe.
              </p>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontWeight: 700, color: "#9A7B2E", fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>📍 Adresse</div>
                <p style={{ fontSize: 14, color: "#3A332B", marginTop: 6, lineHeight: 1.6 }}>Madagascar Elixir<br />06000 Nice, France</p>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, color: "#9A7B2E", fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>✉ Email</div>
                <a href={`mailto:${CONTACT.email}`} style={{ fontSize: 14, color: "#9A7B2E", marginTop: 6, display: "inline-block", textDecoration: "none" }}>{CONTACT.email}</a>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, color: "#9A7B2E", fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>☎ Téléphone</div>
                <a href={`tel:+${CONTACT.whatsapp}`} style={{ fontSize: 14, color: "#9A7B2E", marginTop: 6, display: "block", textDecoration: "none" }}>07 45 09 10 14</a>
                <p style={{ fontSize: 12.5, color: "#6B6157", marginTop: 2 }}>Lun-Ven · 9h-18h</p>
              </div>

              {/* Encadré WhatsApp */}
              <div style={{ marginTop: 24, border: "1.5px solid #25D366", borderRadius: 14, padding: "18px 16px" }}>
                <div style={{ fontWeight: 700, color: "#1FA35A", fontSize: 14.5 }}>💬 Service après-vente WhatsApp</div>
                <p style={{ fontSize: 13.5, color: "#3A332B", lineHeight: 1.55, margin: "8px 0 14px" }}>Pour un suivi de commande, une question SAV ou simplement nous parler, contactez-nous directement sur WhatsApp.</p>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", border: "1.5px solid #25D366", color: "#1FA35A", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 13.5, textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5 }}>💬 Discuter sur WhatsApp</a>
              </div>
            </div>

            {/* Colonne formulaire */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "26px 22px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#15110D", textAlign: "center", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>Envoyer un message</h2>
              {[
                ["prenom", "Prénom", "text"],
                ["nom", "Nom", "text"],
                ["email", "Email", "email"],
              ].map(([key, label, type]) => (
                <label key={key} style={{ display: "block", marginBottom: 14 }}>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</span>
                  <input type={type} value={contactForm[key]} onChange={(e) => setContactForm((f) => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                </label>
              ))}

              <label style={{ display: "block", marginBottom: 14 }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Sujet</span>
                <select value={contactForm.sujet} onChange={(e) => setContactForm((f) => ({ ...f, sujet: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }}>
                  <option value="">— Choisir —</option>
                  <option>Question sur un produit</option>
                  <option>Suivi de commande</option>
                  <option>Commande professionnelle / gros volume</option>
                  <option>Autre demande</option>
                </select>
              </label>

              <label style={{ display: "block", marginBottom: 18 }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Message</span>
                <textarea rows={5} value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", resize: "vertical", background: "#FCFAF5" }} />
              </label>

              <button onClick={envoyerContact} style={{ width: "100%", background: "linear-gradient(90deg, #C9A24B, #9A7B2E)", color: "#15110D", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, fontSize: 15, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Envoyer</button>
            </div>
          </div>
        </main>
      )}

      {/* ===== PAGE MON COMPTE ===== */}
      {page === "compte" && (
        <main>
          <section style={{ background: "linear-gradient(160deg, #15110D 0%, #2B2218 55%, #15110D 100%)", color: "#F7F2E9", padding: "40px 16px 46px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 2 }}>Mon Compte</h1>
            <div style={{ fontSize: 12.5, opacity: 0.6, marginTop: 12 }}>
              <button onClick={() => { setPage("boutique"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", color: "#C9A24B", cursor: "pointer", fontSize: 12.5 }}>Accueil</button> / Mon Compte
            </div>
          </section>

          <div style={{ maxWidth: 520, margin: "0 auto", padding: "30px 18px 60px" }}>
            {/* Onglets */}
            <div style={{ display: "flex", borderBottom: "1px solid #15110D1F", marginBottom: 26 }}>
              {[["connexion", "Connexion"], ["creer", "Créer un compte"]].map(([key, label]) => (
                <button key={key} onClick={() => setCompteTab(key)} style={{ flex: 1, background: "none", border: "none", borderBottom: compteTab === key ? "2px solid #C9A24B" : "2px solid transparent", color: compteTab === key ? "#9A7B2E" : "#6B6157", fontFamily: "inherit", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "12px 0", cursor: "pointer" }}>{label}</button>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
              {compteTab === "connexion" ? (
                <>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#9A7B2E", textAlign: "center", marginBottom: 22, textTransform: "uppercase", letterSpacing: 1 }}>Se connecter</h2>
                  {[["Email", "email"], ["Mot de passe", "password"]].map(([label, type]) => (
                    <label key={label} style={{ display: "block", marginBottom: 16 }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</span>
                      <input type={type} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                    </label>
                  ))}
                  <button onClick={() => alert("La connexion sera bientôt disponible.")} style={{ width: "100%", marginTop: 6, background: "linear-gradient(90deg, #C9A24B, #9A7B2E)", color: "#15110D", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, fontSize: 15, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Se connecter</button>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#9A7B2E", textAlign: "center", marginBottom: 22, textTransform: "uppercase", letterSpacing: 1 }}>Créer un compte</h2>
                  {[["Prénom", "text"], ["Nom", "text"], ["Email", "email"], ["Mot de passe", "password"]].map(([label, type]) => (
                    <label key={label} style={{ display: "block", marginBottom: 16 }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</span>
                      <input type={type} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                    </label>
                  ))}
                  <button onClick={() => alert("La création de compte sera bientôt disponible.")} style={{ width: "100%", marginTop: 6, background: "linear-gradient(90deg, #C9A24B, #9A7B2E)", color: "#15110D", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, fontSize: 15, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Créer mon compte</button>
                </>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ===== PAGE FICHE PRODUIT ===== */}
      {page === "detail" && (() => {
        const p = PRODUITS.find((x) => x.id === detailId);
        if (!p) return null;
        const fIdx = formatChoisi[p.id] || 0;
        const f = p.formats[fIdx];
        const cle = `${p.id}|${fIdx}`;
        const similaires = PRODUITS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
        return (
          <main>
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 18px 60px" }}>
              <div style={{ fontSize: 12.5, color: "#6B6157", marginBottom: 18 }}>
                <button onClick={() => { setPage("boutique"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", color: "#9A7B2E", cursor: "pointer", fontSize: 12.5 }}>Accueil</button>
                {" / "}
                <button onClick={() => { setPage("boutique"); setCat(p.cat); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", color: "#9A7B2E", cursor: "pointer", fontSize: 12.5 }}>{p.cat}</button>
                {" / "}<span>{p.nom}</span>
              </div>

              <style>{`.fiche { display: grid; grid-template-columns: 1fr; gap: 26px; } @media (min-width: 760px) { .fiche { grid-template-columns: 1fr 1fr; align-items: start; } }`}</style>
              <div className="fiche">
                {/* Image */}
                <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "1.1", background: `radial-gradient(circle at 35% 30%, ${p.grad[0]}, ${p.grad[1]})`, boxShadow: "0 4px 18px rgba(0,0,0,.1)" }}>
                  {p.image && <img src={p.image} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  {p.badge && <span style={{ position: "absolute", top: 12, left: 12, background: "#C9A24B", color: "#15110D", fontSize: 11, fontWeight: 700, padding: "5px 11px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.badge}</span>}
                </div>

                {/* Infos */}
                <div>
                  <div style={{ fontSize: 12, color: "#9A7B2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{p.cat}</div>
                  <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 700, color: "#15110D", margin: "6px 0 14px", lineHeight: 1.15 }}>{p.nom}</h1>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#3A332B", marginBottom: 20 }}>{p.desc}</p>

                  {/* Prix */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 30, fontWeight: 700, color: "#9A7B2E" }}>{eur(f.prix)}</span>
                    <span style={{ fontSize: 15, color: "#9A8E80", textDecoration: "line-through" }}>{eur(marche(f.prix))}</span>
                    <span style={{ fontSize: 12, background: "#C9A24B22", color: "#9A7B2E", fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>-15%</span>
                  </div>

                  {/* Format */}
                  <label style={{ display: "block", marginBottom: 18 }}>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 7 }}>Format</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.formats.map((fmt, i) => (
                        <button key={fmt.label} onClick={() => setFormatChoisi((s) => ({ ...s, [p.id]: i }))} style={{ border: i === fIdx ? "2px solid #C9A24B" : "1.5px solid #15110D26", background: i === fIdx ? "#C9A24B1A" : "#fff", color: "#15110D", borderRadius: 10, padding: "9px 14px", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                          {fmt.label}<br /><span style={{ fontSize: 12, color: "#9A7B2E" }}>{eur(fmt.prix)}</span>
                        </button>
                      ))}
                    </div>
                  </label>

                  {/* Ajout panier */}
                  {panier[cle] > 0 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                      <button className="qty-btn" onClick={() => modifier(cle, -1)}>−</button>
                      <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>{panier[cle]}</span>
                      <button className="qty-btn" onClick={() => modifier(cle, 1)}>+</button>
                      <span style={{ fontSize: 13.5, color: "#6B6157" }}>dans le panier</span>
                    </div>
                  ) : (
                    <button onClick={() => modifier(cle, 1)} style={{ width: "100%", background: "#15110D", color: "#C9A24B", border: "none", borderRadius: 12, padding: "15px 0", fontWeight: 700, fontSize: 15, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", marginBottom: 18 }}>Ajouter au panier</button>
                  )}

                  {/* Réassurance */}
                  <div style={{ borderTop: "1px solid #15110D14", paddingTop: 16, fontSize: 13.5, color: "#6B6157", lineHeight: 1.9 }}>
                    🌿 100% naturel, sans additifs ni conservateurs<br />
                    ✋ Sélectionné à la main à Madagascar<br />
                    📦 Expédié depuis Nice sous 48h
                  </div>
                </div>
              </div>

              {/* Produits similaires */}
              {similaires.length > 0 && (
                <div style={{ marginTop: 50 }}>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 700, color: "#15110D", marginBottom: 18 }}>Vous aimerez aussi</h2>
                  <div className="grid">
                    {similaires.map((s) => (
                      <article key={s.id} className="carte">
                        <div onClick={() => ouvrirDetail(s.id)} style={{ aspectRatio: "1.15", background: `radial-gradient(circle at 35% 30%, ${s.grad[0]}, ${s.grad[1]})`, cursor: "pointer" }}>
                          {s.image && <img src={s.image} alt={s.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        </div>
                        <div style={{ padding: "10px 12px 13px" }}>
                          <h3 onClick={() => ouvrirDetail(s.id)} style={{ fontFamily: "'Fraunces', serif", fontSize: 14.5, fontWeight: 700, lineHeight: 1.25, cursor: "pointer", marginBottom: 6 }}>{s.nom}</h3>
                          <span style={{ fontSize: 16, fontWeight: 700, color: "#9A7B2E" }}>{eur(s.formats[0].prix)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        );
      })()}

      {/* ===== PAGE CHECKOUT (coordonnées de livraison) ===== */}
      {page === "checkout" && (
        <main>
          <section style={{ background: "linear-gradient(160deg, #15110D 0%, #2B2218 55%, #15110D 100%)", color: "#F7F2E9", padding: "36px 16px 42px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 1.5 }}>Finaliser ma commande</h1>
          </section>
          <div style={{ maxWidth: 560, margin: "0 auto", padding: "30px 18px 60px" }}>
            {items.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6B6157", padding: "30px 0" }}>Votre panier est vide.</p>
            ) : (
              <>
                {/* Récap */}
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px 18px", marginBottom: 22, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#15110D", marginBottom: 10 }}>Récapitulatif</div>
                  {items.map((i) => (
                    <div key={i.cle} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#3A332B", padding: "4px 0" }}>
                      <span>{i.qte}× {i.nom} ({i.label})</span>
                      <span>{eur(i.prix * i.qte)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#6B6157", padding: "4px 0", borderTop: "1px solid #00000012", marginTop: 6 }}>
                    <span>Livraison</span>
                    <span>{total >= SEUIL_PORT_OFFERT ? "Offerte" : eur(FRAIS_PORT)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, color: "#9A7B2E", paddingTop: 8 }}>
                    <span>Total</span>
                    <span>{eur(total + (total >= SEUIL_PORT_OFFERT ? 0 : FRAIS_PORT))}</span>
                  </div>
                </div>

                {/* Formulaire livraison */}
                <div style={{ background: "#fff", borderRadius: 14, padding: "22px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#15110D", marginBottom: 16 }}>Coordonnées de livraison</div>
                  {[["prenom", "Prénom"], ["nom", "Nom"], ["email", "Email"], ["adresse", "Adresse"]].map(([key, label]) => (
                    <label key={key} style={{ display: "block", marginBottom: 13 }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 5 }}>{label}</span>
                      <input type={key === "email" ? "email" : "text"} value={checkout[key]} onChange={(e) => setCheckout((c) => ({ ...c, [key]: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                    </label>
                  ))}
                  <div style={{ display: "flex", gap: 12 }}>
                    <label style={{ flex: "0 0 38%" }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 5 }}>Code postal</span>
                      <input value={checkout.cp} onChange={(e) => setCheckout((c) => ({ ...c, cp: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                    </label>
                    <label style={{ flex: 1 }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B6157", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 5 }}>Ville</span>
                      <input value={checkout.ville} onChange={(e) => setCheckout((c) => ({ ...c, ville: e.target.value }))} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "1.5px solid #15110D26", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#FCFAF5" }} />
                    </label>
                  </div>
                  <button onClick={confirmerCommande} disabled={!checkout.prenom || !checkout.nom || !checkout.email} style={{ width: "100%", marginTop: 18, background: (!checkout.prenom || !checkout.nom || !checkout.email) ? "#cfc4ad" : "#15110D", color: "#C9A24B", border: "none", borderRadius: 10, padding: "15px 0", fontWeight: 700, fontSize: 15, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Confirmer la commande</button>
                  <p style={{ fontSize: 11.5, color: "#9A8E80", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>Le paiement sécurisé sera finalisé après confirmation. Vous recevrez votre facture immédiatement.</p>
                </div>
              </>
            )}
          </div>
        </main>
      )}

      {/* ===== PAGE CONFIRMATION ===== */}
      {page === "confirmation" && commande && (
        <main>
          <section className="no-print" style={{ background: "linear-gradient(160deg, #15110D 0%, #2B2218 55%, #15110D 100%)", color: "#F7F2E9", padding: "40px 16px 46px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 1.5, color: "#C9A24B" }}>Commande confirmée</h1>
            <p style={{ fontSize: 14, opacity: 0.8, marginTop: 10 }}>Merci pour votre confiance.</p>
          </section>

          <div className="no-print" style={{ maxWidth: 620, margin: "0 auto", padding: "32px 18px 60px" }}>
            <div style={{ border: "1px solid #15110D1F", borderRadius: 14, padding: "24px 22px" }}>
              <div style={{ fontSize: 14, color: "#3A332B", lineHeight: 1.9 }}>
                <div>N° de commande : <strong>{commande.numero}</strong></div>
                <div>Date : {commande.date}</div>
              </div>
              <div style={{ borderTop: "1px solid #15110D1F", margin: "16px 0", paddingTop: 16 }}>
                {commande.lignes.map((l, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#3A332B", padding: "5px 0" }}>
                    <span>{l.qte}× {l.nom} — {l.label}</span>
                    <span>{eur(l.prix * l.qte)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #15110D1F", paddingTop: 14, fontSize: 14, color: "#3A332B" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span>Sous-total</span><span>{eur(commande.sousTotal)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span>Livraison</span><span>{commande.livraison === 0 ? "Offerte" : eur(commande.livraison)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17, color: "#9A7B2E", paddingTop: 8 }}><span>Total</span><span>{eur(commande.total)}</span></div>
              </div>
              <button onClick={imprimerFacture} style={{ display: "block", margin: "22px auto 0", background: "none", border: "1.5px solid #C9A24B", color: "#9A7B2E", borderRadius: 10, padding: "12px 24px", fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>📄 Télécharger la facture</button>
            </div>
            <p style={{ textAlign: "center", fontSize: 13.5, color: "#6B6157", marginTop: 22, lineHeight: 1.6 }}>Un e-mail de confirmation vient d'être envoyé.<br />Votre colis sera expédié de Nice sous 48h ouvrées.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
              <button onClick={() => { setPage("boutique"); setCat("Tous"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "1.5px solid #15110D33", color: "#15110D", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 13.5, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer" }}>Continuer mes achats</button>
            </div>
          </div>

          {/* ===== FACTURE (aperçu plein écran + impression) ===== */}
          {factureVisible && (
            <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(20,17,12,.55)", overflowY: "auto", padding: "16px 0" }}>
              {/* Barre d'actions (masquée à l'impression) */}
              <div className="no-print" style={{ maxWidth: 720, margin: "0 auto 12px", display: "flex", gap: 10, justifyContent: "flex-end", padding: "0 12px" }}>
                <button onClick={() => window.print()} style={{ background: "#C9A24B", color: "#15110D", border: "none", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer" }}>🖨️ Imprimer / Enregistrer en PDF</button>
                <button onClick={() => setFactureVisible(false)} style={{ background: "#fff", color: "#15110D", border: "none", borderRadius: 10, padding: "11px 16px", fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer" }}>Fermer ✕</button>
              </div>
          <div id="facture" style={{ maxWidth: 720, margin: "0 auto", padding: "30px 28px", background: "#fff", color: "#1A1714", borderRadius: 12, boxShadow: "0 10px 40px rgba(0,0,0,.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <img src="/images/logo.jpg" alt="Madagascar Elixir" style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>FACTURE</div>
                <div style={{ fontSize: 13, color: "#9A7B2E", marginTop: 6 }}>N° {commande.numero}</div>
                <div style={{ fontSize: 12.5, color: "#6B6157" }}>Date : {commande.date}</div>
              </div>
            </div>
            <div style={{ borderTop: "2px solid #C9A24B", margin: "14px 0 22px" }} />
            <div style={{ display: "flex", gap: 30, marginBottom: 26 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#9A7B2E", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #C9A24B55", paddingBottom: 5, marginBottom: 8 }}>Émetteur</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "#3A332B" }}>
                  <strong>Madagascar Elixir</strong><br />
                  Vanille &amp; Épices d'Exception<br />
                  06000 Nice, France<br />
                  {CONTACT.email}<br />
                  SIRET : 887 883 007<br />
                  TVA intracom. : FR00000000000
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#9A7B2E", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #C9A24B55", paddingBottom: 5, marginBottom: 8 }}>Facturé à</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "#3A332B" }}>
                  {commande.client.prenom} {commande.client.nom}<br />
                  {commande.client.adresse}<br />
                  {commande.client.cp} {commande.client.ville}<br />
                  {commande.client.email}
                </div>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 18 }}>
              <thead>
                <tr style={{ background: "#15110D", color: "#fff" }}>
                  <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 11.5 }}>Désignation</th>
                  <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 11.5 }}>Qté</th>
                  <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 11.5 }}>PU HT</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 11.5 }}>Total HT</th>
                </tr>
              </thead>
              <tbody>
                {commande.lignes.map((l, i) => {
                  const puHT = l.prix / 1.055;
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #00000012" }}>
                      <td style={{ padding: "10px 12px", color: "#9A7B2E" }}>{l.nom} — {l.label}</td>
                      <td style={{ padding: "10px 8px", textAlign: "center" }}>{l.qte}</td>
                      <td style={{ padding: "10px 8px", textAlign: "right" }}>{eur(puHT)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>{eur(puHT * l.qte)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginLeft: "auto", width: 240, fontSize: 13.5 }}>
              {(() => {
                const ttc = commande.total;
                const ht = ttc / 1.055;
                const tva = ttc - ht;
                return (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: "#3A332B" }}><span>Total HT</span><span>{eur(ht)}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: "#3A332B" }}><span>TVA (5,5%)</span><span>{eur(tva)}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid #C9A24B55", marginTop: 4, fontWeight: 700, fontSize: 16, color: "#9A7B2E" }}><span>Total TTC</span><span>{eur(ttc)}</span></div>
                  </>
                );
              })()}
            </div>
            <div style={{ borderTop: "1px solid #00000012", marginTop: 30, paddingTop: 16, textAlign: "center", fontSize: 11.5, color: "#6B6157", lineHeight: 1.7 }}>
              Conditions : Paiement à la commande par carte bancaire (Stripe).<br />
              Les denrées alimentaires fragiles peuvent ne pas être éligibles au droit de rétractation (art. L221-28 du Code de la Consommation).<br /><br />
              Merci pour votre confiance — Madagascar Elixir
            </div>
          </div>
            </div>
          )}
        </main>
      )}

      {/* ===== PIED DE PAGE ===== */}
      <footer style={{ background: "#15110D", color: "#F7F2E9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px 0" }}>
          {/* Marque + accroche */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <img src="/images/logo.jpg" alt="Madagascar Elixir" style={{ width: 92, height: 92, borderRadius: "50%", background: "#fff", objectFit: "cover", marginBottom: 14, boxShadow: "0 0 0 2px #C9A24B66" }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700 }}>
              <span style={{ color: "#C9A24B" }}>Madagascar</span> Elixir
            </div>
            <p style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.6 }}>
              L'Essence Authentique de Madagascar<br />
              <span style={{ color: "#C9A24B" }}>Vanille Bourbon · Épices d'exception</span>
            </p>
            <p style={{ fontSize: 12.5, opacity: 0.6, marginTop: 12 }}>
              📦 Expédié depuis Nice, France — vers toute l'Europe
            </p>
          </div>

          {/* Colonnes de liens */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, borderTop: "1px solid #C9A24B33", paddingTop: 28 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#C9A24B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Boutique</div>
              {[["Vanille Bourbon", "Épices & Poivres"], ["Épices", "Épices & Poivres"], ["Plantes & Miels", "Miels"], ["Tous les produits", "Tous"]].map(([label, c]) => (
                <button key={label} onClick={() => { setCat(c); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ display: "block", background: "none", border: "none", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textAlign: "left", cursor: "pointer" }}>{label}</button>
              ))}
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#C9A24B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Informations</div>
              <button onClick={() => { setPage("histoire"); window.scrollTo({ top: 0 }); }} style={{ display: "block", background: "none", border: "none", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textAlign: "left", cursor: "pointer" }}>Notre histoire</button>
              {["CGV", "Mentions légales", "Confidentialité", "Rétractation"].map((label) => (
                <a key={label} href="#" style={{ display: "block", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textDecoration: "none" }}>{label}</a>
              ))}
            </div>

            <div id="contact">
              <div style={{ fontWeight: 700, fontSize: 13, color: "#C9A24B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Contact</div>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "block", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textDecoration: "none" }}>{CONTACT.email}</a>
              <a href={`tel:+${CONTACT.whatsapp}`} style={{ display: "block", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textDecoration: "none" }}>📞 07 45 09 10 14</a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: "block", color: "#F7F2E9", opacity: 0.8, fontSize: 13.5, padding: "5px 0", textDecoration: "none" }}>💬 WhatsApp SAV</a>
            </div>
          </div>

          {/* Barre du bas */}
          <div style={{ borderTop: "1px solid #C9A24B33", marginTop: 28, padding: "18px 0", textAlign: "center" }}>
            <p style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.7 }}>
              © {new Date().getFullYear()} Madagascar Elixir · Nice, France · Tous droits réservés<br />
              TVA 5,5% · Paiement sécurisé Stripe · RGPD
            </p>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>TERRALINK DROP — SIRET : 887 883 007</p>
          </div>
        </div>
      </footer>

      {/* ===== PANIER (TIROIR) ===== */}
      {drawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          <div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, background: "rgba(20,17,12,.5)" }} />
          <aside style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(380px, 92vw)", background: "#F7F2E9", display: "flex", flexDirection: "column", boxShadow: "-8px 0 30px rgba(0,0,0,.25)" }}>
            <div style={{ padding: "16px 18px", background: "#15110D", color: "#F7F2E9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontFamily: "'Fraunces', serif", fontSize: 18 }}>Mon panier</strong>
              <button onClick={() => setDrawer(false)} style={{ background: "none", border: "none", color: "#FBF6EC", fontSize: 22 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {items.length === 0 ? (
                <p style={{ textAlign: "center", color: "#9A8E80", marginTop: 40, fontSize: 14 }}>
                  Votre panier est vide.<br />Ajoutez des épices pour commencer !
                </p>
              ) : (
                items.map((i) => (
                  <div key={i.cle} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2A211A14" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: `radial-gradient(circle at 35% 30%, ${i.grad[0]}, ${i.grad[1]})` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{i.nom}</div>
                      <div style={{ fontSize: 12, color: "#9A8E80" }}>{i.label} · {eur(i.prix)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="qty-btn" onClick={() => modifier(i.cle, -1)}>−</button>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{i.qte}</span>
                      <button className="qty-btn" onClick={() => modifier(i.cle, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div style={{ padding: 16, borderTop: "1.5px solid #2A211A1F", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
                  <span>Total</span>
                  <span style={{ color: "#9A7B2E" }}>{eur(total)}</span>
                </div>
                <button onClick={() => { setDrawer(false); setPage("checkout"); window.scrollTo({ top: 0 }); }} style={{ display: "block", width: "100%", textAlign: "center", background: "linear-gradient(90deg, #C9A24B, #9A7B2E)", color: "#15110D", border: "none", borderRadius: 12, padding: "13px 0", fontWeight: 700, fontSize: 14.5, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", marginBottom: 10 }}>
                  Valider ma commande
                </button>
                <div style={{ textAlign: "center", fontSize: 11.5, color: "#9A8E80", margin: "0 0 10px" }}>ou commander directement :</div>
                <a href={lienWhatsApp()} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#25D366", color: "#fff", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 14.5, textDecoration: "none", marginBottom: 8 }}>
                  Commander par WhatsApp
                </a>
                <a href={lienEmail()} style={{ display: "block", textAlign: "center", background: "#15110D", color: "#F7F2E9", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}>
                  Commander par e-mail
                </a>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ===== BOUTON WHATSAPP FLOTTANT ===== */}
      <a
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="no-print"
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 90, width: 58, height: 58, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,.28)", textDecoration: "none", border: "2px solid #C9A24B" }}
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.5 16 4.5S27.1 9.5 27.1 15 22.1 24.8 16 24.8zm6.1-7.4c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.8-1.9-1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.9.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.6-.4z"/></svg>
      </a>
    </div>
  );
}
