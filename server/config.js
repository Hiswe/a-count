
import rc from 'rc'

const config      = rc( `concompte`, {
  // Default product
  address: '# Nom prénom  \n18 park road  \n5000 City',
  quotation: {
    mentions: '**Modalité de paiement :** 40% après acceptation du devis  \nPaiement des 60% dans le mois suivant la livraison. *(10% Taux des pénalités de retard)*  \n **Date de livraison :** Livraison en 1 mois maximum a compté de la date d’acceptation du devis.  \n**Pour accepter ce devis :**\n- signez ci-dessous avec la mention “bon pour accord”\n- renvoyez-le'
  },
  currency: '€',
  tax: 5.5,
  defaultProduct: {
    quantity: 1,
    price:    350,
  },
  // (PR|FA)AAMM-XXXX
  quotation: {
    prefix:     'PR',
    startingAt: 350,
  },
  invoice: {
    prefix:     'FA',
    startingAt: 700,
  }
})

config.PORT       = config.PORT || process.env.PORT || 3000

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

export { config as default }
