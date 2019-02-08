var config = {
    token: false
};

// Request handling
// submitRequest with callback action handler
function submitRequest(url, method, payload, headers, callback) {
    // Create a request object
    var xhttp = new XMLHttpRequest();

    // Register the function to be called when server responds
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Parse the JSON response
                try {
                    var result = JSON.parse(this.responseText);
                    callback(false, result);
                }
                catch (e) {
                    callback(false, null);
                }
            }
            else {
                callback(this.statusText);
            }
        }
    };

    xhttp.open(method, url, true);

    // Set content type
    xhttp.setRequestHeader("Content-type", "application/json");
    // Set user defined headers (includes authentication token)
    for (var headerKey in headers) {
        if (headers.hasOwnProperty(headerKey)) {
            xhttp.setRequestHeader(headerKey, headers[headerKey]);
        }
    }

    if (payload) {
        xhttp.send(JSON.stringify(payload)); // Send the request
    }
    else {
        xhttp.send(); // For get/delete
    }
}

function saveToken(tokenObj) {
    // Save in config var
    config.token = tokenObj;
    // Save in local storage
    localStorage.setItem("token", tokenObj.token);
}

function getToken() {
    var tokenVal = localStorage.getItem("token");
    console.log(tokenVal);
    var tokenObj = null;
    if (tokenVal) {
        tokenObj = { "token": tokenVal };
    }

    return tokenObj;
}

function setAuthTokenHeader(headers, tokenObj){
    var tokenVal = "Bearer " + tokenObj.token;
    headers.authorization = tokenVal;
    console.log("authorization:" + tokenVal);
}

function displayError(id, message) {
    var divElement = document.getElementById(id);
    var textNode = document.createTextNode(message);
    divElement.appendChild(textNode);
}
