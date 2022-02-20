const COFFEE_ITEM_DATA_URL = 'https://random-data-api.com/api/coffee/random_coffee';
const COFFEE_ITEM_IMAGE_URL = 'https://loremflickr.com/500/500/coffee%20bean';

export default class CoffeeLineApi {
  /**
   * @returns {Promise<*>}
   */
  static async getCoffeeItem() {
    const coffeeItemDataPromise = fetch(COFFEE_ITEM_DATA_URL).then((response) => response.json());
    const coffeeItemImagePromise = fetch(COFFEE_ITEM_IMAGE_URL);

    const coffeeItemData = await coffeeItemDataPromise;
    const coffeeItemImage = await coffeeItemImagePromise;

    return { ...coffeeItemData, image: coffeeItemImage.url };
  }
}
