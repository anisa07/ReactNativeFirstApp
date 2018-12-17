const host = '10.6.219.46';
const loginUrl = `http://${host}/index.php/rest/V1/integration/customer/token`;
const productListUrl = `http://${host}/rest/V1/products?searchCriteria[pageSize]=15`;
// const productListUrl = `http://${host}/rest/V1/products?searchCriteria[pageSize]=2`;

export { loginUrl, productListUrl };
