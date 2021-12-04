export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }
  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  };
  getAllCharacters = async () => {
    const res = await this.getResource("/characters?page=5&pageSize=10");
    return res.map(this._transformCharacter);
  };
  getAllHouses = async () => {
    const houses = await this.getResource("/houses/");
    return houses.map(this._transformHouse);
  };
  getHouse = async (id) => {
    const res = await this.getResource(`/houses/${id}`);
    return this._transformHouse(res);
  };
  getAllBooks = async () => {
    const res = await this.getResource("/books/");
    return res.map(this._transformBook);
  };
  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}`);
    console.log(res);
    return this._transformBook(res);
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    //  console.log(item.url.match(idRegExp))
    return item.url.match(idRegExp)[1];
  };

  isSet(data){
    if(data){
      return data
    }
    else
    {
      return 'no fckng data!'
    }
  }
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: char.name ? char.name : "no info :(",
      gender: char.gender ? char.gender : "no info :(",
      born: char.born ? char.born : "no info :(",
      died: char.died ? char.died : "no info :(",
      culture: char.culture ? char.culture : "no info :(",
    };
  };

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons),
    };
  };
  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: this.isSet(book.released),
    };
  };
}
