const COFFEE_ITEM_DATA_URL = 'https://random-data-api.com/api/coffee/random_coffee';
const COFFEE_ITEM_IMAGE_URL = 'https://loremflickr.com/500/500/coffee%20bean';

export default class CoffeeLineApi {
  /**
   * @returns {Promise<{
   *   id: number,
   *   uid: string,
   *   intensifier: string,
   *   origin: string,
   *   variety: string,
   *   blend_name: string,
   *   notes: string
   * }>}
   */
  static async getCoffeeItem() {
    return fetch(COFFEE_ITEM_DATA_URL).then((response) => response.json());
  }

  /**
   * @returns {Promise<string>}
   */
  static async getCoffeeImage() {
    return fetch(COFFEE_ITEM_IMAGE_URL).then((response) => response.url);
  }
}
