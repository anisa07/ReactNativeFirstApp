const host = '10.6.219.46';
const loginUrl = `http://${host}/index.php/rest/V1/integration/customer/token`;
const productListUrl = `http://${host}/rest/V1/products?searchCriteria[pageSize]=18`;
const productListUrl2 = `http://${host}/rest/V1/products?searchCriteria[pageSize]=1&searchCriteria[currentPage]=`;
const cartItemsUrl = `http://${host}/rest/default/V1/carts/mine/items`;
const cartUrl = `http://${host}/rest/default/V1/carts/mine`;

export { loginUrl, productListUrl, productListUrl2, cartUrl, cartItemsUrl };
