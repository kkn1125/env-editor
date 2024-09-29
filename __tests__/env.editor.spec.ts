import { EnvEditor } from "@src/src/module/env.editor";
import { describe, expect, it } from "vitest";

describe("EnvEditor Test Suite", () => {
  it("create env editor: success", () => {
    const envEditor = new EnvEditor();
    expect(envEditor).toBeDefined();
  });
});
