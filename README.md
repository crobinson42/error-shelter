# error-shelter
An error logger/handler/storage for front-end apps. Ties in with native JS Error as well as utilizes localStorage for error log preservation which is great for developers wishing to debug user issues.

Use errors as normal:
```
throw new Error('This is an error...');
```

Then retrieve storage whenever:
```
Error.errorShelter.getStorage();
```
