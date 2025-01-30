const handleError = (error) => {
    console.log(error)
}

const apiClient = {
    baseURL: 'http://localhost:7300',
  
    request: async function (url, options = {}, onSuccess) {
      const finalUrl = `${this.baseURL}${url}`;
      const defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const config = {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
      };

      try {
        const response = await fetch(finalUrl, config);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 204 No Content일 경우 처리
        if (response.status === 204) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(); // 데이터 없이 콜백 함수 실행
          }
          return; // 데이터 반환 없이 종료
        }

        const data = await response.json();

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(data);
        }

        return data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
  
    get: function (url, params = {}, onSuccess) {
      const query = new URLSearchParams(params).toString();
      return this.request(query ? `${url}?${query}` : url, {
        method: 'GET',
      }, onSuccess);
    },
  
    post: function (url, body = {}, onSuccess) {
      return this.request(url, {
        method: 'POST',
        body: JSON.stringify(body),
      }, onSuccess);
    },
  
    put: function (url, body = {}, onSuccess) {
      return this.request(url, {
        method: 'PUT',
        body: JSON.stringify(body),
      }, onSuccess);
    },
  
    delete: function (url, onSuccess) {
      return this.request(url, {
        method: 'DELETE',
      }, onSuccess);
    },
};
  
  