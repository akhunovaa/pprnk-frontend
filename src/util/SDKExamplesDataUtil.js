export function getJavaOkHttp(url, host, key) {
   return "OkHttpClient client = new OkHttpClient();\n" +
       "\n" +
       "Request request = new Request.Builder()\n" +
       "\t.url(\"" + url + "\")\n" +
       "\t.get()\n" +
       "\t.addHeader(\"x-yourapi-host\", \"" + host + "\")\n" +
       "\t.addHeader(\"x-yourapi-key\", \"" + key + "\")\n" +
       "\t.build();\n" +
       "\n" +
       "Response response = client.newCall(request).execute();";
}

export function getJavaUnirest(url, host, key) {
   return "HttpResponse\u003CString\u003E response = Unirest.get(\"" + url + "\")\n" +
       "\t.header(\"x-yourapi-host\", \"" + host + "\")\n" +
       "\t.header(\"x-yourapi-key\", \"" + key + "\")\n" +
       "\t.asString();"
}

export function getJSJquery(url, host, key) {
   return "var settings = {\n" +
       "\t\"async\": true,\n" +
       "\t\"crossDomain\": true,\n" +
       "\t\"url\": \"" + url + "\",\n" +
       "\t\"method\": \"GET\",\n" +
       "\t\"headers\": {\n" +
       "\t\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\t\"x-yourapi-key\": \"" + key + "\"\n" +
       "\t}\n" +
       "}\n" +
       "\n" +
       "$.ajax(settings).done(function (response) {\n" +
       "\tconsole.log(response);\n" +
       "});"
}

export function getJSFetch(url, host, key, method) {
   return "fetch(\"" + url + "\", {\n" +
       "\t\"method\": \"GET\",\n" +
       "\t\"headers\": {\n" +
       "\t\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\t\"x-yourapi-key\": \"" + key + "\"\n" +
       "\t}\n" +
       "})\n" +
       ".then(response => {\n" +
       "\tconsole.log(response);\n" +
       "})\n" +
       ".catch(err => {\n" +
       "\tconsole.log(err);\n" +
       "});"
}

export function getJSXMLHttpRequest(url, host, key) {
   return "fetch(\"" + url + "\", {\n" +
       "\t\"method\": \"GET\",\n" +
       "\t\"headers\": {\n" +
       "\t\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\t\"x-yourapi-key\": \"" + key + "\"\n" +
       "\t}\n" +
       "})\n" +
       ".then(response => {\n" +
       "\tconsole.log(response);\n" +
       "})\n" +
       ".catch(err => {\n" +
       "\tconsole.log(err);\n" +
       "});"
}

export function getGoRequest(url, host, key) {
   return "package main\n" +
       "\n" +
       "import (\n" +
       "\t\"fmt\"\n" +
       "\t\"net/http\"\n" +
       "\t\"io/ioutil\"\n" +
       ")\n" +
       "\n" +
       "func main() {\n" +
       "\n" +
       "\turl := \"" + url + "\"\n" +
       "\n" +
       "\treq, _ := http.NewRequest(\"GET\", url, nil)\n" +
       "\n" +
       "\treq.Header.Add(\"x-yourapi-host\", \"" + host + "\")\n" +
       "\treq.Header.Add(\"x-yourapi-key\", \"" + key + "\")\n" +
       "\n" +
       "\tres, _ := http.DefaultClient.Do(req)\n" +
       "\n" +
       "\tdefer res.Body.Close()\n" +
       "\tbody, _ := ioutil.ReadAll(res.Body)\n" +
       "\n" +
       "\tfmt.Println(res)\n" +
       "\tfmt.Println(string(body))\n" +
       "\n" +
       "}"
}

export function getCLibCurlRequest(url, host, key) {
   return "CURL *hnd = curl_easy_init();\n" +
       "\n" +
       "curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, \"GET\");\n" +
       "curl_easy_setopt(hnd, CURLOPT_URL, \"" + url + "\");\n" +
       "\n" +
       "struct curl_slist *headers = NULL;\n" +
       "headers = curl_slist_append(headers, \"x-yourapi-host: " + host + "\");\n" +
       "headers = curl_slist_append(headers, \"x-yourapi-key: " + key + "\");\n" +
       "curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);\n" +
       "\n" +
       "CURLcode ret = curl_easy_perform(hnd);"
}

export function getCRestSharpRequest(url, host, key) {
   return "var client = new RestClient(\"" + url + "\");\n" +
       "var request = new RestRequest(Method.GET);\n" +
       "request.AddHeader(\"x-yourapi-host\", \"" + host + "\");\n" +
       "request.AddHeader(\"x-yourapi-key\", \"" + key + "\");\n" +
       "IRestResponse response = client.Execute(request);"
}

export function getCUnirestRequest(url, host, key) {
   return "Task\u003CHttpResponse\u003CMyClass\u003E\u003E response = Unirest.get(\"" + url + "\")\n" +
       ".header(\"X-yourapi-Host\", \"" + host + "\")\n" +
       ".header(\"X-yourapi-Key\", \"" + key + "\")\n" +
       ".asJson();"
}

export function getNodeJSHttpRequest(url, host, key, path) {
   return "var http = require(\"https\");\n" +
       "\n" +
       "var options = {\n" +
       "\t\"method\": \"GET\",\n" +
       "\t\"hostname\": \"" + url + "\",\n" +
       "\t\"port\": null,\n" +
       "\t\"path\": \"" + path + "\",\n" +
       "\t\"headers\": {\n" +
       "\t\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\t\"x-yourapi-key\": \"" + key + "\",\n" +
       "\t\t\"useQueryString\": true\n" +
       "\t}\n" +
       "};\n" +
       "\n" +
       "var req = http.request(options, function (res) {\n" +
       "\tvar chunks = [];\n" +
       "\n" +
       "\tres.on(\"data\", function (chunk) {\n" +
       "\t\tchunks.push(chunk);\n" +
       "\t});\n" +
       "\n" +
       "\tres.on(\"end\", function () {\n" +
       "\t\tvar body = Buffer.concat(chunks);\n" +
       "\t\tconsole.log(body.toString());\n" +
       "\t});\n" +
       "});\n" +
       "\n" +
       "req.end();"
}

export function getNodeJSRequest(url, host, key) {
   return "var request = require(\"request\");\n" +
       "\n" +
       "var options = {\n" +
       "  method: 'GET',\n" +
       "  url: '" + url + "',\n" +
       "  headers: {\n" +
       "    'x-yourapi-host': '" + host + "',\n" +
       "    'x-yourapi-key': '" + key + "',\n" +
       "    useQueryString: true\n" +
       "  }\n" +
       "};\n" +
       "\n" +
       "request(options, function (error, response, body) {\n" +
       "\tif (error) throw new Error(error);\n" +
       "\n" +
       "\tconsole.log(body);\n" +
       "});"
}

export function getNodeJSUnirestRequest(url, host, key) {
   return "var unirest = require(\"unirest\");\n" +
       "\n" +
       "var req = unirest(\"GET\", \"" + url + "\");\n" +
       "\n" +
       "req.headers({\n" +
       "\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\"x-yourapi-key\": \"" + key + "\",\n" +
       "\t\"useQueryString\": true\n" +
       "});\n" +
       "\n" +
       "\n" +
       "req.end(function (res) {\n" +
       "\tif (res.error) throw new Error(res.error);\n" +
       "\n" +
       "\tconsole.log(res.body);\n" +
       "});"
}

export function getNodeJSAxiosRequest(url, host, key) {
   return "const axios = require(\"axios\");\n" +
       "\n" +
       "axios({\n" +
       "    \"method\":\"GET\",\n" +
       "    \"url\":\"" + url + "\",\n" +
       "    \"headers\":{\n" +
       "    \"content-type\":\"application/octet-stream\",\n" +
       "    \"x-yourapi-host\":\"" + host + "\",\n" +
       "    \"x-yourapi-key\":\"" + key + "\",\n" +
       "    \"useQueryString\":true\n" +
       "    }\n" +
       "    })\n" +
       "    .then((response)=>{\n" +
       "      console.log(response)\n" +
       "    })\n" +
       "    .catch((error)=>{\n" +
       "      console.log(error)\n" +
       "    })"
}

export function getPHPCurlRequest(url, host, key) {
   return "<?php\n" +
       "\n" +
       "$curl = curl_init();\n" +
       "\n" +
       "curl_setopt_array($curl, array(\n" +
       "\tCURLOPT_URL => \"" + url + "\",\n" +
       "\tCURLOPT_RETURNTRANSFER => true,\n" +
       "\tCURLOPT_FOLLOWLOCATION => true,\n" +
       "\tCURLOPT_ENCODING => \"\",\n" +
       "\tCURLOPT_MAXREDIRS => 10,\n" +
       "\tCURLOPT_TIMEOUT => 30,\n" +
       "\tCURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n" +
       "\tCURLOPT_CUSTOMREQUEST => \"GET\",\n" +
       "\tCURLOPT_HTTPHEADER => array(\n" +
       "\t\t\"x-yourapi-host: " + host + "\",\n" +
       "\t\t\"x-yourapi-key: " + key + "\"\n" +
       "\t),\n" +
       "));\n" +
       "\n" +
       "$response = curl_exec($curl);\n" +
       "$err = curl_error($curl);\n" +
       "\n" +
       "curl_close($curl);\n" +
       "\n" +
       "if ($err) {\n" +
       "\techo \"cURL Error #:\" . $err;\n" +
       "} else {\n" +
       "\techo $response;\n" +
       "}"
}

export function getPHPHttpV2Request(url, host, key) {
   return "<?php\n" +
       "\n" +
       "$client = new http\\Client;\n" +
       "$request = new http\\Client\\Request;\n" +
       "\n" +
       "$request->setRequestUrl('" + url + "');\n" +
       "$request->setRequestMethod('GET');\n" +
       "$request->setHeaders(array(\n" +
       "\t'x-yourapi-host' => '" + host + "',\n" +
       "\t'x-yourapi-key' => '" + key + "'\n" +
       "));\n" +
       "\n" +
       "$client->enqueue($request)->send();\n" +
       "$response = $client->getResponse();\n" +
       "\n" +
       "echo $response->getBody();"
}

export function getPHPUnirestRequest(url, host, key) {
   return "$response = Unirest\\Request::get(\"" + url + "\",\n" +
       "  array(\n" +
       "    \"x-yourapi-host\" => \"" + host + "\",\n" +
       "    \"x-yourapi-key\" => \"" + key + "\"\n" +
       "  )\n" +
       ");"
}

export function getPowershellRestRequest(url, host, key) {
   return "$headers=@{}\n" +
       "$headers.Add(\"x-yourapi-host\", \"" + host + "\")\n" +
       "$headers.Add(\"x-yourapi-key\", \"" + key + "\")\n" +
       "$response = Invoke-RestMethod -Uri '" + url + "' -Method GET -Headers $headers"
}

export function getPythonHttpClientRequest(url, host, key) {
   return "import http.client\n" +
       "\n" +
       "conn = http.client.HTTPSConnection(\"" + host + "\")\n" +
       "\n" +
       "headers = {\n" +
       "    'x-yourapi-host': \"" + host + "\",\n" +
       "    'x-yourapi-key': \"" + key + "\"\n" +
       "    }\n" +
       "\n" +
       "conn.request(\"GET\", \"" + url + "\", headers=headers)\n" +
       "\n" +
       "res = conn.getresponse()\n" +
       "data = res.read()\n" +
       "\n" +
       "print(data.decode(\"utf-8\"))"
}

export function getPythonRequest(url, host, key) {
   return "import requests\n" +
       "\n" +
       "url = \"" + url + "\"\n" +
       "\n" +
       "headers = {\n" +
       "    'x-yourapi-host': \"" + host + ",\n" +
       "    'x-yourapi-key': \"" + key + "\"\n" +
       "    }\n" +
       "\n" +
       "response = requests.request(\"GET\", url, headers=headers)\n" +
       "\n" +
       "print(response.text)"
}

export function getPythonUnirestRequest(url, host, key) {
   return "response = unirest.get(\"" + url + "\",\n" +
       "  headers={\n" +
       "    \"x-yourapi-host\": \"" + host + "\",\n" +
       "    \"x-yourapi-key\": \"" + key + "\"\n" +
       "  }\n" +
       ")"
}


export function getRubyNetHttpRequest(url, host, key) {
   return "require 'uri'\n" +
       "require 'net/http'\n" +
       "require 'openssl'\n" +
       "\n" +
       "url = URI(\"" + url + "\")\n" +
       "\n" +
       "http = Net::HTTP.new(url.host, url.port)\n" +
       "http.use_ssl = true\n" +
       "http.verify_mode = OpenSSL::SSL::VERIFY_NONE\n" +
       "\n" +
       "request = Net::HTTP::Get.new(url)\n" +
       "request[\"x-yourapi-host\"] = '" + host + "'\n" +
       "request[\"x-yourapi-key\"] = '" + key + "'\n" +
       "\n" +
       "response = http.request(request)\n" +
       "puts response.read_body"
}

export function getRubyUnirestRequest(url, host, key) {
   return "response = Unirest.get \"" + url + "\",\n" +
       "  headers:{\n" +
       "    \"x-yourapi-host\" => \"" + host + "\",\n" +
       "    \"x-yourapi-key\" => \"" + key + "\"\n" +
       "  }"
}

export function getShellCurlRequest(url, host, key) {
   return "curl --request GET \\\n" +
       "\t--url " + url + " \\\n" +
       "\t--header 'x-yourapi-host: " + host + "' \\\n" +
       "\t--header 'x-yourapi-key: " + key + "'"
}

export function getShellHTTPieRequest(url, host, key) {
   return "http GET " + url + " \\\n" +
       "\tx-yourapi-host:" + host + " \\\n" +
       "\tx-yourapi-key:" + key + "";
}

export function getShellWgetRequest(url, host, key) {
   return "wget --quiet \\\n" +
       "\t--method GET \\\n" +
       "\t--header 'x-yourapi-host: " + host + "' \\\n" +
       "\t--header 'x-yourapi-key: " + key + "' \\\n" +
       "\t--output-document \\\n" +
       "\t- " + url + "";
}

export function getSwiftNSUrllSessionRequest(url, host, key) {
   return "import Foundation\n" +
       "\n" +
       "let headers = [\n" +
       "\t\"x-yourapi-host\": \"" + host + "\",\n" +
       "\t\"x-yourapi-key\": \"" + key + "\"\n" +
       "]\n" +
       "\n" +
       "let request = NSMutableURLRequest(url: NSURL(string: \"" + url + "\")! as URL,\n" +
       "                                        cachePolicy: .useProtocolCachePolicy,\n" +
       "                                    timeoutInterval: 10.0)\n" +
       "request.httpMethod = \"GET\"\n" +
       "request.allHTTPHeaderFields = headers\n" +
       "\n" +
       "let session = URLSession.shared\n" +
       "let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in\n" +
       "\tif (error != nil) {\n" +
       "\t\tprint(error)\n" +
       "\t} else {\n" +
       "\t\tlet httpResponse = response as? HTTPURLResponse\n" +
       "\t\tprint(httpResponse)\n" +
       "\t}\n" +
       "})\n" +
       "\n" +
       "dataTask.resume()";
}

