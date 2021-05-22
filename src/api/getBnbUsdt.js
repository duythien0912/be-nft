import axios from "axios";

const BNB_USDT = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";

export async function getBnbPrice() {
  let price = "";
  try {
    const response = await axios.get(BNB_USDT);
    console.log(response);
    if (
      response != null &&
      response.status === 200 &&
      response.data != null &&
      response.data.price != null
    ) {
      price = response.data.price;
    }
  } catch (error) {
    console.error(error);
  }
  return price;
}
