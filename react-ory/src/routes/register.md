# Admin

## get all identities

### curl

```sh
curl --request GET \
  --url 'http://localhost:4434/admin/identities?page_size=&page_token=&consistency=&credentials_identifier=&preview_credentials_identifier_similar=&include_credential=password' \
  --header 'Authorization: '
```

### JS

```js
import axios from "axios";

const options = {
  method: "GET",
  url: "http://localhost:4434/admin/identities",
  params: {
    page_size: "",
    page_token: "",
    consistency: "",
    credentials_identifier: "",
    preview_credentials_identifier_similar: "",
    include_credential: "password",
  },
  headers: { Authorization: "" },
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}
```

## Delete by id

### curl

```sh
curl --request GET \
  --url 'http://localhost:4434/admin/identities?page_size=&page_token=&consistency=&credentials_identifier=&preview_credentials_identifier_similar=' \
  --header 'Authorization: '
```

### JS

```js
import axios from "axios";

const options = {
  method: "GET",
  url: "http://localhost:4434/admin/identities",
  params: {
    page_size: "",
    page_token: "",
    consistency: "",
    credentials_identifier: "",
    preview_credentials_identifier_similar: "",
  },
  headers: { Authorization: "" },
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}
```
