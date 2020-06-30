const Catalogger = require('Catalogger');

(async () => {
    console.log(require.main.path);
    
    const testCatalogger = await Catalogger.init();
    console.log(testCatalogger);
    
})();

