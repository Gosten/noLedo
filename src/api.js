const apiUrl = "https://no-ledo-backend.onrender.com";

class API {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getProblemList() {
    try {
      const response = await axios.get(
        `${this.apiUrl}/problem-list/${LOCATION_NAME}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addProblem(problem) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/problem/${LOCATION_NAME}`,
        problem
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProblem(id) {
    try {
      const response = await axios.delete(
        `${this.apiUrl}/problem/${LOCATION_NAME}`,
        {
          params: {
            id: id
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async patchProblem(id, newProblem) {
    try {
      const response = await axios.patch(
        `${this.apiUrl}/problem/${LOCATION_NAME}`,
        newProblem,
        {
          params: {
            id: id
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const NoLedoApi = new API(apiUrl);
