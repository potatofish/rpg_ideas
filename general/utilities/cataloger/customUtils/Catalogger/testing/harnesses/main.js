const Catalogger = require('Catalogger');

(async () => {
    console.log(require.main.path);
    
    const testCatalogger = await Catalogger.init();

    const catalog = await testCatalogger.openCatalog();
    console.log(testCatalogger);
    
})();

