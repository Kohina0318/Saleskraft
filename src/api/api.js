import axios from "axios";

var BASE_URL = "http://saleskraft.archisys.biz"


const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
  };

 class API{
    constructor() {
        this.baseURL = BASE_URL;
      }

      getAuthenticationInfo() {
        if (localStorage.getItem("appToken")
        ) {
         
          this.userToken = localStorage.getItem("appToken");
        } else if (localStorage.getItem("authToken")) {
          this.userToken = localStorage.getItem("authToken");
        }
      }

      get(url, data) {
        return new Promise((resolve, reject) => {
          this.api(METHOD.GET, url, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        });
      }

     
    
      post(url, data) {
        return new Promise((resolve, reject) => {
          this.api(METHOD.POST, url, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    
      put(url, data) {
        return new Promise((resolve, reject) => {
          this.api(METHOD.PUT, url, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    
      delete(url, data) {
        return new Promise((resolve, reject) => {
          this.api(METHOD.DELETE, url, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }

      api(method, url, data) {
        return new Promise((resolve, reject) => {
            this.getAuthenticationInfo();

            let axiosConfig = {};
            axiosConfig.method = method;
            axiosConfig.url = this.baseURL + url;
         
            axiosConfig.headers = this.setHeaders(data);
            if (data) {
              if (data.params) axiosConfig.params = data.params;
              if (data.data) axiosConfig.data = data.data;
            }

            axios(axiosConfig)
            .then((response) => {
                
            if (response.data.ResponseException) {
              if(response.data.ResponseException.HasValidationErrors){
                notification.error({
                  message: (response.data.ResponseException.ValidationErrors && response.data.ResponseException.ValidationErrors[0].Message),
                });
              } else {
                notification.error({
                  message: (response.data.ResponseException.Message),
                });
              }
              return;
            }
  
            if (
              (response && response.StatusCode >= 400) ||
              response.StatusCode <= 500
            ) {
              notification.error({
                message:
                (response.ResponseException &&
                  response.ResponseException.ExceptionMessage),
              });
            } else {
              resolve(response.data);
            }
          })
          .catch((error) => {
              let errorData = JSON.parse(JSON.stringify(error));
              let errorData500 = JSON.parse(JSON.stringify(error.response.data));
              
    
          });
      
        })   
    }

    setHeaders(data) {
        let headers = {};
        headers["accept-language"] = "en";
        headers["Content-Type"] = "application/json";
    
        if (localStorage.getItem("appToken")) {
          headers["appToken"] = localStorage.getItem("appToken");
        }
    
        if (data) {
          if (data.isMultipart) {
            headers["Content-Type"] = "multipart/form-data";
          }
    
          if (data.headers) {
            for (var key in data.headers) {
              if (data.headers.hasOwnProperty(key)) {
                headers[key] = data.headers[key];
              }
            }
          }
        }
    
       
    
        return headers;
      }
  }
