function onSlideMenu() {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("slide").style.visibility = "hidden";
}
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("slide").style.visibility = "visible";
}

var name, prodID, qty, unitPrice, unit, purchasedPrice;
var partyname, ptocontact, address, telephone, mobile, email, website;

async function submitData() {
  name = document.getElementById("productName").value;
  prodID = document.getElementById("productId").value;
  qty = document.getElementById("qty").value;
  unit = document.getElementById("unit").value;
  unitPrice = document.getElementById("unitPrice").value;
  purchasedPrice = document.getElementById("purchasedPrice").value;
  partyName = document.getElementById("partyName").value;
  ptocontact = document.getElementById("ptocontact").value;
  address = document.getElementById("address").value;
  telephone = document.getElementById("telephone").value;
  mobile = document.getElementById("mobile").value;
  email = document.getElementById("email").value;
  website = document.getElementById("website").value;

  data = {
    name: name,
    // productId: prodID,
    qty: qty,
    unit: unit,
    unitPrice: unitPrice,
    purchasedPrice: purchasedPrice,
    partyName: partyName,
    ptocontact: ptocontact,
    address: address,
    telephone: telephone,
    mobile: mobile,
    email: email,
    website: website,
  };
  //console.log(data);
  await fetch("http://localhost:8000/inventory", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  await renderProducts();
}

async function API() {
  // fetch('http://localhost:8000/inventory').then(response => response.json())  // convert to json
  //   .then(json => console.log(json))    //print data to console
  //   .catch(err => console.log('Request Failed', err)); // Catch errors

  console.log("API Called");
  await fetch("http://localhost:8000/inventory")
    .then((response) => response.json())
    .then((json) => {
      return (data = json);
      // for(i=0; i<json.length; i++){

      //   // console.log(json[i])
      //   // return json[i]
      // }
      // console.log(data)
      // return data
    });
  // console.log(data)
  return data;
}

//function removeTableRow() {}

async function renderProducts() {
  let a = await API();

  let html = "";
  a.forEach((product) => {
    let htmlSegment = `
            <tr class="singleRow">
              <th scope="row">${product.productId}</th>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.unit}</td>
              <td><button class="btn btn-danger">Remove</button></td>
            </tr>
            `;

    html += htmlSegment;
  });

  let productsRow = document.querySelector(".products-row");
  productsRow.innerHTML = html;

  ///REMOVE TABLE ROW

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", function (event) {
      var buttonClicked = event.target.parentElement.parentElement.remove();
    });
  }
}
