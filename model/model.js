export default class Data {
    constructor(count){
      this.count = count;
    }
  
  static async getData() {
    const response = await Data.getAll();
    const result = response.map((item) => {
      const {
        id,
        name: { firstName, lastName },
        about,
        eyeColor,
      } = item;
      return {
        id,
        firstName,
        lastName,
        about,
        eyeColor,
      };
    });

    return result;
  }

  static getItem(id) {
    return new Promise((resolve, reject) => {
      fetch("../data.json")
        .then((res) => res.json())
        .then((data) => {
          const res = data.find((item) => item.id === id);
          resolve(res);
        })
        .catch((err) => console.log(reject(err)));
    });
  }

  static async getFormatItem(itemId){
    const response = await Data.getItem(itemId);
      const {
        id,
        name: {firstName, lastName},
        about,
        eyeColor,
      } = response;
      return {
        id,
        firstName,
        lastName,
        about,
        eyeColor,
      };
    };
  

  static getAll() {
    return new Promise((resolve, reject) => {
      fetch("../data.json")
        .then((res) => res.json())
        .then((data) => {

          resolve(data);
        })
        .catch((err) => console.log(reject(err)));
    });
  }
  
  static async getPart(num) {
    const data = await Data.getData();
    const parts = [];
    let start = 0;
    let end = num;
    while (start < data.length){
      parts.push(data.slice(start, end));
      start += num;
      end += num
    }
    
    return parts;
  }

  static async update(newData, id){
      const data = await Data.getAll()
      const idx = data.findIndex(item => {
        return item.id === id; 
      })

      data[idx].about = newData.about
      data[idx].eyeColor = newData.eyeColor
      data[idx].name.firstName = newData.firstName
      data[idx].name.lastName = newData.lastName
    
      
  }
}


// класс дата отвечает за получение данных и передает их в контроллеры или дургие сущности  для рендера