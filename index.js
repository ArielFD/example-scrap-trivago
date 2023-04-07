const cheerio = require("cheerio");
const fs = require("fs");

const comision = 0.9;

fs.readFile("./example-trivago/trivago_example.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const $ = cheerio.load(data);
  const hotel = $("#input-auto-complete").val();
  console.log("myDiv:", hotel);

  const checkIn = $('[data-testid="checkin-calendar-subline"]');
  console.log(checkIn.text());

  const checkOut = $('[data-testid="checkout-calendar-subline"]');
  console.log(checkOut.text());

  const guests = $('[data-testid="undefined-subline"]');
  console.log(guests.text());
 
  const price = $('[data-testid="recommended-price"]')
    .map((index, element) => {
      return { 
        price: parseFloat($(element).text().trim().replace("$", "")), priceComision: (parseFloat($(element).text().trim().replace("$", ""))/comision).toFixed(2) };
    })
    .get();

  // console.log('myPrice:',price);

  const title = $("h2 button span")
    .map((index, element) => {
      return { title: $(element).text() };
    })
    .get();

  // console.log('myTitle:',title);

  for (let index = 0; index < title.length; index++) {
    console.log(
      title[index].title +
        "-$" +
        price[index].price +
        "-$" +
        price[index].priceComision
    );
  }
});
