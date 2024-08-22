function checkInputType(url) {    
    // Use a regular expression to check if it matches a URL pattern
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isURL = urlPattern.test(url);
    if(isURL){
        return true
    }else{
        return false
    }    
}

export default checkInputType;
  