// For VueJS integrations
import { routes as doCatalogRoutes } from './do-catalog/src/router';
import doCatalogStoreModule from './do-catalog/src/store/modules/data/catalog';

// For VanillaJS integrations
import DOCatalog from './do-catalog/src/DOCatalog';

export { DOCatalog, doCatalogRoutes, doCatalogStoreModule };
