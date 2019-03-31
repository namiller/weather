
export class Expect {
  test: TestCase;
  constructor(test: TestCase) {
    this.test = test;
  }
  ReportError(msg: string) {
    let err = new Error();
    Error.captureStackTrace(err);
    let cs = err.stack;
    this.test.failures.push(`${msg} : ${cs}`);
  }
  Eq(a, b) {
    if (a != b) {
      this.ReportError(`Expected equivalence of: ${a} and ${b}`);
    }
  }
  Ne(a, b) {
    if (a == b) {
      this.ReportError(`Expected nonequivalence of: ${a} and ${b}`);
    }
  }
  True(a: boolean) {
    if (!a) {
      this.ReportError(`Expected true`);
    }
  }
  False(a: boolean) {
    if (a) {
      this.ReportError(`Expected false`);
    }
  }
}

class TestCase {
  name: string;
  test: (e:Expect)=>void;
  failures: Array<string> = [];

  constructor(name: string, test: (e:Expect)=>void) {
    this.name = name;
    this.test = test;
  }
  run(): boolean {
    console.log(`Running: ${this.name}`);
    this.test(new Expect(this));
    if (this.failures.length !== 0) {
      console.log(`${this.name} FAILED : `);
      for (let line of this.failures) {
        console.log(line);
      }
      return false;
    } else {
      console.log(`${this.name} SUCCEEDED`);
      return true;
    }
  }
}

export class Tests {
  tests: Array<TestCase> = [];

  add(name: string, test:(e: Expect)=>void) {
    this.tests.push(new TestCase(name, test));
  }

  run(): boolean {
    let failures : Array<string> = []
    for (let test of this.tests) {
      if (!test.run()) {
        failures.push(test.name);
      }
    }
    if (failures.length === 0) {
      console.log("All test cases PASSED");
      process.exit(0);
      return true;
    } else {
      console.log(`TEST FAILURES: ${failures.join(", ")}`);
      process.exit(1);
      return false;
    }
  }
}

export let TESTS = new Tests();
