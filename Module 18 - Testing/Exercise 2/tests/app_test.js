import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";

import { app } from "../app.js";

Deno.test("test1", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({name: 'hello'})
      .expect("Hello Jane!");
  });

  Deno.test("test2", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({name: 'hellowqe'})
      .expect("Hello Janqwee!");
  });

  Deno.test("test3", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({name: 'hello'})
      .expect({name: 'hello'});
  });

  Deno.test("test4", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({name: 'hello2'})
      .expect({name: 'hello2'});
  });

  Deno.test("test5", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({name: 'hello3'})
      .expect({name: 'hello3'});
  });
