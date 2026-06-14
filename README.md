# Madagascar Elixir — Boutique en ligne

Vanille Bourbon, épices et miels d'exception de Madagascar.
React + Vite, déployé sur Netlify.

## Le site contient
- Page d'accueil (bandeau livraison, héro avec logo, bouton WhatsApp flottant)
- Boutique : 25 produits, recherche, formats 50g→1kg, filtre Produits phares
- Fiche produit détaillée (clic sur un produit)
- Pages : Notre Histoire, Contact (formulaire), Mon Compte
- Tunnel de commande : panier → coordonnées → confirmation → facture PDF
- Thème noir & or, identité Madagascar Elixir

## 📲 Mise en ligne depuis un iPhone

### 1. Créer le repo GitHub
- github.com → **+** → **New repository**
- Nom : `madagascar-elixir` → public, sans README → **Create repository**

### 2. Uploader les fichiers
- **Add file → Upload files** : glisser `package.json`, `vite.config.js`,
  `index.html`, `netlify.toml`, `README.md` → **Commit changes**
- **Add file → Create new file**, taper `src/App.jsx`, coller le contenu
  du fichier App.jsx fourni → **Commit**. Pareil pour `src/main.jsx`.
- Photos : **Add file → Create new file**, taper `public/images/.gitkeep`,
  écrire `x`, **Commit** (crée le dossier). Ouvrir `public/images` →
  **Add file → Upload files** → glisser les 24 fichiers .jpg (dont logo.jpg)
  → **Commit**. Supprimer `.gitkeep` ensuite.

### 3. Connecter à Netlify
- app.netlify.com → **Add new site → Import an existing project**
- GitHub → `madagascar-elixir` → Netlify lit `netlify.toml` tout seul → **Deploy**
- En ligne en ~2 minutes 🎉

## ✏️ Modifier ensuite
- **Textes / prix / produits** : éditer `src/App.jsx` (sur iPhone : supprimer
  puis recréer le fichier — ta méthode habituelle)
- **Photos** : remplacer le .jpg correspondant dans `public/images/`
- Chaque commit redéploie automatiquement le site

## ⚠️ À savoir
- **Paiement** : la commande génère une facture mais n'encaisse pas encore
  (pas de Stripe). Pour les vrais paiements par carte, il faudra ajouter
  Stripe + une fonction Netlify — à voir plus tard.
- **Comptes clients** : la page Mon Compte est visuelle ; l'activer nécessite
  un service d'authentification (Firebase, Supabase).
