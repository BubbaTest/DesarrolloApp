
var dbDF = new Dexie("NicaraolocalDAL");

dbDF.version(5).stores({    
    Formato: 'FormatoId, Descripcion, Plantilla, Activo',    
});