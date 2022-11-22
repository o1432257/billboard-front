async function http(obj) {
  let { method, url, params, data } = obj;
  let res;
  
  //是否需要設置data
  if (data) {
    res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
  } else {
    res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }

  return res.json();
}
