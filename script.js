let arrobj=[];
let data = [];

const container=document.getElementById("container");
const resultcontainer=document.createElement("div");
resultcontainer.setAttribute("class","row")
container.append(resultcontainer)

fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
.then((response)=>{if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network response was not ok');
  }})
.then((datares)=>{console.log(datares)
    // console.log(data.length);
    for(let i=0;i<datares.length;i++)
    {
     let s={} 
     s['api_featured_image']=datares[i].api_featured_image;
     s['brand']=datares[i].brand;
     s['name']=datares[i].name;
     s['product_type']=datares[i].product_type;
     s['description']=datares[i].description;
     s['price_sign']=datares[i].price_sign;
     s['price']=datares[i].price;
    //  s['image_link']=datares[i].image_link;
     s['product_link']=datares[i].product_link;
     s['website_link']=datares[i].website_link;
     
          arrobj.push(s);
     //  console.log(s)
    }
    console.log(arrobj); 
    renderCard(arrobj)
 

})
.catch((error)=>{console.log(error)})
function renderCard(array)
{
    let cards=[]
    
    for(let i=0;i<array.length;i++)
    {
      cards.push(createCard(array[i]))
    }
    resultcontainer.innerHTML=""
    resultcontainer.append(...cards);
    
}
function createCard(obj)
{
    const{ api_featured_image="",brand="",description="",
    name="",price="",price_sign="$",product_link="",
    product_type="",website_link=""}=obj;
    const cardMain=document.createElement("div");
    cardMain.setAttribute("class","card col-lg-4 col-md-6 col-sm-12")
    const imgDiv=document.createElement("div");
    imgDiv.setAttribute("class","imgDiv");
    const anchorTag=document.createElement("a");
    anchorTag.href=product_link;
    imgDiv.append(anchorTag)
    const imgCard=document.createElement("img");
    imgCard.setAttribute("class","card-img-top");
    imgCard.src=api_featured_image;
    imgCard.setAttribute("alt","Sorry!")
    anchorTag.append(imgCard)
    cardMain.appendChild(imgDiv);
    
    const cardBody=document.createElement("div");
    cardBody.setAttribute("class","card-body");
    cardMain.append(cardBody)
    const cardTitle=document.createElement("h4");
    cardTitle.setAttribute("class","card-title");
    cardTitle.append(brand);
    cardBody.append(cardTitle);
    const productp=document.createElement("h5");
    productp.setAttribute("class","card-text");
    const space=document.createTextNode(" ");
    productp.append(name,space,product_type);
    cardBody.append(productp);
    const pricep=document.createElement("p");
    pricep.setAttribute("class","card-text");
    pricep.append(price_sign,space,price);
    cardBody.append(pricep)
    ///////
    var popdiv=document.createElement("div");
    popdiv.setAttribute("id","popup")
    popdiv.innerHTML=`<h2>Product Description</h2>
    <p id="p1"></p>
    <button onclick="hidePopup()" class="btn btn-danger">Close</button>`
    document.body.append(popdiv)
    const buttonDiv=document.createElement("div");
    buttonDiv.setAttribute("class","buttonDiv");
    cardBody.append(buttonDiv);
    const btn1=document.createElement("button");
    btn1.setAttribute("class","btn btn-danger");
    btn1.setAttribute("type","button")
    btn1.innerText="View Description";
    btn1.onclick=function()
    {
        myfunction(description)
        showPopup();
    }

 buttonDiv.append(btn1);
 const btn2=document.createElement("button");
    btn2.setAttribute("class","btn btn-danger");
    btn2.setAttribute("type","button")
    btn2.innerText="Explore Further...";
    btn2.addEventListener('click', function() {
        window.location.href = website_link;
      });
    buttonDiv.append(btn2);
    return cardMain;

}
function myfunction(desc)
{
    const result = document.getElementById('p1');
    result.innerText=desc;
}
function showPopup() {
    var popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "block";
    }
    else {
      console.error("Popup element not found");
    }
  }
  function showPopup1() {
    var popup = document.getElementById("popup1");
    if (popup) {
      popup.style.display = "block";
    }
    else {
      console.error("Popup element not found");
    }
  }
  function hidePopup() {
    var popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "none";
    }
    else {
      console.error("Popup element not found");
    }
  }
  function hidePopup1() {
    var popup = document.getElementById("popup1");
    if (popup) {
      popup.style.display = "none";
    }
    else {
      console.error("Popup element not found");
    }
  }
  var popdiv1=document.createElement("div");
    popdiv1.setAttribute("id","popup1")
    popdiv1.innerHTML=`<h2>Sorry!!!</h2>
    <p>No Results found for your data</p>
    <button onclick="hidePopup1() class="btn btn-danger"">Close</button>`
    document.body.append(popdiv1)
  
  function handleSearch(target)
  {
    
    const search=target.value.toLowerCase();
    const searchMatch=arrobj.filter((element)=>{
      const name=element.name.toLowerCase();
     if(name.includes(search)){
   
    return name.includes(search);
     }
    });
    if(searchMatch.length<=0)
    { 
      showPopup1();
    }
    renderCard(searchMatch);
  }
  function handleSearch1(target)
  {
    const search=target.value.toLowerCase();
    console.log(search);
    const searchMatch=arrobj.filter((element)=>{
      let name1=element.brand;
      if(name1==null)
      {
        name1="NA"
     }
     console.log(name1);
     if(name1.includes(search)){
      console.log(name1.includes(search))
    return name1.includes(search);
      }
      
    });
    if(searchMatch.length<=0)
    { 
      showPopup1();
    }
    renderCard(searchMatch);
  }
  function handleSearch2(target)
  {
    const search=target.value.toLowerCase();
    console.log(search);
    const searchMatch=arrobj.filter((element)=>{
      let name1=element.product_type;
      if(name1==null)
      {
        name1="NA"
     }
     console.log(name1);
     if(name1.includes(search)){
      console.log(name1.includes(search))
    return name1.includes(search);
      }
      
    });
    if(searchMatch.length<=0)
    { 
      showPopup1();
    }
    renderCard(searchMatch);
  }
 

