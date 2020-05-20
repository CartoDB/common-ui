import { routes as doCatalogRoutes } from './do-catalog/src/router';
import doCatalogStoreModule from './do-catalog/src/store/modules/data/catalog';

import DOCatalogComponent from './do-catalog/dist/do-catalog.umd.min';

const createDOCatalogComponent = function(options = {}) {
  const { baseUrl = '/' } = options;
  DOCatalogComponent.router.options.base = baseUrl;
  DOCatalogComponent.router.history.base = baseUrl;

  return DOCatalogComponent;
};

export { doCatalogRoutes, doCatalogStoreModule, createDOCatalogComponent };
