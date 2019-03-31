import {TESTS, Expect} from "weather/test/test";

TESTS.add("Passing Test", function(e: Expect) {
  e.Eq("hello", "hello");
  e.Eq(5, 5);
  e.True(true);
  e.False(false);
  e.Ne(3,4);
  e.Ne(3,3.1);
});

TESTS.add("Failing Test", function(e: Expect) {
  e.Eq("hello", "goodbye");
});

TESTS.run();
