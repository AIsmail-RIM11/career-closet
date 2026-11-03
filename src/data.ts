export type Item={id:number;name:string;type:'Blazer'|'Shirt'|'Pants'|'Accessory';size:string[];color:string;occasion:'Interview'|'Networking'|'Both';image:string;available:number;description:string};
export const items:Item[]=[
{id:1,name:'The Essential Blazer',type:'Blazer',size:['XS','S','M','L','XL'],color:'Midnight',occasion:'Both',image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop',available:3,description:'A polished layer for interviews and professional introductions.'},
{id:2,name:'Oxford Button-Down',type:'Shirt',size:['S','M','L','XL'],color:'Sky blue',occasion:'Interview',image:'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=900&auto=format&fit=crop',available:6,description:'A timeless shirt with a crisp, professional finish.'},
{id:3,name:'Tailored Neutral Trousers',type:'Pants',size:['XS','S','M','L','XL'],color:'Sand',occasion:'Both',image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop',available:4,description:'Versatile tailored trousers that pair with nearly anything.'},
{id:4,name:'Classic White Shirt',type:'Shirt',size:['XS','S','M','L'],color:'White',occasion:'Both',image:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&auto=format&fit=crop',available:5,description:'A clean foundation for business professional or casual looks.'},
{id:5,name:'Structured Navy Jacket',type:'Blazer',size:['S','M','L'],color:'Navy',occasion:'Interview',image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop',available:2,description:'Smart, structured, and easy to dress up.'},
{id:6,name:'Minimal Leather Belt',type:'Accessory',size:['S','M','L'],color:'Black',occasion:'Both',image:'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=900&auto=format&fit=crop',available:8,description:'A finishing detail for a put-together look.'},
{id:7,name:'Relaxed Knit Layer',type:'Shirt',size:['XS','S','M','L'],color:'Cream',occasion:'Networking',image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop',available:3,description:'A softer approach to business casual.'},
{id:8,name:'Charcoal Dress Pants',type:'Pants',size:['S','M','L','XL'],color:'Charcoal',occasion:'Interview',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop',available:4,description:'A dependable staple for a confident first impression.'}
];
export type Selection={id:number;size:string};
export type Reservation={id:string;selections:Selection[];pickup:string;created:string;status:'Reserved'|'Picked up'};
export const reservationKey='career-closet-demo-reservations';
export function loadReservations():Reservation[]{try{return JSON.parse(localStorage.getItem(reservationKey)||'[]')}catch{return []}}
export function saveReservation(r:Reservation){localStorage.setItem(reservationKey,JSON.stringify([r,...loadReservations()]));}
