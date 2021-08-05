import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

import { echo } from "../app.js";

Deno.test("test1", () => {
    assertEquals(echo(), "echoechoecho!");
  });
  
  Deno.test("test2", () => {
    assertEquals(echo('hello'), 'hello');
  });
  
  Deno.test("test3", () => {
    assertEquals(echo(), "echoechoechasdaso!");
  });
