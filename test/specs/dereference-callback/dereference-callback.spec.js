"use strict";

const { expect } = require("chai");
const $RefParser = require("../../..");
const { rel } = require("../../utils/path");

describe("Schema with a $ref", () => {
  it("should call onDereference", async () => {
    let parser = new $RefParser();
    const calls = [];
    await parser.dereference(
      rel("specs/dereference-callback/dereference-callback.yaml"),
      {
        dereference: {
          onDereference (path, object) {
            calls.push({ path, object });
          },
        },
      }
    );
    expect(calls).to.deep.equal([
      { path: "#/definitions/b", object: { $ref: "#/definitions/a" }},
      { path: "#/definitions/a", object: { $ref: "#/definitions/a" }},
    ]);
  });
});
