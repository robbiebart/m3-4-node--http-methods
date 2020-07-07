const orderItems = {
  undefined: { label: 'Pick an item', imgUrl: './assets/question.jpg' },
  bottle: { label: 'Bottle', imgUrl: './assets/bottle.png' },
  shirt: { label: 'T-shirt', imgUrl: './assets/tshirt.png' },
  socks: { label: 'Socks', imgUrl: './assets/socks.jpg' },
};
const errorMessages = {
  unavailable: 'Item out of stock. :(',
  'repeat-customer':
    'Exiting user. Not allowed to place another order at the moment.',
  undeliverable: 'Outside of delivery zone. :(',
  'missing-data': "Oops! Looks like we're missing some information.",
};
const submitButton = document.getElementById('confirm-button');
const order = document.getElementById('order');
const errorMsg = document.getElementById('error');
const size = document.getElementById('size');
const givenName = document.getElementById('givenName');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');
const province = document.getElementById('province');
const postcode = document.getElementById('postcode');
const country = document.getElementById('country');

const updateForm = () => {
  const sel = document.getElementById('order').value;
  if (sel === 'shirt') {
    document.getElementById('sizing').style.display = 'flex';
  } else {
    document.getElementById('sizing').style.display = 'none';
  }
  document.getElementById(
    'order-image'
  ).style.backgroundImage = `url(${orderItems[sel].imgUrl}`;
};

const handleToggleErrorMessage = (errorStatus) => {};

const handleSubmit = (event) => {
  event.preventDefault(); //prevents default submit default of form (refresh the page)
  console.log(size.value);
  submitButton.disabled = true; 
// at this point we've made sure that all default behaviours are stopped for a while
// so that we can collect data from the form itself to prep it to send to the backend
  const data = {
    order: order.value,
    size: size.value,
    givenName: givenName.value,
    surname: surname.value,
    email: email,
    address: address.value,
    city: city.value,
    province: province.value,
    postcode: postcode.value,
    country: country.value,
  };
  /*
here we've collected data from form and put it all in a dataobject; at this point
we're ready to send data to back end
  */
  fetch('/order', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json()) 
    .then((data) => {
      console.log("this is backend data", data);
      const { status, error } = data;
      if (status === 'success') {
        window.location.href = '/order-confirmed';
      } else if (error) {
        submitButton.disabled = false;
        errorMsg.style.display = 'flex';
        errorMsg.innerText = errorMessages[error];
      }
    });
};

/*
// converting json u got from BE to a regular JS object
you have to wait a bit for this ^ to work, when its done, you start a new then

so the second then(data) uses a data thats the res of the res.json
when you're destructuring, you're desctructuring the result of res.json

res.json converts json from backend to a regular javascript object and then puts it in a 
variable you name it here, named here data
*/

/*
the body tells us the request im sending back to my backend; a fetch is making a request
to a backend server; this req has a body property, therefore you can do 
req.body
and this contains all the data from the form in json format
before we get to .then it jusmps back to back end, which takes us to the backend
where we do object destructuring

then once those tests are done, we go back to .then for our response
res.json is our response; we turn it into a javascript object line 68
we work with this object
and either change the url on front end to order confirmed page
or disable submit button and display an error
*/