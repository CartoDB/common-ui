import { routes as DOCatalogRoutes } from './do-catalog/src/router';

import DOCatalogComponent from './do-catalog/dist/do-catalog.umd';

const CreateDOCatalogComponent = function(options = {}) {
  const { baseUrl = '/' } = options;
  DOCatalogComponent.router.options.base = baseUrl;
  DOCatalogComponent.router.history.base = baseUrl;

  return DOCatalogComponent;
};

export { DOCatalogRoutes, CreateDOCatalogComponent };
