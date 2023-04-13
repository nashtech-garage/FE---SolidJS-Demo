import Medusa from '@medusajs/medusa-js';

const medusaClient = new Medusa({ baseUrl: 'http://localhost:9005', maxRetries: 3 });

export { medusaClient };
