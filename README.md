# bcn-filter 

BcnFilter is an iterator that provides a way to filter and simplify iterators.

## Installation

```
npm install bcn-filter
```

```
var filter = new BcnFilter(iterator, filterFunction);
var asyncFilter = new BcnFilter(iterator, asycFilterFunction, {async: true});
```

filterFunction(key, value) -> [key, value] | null (ignore value)
asyncFilterFunction(key, value, cb) -> cb([key, value]) | cb(null) (ignore value) 

You can use this to rewrite streams by ignoring certain elements or transforming values on the fly.


Filter function that does nothing

```
function filterNone(key, value) {
	return [key, value];
}
```

Filter some elements 

```
function filterJustGood(key, value) {
	return value.isGood ? [key, value] : null;
}
```

## Methods

### pause()

Pauses iterator

### resume()

Resumes iterator

## Events

### data(key, value)

outputs the filtered value

### end

emitted when finished




