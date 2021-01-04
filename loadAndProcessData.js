
export const loadAndProcessData = () =>
    Promise
        .all([
    d3.csv("Handling.csv"),
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
    ])
    .then(([csvData, TopoJsonData]) => { 
        csvData.forEach(d => {
            d.Total = +d.Total; 
        })
        console.log(csvData)
    const rowbyID = csvData.reduce((accumulator,d) =>{
    accumulator[d.ISO]=d;
     return accumulator;}, {})  // Burada tsv'dasını yeniden dizay ettik. iso_n3'ler altında tüm datayı sıraladık.
  const countries = topojson.feature (TopoJsonData, TopoJsonData.objects.countries);
  console.log(rowbyID)


  countries.features.forEach (d => {
      
        Object.assign(d.properties, rowbyID[d.id]) // rowbyID[d.id] nin tüm özelliklerini d.properties'e aldık.
        // Burada'da o iso_n3'e göre sıraladığımız data'dan sırayla d.id'ye göre properties'e ekledik.
});
console.log(countries)

    return countries;

});