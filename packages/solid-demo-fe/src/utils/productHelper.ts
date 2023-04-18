export function getProductPrice(product: any) { 
  const price = product?.variants[0].prices[0].amount / 100
  return '$' + price.toFixed(2)
}