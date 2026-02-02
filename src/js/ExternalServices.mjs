const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    // return res.json();
    return jsonResponse;
  } else {
    // throw new Error("Bad Response");
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  // async getData(category) {
  //   const response = await fetch(`${baseURL}products/search/${category}`);
  //   const data = await convertToJson(response);
  //   return data.Result;
  // }

  // Add a new parameter and logic to Sort By the data result
  async getData(category, sortBy) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    //this is mine
    if (!Array.isArray(data.Result)) {
      console.error('Fetched data is not an array, cannot sort.');
      return data; // Return the raw data if it's not an array
    }

    // Sort the array based on the sortBy key
    data.Result.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.Name.toLowerCase();
        const nameB = b.Name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else if (sortBy === 'price') {
        // Parse price to a number for correct numerical sorting
        return parseFloat(a.FinalPrice) - parseFloat(b.FinalPrice);
      }
      // Default: no specific sorting if key is unknown
      return 0;
    });
    //end of this is mine
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}