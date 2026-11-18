/* Sample catalog only. No information below represents actual Career Closet inventory. */
window.CareerClosetData = (() => {
  const O = ['Interview','Networking','Career fair','Presentation','Everyday professional'];
  const letter = ['XS','S','M','L','XL','2XL'];
  const trouser = ['28W × 30L','30W × 30L','30W × 32L','32W × 30L','32W × 32L','34W × 30L','34W × 32L','36W × 32L','38W × 32L'];
  const numbered = ['US 2','US 4','US 6','US 8','US 10','US 12','US 14'];
  const mensShoes = ['US Men 7','US Men 8','US Men 9','US Men 10','US Men 11','US Men 12'];
  const womensShoes = ['US Women 6','US Women 7','US Women 8','US Women 9','US Women 10','US Women 11'];
  const jacket = ['36R','38R','40R','42R','44R','46R'];
  const accessories = ['One size'];
  const list = [
    ['b01','Structured navy blazer','Blazers','blazer','#203954',['Interview','Networking','Presentation','Career fair'],jacket,['38R','40R','42R','44R']],
    ['b02','Soft camel blazer','Blazers','blazer','#C8A785',['Networking','Presentation','Everyday professional'],letter,['S','M','L','XL']],
    ['b03','Charcoal tailored blazer','Blazers','blazer','#525863',['Interview','Career fair','Presentation'],jacket,['36R','38R','42R']],
    ['b04','Relaxed linen blazer','Blazers','blazer','#9CA99C',['Networking','Everyday professional'],letter,['XS','S','M','L']],
    ['t01','White button-down shirt','Tops','top','#F8F6F0',['Interview','Career fair','Networking','Presentation'],letter,['S','M','L','XL','2XL']],
    ['t02','Powder-blue collared shirt','Tops','top','#A5C9DE',['Interview','Networking','Presentation'],letter,['XS','S','M','L']],
    ['t03','Black fine-knit top','Tops','top','#313439',['Everyday professional','Career fair','Networking'],letter,['XS','M','L','XL']],
    ['t04','Cream smart blouse','Tops','top','#EBDCC4',['Interview','Networking','Presentation'],letter,['S','M','L']],
    ['p01','Charcoal dress trousers','Trousers','trousers','#51545B',['Interview','Career fair','Presentation'],trouser,['30W × 30L','32W × 30L','32W × 32L','34W × 32L','36W × 32L']],
    ['p02','Navy straight-leg trousers','Trousers','trousers','#263E61',['Networking','Interview','Everyday professional'],trouser,['28W × 30L','30W × 32L','32W × 30L','34W × 30L','38W × 32L']],
    ['p03','Black dress pants','Trousers','trousers','#292C32',['Interview','Presentation','Career fair'],numbered,['US 4','US 6','US 8','US 10','US 12']],
    ['p04','Sand tailored trousers','Trousers','trousers','#CDBB9D',['Everyday professional','Networking'],trouser,['30W × 30L','32W × 30L','34W × 32L']],
    ['s01','Black midi skirt','Skirts','skirt','#292D34',['Interview','Networking','Presentation'],numbered,['US 2','US 4','US 6','US 8','US 12']],
    ['s02','Navy pleated skirt','Skirts','skirt','#385679',['Networking','Career fair','Everyday professional'],numbered,['US 4','US 8','US 10','US 14']],
    ['s03','Olive knee-length skirt','Skirts','skirt','#768575',['Everyday professional','Networking'],letter,['XS','S','M','L']],
    ['s04','Cream pencil skirt','Skirts','skirt','#DED3BE',['Interview','Presentation'],numbered,['US 6','US 8','US 10']],
    ['sh01','Classic black dress shoes','Shoes','shoe','#38383D',['Interview','Career fair','Presentation'],mensShoes,['US Men 8','US Men 9','US Men 10','US Men 11']],
    ['sh02','Brown leather-style loafers','Shoes','shoe','#87634B',['Networking','Everyday professional','Interview'],mensShoes,['US Men 7','US Men 9','US Men 10','US Men 12']],
    ['sh03','Black low-heel pumps','Shoes','shoe','#272A2D',['Interview','Presentation'],womensShoes,['US Women 6','US Women 7','US Women 8','US Women 9']],
    ['sh04','Comfortable tan flats','Shoes','shoe','#B89577',['Networking','Career fair','Everyday professional'],womensShoes,['US Women 7','US Women 8','US Women 10']],
    ['a01','Structured black tote','Accessories','bag','#35363C',['Interview','Career fair','Networking','Everyday professional'],accessories,accessories],
    ['a02','Neutral professional tie','Accessories','tie','#AD5E6B',['Interview','Career fair','Presentation'],accessories,accessories],
    ['a03','Slim brown belt','Accessories','belt','#855D45',['Interview','Networking','Everyday professional'],['S','M','L'],['S','M','L']],
    ['a04','Minimalist cream scarf','Accessories','scarf','#D8C5A9',['Networking','Presentation','Everyday professional'],accessories,accessories]
  ];
  const items = list.map(([id,name,category,kind,color,occasions,sizes,available],i)=>({id,name,category,kind,color,occasions,sizes,available,slot:category,tag:i%4===0?'Most popular':'Sample item'}));
  const slots = ['Blazers','Tops','Trousers','Skirts','Shoes','Accessories'];
  return {items,slots,occasions:O};
})();
