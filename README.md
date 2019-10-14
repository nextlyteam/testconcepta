a [Sails v1](https://sailsjs.com) application

## Steps to run locally
1. Run `npm install`
2. Run `sails lift`
3. Access the endpoint via http://localhost:1337/api/get-csv

## Get CSV of an input in NACHA Format.
```
URL: POST {host}/api/get-csv
Body: {
  "input": A text file in the NACHA format.
}
```
**This is an example using the public endpoint:**
```
URL: POST https://testconcepta.herokuapp.com/api/get-csv
Body: {
  "input": ./input.txt
}
```

### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)
