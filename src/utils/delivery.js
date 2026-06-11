export function calculateDelivery({ distanceKm = 3.2, zone = "standard", cartValue = 0 }) {
  const zoneMultiplier = {
    central: 0.85,
    standard: 1,
    express: 1.25,
    outskirts: 1.45,
  }[zone];

  const baseFee = 24;
  const distanceFee = Math.ceil(distanceKm * 8 * zoneMultiplier);
  const surge = distanceKm > 7 ? 18 : 0;
  const discount = cartValue > 699 ? 35 : cartValue > 399 ? 18 : 0;
  const fee = Math.max(0, baseFee + distanceFee + surge - discount);
  const minEta = Math.max(18, Math.round(12 + distanceKm * 4));
  const maxEta = minEta + (zone === "express" ? 7 : 12);

  return {
    fee,
    eta: `${minEta}-${maxEta} min`,
    zoneLabel: zone.charAt(0).toUpperCase() + zone.slice(1),
  };
}

export function distanceFromRestaurant(restaurant, address) {
  if (!restaurant?.coordinates || !address?.coordinates) return restaurant?.distanceKm ?? 3.2;
  const latDiff = restaurant.coordinates.lat - address.coordinates.lat;
  const lngDiff = restaurant.coordinates.lng - address.coordinates.lng;
  return Number(Math.sqrt(latDiff * latDiff + lngDiff * lngDiff).toFixed(1));
}
