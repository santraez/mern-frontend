const AjaxMethod = async (url, method, body = '', file = false) => {
  let loading = true;
  let typeMethod;
  if (method === 'GET' || method === 'DELETE') {
    typeMethod = { method: method };
  } else if (method === 'POST' || method === 'PUT') {
    if (file) {
      typeMethod = {
        method: method,
        body: body
      };
    } else {
      typeMethod = {
        method: method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
    };
  };
  const response = await fetch(url, typeMethod);
  const data = await response.json();
  loading = false;
  return { data, loading };
};

export default AjaxMethod;