console.log('asdsad');

function test<T>(param: T): T {
    return param;
}

type funcType = string | number;

test<funcType>(23);

type intersection = string | number;

const testt: intersection = 23;

interface GenericIdentityFn<T> {
    (arg: T): T;
  }
  
  function identity<T>(arg: T): T {
    return arg;
  }
  
  let myIdentity: GenericIdentityFn<number> = identity;

  myIdentity(23);