public with sharing class HttpCallout {
    public HttpCallout() {

    }
    public String getCalloutContent(String url){
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('https://postman-echo.com/get?foo1=bar1&foo2=bar2');
    request.setMethod('GET');
    HttpResponse response = http.send(request);
// If the request is successful, parse the JSON response.
    String result = response.getBody();
    System.debug(result);
    return result;
    }
}
